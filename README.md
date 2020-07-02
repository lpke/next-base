# NextJS Base
Base template/structure for building websites with [React](https://reactjs.org/)/[NextJS](https://nextjs.org/) and deploying on the [Vercel](https://vercel.com) platform.

## Getting Started
1. In GitHub, click "Use this template" to create a new repository using this template's file/folder structure.
   * Use the option to copy branches
2. Clone the new repo: `git clone https://github.com/<user>/<repo-name>`
3. Edit the following files to get started (remove generic stuff):
   * README.md
   * package.json
   * pages/\_app.js
   * pages/index.js
4. Commit changes and push to GitHub: `git push -u <remote-name> <branch-name>`
5. In Vercel, create a new project and select GitHub import
6. Once ready, add any domains of your choosing
7. Domains > Edit and choose which branch you want that deployment to track
8. Every push to GutHub now auto-deploys your website/app to Vercel

## NextJS Basic Tips
* Pages added to the `pages` folder are automatically routed by NextJS. The folder structure is used as the site's page subtree automatically.
* `pages/_app.js` is the app wrapper and where global styles should be imported.
* `pages/_document.js` is the overarching site wrapper and is not generated on the client side. Only use this for high level html and not for state.
* Import `next/head` to use the `<Head>` component in any page to add metadata
* Import `next/link` to use the `<Link>` component on a page, which is NextJS's way of telling React router where a link should route to.
