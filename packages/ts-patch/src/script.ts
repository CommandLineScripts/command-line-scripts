import { Executable } from '@clscripts/cl-common'

export interface TsPatchOpts {
  tsconfigPath?: string
  watch?: boolean
  noEmit?: boolean
  preserveWatchOutput?: boolean
}
export class TsPatch implements Executable {
  packageExecutable = 'tspc'
  tsconfigPath?: string
  watch?: boolean
  noEmit?: boolean
  preserveWatchOutput?: boolean
  constructor(opts: TsPatchOpts = {}) {
    this.tsconfigPath = opts.tsconfigPath
    this.watch = opts.watch
    this.noEmit = opts.noEmit
    this.preserveWatchOutput = opts.preserveWatchOutput
  }
  get tsconfigPathArg() {
    return this.tsconfigPath ? `-p ${this.tsconfigPath}` : ''
  }
  get watchArg() {
    return this.watch ? `--watch` : ''
  }
  get noEmitArg() {
    return this.noEmit ? `--noEmit` : ''
  }
  get preserveWatchOutputArg() {
    return this.preserveWatchOutput ? '--preserveWatchOutput' : ''
  }
  get command() {
    return [
      this.packageExecutable,
      this.tsconfigPathArg,
      this.watchArg,
      this.noEmitArg,
      this.preserveWatchOutputArg,
    ]
      .filter(Boolean)
      .join(' ')
  }
}
