import path from 'path'
import fs from 'fs/promises'
import { to } from 'await-to-js'
import { concat } from 'concat-str'
import { getGlobals } from 'common-es'
import { input } from '@inquirer/prompts'
import { parseKeywords } from '@/utils/parse-keywords.js'
import { renderAllTemplates } from '@/utils/render-templates.js'

const { __dirname } = getGlobals(import.meta.url)

export class NewPackagePrompt {
  public packageName: string
  public packageDescription: string
  public packageVersion: string
  public packageAuthor: string
  public packageExecutable: string
  public packageKeywords: string[]
  public monorepoRoot: string
  public templateRoot: string
  public targetDir: string

  async prompt() {
    const answers = {
      packageName: await input({
        message: 'Package Name',
        required: true,
        validate(val) {
          const packageNameRegex = /^[a-z0-9][a-z0-9-_.]*$/
          return packageNameRegex.test(val)
        },
      }),
      packageDescription: await input({
        message: 'Package Description (This will appear in package.json)',
      }),
      packageVersion: await input({
        message: concat(
          'Version (should match same current version of the command-line program',
          "you're scripting)"
        ),
      }),
      packageAuthor: await input({
        message: 'Your name',
      }),
      packageExecutable: await input({
        message: 'Package Executable (command you use to run the package)',
      }),
      packageKeywords: await input({
        message: 'Package Keywords (separated by commas ", ")',
      }),
    }

    this.packageName = answers.packageName.trim().toLowerCase()
    this.packageDescription = answers.packageDescription
    this.packageVersion = answers.packageVersion
    this.packageAuthor = answers.packageAuthor
    this.packageExecutable = answers.packageExecutable
    this.packageKeywords = parseKeywords(answers.packageKeywords)
    return answers
  }

  async makePackage() {
    this.monorepoRoot = path.resolve(__dirname, '../../../..')
    this.templateRoot = path.join(this.monorepoRoot, 'templates/package')
    this.targetDir = path.join(this.monorepoRoot, 'packages', this.packageName)

    const [errAccess] = await to(fs.access(this.targetDir))
    if (!errAccess) throw new Error(`❌ Package ${this.packageName} already exists.`)

    fs.mkdir(path.join(this.targetDir, 'src'), { recursive: true })
    renderAllTemplates(this.templateRoot, this.targetDir, {
      packageName: this.packageName,
      packageDescription: this.packageDescription,
      packageVersion: this.packageVersion,
      packageAuthor: this.packageAuthor,
      packageExecutable: this.packageExecutable,
      packageKeywords: this.packageKeywords,
    })
  }
}
