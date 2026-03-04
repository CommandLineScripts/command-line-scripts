type AsyncTask = (...args: unknown[]) => Promise<unknown>

export const executeSequentially = async (tasks: AsyncTask[]) => {
  for (const task of tasks) {
    await task()
  }
}
