import type { DetailedHTMLProps, HTMLAttributes } from 'react'

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      'dotlottie-wc': DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> & {
        src?: string
        segment?: string | [number, number]
        speed?: number | string
        renderConfig?: {
          autoResize?: boolean
          devicePixelRatio?: number
        }
      }
    }
  }
}
