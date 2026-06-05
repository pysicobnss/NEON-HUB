import Link from 'next/link'
import { ArrowLeft, ExternalLink, Gamepad2 } from 'lucide-react'
import { getGames } from '@/app/actions/games'

export default async function GamesCondoPage() {
  const games = await getGames('condo')

  return (
    <main className="min-h-screen bg-background px-4 py-8 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(239,68,68,0.1)_0%,transparent_70%)]" />
      
      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link
            href="/"
            className="p-2 rounded-lg border border-primary/30 hover:border-primary/60 hover:bg-primary/10 transition-all"
          >
            <ArrowLeft className="w-5 h-5 text-primary" />
          </Link>
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground neon-text font-[family-name:var(--font-orbitron)]">
              GAMES CONDO
            </h1>
            <p className="text-muted-foreground mt-1">
              Explore nossa colecao de jogos
            </p>
          </div>
        </div>

        {/* Games grid */}
        {games.length === 0 ? (
          <div className="neon-card rounded-xl p-12 text-center">
            <Gamepad2 className="w-16 h-16 text-primary/50 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-foreground mb-2">
              Nenhum jogo disponivel
            </h2>
            <p className="text-muted-foreground">
              Os jogos serao adicionados em breve!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {games.map((game) => (
              <a
                key={game.id}
                href={game.gameLink}
                target="_blank"
                rel="noopener noreferrer"
                className="group neon-card rounded-xl overflow-hidden hover:scale-105 transition-all duration-300"
              >
                <div className="aspect-video relative bg-card overflow-hidden">
                  <img
                    src={game.imageUrl}
                    alt={game.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-4">
                    <span className="flex items-center gap-2 text-foreground font-medium">
                      <ExternalLink className="w-4 h-4" />
                      Abrir Jogo
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                    {game.name}
                  </h3>
                </div>
              </a>
            ))}
          </div>
        )}
      </div>

      {/* Corner decorations */}
      <div className="absolute top-8 left-8 w-12 h-12 border-l-2 border-t-2 border-primary/20" />
      <div className="absolute top-8 right-8 w-12 h-12 border-r-2 border-t-2 border-primary/20" />
    </main>
  )
}
