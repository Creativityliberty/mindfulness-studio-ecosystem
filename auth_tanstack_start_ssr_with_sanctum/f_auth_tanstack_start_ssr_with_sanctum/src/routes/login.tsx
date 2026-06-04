import { createFileRoute } from '@tanstack/react-router'
import { useServerFn } from '@tanstack/react-start'
import { useState } from 'react'
import { loginFn } from 'server/auth'

export const Route = createFileRoute('/login')({
  component: LoginPage,
})

function LoginPage() {
  const login = useServerFn(loginFn)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      const result = await login({ data: { email, password } })

      // Si loginFn retourne une erreur (au lieu de redirect)
      if (result && 'error' in result) {
        setError(result.error)
      }
      // Sinon, redirect est géré automatiquement côté serverFn
    } catch (err: any) {
      setError(
        err?.response?.data?.message ??
          err?.message ??
          'Identifiants incorrects',
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ maxWidth: 400, margin: '100px auto' }}>
      <h1>Connexion</h1>

      <form onSubmit={handleSubmit}>
        {error && <div style={{ color: 'red', marginBottom: 12 }}>{error}</div>}

        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Mot de passe</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? 'Connexion…' : 'Se connecter'}
        </button>
      </form>
    </div>
  )
}
