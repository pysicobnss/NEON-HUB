import Link from 'next/link'
import { Gamepad2, Server, Headphones, Zap } from 'lucide-react'

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background flex flex-col items-center justify-center px-4 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(239,68,68,0.15)_0%,transparent_70%)]" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      
      {/* Floating particles effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-primary rounded-full animate-pulse opacity-60" />
        <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-primary rounded-full animate-pulse opacity-40" />
        <div className="absolute top-1/2 right-1/3 w-1.5 h-1.5 bg-primary rounded-full animate-pulse opacity-50" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center gap-12 max-w-4xl w-full">
        {/* Logo/Title */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3 mb-2">
            <Zap className="w-10 h-10 text-primary neon-text" />
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-wider text-foreground neon-text font-[family-name:var(--font-orbitron)]">
            NEON HUB
          </h1>
          <p className="text-muted-foreground text-lg md:text-xl max-w-md mx-auto">
            O seu portal de jogos definitivo
          </p>
        </div>

        {/* Main buttons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-3xl">
          <Link
            href="/suporte"
            className="group neon-card rounded-xl p-8 flex flex-col items-center gap-4 hover:scale-105 transition-all duration-300"
          >
            <div className="p-4 rounded-full bg-primary/10 border border-primary/30 group-hover:border-primary/60 transition-colors">
              <Headphones className="w-10 h-10 text-primary" />
            </div>
            <span className="text-xl font-semibold text-foreground font-[family-name:var(--font-orbitron)]">
              SUPORTE
            </span>
            <span className="text-muted-foreground text-sm text-center">
              Precisa de ajuda? Estamos aqui
            </span>
          </Link>

          <Link
            href="/games-condo"
            className="group neon-card rounded-xl p-8 flex flex-col items-center gap-4 hover:scale-105 transition-all duration-300"
          >
            <div className="p-4 rounded-full bg-primary/10 border border-primary/30 group-hover:border-primary/60 transition-colors">
              <Gamepad2 className="w-10 h-10 text-primary" />
            </div>
            <span className="text-xl font-semibold text-foreground font-[family-name:var(--font-orbitron)]">
              GAMES CONDO
            </span>
            <span className="text-muted-foreground text-sm text-center">
              Explore nossa colecao de jogos
            </span>
          </Link>

          <Link
            href="/servidor-privado"
            className="group neon-card rounded-xl p-8 flex flex-col items-center gap-4 hover:scale-105 transition-all duration-300"
          >
            <div className="p-4 rounded-full bg-primary/10 border border-primary/30 group-hover:border-primary/60 transition-colors">
              <Server className="w-10 h-10 text-primary" />
            </div>
            <span className="text-xl font-semibold text-foreground font-[family-name:var(--font-orbitron)]">
              SERVIDOR PRIVADO
            </span>
            <span className="text-muted-foreground text-sm text-center">
              Acesse servidores exclusivos
            </span>
          </Link>
        </div>

        {/* Admin link */}
        <Link
          href="/admin"
          className="text-muted-foreground hover:text-primary text-sm transition-colors"
        >
          Area do Administrador
        </Link>
      </div>

      {/* Corner decorations */}
      <div className="absolute top-8 left-8 w-16 h-16 border-l-2 border-t-2 border-primary/30" />
      <div className="absolute top-8 right-8 w-16 h-16 border-r-2 border-t-2 border-primary/30" />
      <div className="absolute bottom-8 left-8 w-16 h-16 border-l-2 border-b-2 border-primary/30" />
      <div className="absolute bottom-8 right-8 w-16 h-16 border-r-2 border-b-2 border-primary/30" />
    </main>
  )
}
