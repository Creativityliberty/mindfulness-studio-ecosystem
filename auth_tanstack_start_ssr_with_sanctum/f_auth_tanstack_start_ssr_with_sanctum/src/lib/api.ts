import axios from 'axios'

// Instance Axios pour Laravel API avec tokens Sanctum
export const api = axios.create({
  baseURL: process.env.LARAVEL_API_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})

/**
 * Crée une instance API avec le token Bearer pour les requêtes authentifiées
 */
export function createAuthenticatedApi(token: string) {
  return axios.create({
    baseURL: process.env.LARAVEL_API_URL,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
}
