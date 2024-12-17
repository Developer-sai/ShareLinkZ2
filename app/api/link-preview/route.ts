import { NextResponse } from 'next/server'
import { JSDOM } from 'jsdom'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const url = searchParams.get('url')

  if (!url) {
    return NextResponse.json({ error: 'URL is required' }, { status: 400 })
  }

  try {
    const response = await fetch(url)
    const html = await response.text()
    const dom = new JSDOM(html)
    const document = dom.window.document

    const title = document.querySelector('title')?.textContent || ''
    const description = document.querySelector('meta[name="description"]')?.getAttribute('content') || ''
    const image = document.querySelector('meta[property="og:image"]')?.getAttribute('content') || ''

    return NextResponse.json({ title, description, image })
  } catch (error) {
    console.error('Error fetching link preview:', error)
    return NextResponse.json({ error: 'Failed to fetch link preview' }, { status: 500 })
  }
}

