/**
 * App routes — single source of truth for navigation.
 * Shared by the sidebar, topnav, and footer links.
 */
export const navItems = [
  { to: '/dashboard', label: 'Dashboard', icon: 'LayoutDashboard' },
  { to: '/quizzes', label: 'Quizzes', icon: 'ListChecks' },
  { to: '/profile', label: 'Profile', icon: 'UserRound' },
]

export const publicNav = [
  { to: '/', label: 'Home' },
  { to: '/quizzes', label: 'Quizzes' },
  { to: '/login', label: 'Sign in' },
]

export default { navItems, publicNav }
