import { Executable } from '@clscripts/cl-common'

export interface DelCliOpts {
  files: string[]
}
export class DelCli implements Executable {
  packageExecutable = 'del'
  files: string[]
  constructor(opts: DelCliOpts) {
    this.files = opts.files
  }
  get command() {
    return [this.packageExecutable, this.filesArg].filter(Boolean).join(' ')
  }
  get filesArg() {
    return this.files
  }
}
