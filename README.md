# @clscripts

**🧩 Keep your `package.json` scripts clean, modular, and type-safe.**  

@clscripts is a modular CLI toolkit that replaces messy inline commands with **readable TypeScript scripts**.  
Each feature is packaged as a separate plugin, so you only install what you need.  

---

## ✨ Before & After  

**Before — messy `package.json`**  
```json
{
  "scripts": {
    "build": "barrelsby ./index.ts && echo \"building...\" && tsc && next build && prisma generate && ..."
  }
}
```

**After — clean & modular with @clscripts**  
```json
{
  "scripts": {
    "dev": "tsx ./scripts/dev.ts",
    "lint": "tsx ./scripts/lint.ts",
    "setup": "tsx ./scripts/setup.ts",
    "build": "tsx ./scripts/build.ts",
    "clean": "tsx ./scripts/clean.ts"
  }
}
```

**scripts/build.ts**  
```ts
import { Next } from '@clscripts/next'
import { EchoCli } from '@clscripts/echo-cli'
import { TsPatch } from '@clscripts/ts-patch'
import { runCommandsSequentially } from '@clscripts/cl-common'

runCommandsSequentially([
  new EchoCli({ message: '~ Building project...' }).command,
  new TsPatch({ tsconfigPath: './scripts.tsconfig.json' }).command,
  new Next({ mode: 'build' }).command,
  new EchoCli({ message: '✔ Build completed successfully' }).command,
])
```

---

## 🧩 Modular by Design  

Install only what you need:  
```bash
pnpm add @clscripts/echo-cli
pnpm add @clscripts/next
pnpm add @clscripts/del-cli
```

---

👉 With **@clscripts**, your `package.json` stays clean, your scripts become **modular & reusable**, and your dev experience improves with **typed, testable, IDE-friendly scripts**
