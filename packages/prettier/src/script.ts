import { Executable } from '@clscripts/cl-common'

export interface PrettierOpts {
  files: string[]
  ignore?: string[]
  noErrorOnUnmatchedPattern?: boolean
}
export class Prettier implements Executable {
  packageExecutable = 'prettier'
  files: string[]
  ignore?: string[]
  noErrorOnUnmatchedPattern: boolean
  constructor(opts: PrettierOpts) {
    this.files = opts.files
    this.ignore = opts.ignore
    this.noErrorOnUnmatchedPattern = opts.noErrorOnUnmatchedPattern ?? true
  }
  get command() {
    return [this.packageExecutable, this.fileArg, this.ignoreArg, this.noErrorOnUnmatchedPatternArg]
      .filter(Boolean)
      .join(' ')
  }
  get fileArg() {
    return `--write ${this.files.join(' ')}`
  }
  get ignoreArg() {
    return this.ignore ? `${this.ignore.map((path) => `!${path}`).join(' ')}` : ''
  }
  get noErrorOnUnmatchedPatternArg() {
    return this.noErrorOnUnmatchedPattern ? `--no-error-on-unmatched-pattern` : ''
  }
}
