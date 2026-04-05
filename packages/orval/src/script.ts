import { Executable } from '@clscripts/cl-common'

export interface OrvalOpts {
  input?: string
  output?: string
  config?: string
  project?: string | string[]
  watch?: boolean | string
  clean?: boolean | string
  prettier?: boolean
  biome?: boolean
  tsconfig?: string
  verbose?: boolean
}
export class Orval implements Executable {
  packageExecutable = 'orval'
  input?: string
  output?: string
  config?: string
  project?: string | string[]
  watch?: boolean | string
  clean?: boolean | string
  prettier?: boolean
  biome?: boolean
  tsconfig?: string
  verbose?: boolean

  constructor(opts: OrvalOpts) {
    this.input = opts.input
    this.output = opts.output
    this.config = opts.config
    this.project = opts.project
    this.watch = opts.watch
    this.clean = opts.clean
    this.prettier = opts.prettier
    this.biome = opts.biome
    this.tsconfig = opts.tsconfig
    this.verbose = opts.verbose
  }

  get command(): string {
    return [
      this.packageExecutable,
      this.inputArg,
      this.outputArg,
      this.configArg,
      this.projectArg,
      this.watchArg,
      this.cleanArg,
      this.prettierArg,
      this.biomeArg,
      this.tsconfigArg,
      this.verboseArg,
    ]
      .filter(Boolean)
      .join(' ')
  }

  get inputArg(): string {
    return this.input ? `--input ${this.input}` : ''
  }

  get outputArg(): string {
    return this.output ? `--output ${this.output}` : ''
  }

  get configArg(): string {
    return this.config ? `--config ${this.config}` : ''
  }

  get projectArg(): string {
    if (!this.project) return ''
    return Array.isArray(this.project)
      ? `--project ${this.project.filter(Boolean).join(' ')}`
      : `--project ${this.project}`
  }

  get watchArg(): string {
    if (!this.watch) return ''
    return typeof this.watch === 'string' ? `--watch ${this.watch}` : '--watch'
  }

  get cleanArg(): string {
    if (!this.clean) return ''
    return typeof this.clean === 'string' ? `--clean ${this.clean}` : '--clean'
  }

  get prettierArg(): string {
    return this.prettier ? '--prettier' : ''
  }

  get biomeArg(): string {
    return this.biome ? '--biome' : ''
  }

  get tsconfigArg(): string {
    return this.tsconfig ? `--tsconfig ${this.tsconfig}` : ''
  }

  get verboseArg(): string {
    return this.verbose ? '--verbose' : ''
  }
}
