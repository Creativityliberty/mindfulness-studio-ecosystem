import type { LoginCredentials, LoginResponse, User } from '@/types/user'

const MOCK_USERS: Record<string, User> = {
  'admin@test.com': {
    id: 1,
    name: 'Administrateur Demo',
    email: 'admin@test.com',
    email_verified_at: new Date().toISOString(),
    role: 'admin',
    permissions: ['post.create', 'post.read', 'post.update', 'post.delete'],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  'client@test.com': {
    id: 2,
    name: 'Client Demo',
    email: 'client@test.com',
    email_verified_at: new Date().toISOString(),
    role: 'client',
    permissions: ['post.read'],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  'instructor@test.com': {
    id: 3,
    name: 'Instructeur Demo',
    email: 'instructor@test.com',
    email_verified_at: new Date().toISOString(),
    role: 'instructor',
    permissions: ['post.read'],
    status: 'approuve',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
}

class AuthService {
  private getRegisteredUsers(): Record<string, User> {
    const data = localStorage.getItem('mock_registered_users')
    return data ? JSON.parse(data) : {}
  }

  private saveRegisteredUsers(users: Record<string, User>) {
    localStorage.setItem('mock_registered_users', JSON.stringify(users))
  }

  async getCsrfCookie(): Promise<void> {
    console.log('🔐 Mock CSRF Cookie obtained')
    return Promise.resolve()
  }

  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    console.log('🔑 Attempting mock login for:', credentials.email)
    
    // Simulate slight network delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    const emailKey = credentials.email.toLowerCase().trim()
    let user = MOCK_USERS[emailKey]

    if (!user) {
      const regUsers = this.getRegisteredUsers()
      user = regUsers[emailKey]
    }

    if (user && credentials.password === 'password') {
      if (user.status === 'suspendu') {
        const error: any = new Error('Votre compte formateur a été suspendu par l\'administrateur.')
        error.errors = { email: ['Compte suspendu'] }
        throw error
      }

      console.log('✅ Mock Login successful:', {
        user: user.email,
        role: user.role,
        status: user.status,
      })
      localStorage.setItem('mock_user', JSON.stringify(user))
      return {
        two_factor: false,
        user,
      }
    }

    const error: any = new Error('Identifiants incorrects (admin@test.com / client@test.com / instructor@test.com avec le mot de passe "password")')
    error.errors = {
      email: ['Email ou mot de passe incorrect'],
    }
    throw error
  }

  async logout(): Promise<void> {
    console.log('🚪 Mock Logging out...')
    await new Promise((resolve) => setTimeout(resolve, 300))
    localStorage.removeItem('mock_user')
    console.log('✅ Mock Logout successful')
  }

  async getCurrentUser(): Promise<User> {
    const userStr = localStorage.getItem('mock_user')
    if (!userStr) {
      throw new Error('Unauthenticated')
    }
    const user = JSON.parse(userStr)
    // Synchronize status/attributes if changed in database/localStorage
    if (user.role === 'instructor') {
      const regUsers = this.getRegisteredUsers()
      const updatedUser = regUsers[user.email.toLowerCase().trim()]
      if (updatedUser) {
        return updatedUser
      }
    }
    return user
  }

  // Register an instructor candidates
  async registerInstructor(data: {
    name: string
    email: string
    speciality: string
    presentation: string
  }): Promise<User> {
    const emailKey = data.email.toLowerCase().trim()
    const regUsers = this.getRegisteredUsers()

    const newUser: User = {
      id: Math.floor(Math.random() * 1000) + 10,
      name: data.name,
      email: data.email,
      email_verified_at: new Date().toISOString(),
      role: 'instructor',
      permissions: ['post.read'],
      status: 'en_attente',
      speciality: data.speciality,
      presentation: data.presentation,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }

    regUsers[emailKey] = newUser
    this.saveRegisteredUsers(regUsers)
    return newUser
  }

  // Get all instructors (both preset mock and registered)
  async getInstructors(): Promise<User[]> {
    const regUsers = Object.values(this.getRegisteredUsers())
    const defaultInstructors = Object.values(MOCK_USERS).filter(u => u.role === 'instructor')
    
    // Merge them together ensuring uniqueness
    const all = [...defaultInstructors]
    for (const u of regUsers) {
      if (!all.some(existing => existing.email.toLowerCase() === u.email.toLowerCase())) {
        all.push(u)
      }
    }
    return all
  }

  // Update status for moderation
  async updateInstructorStatus(email: string, status: 'en_attente' | 'approuve' | 'suspendu'): Promise<void> {
    const emailKey = email.toLowerCase().trim()
    const regUsers = this.getRegisteredUsers()
    
    if (regUsers[emailKey]) {
      regUsers[emailKey].status = status
      regUsers[emailKey].updated_at = new Date().toISOString()
      this.saveRegisteredUsers(regUsers)
      
      // If the current logged-in user is this instructor, sync their localStorage session
      const currentUserStr = localStorage.getItem('mock_user')
      if (currentUserStr) {
        const currentUser = JSON.parse(currentUserStr) as User
        if (currentUser.email.toLowerCase().trim() === emailKey) {
          currentUser.status = status
          localStorage.setItem('mock_user', JSON.stringify(currentUser))
        }
      }
    } else {
      // It might be a default instructor that wasn't in localStorage yet
      const defaultUser = MOCK_USERS[emailKey]
      if (defaultUser) {
        const cloned = { ...defaultUser, status }
        regUsers[emailKey] = cloned
        this.saveRegisteredUsers(regUsers)
      }
    }
  }

  // Delete dynamic instructor registration
  async deleteInstructor(email: string): Promise<void> {
    const emailKey = email.toLowerCase().trim()
    const regUsers = this.getRegisteredUsers()
    
    if (regUsers[emailKey]) {
      delete regUsers[emailKey]
      this.saveRegisteredUsers(regUsers)
      
      // If the current logged-in user is this deleted instructor, clear session
      const currentUserStr = localStorage.getItem('mock_user')
      if (currentUserStr) {
        const currentUser = JSON.parse(currentUserStr) as User
        if (currentUser.email.toLowerCase().trim() === emailKey) {
          localStorage.removeItem('mock_user')
        }
      }
    }
  }
}

export const authService = new AuthService()
