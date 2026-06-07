import React from 'react'
import { Button, buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { MenuToggleIcon } from '@/components/menu-toggle-icon'
import { useScroll } from '@/components/use-scroll'
import { ModeToggle } from './mode-toggle'
import logoTypo from '../assets/logo-typo.png'
import { Link } from '@tanstack/react-router'
import { ENV } from '@/config/env'

export function HeaderVitrine() {
  const [open, setOpen] = React.useState(false)
  const scrolled = useScroll(10)

  const links = [
    {
      label: 'Nos Formations',
      href: `${ENV.VITRINE_URL}/formations`,
      external: true,
    },
  ]

  React.useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <header
      className={cn(
        'z-50 mx-auto w-full transition-all ease-out duration-300',
        open
          ? 'fixed top-0 left-0 right-0 bg-slate-950/90 backdrop-blur-lg'
          : scrolled
            ? 'sticky top-4 max-w-4xl border border-white/10 rounded-2xl bg-slate-950/80 backdrop-blur-lg shadow-xl shadow-indigo-950/20'
            : 'relative top-0 w-full border-b border-white/5 bg-slate-950/50 backdrop-blur-sm',
        scrolled && 'sticky top-4 max-w-4xl border border-white/10 rounded-2xl bg-slate-950/80 backdrop-blur-lg shadow-xl'
      )}
    >
      <nav
        className={cn(
          'flex h-14 w-full items-center justify-between px-6 transition-all duration-300',
          {
            'h-12': scrolled,
          },
        )}
      >
        <a href={`${ENV.VITRINE_URL}/`} className="flex items-center">
          <img src={logoTypo} alt="Mindfulness Studio" className="h-10 pt-1 filter brightness-110" />
        </a>
        <div className="hidden items-center gap-2 md:flex ">
          {links.map((link, i) => (
            <a
              key={i}
              className={buttonVariants({ variant: 'link', className: 'text-slate-300 hover:text-white' })}
              href={link.href}
            >
              {link.label}
            </a>
          ))}
          <Link to="/register">
            <Button variant="outline" className="border-white/10 text-white bg-white/5 hover:bg-white/10 rounded-xl">
              S'inscrire
            </Button>
          </Link>
          <Link to="/login">
            <Button className="bg-indigo-500 hover:bg-indigo-600 text-white rounded-xl">
              Se connecter
            </Button>
          </Link>
          <ModeToggle />
        </div>
        <Button
          size="icon"
          variant="outline"
          onClick={() => setOpen(!open)}
          className="md:hidden border-white/10 text-white bg-white/5 hover:bg-white/10"
        >
          <MenuToggleIcon open={open} className="size-5" duration={300} />
        </Button>
      </nav>

      <div
        className={cn(
          'bg-slate-950/95 fixed top-14 right-0 bottom-0 left-0 z-50 flex flex-col overflow-hidden border-y border-white/5 md:hidden',
          open ? 'block' : 'hidden',
        )}
      >
        <div
          data-slot={open ? 'open' : 'closed'}
          className={cn(
            'data-[slot=open]:animate-in data-[slot=open]:zoom-in-95 data-[slot=closed]:animate-out data-[slot=closed]:zoom-out-95 ease-out',
            'flex h-full w-full flex-col justify-between gap-y-2 p-4',
          )}
        >
          <div className="grid gap-y-2">
            {links.map((link) => (
              <a
                key={link.label}
                className={buttonVariants({
                  variant: 'ghost',
                  className: 'justify-start text-slate-300 hover:text-white hover:bg-white/5',
                })}
                href={link.href}
              >
                {link.label}
              </a>
            ))}
          </div>
          <div className="flex flex-col gap-2">
            <Link to="/login" className="w-full" onClick={() => setOpen(false)}>
              <Button variant="outline" className="w-full border-white/10 text-white bg-white/5 rounded-xl">
                Se connecter
              </Button>
            </Link>
            <Link to="/register" className="w-full" onClick={() => setOpen(false)}>
              <Button className="w-full bg-indigo-500 hover:bg-indigo-600 text-white rounded-xl">
                S'inscrire
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
