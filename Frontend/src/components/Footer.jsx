import { Link } from 'react-router-dom'
import { Twitter, Github, Linkedin } from 'lucide-react'
import Logo from './Logo'

const sections = [
  {
    title: 'Product',
    links: [
      { label: 'Features', to: '/#features' },
      { label: 'Quizzes', to: '/quizzes' },
      { label: 'Dashboard', to: '/dashboard' },
      { label: 'Pricing', to: '/#pricing' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', to: '/' },
      { label: 'Blog', to: '/' },
      { label: 'Careers', to: '/' },
      { label: 'Contact', to: '/' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy', to: '/' },
      { label: 'Terms', to: '/' },
      { label: 'Security', to: '/' },
      { label: 'Cookies', to: '/' },
    ],
  },
]

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50/80">
      <div className="section-container py-12">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-5">
          <div className="col-span-2">
            <Logo />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-slate-500">
              The modern quiz platform for learners and teams. Practice smarter, track progress, and
              master any subject.
            </p>
            <div className="mt-5 flex items-center gap-3">
              {[Twitter, Github, Linkedin].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 transition-all hover:border-brand-200 hover:bg-brand-50 hover:text-brand-600"
                  aria-label="Social link"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {sections.map((sec) => (
            <div key={sec.title}>
              <h4 className="text-sm font-semibold text-slate-900">{sec.title}</h4>
              <ul className="mt-4 space-y-2.5">
                {sec.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      className="text-sm text-slate-500 transition-colors hover:text-brand-600"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-slate-200 pt-6 sm:flex-row">
          <p className="text-xs text-slate-400">
            &copy; {new Date().getFullYear()} QuizFlow. All rights reserved.
          </p>
          <p className="text-xs text-slate-400">Crafted with care for modern learners.</p>
        </div>
      </div>
    </footer>
  )
}
