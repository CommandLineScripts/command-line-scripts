import { runCommand } from './run-command'
import { executeSequentially } from './execute-sequentially'

/**
 * Runs multiple commands sequentially, similar to `&&` behavior. Stops immediately on first failure
 * and propagates the error.
 */
export const runCommandsSequentially = async (commands: string[], printCommands = false) => {
  await executeSequentially(
    commands.map((command) => () => Promise.resolve(runCommand(command, printCommands)))
  )
}
