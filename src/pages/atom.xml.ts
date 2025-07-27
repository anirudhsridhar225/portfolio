import { generateAtom } from '@/utils/feed'
import type { APIRoute } from 'astro'

export const GET: APIRoute = (context) => generateAtom(context)
