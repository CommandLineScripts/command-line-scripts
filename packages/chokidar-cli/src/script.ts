import { Executable } from '@clscripts/cl-common'

export interface ChokidarCliOpts {
  watchDir: string
  exclude: string[]
  onChange: string
}
export class ChokidarCli implements Executable {
  packageExecutable = 'chokidar'
  watchDir: string
  exclude: string[]
  onChange: string
  constructor(opts: ChokidarCliOpts) {
    this.watchDir = `'${opts.watchDir}'`
    this.exclude = opts.exclude
    this.onChange = opts.onChange
  }
  get command(): string {
    return [this.packageExecutable, this.watchDir, this.excludeArgs, this.onChangeArg]
      .filter(Boolean)
      .join(' ')
  }
  get excludeArgs() {
    return this.exclude.map((path) => `-i '${path}'`).join(' ')
  }
  get onChangeArg() {
    return `-c '${this.onChange}'`
  }
}
