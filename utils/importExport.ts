import { Board } from '@/types/board'

export function exportToJson(boards: Board[]): string {
  return JSON.stringify(boards, null, 2)
}

export function importFromJson(jsonString: string): Board[] {
  try {
    const importedBoards = JSON.parse(jsonString) as Board[]
    return importedBoards.map(board => ({
      ...board,
      id: board.id || crypto.randomUUID(),
      createdAt: board.createdAt || Date.now(),
      links: board.links.map(link => ({
        ...link,
        id: link.id || crypto.randomUUID(),
        createdAt: link.createdAt || Date.now(),
        visited: link.visited || false,
      })),
    }))
  } catch (error) {
    console.error('Error parsing imported JSON:', error)
    throw new Error('Invalid JSON format')
  }
}

