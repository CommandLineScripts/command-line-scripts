import path from 'path'
import fs from 'fs/promises'
import { to } from 'await-to-js'
import { getGlobals } from 'common-es'
import { input } from '@inquirer/prompts'
import { renderAllTemplates } from '@/utils/render-templates.js'

const { __dirname } = getGlobals(import.meta.url)

export class NewPackagePrompt {
  public packageName: string
  public packageDescription: string
  public monorepoRoot: string
  public templateRoot: string
  public targetDir: string
  async prompt() {
    const packageName = await input({ message: 'Package Name' })
    const packageDescription = await input({ message: 'Package Description' })
    this.packageName = packageName
    this.packageDescription = packageDescription
    return { packageName, packageDescription }
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
    })
  }
}
