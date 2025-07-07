import { Executable } from '@clscripts/cl-common'

export interface EchoCliOpts {
  message: string
}
export class EchoCli implements Executable {
  packageExecutable: string = 'echo-cli'
  message: string
  constructor(opts: EchoCliOpts) {
    this.message = opts.message
  }

  get command(): string {
    return [this.packageExecutable, this.messageArg].filter(Boolean).join(' ')
  }

  get messageArg() {
    return this.message
  }
}
