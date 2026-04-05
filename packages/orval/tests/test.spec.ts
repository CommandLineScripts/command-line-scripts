import { Orval } from '../src'

describe('@clscripts/orval', () => {
  it('builds the default orval command', () => {
    expect(new Orval({}).command).toBe('orval')
  })

  it('builds a command with supported options', () => {
    const command = new Orval({
      input: './openapi.yaml',
      output: './src/api/generated.ts',
      config: './orval.config.ts',
      project: ['petstore', 'admin'],
      watch: './src',
      clean: './src/api',
      prettier: true,
      biome: true,
      tsconfig: './tsconfig.json',
      verbose: true,
    }).command

    expect(command).toBe(
      'orval --input ./openapi.yaml --output ./src/api/generated.ts --config ./orval.config.ts --project petstore admin --watch ./src --clean ./src/api --prettier --biome --tsconfig ./tsconfig.json --verbose'
    )
  })

  it('supports boolean watch and clean flags', () => {
    const command = new Orval({
      watch: true,
      clean: true,
    }).command

    expect(command).toBe('orval --watch --clean')
  })
})
