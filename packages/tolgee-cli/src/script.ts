import { Executable } from '@clscripts/cl-common'

export interface TolgeeCliOpts {
  mode: TolgeeRunMode
  removeUnused?: boolean
  configPath?: string
}
export class TolgeeCli implements Executable {
  packageExecutable = 'tolgee'
  mode: TolgeeRunMode
  deleteUnused?: boolean
  configPath?: string
  constructor(opts: TolgeeCliOpts) {
    this.mode = opts.mode
    this.deleteUnused = opts.removeUnused
  }
  get command() {
    return [this.packageExecutable, this.modeArg, this.deleteUnusedArg].filter(Boolean).join(' ')
  }
  get modeArg() {
    return this.mode
  }
  get deleteUnusedArg() {
    return this.deleteUnused ? `--remove-unused` : ''
  }
  get configPathArg() {
    return this.configPath ? `--config` : ''
  }
}

export type TolgeeRunMode = 'sync' | 'pull' | 'push' | 'print' | 'compare'
