import { Executable } from '@clscripts/cl-common'

export interface ExpoOpts {
  // add your options here
  mode: ExpoRunMode
  platform?: startModePlatform
}
export class Expo implements Executable {
  packageExecutable: string = 'expo'
  mode: ExpoRunMode
  platform?: startModePlatform
  constructor(opts: ExpoOpts) {
    this.mode = opts.mode
    this.platform = opts.platform
  }

  get command(): string {
    return [this.packageExecutable, this.modeArg, this.platformArg].filter(Boolean).join(' ')
  }

  get modeArg(): ExpoRunMode {
    return this.mode
  }

  get platformArg() {
    return this.platform ? `--${this.platform}` : ''
  }
}

export type ExpoRunMode = 'lint' | 'start'
export type startModePlatform = 'web' | 'ios' | 'android'
