import { Executable } from '@clscripts/cl-common'

export interface TsNodeOpts {
  /**
   * Path to your tsconfig.json
   *
   * @example
   *   './tsconfig.json'
   */
  projectPath?: string

  /**
   * Entry file to run.
   *
   * @example: './src/main.ts'
   */
  entryFile: string

  /** Whether to skip type-checking for speed. */
  transpileOnly?: boolean
}

export class TsNode implements Executable {
  readonly packageExecutable = 'ts-node'

  constructor(private readonly opts: TsNodeOpts) {}

  get command(): string {
    return [this.packageExecutable, this.projectPathArg, this.transpileOnlyArg, this.entryFileArg]
      .filter(Boolean)
      .join(' ')
  }

  get projectPathArg() {
    return this.opts.projectPath ? `--project ${this.opts.projectPath}` : ''
  }
  get transpileOnlyArg() {
    return this.opts.transpileOnly ? '--transpile-only' : ''
  }
  get entryFileArg() {
    return this.opts.entryFile
  }
}
