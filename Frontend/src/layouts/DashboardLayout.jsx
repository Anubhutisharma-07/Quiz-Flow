import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import TopNav from '../components/TopNav'

const titleMap = {
  '/dashboard': 'Dashboard',
  '/quizzes': 'Browse Quizzes',
  '/profile': 'My Profile',
}

export default function DashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const location = useLocation()
  const title = titleMap[location.pathname] || 'QuizFlow'

  return (
    <div className="min-h-screen bg-gradient-brand-soft">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="lg:pl-72">
        <TopNav onMenuClick={() => setSidebarOpen(true)} title={title} />
        <main className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
          {children}
        </main>
      </div>
    </div>
  )
}
