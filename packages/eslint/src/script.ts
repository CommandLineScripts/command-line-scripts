import { Executable } from '@clscripts/cl-common'

export interface EslintOpts {
  scanPath: string
  fix?: boolean
  ext?: string[]
  ignorePatterns?: string[]
}
export class Eslint implements Executable {
  packageExecutable = 'eslint'
  scanPath: string
  fix?: boolean
  ext?: string[]
  ignorePatterns?: string[]
  constructor(opts: EslintOpts) {
    this.scanPath = opts.scanPath
    this.fix = opts.fix
    this.ext = opts.ext
    this.ignorePatterns = opts.ignorePatterns
  }
  get command() {
    return [
      this.packageExecutable,
      this.scanPathArg,
      this.extArgs,
      this.fixArg,
      this.ignorePatternsArgs,
    ]
      .filter(Boolean)
      .join(' ')
  }
  get extArgs() {
    if (!this.ext) return ''
    else this.ext.map((ext) => `--ext ${ext}`).join(' ')
  }
  get fixArg() {
    return this.fix ? '--fix' : ''
  }
  get scanPathArg() {
    return this.scanPath
  }
  get ignorePatternsArgs() {
    return this.ignorePatterns?.map((item) => `--ignore-pattern ${item}`).join(' ') || ''
  }
}
