import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { User, Mail, Lock, Save, LogOut, Camera, CircleCheck as CheckCircle2, CircleAlert as AlertCircle, KeyRound, Trophy, Target, Flame, ListChecks, Shield } from 'lucide-react'
import Card, { CardHeader } from '../components/Card'
import Input from '../components/Input'
import Button from '../components/Button'
import Avatar from '../components/Avatar'
import Badge from '../components/Badge'
import Alert from '../components/Alert'
import StatTile from '../components/StatTile'
import { useAuth } from '../context/AuthContext'
import { userService } from '../services'

const tabs = [
  { id: 'profile', label: 'Edit Profile', icon: User },
  { id: 'password', label: 'Change Password', icon: KeyRound },
]

export default function ProfilePage() {
  const { user, updateUser, logout } = useAuth()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('profile')

  // Profile form
  const [profile, setProfile] = useState({
    fullName: user?.fullName || user?.name || '',
    email: user?.email || '',
    bio: user?.bio || '',
  })
  const [profileMsg, setProfileMsg] = useState({ type: '', text: '' })
  const [savingProfile, setSavingProfile] = useState(false)

  // Password form
  const [passwords, setPasswords] = useState({ current: '', next: '', confirm: '' })
  const [pwErrors, setPwErrors] = useState({})
  const [pwMsg, setPwMsg] = useState({ type: '', text: '' })
  const [savingPw, setSavingPw] = useState(false)

  const handleSaveProfile = async (e) => {
    e.preventDefault()
    setSavingProfile(true)
    setProfileMsg({ type: '', text: '' })
    try {
      const updated = await userService.updateProfile({
        fullName: profile.fullName,
        bio: profile.bio,
      })
      updateUser({ ...user, ...updated, fullName: profile.fullName, bio: profile.bio })
      setProfileMsg({ type: 'success', text: 'Profile updated successfully.' })
    } catch (err) {
      setProfileMsg({
        type: 'error',
        text: err?.response?.data?.message || 'Could not update profile. Please try again.',
      })
    } finally {
      setSavingProfile(false)
    }
  }

  const handleChangePassword = async (e) => {
    e.preventDefault()
    const er = {}
    if (!passwords.current) er.current = 'Current password is required'
    if (!passwords.next) er.next = 'New password is required'
    else if (passwords.next.length < 8) er.next = 'Password must be at least 8 characters'
    if (passwords.next !== passwords.confirm) er.confirm = 'Passwords do not match'
    setPwErrors(er)
    if (Object.keys(er).length) return

    setSavingPw(true)
    setPwMsg({ type: '', text: '' })
    try {
      await userService.changePassword({
        currentPassword: passwords.current,
        newPassword: passwords.next,
      })
      setPwMsg({ type: 'success', text: 'Password changed successfully.' })
      setPasswords({ current: '', next: '', confirm: '' })
    } catch (err) {
      setPwMsg({
        type: 'error',
        text: err?.response?.data?.message || 'Could not change password. Please try again.',
      })
    } finally {
      setSavingPw(false)
    }
  }

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Profile header card */}
      <div className="glass-card relative overflow-hidden p-6 sm:p-8">
        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-brand" />
        <div className="relative flex flex-col items-start gap-5 sm:flex-row sm:items-center">
          <div className="relative">
            <Avatar name={profile.fullName || 'User'} size="xl" className="ring-4 ring-white" />
            <button className="absolute bottom-1 right-1 flex h-7 w-7 items-center justify-center rounded-full bg-white text-brand-600 shadow-md ring-2 ring-white hover:bg-brand-50" aria-label="Change avatar">
              <Camera className="h-3.5 w-3.5" />
            </button>
          </div>
          <div className="flex-1 pt-12 sm:pt-0">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="font-display text-2xl font-extrabold text-slate-900">
                {profile.fullName || 'User'}
              </h2>
              <Badge variant="success" icon={Shield}>Verified</Badge>
            </div>
            <p className="mt-1 text-sm text-slate-500">{profile.email}</p>
            {profile.bio && <p className="mt-2 max-w-lg text-sm text-slate-600">{profile.bio}</p>}
          </div>
          <Button variant="danger" onClick={handleLogout} className="shrink-0">
            <LogOut className="h-4 w-4" />
            Log out
          </Button>
        </div>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatTile icon={ListChecks} label="Quizzes Taken" value={24} tone="brand" />
        <StatTile icon={Target} label="Avg. Score" value="87%" tone="emerald" />
        <StatTile icon={Flame} label="Streak" value="12d" tone="amber" />
        <StatTile icon={Trophy} label="Best Score" value="100%" tone="brand" />
      </div>

      {/* Tabs + content */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Tab nav */}
        <Card className="h-fit p-2 lg:col-span-1">
          {tabs.map((tab) => {
            const active = activeTab === tab.id
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all ${
                  active ? 'bg-gradient-brand text-white shadow-glow' : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <tab.icon className="h-4 w-4" />
                {tab.label}
              </button>
            )
          })}
        </Card>

        {/* Tab panel */}
        <div className="lg:col-span-2">
          {activeTab === 'profile' ? (
            <Card>
              <CardHeader title="Edit Profile" subtitle="Update your personal information." icon={User} />
              {profileMsg.text && (
                <Alert
                  variant={profileMsg.type === 'success' ? 'success' : 'error'}
                  icon={profileMsg.type === 'success' ? CheckCircle2 : AlertCircle}
                  className="mb-5"
                >
                  {profileMsg.text}
                </Alert>
              )}
              <form onSubmit={handleSaveProfile} className="space-y-5">
                <Input
                  label="Full Name"
                  name="fullName"
                  icon={User}
                  value={profile.fullName}
                  onChange={(e) => setProfile((p) => ({ ...p, fullName: e.target.value }))}
                  required
                />
                <Input
                  label="Email"
                  name="email"
                  type="email"
                  icon={Mail}
                  value={profile.email}
                  onChange={(e) => setProfile((p) => ({ ...p, email: e.target.value }))}
                  hint="Email changes may require re-verification on your backend."
                  disabled
                />
                <div>
                  <label htmlFor="bio" className="label-text">Bio</label>
                  <textarea
                    id="bio"
                    rows={3}
                    value={profile.bio}
                    onChange={(e) => setProfile((p) => ({ ...p, bio: e.target.value }))}
                    placeholder="Tell us a little about yourself..."
                    className="input-field resize-none"
                  />
                </div>
                <div className="flex justify-end">
                  <Button type="submit" loading={savingProfile}>
                    {!savingProfile && <Save className="h-4 w-4" />}
                    Save Changes
                  </Button>
                </div>
              </form>
            </Card>
          ) : (
            <Card>
              <CardHeader title="Change Password" subtitle="Keep your account secure with a strong password." icon={KeyRound} />
              {pwMsg.text && (
                <Alert
                  variant={pwMsg.type === 'success' ? 'success' : 'error'}
                  icon={pwMsg.type === 'success' ? CheckCircle2 : AlertCircle}
                  className="mb-5"
                >
                  {pwMsg.text}
                </Alert>
              )}
              <form onSubmit={handleChangePassword} className="space-y-5">
                <Input
                  label="Current Password"
                  name="current"
                  type="password"
                  icon={Lock}
                  placeholder="Enter your current password"
                  value={passwords.current}
                  onChange={(e) => setPasswords((p) => ({ ...p, current: e.target.value }))}
                  error={pwErrors.current}
                  required
                />
                <Input
                  label="New Password"
                  name="next"
                  type="password"
                  icon={Lock}
                  placeholder="Enter new password"
                  value={passwords.next}
                  onChange={(e) => setPasswords((p) => ({ ...p, next: e.target.value }))}
                  error={pwErrors.next}
                  required
                />
                <Input
                  label="Confirm New Password"
                  name="confirm"
                  type="password"
                  icon={Lock}
                  placeholder="Re-enter new password"
                  value={passwords.confirm}
                  onChange={(e) => setPasswords((p) => ({ ...p, confirm: e.target.value }))}
                  error={pwErrors.confirm}
                  required
                />
                <div className="flex justify-end">
                  <Button type="submit" loading={savingPw}>
                    {!savingPw && <KeyRound className="h-4 w-4" />}
                    Update Password
                  </Button>
                </div>
              </form>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
