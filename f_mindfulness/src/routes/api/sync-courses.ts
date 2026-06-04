import { createFileRoute } from '@tanstack/react-router'
import * as fs from 'fs'
import * as path from 'path'

const DB_PATH = path.join(process.cwd(), 'courses-db.json')

export const Route = createFileRoute('/api/sync-courses')({
  server: {
    handlers: {
      GET: async () => {
        try {
          if (fs.existsSync(DB_PATH)) {
            const data = fs.readFileSync(DB_PATH, 'utf-8')
            return new Response(data, {
              headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
              },
            })
          }
        } catch (e) {
          console.error('Error reading courses db:', e)
        }
        return new Response(JSON.stringify([]), {
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        })
      },
      POST: async ({ request }) => {
        try {
          const body = await request.json()
          fs.writeFileSync(DB_PATH, JSON.stringify(body, null, 2))
          return new Response(JSON.stringify({ success: true }), {
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Headers': '*',
              'Access-Control-Allow-Methods': '*',
            },
          })
        } catch (e) {
          return new Response(JSON.stringify({ error: String(e) }), {
            status: 500,
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*',
            },
          })
        }
      },
      OPTIONS: async () => {
        return new Response(null, {
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': '*',
            'Access-Control-Allow-Methods': '*',
          },
        })
      }
    }
  }
})
