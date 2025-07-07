import { Executable } from '@clscripts/cl-common'

export interface DotenvCliOpts {
  envFile: string
  execute: string
}
export class DotenvCli implements Executable {
  packageExecutable = 'dotenv'
  envFile: string
  execute: string

  constructor(opts: DotenvCliOpts) {
    this.envFile = opts.envFile
    this.execute = opts.execute
  }

  get command() {
    return [this.packageExecutable, this.envFileArg, this.executeArg].filter(Boolean).join(' ')
  }
  get envFileArg() {
    return `-e ${this.envFile}`
  }
  get executeArg() {
    return `-- ${this.execute}`
  }
}
