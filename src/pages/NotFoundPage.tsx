import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useDocumentMeta } from '../lib/useDocumentMeta'
import logo from '../assets/Bugz_co_za_Updated_Logo.webp'

export function NotFoundPage() {
  useDocumentMeta({
    title: 'Page Not Found | BUGS',
    description: "The page you're looking for doesn't exist.",
    path: '/404',
    noindex: true,
  })

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-bugs-orange px-4 py-20 text-center">
      <motion.img
        initial={{ opacity: 0, y: -20, rotate: -4 }}
        animate={{ opacity: 1, y: 0, rotate: 0 }}
        transition={{ duration: 0.6, ease: 'backOut' }}
        src={logo}
        alt="BUGZ"
        className="w-full max-w-xs rounded-2xl border-4 border-bugs-black shadow-hard-lg sm:max-w-sm"
      />
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mt-10 font-display text-6xl text-bugs-black sm:text-7xl"
      >
        404
      </motion.p>
      <motion.h1
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mt-3 font-display text-2xl text-bugs-black sm:text-3xl"
      >
        This gate doesn&rsquo;t lead anywhere.
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mt-3 max-w-md font-body text-bugs-black/70"
      >
        The page you&rsquo;re looking for has moved or doesn&rsquo;t exist.
        Let&rsquo;s get you back on track.
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <Link
          to="/"
          className="mt-8 inline-flex items-center gap-2 rounded-full border-2 border-bugs-black bg-bugs-yellow px-8 py-4 font-display text-sm text-bugs-black shadow-hard transition-transform hover:scale-[1.03]"
        >
          Back to the BUGS homepage
        </Link>
      </motion.div>
    </div>
  )
}
