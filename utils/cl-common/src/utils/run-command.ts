import { spawn } from 'child_process'

/**
 * Runs a command in a shell and streams stdio to parent.
 */
export const runCommand = (command: string, printCommand = false): Promise<true> =>
  new Promise((resolve, reject) => {
    if (printCommand) console.log(command)

    const child = spawn(command, {
      stdio: 'inherit',
      shell: true,
    })

    child.on('error', reject)

    child.on('close', (code, signal) => {
      if (code === 0) return resolve(true)
      reject(
        new Error(
          `Command "${command}" failed with ${
            code !== null ? `exit code ${code}` : `signal ${signal ?? 'unknown'}`
          }`
        )
      )
    })
  })

