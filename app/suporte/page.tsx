import Link from 'next/link'
import { ArrowLeft, Headphones, MessageCircle, Mail } from 'lucide-react'

export default function SuportePage() {
  return (
    <main className="min-h-screen bg-background px-4 py-8 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(239,68,68,0.1)_0%,transparent_70%)]" />
      
      <div className="relative z-10 max-w-4xl mx-auto">
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
              SUPORTE
            </h1>
            <p className="text-muted-foreground mt-1">
              Estamos aqui para ajudar
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="grid gap-6">
          {/* Contact options */}
          <div className="neon-card rounded-xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <Headphones className="w-8 h-8 text-primary" />
              <h2 className="text-2xl font-bold text-foreground font-[family-name:var(--font-orbitron)]">
                Entre em Contato
              </h2>
            </div>
            
            <div className="grid gap-4">
              <div className="flex items-center gap-4 p-4 rounded-lg bg-card/50 border border-primary/20">
                <MessageCircle className="w-6 h-6 text-primary" />
                <div>
                  <h3 className="font-semibold text-foreground">Discord</h3>
                  <p className="text-muted-foreground text-sm">
                    Junte-se ao nosso servidor para suporte rapido
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-4 p-4 rounded-lg bg-card/50 border border-primary/20">
                <Mail className="w-6 h-6 text-primary" />
                <div>
                  <h3 className="font-semibold text-foreground">Email</h3>
                  <p className="text-muted-foreground text-sm">
                    suporte@neonhub.com
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ */}
          <div className="neon-card rounded-xl p-8">
            <h2 className="text-2xl font-bold text-foreground mb-6 font-[family-name:var(--font-orbitron)]">
              Perguntas Frequentes
            </h2>
            
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-card/50 border border-primary/20">
                <h3 className="font-semibold text-foreground mb-2">
                  Como posso acessar os jogos?
                </h3>
                <p className="text-muted-foreground text-sm">
                  Basta clicar no botao Games Condo ou Servidor Privado na pagina inicial e escolher o jogo desejado.
                </p>
              </div>
              
              <div className="p-4 rounded-lg bg-card/50 border border-primary/20">
                <h3 className="font-semibold text-foreground mb-2">
                  Os jogos sao seguros?
                </h3>
                <p className="text-muted-foreground text-sm">
                  Todos os links sao verificados pela nossa equipe antes de serem adicionados ao site.
                </p>
              </div>
              
              <div className="p-4 rounded-lg bg-card/50 border border-primary/20">
                <h3 className="font-semibold text-foreground mb-2">
                  Como reportar um problema?
                </h3>
                <p className="text-muted-foreground text-sm">
                  Entre em contato conosco pelo Discord ou email informando o problema detalhadamente.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Corner decorations */}
      <div className="absolute top-8 left-8 w-12 h-12 border-l-2 border-t-2 border-primary/20" />
      <div className="absolute top-8 right-8 w-12 h-12 border-r-2 border-t-2 border-primary/20" />
    </main>
  )
}
