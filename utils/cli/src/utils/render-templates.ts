import fs from 'fs'
import path from 'path'
import Handlebars from 'handlebars'
import { getAllFiles } from './get-all-files.js'

export function renderAllTemplates(
  templateRoot: string,
  targetRoot: string,
  context: Record<string, unknown>
) {
  const files = getAllFiles(templateRoot)

  for (const file of files) {
    const relativePath = path.relative(templateRoot, file)
    const outputPath = path.join(targetRoot, relativePath.replace(/\.hbs$/, ''))

    // Ensure subfolder exists
    fs.mkdirSync(path.dirname(outputPath), { recursive: true })

    // Compile & write
    const templateContent = fs.readFileSync(file, 'utf-8')
    const template = Handlebars.compile(templateContent)
    const result = template(context)

    fs.writeFileSync(outputPath, result)
    console.log(`📄 Created: ${outputPath}`)
  }
}
