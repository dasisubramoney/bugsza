import type { SVGProps } from 'react'

export function FacebookIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M14 13.5h2.5l.5-3H14V8.5c0-.8.25-1.5 1.5-1.5H17V4.35A19 19 0 0 0 14.75 4.2C12.4 4.2 10.75 5.6 10.75 8.2v2.3H8.25v3h2.5V20h3.25v-6.5Z" />
    </svg>
  )
}

export function InstagramIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} {...props}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
    </svg>
  )
}

export function WhatsAppIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 3.5a8.4 8.4 0 0 0-7.2 12.7L3.5 20.5l4.4-1.3A8.4 8.4 0 1 0 12 3.5Zm4.9 12a5.6 5.6 0 0 1-7.9-7.9l.3-.3 1.7.5.4 1.5c-.3.6-.2 1.3.2 1.9.8 1.1 1.9 1.9 3.2 2.3.6.2 1.3 0 1.8-.4l1.4.6-.3 1.7Z" />
    </svg>
  )
}
