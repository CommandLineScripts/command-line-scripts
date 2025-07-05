import fs from 'fs'
import path from 'path'

/** Helper: recursively find all files */
export function getAllFiles(dir: string): string[] {
  let results: string[] = []
  const list = fs.readdirSync(dir)

  list.forEach((file) => {
    const filePath = path.join(dir, file)
    const stat = fs.statSync(filePath)
    if (stat && stat.isDirectory()) {
      results = results.concat(getAllFiles(filePath))
    } else {
      results.push(filePath)
    }
  })

  return results
}
