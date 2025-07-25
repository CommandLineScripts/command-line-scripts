import { Executable } from '@clscripts/cl-common'

export interface TsxOpts {
  watch?: boolean
  entryFile: string
}
export class Tsx implements Executable {
  packageExecutable = 'tsx'
  watch?: boolean
  entryFile: string
  constructor(opts: TsxOpts) {
    this.watch = opts.watch
    this.entryFile = opts.entryFile
  }
  get command() {
    return [this.packageExecutable, this.entryFileArg, this.watchArg].filter(Boolean).join(' ')
  }
  get entryFileArg() {
    return this.entryFile
  }
  get watchArg() {
    return this.watch ? '--watch' : ''
  }
}
