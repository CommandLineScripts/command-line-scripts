import { Executable } from '@clscripts/cl-common'

export interface NestjsCliOpts {
  watch?: boolean
  debug?: boolean
  mode: NestRunMode
}
export class NestjsCli implements Executable {
  packageExecutable = 'nest'
  watch?: boolean
  debug?: boolean
  mode: NestRunMode
  constructor(opts: NestjsCliOpts) {
    this.watch = opts.watch
    this.debug = opts.debug
    this.mode = opts.mode
  }
  get command() {
    return [this.packageExecutable, this.modeArg, this.watchArg, this.debugArg]
      .filter(Boolean)
      .join(' ')
  }
  get modeArg() {
    return this.mode
  }
  get watchArg() {
    return this.watch ? '--watch' : ''
  }
  get debugArg() {
    return this.debug ? '--debug' : ''
  }
}

export type NestRunMode = 'start' | 'build'
