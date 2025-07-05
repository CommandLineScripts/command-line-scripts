import { select } from '@inquirer/prompts'
import { NewPackagePrompt } from './prompts/new-package.prompt.js'

type Action = 'NEW_PACKAGE'
const action = await select<Action>({
  choices: [
    {
      name: 'Create a new package',
      value: 'NEW_PACKAGE',
    },
  ],
  message: 'Choose an action',
})

switch (action) {
  case 'NEW_PACKAGE': {
    const newPackagePrompt = new NewPackagePrompt()
    await newPackagePrompt.prompt()
    newPackagePrompt.makePackage()
    console.log(`✅ Package @clscripts/${newPackagePrompt.packageName} created!`)
    console.log('Please remember to run `pnpm install` in the new package directory')
    break
  }
}
