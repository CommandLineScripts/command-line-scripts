import { spawnSync } from 'child_process'

/** Runs a command in a shell and streams stdio to parent. */
export const runCommand = (command: string, printCommand = false): true => {
  if (printCommand) console.log(command)

  const result = spawnSync(command, {
    stdio: 'inherit',
    shell: true,
    env: process.env,
  })

  if (result.error) {
    throw result.error
  }

  if (result.status !== 0) {
    if (result.signal) {
      throw new Error(`Command "${command}" terminated by signal ${result.signal}`)
    }
    throw new Error(`Command "${command}" failed with exit code ${result.status ?? 1}`)
  }

  return true
}
