# A Sensible, Clean NextJS Base

- ✅ NextJS 15 (using app router)
- ✅ Typescript
- ✅ Tailwind
- ✅ MDX Support
- ✅ ESLint (Airbnb ruleset)
- ✅ Prettier
- ✅ Sensible defaults

## File/Folder Organisation Strategy

> Note: I've used `.gitkeep` files in otherwise empty folders so that they are not ignored when pushing. They can be safely deleted.

The `src` directory is optionally used to keep the project congruous with many other types of project repositories.

For semantics, the `src/app` directory contains all files. To keep routes and shared components/helpers seperate:

- All routes go under the `(routes)` folder except for root files. NextJS ignores folder names surrounded in parentheses.
- All other top-level folders are prefixed with an underscore so that NextJS ignores them for routing.

### Root Files

- `layout.tsx`: Root layout for the app.
- `page.tsx`: Home page (`/` route).
- `favicon.ico`: Automatically detected by NextJS to use as the app favicon.
- `Providers.tsx`: Optional client component used in the root layout.
  - Is not part of the NextJS routing conventions
  - I added this optionally as an easy way to wrap the app with Context and other client side only providers while keeping `layout.tsx` a server component.

## Path Aliases

In `tsconfig.json`, path aliases have been set to best accomodate the folder organisation strategy, keeping imports clean.

- `src/app/*` → `@/*`
- `src/app/_utils/*` → `@/utils/*`
- `src/app/_types/*` → `@/types/*`
- `src/app/_hooks/*` → `@/hooks/*`
- `src/app/_styles/*` → `@/styles/*`
- `src/app/(routes)/*` → `@/routes/*`
- `src/app/_components/*` → `@/components/*`

## ESLint

ESLint uses the following rulesets as a base:

- `next/core-web-vitals` (built-in NextJS rules on strict mode)
- `airbnb`
- `airbnb-typescript`
- `prettier`

This combination allows Typescript, ESLint, and Prettier to play nicely together whilst using the Airbnb JS styleguide as a foundation.

There are a few rules I have turned off manually based on personal preference, and a good amount (mostly `jsx-a11y`) that I have downgraded from errors to warnings to better represent their significance. These modifications can be seen in `.eslintrc.cjs`.

### Prettier

The Prettier config (`eslint-config-prettier`) _and_ the Prettier plugin (`eslint-plugin-prettier`) packages are installed. They serve different purposes.

- **Config**: This disables any ESLint warnings that are fixed with a prettier format (indentation, quotes, etc).
- **Plugin**: Reads the `prettier.config.mjs` file and adds ESLint rules of it's own (all under `prettier/prettier`) that enforce your config choices.
  - To reduce the amount of "squiggly lines" in my editor, I have this rule set to `'off'`. I leave the plugin installed so that I can use this feature as needed.
  - You can re-enable this in `.eslintrc.cjs`.
