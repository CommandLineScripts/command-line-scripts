import { Executable } from '@clscripts/cl-common'

export interface BarrelsbyOpts {
  directory: string
  delete: boolean
  /** Defaults to index.ts */
  name?: string
  exclude?: string[]
}
export class Barrelsby implements Executable {
  packageExecutable = 'barrelsby'
  directory: string
  delete: boolean
  name?: string
  exclude?: string[]
  constructor(opts: BarrelsbyOpts) {
    this.directory = opts.directory
    this.delete = opts.delete
    this.name = opts.name
    this.exclude = opts.exclude
  }
  get command() {
    return [
      this.packageExecutable,
      this.nameArg,
      this.directoryArg,
      this.deleteArg,
      this.excludeArg,
    ]
      .filter(Boolean)
      .join(' ')
  }
  get directoryArg() {
    return `--directory ${this.directory}`
  }
  get deleteArg() {
    return this.delete ? '--delete' : ''
  }
  get nameArg() {
    return this.name ? `--name ${this.name}` : ''
  }
  get excludeArg() {
    return this.exclude ? `--exclude ${this.exclude.join(',')}` : ''
  }
}
