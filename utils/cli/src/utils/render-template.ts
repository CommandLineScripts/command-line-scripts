import fs from 'fs'
import path from 'path'
import Handlebars from 'handlebars'

export function renderTemplate(
  templateFile: string,
  templateRoot: string,
  targetRoot: string,
  context: Record<string, string | number>
) {
  const templatePath = path.join(templateRoot, templateFile)
  const outputPath = path.join(targetRoot, templateFile.replace('.hbs', ''))

  const templateContent = fs.readFileSync(templatePath, 'utf-8')
  const template = Handlebars.compile(templateContent)

  const result = template(context)

  fs.writeFileSync(outputPath, result)
}
