'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { authClient } from '@/lib/auth-client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { addGame, deleteGame, updateGame } from '@/app/actions/games'
import { 
  ArrowLeft, 
  LogOut, 
  Plus, 
  Trash2, 
  Edit2, 
  Gamepad2, 
  Server,
  X,
  Save,
  Link as LinkIcon,
  Image as ImageIcon
} from 'lucide-react'

type Game = {
  id: number
  name: string
  imageUrl: string
  gameLink: string
  category: string
  userId: string
  createdAt: Date
  updatedAt: Date
}

type AdminDashboardProps = {
  user: { id: string; name: string; email: string }
  condoGames: Game[]
  privateGames: Game[]
}

export function AdminDashboard({ user, condoGames, privateGames }: AdminDashboardProps) {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<'condo' | 'private'>('condo')
  const [showAddModal, setShowAddModal] = useState(false)
  const [editingGame, setEditingGame] = useState<Game | null>(null)
  const [loading, setLoading] = useState(false)

  // Form states
  const [gameName, setGameName] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [gameLink, setGameLink] = useState('')

  const games = activeTab === 'condo' ? condoGames : privateGames

  const handleSignOut = async () => {
    await authClient.signOut()
    router.push('/')
    router.refresh()
  }

  const resetForm = () => {
    setGameName('')
    setImageUrl('')
    setGameLink('')
    setEditingGame(null)
  }

  const handleAddGame = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    try {
      await addGame({
        name: gameName,
        imageUrl,
        gameLink,
        category: activeTab,
      })
      resetForm()
      setShowAddModal(false)
      router.refresh()
    } catch (error) {
      console.error('Erro ao adicionar jogo:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleUpdateGame = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingGame) return
    
    setLoading(true)
    
    try {
      await updateGame(editingGame.id, {
        name: gameName,
        imageUrl,
        gameLink,
      })
      resetForm()
      router.refresh()
    } catch (error) {
      console.error('Erro ao atualizar jogo:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteGame = async (id: number) => {
    if (!confirm('Tem certeza que deseja excluir este jogo?')) return
    
    try {
      await deleteGame(id)
      router.refresh()
    } catch (error) {
      console.error('Erro ao excluir jogo:', error)
    }
  }

  const startEdit = (game: Game) => {
    setEditingGame(game)
    setGameName(game.name)
    setImageUrl(game.imageUrl)
    setGameLink(game.gameLink)
  }

  return (
    <main className="min-h-screen bg-background px-4 py-8 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(239,68,68,0.1)_0%,transparent_70%)]" />
      
      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="p-2 rounded-lg border border-primary/30 hover:border-primary/60 hover:bg-primary/10 transition-all"
            >
              <ArrowLeft className="w-5 h-5 text-primary" />
            </Link>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-foreground neon-text font-[family-name:var(--font-orbitron)]">
                PAINEL ADMIN
              </h1>
              <p className="text-muted-foreground text-sm">
                Bem-vindo, {user.name}
              </p>
            </div>
          </div>
          
          <Button
            onClick={handleSignOut}
            variant="outline"
            className="border-primary/30 hover:border-primary/60 hover:bg-primary/10 text-foreground"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Sair
          </Button>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setActiveTab('condo')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
              activeTab === 'condo'
                ? 'bg-primary text-primary-foreground neon-button'
                : 'bg-card border border-primary/30 text-foreground hover:border-primary/60'
            }`}
          >
            <Gamepad2 className="w-4 h-4" />
            Games Condo
          </button>
          <button
            onClick={() => setActiveTab('private')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
              activeTab === 'private'
                ? 'bg-primary text-primary-foreground neon-button'
                : 'bg-card border border-primary/30 text-foreground hover:border-primary/60'
            }`}
          >
            <Server className="w-4 h-4" />
            Servidor Privado
          </button>
        </div>

        {/* Add button */}
        <Button
          onClick={() => setShowAddModal(true)}
          className="mb-6 neon-button bg-primary hover:bg-primary/90 text-primary-foreground"
        >
          <Plus className="w-4 h-4 mr-2" />
          Adicionar {activeTab === 'condo' ? 'Jogo' : 'Servidor'}
        </Button>

        {/* Games list */}
        {games.length === 0 ? (
          <div className="neon-card rounded-xl p-12 text-center">
            {activeTab === 'condo' ? (
              <Gamepad2 className="w-16 h-16 text-primary/50 mx-auto mb-4" />
            ) : (
              <Server className="w-16 h-16 text-primary/50 mx-auto mb-4" />
            )}
            <h2 className="text-xl font-semibold text-foreground mb-2">
              Nenhum {activeTab === 'condo' ? 'jogo' : 'servidor'} cadastrado
            </h2>
            <p className="text-muted-foreground">
              Clique em &quot;Adicionar&quot; para comecar
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {games.map((game) => (
              <div key={game.id} className="neon-card rounded-xl overflow-hidden">
                <div className="aspect-video relative bg-card">
                  <img
                    src={game.imageUrl}
                    alt={game.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-foreground mb-2">{game.name}</h3>
                  <p className="text-muted-foreground text-sm truncate mb-3">
                    {game.gameLink}
                  </p>
                  <div className="flex gap-2">
                    <Button
                      onClick={() => startEdit(game)}
                      variant="outline"
                      size="sm"
                      className="flex-1 border-primary/30 hover:border-primary/60 hover:bg-primary/10 text-foreground"
                    >
                      <Edit2 className="w-4 h-4 mr-1" />
                      Editar
                    </Button>
                    <Button
                      onClick={() => handleDeleteGame(game.id)}
                      variant="outline"
                      size="sm"
                      className="border-destructive/30 hover:border-destructive/60 hover:bg-destructive/10 text-destructive"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="neon-card rounded-xl p-6 w-full max-w-md relative">
            <button
              onClick={() => {
                setShowAddModal(false)
                resetForm()
              }}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"
            >
              <X className="w-5 h-5" />
            </button>
            
            <h2 className="text-xl font-bold text-foreground mb-6 font-[family-name:var(--font-orbitron)]">
              Adicionar {activeTab === 'condo' ? 'Jogo' : 'Servidor'}
            </h2>
            
            <form onSubmit={handleAddGame} className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <Label htmlFor="name" className="text-foreground">Nome</Label>
                <Input
                  id="name"
                  value={gameName}
                  onChange={(e) => setGameName(e.target.value)}
                  required
                  className="bg-card border-primary/30 focus:border-primary text-foreground"
                  placeholder="Nome do jogo"
                />
              </div>
              
              <div className="flex flex-col gap-2">
                <Label htmlFor="imageUrl" className="text-foreground">
                  <span className="flex items-center gap-2">
                    <ImageIcon className="w-4 h-4" />
                    URL da Imagem
                  </span>
                </Label>
                <Input
                  id="imageUrl"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  required
                  className="bg-card border-primary/30 focus:border-primary text-foreground"
                  placeholder="https://exemplo.com/imagem.jpg"
                />
              </div>
              
              <div className="flex flex-col gap-2">
                <Label htmlFor="gameLink" className="text-foreground">
                  <span className="flex items-center gap-2">
                    <LinkIcon className="w-4 h-4" />
                    Link do Jogo
                  </span>
                </Label>
                <Input
                  id="gameLink"
                  value={gameLink}
                  onChange={(e) => setGameLink(e.target.value)}
                  required
                  className="bg-card border-primary/30 focus:border-primary text-foreground"
                  placeholder="https://exemplo.com/jogo"
                />
              </div>
              
              <Button
                type="submit"
                disabled={loading}
                className="w-full neon-button bg-primary hover:bg-primary/90 text-primary-foreground mt-2"
              >
                {loading ? 'Salvando...' : 'Adicionar'}
              </Button>
            </form>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {editingGame && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="neon-card rounded-xl p-6 w-full max-w-md relative">
            <button
              onClick={resetForm}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"
            >
              <X className="w-5 h-5" />
            </button>
            
            <h2 className="text-xl font-bold text-foreground mb-6 font-[family-name:var(--font-orbitron)]">
              Editar {editingGame.category === 'condo' ? 'Jogo' : 'Servidor'}
            </h2>
            
            <form onSubmit={handleUpdateGame} className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <Label htmlFor="edit-name" className="text-foreground">Nome</Label>
                <Input
                  id="edit-name"
                  value={gameName}
                  onChange={(e) => setGameName(e.target.value)}
                  required
                  className="bg-card border-primary/30 focus:border-primary text-foreground"
                />
              </div>
              
              <div className="flex flex-col gap-2">
                <Label htmlFor="edit-imageUrl" className="text-foreground">
                  <span className="flex items-center gap-2">
                    <ImageIcon className="w-4 h-4" />
                    URL da Imagem
                  </span>
                </Label>
                <Input
                  id="edit-imageUrl"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  required
                  className="bg-card border-primary/30 focus:border-primary text-foreground"
                />
              </div>
              
              <div className="flex flex-col gap-2">
                <Label htmlFor="edit-gameLink" className="text-foreground">
                  <span className="flex items-center gap-2">
                    <LinkIcon className="w-4 h-4" />
                    Link do Jogo
                  </span>
                </Label>
                <Input
                  id="edit-gameLink"
                  value={gameLink}
                  onChange={(e) => setGameLink(e.target.value)}
                  required
                  className="bg-card border-primary/30 focus:border-primary text-foreground"
                />
              </div>
              
              <Button
                type="submit"
                disabled={loading}
                className="w-full neon-button bg-primary hover:bg-primary/90 text-primary-foreground mt-2"
              >
                <Save className="w-4 h-4 mr-2" />
                {loading ? 'Salvando...' : 'Salvar alteracoes'}
              </Button>
            </form>
          </div>
        </div>
      )}

      {/* Corner decorations */}
      <div className="absolute top-8 left-8 w-12 h-12 border-l-2 border-t-2 border-primary/20" />
      <div className="absolute top-8 right-8 w-12 h-12 border-r-2 border-t-2 border-primary/20" />
    </main>
  )
}
