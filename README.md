<h1 align="center">
  Celestia.org
</h1>

## 🚀 Quick Start

### 1. Requirements

-   Install Node.js [v18.17.0](https://nodejs.org/en/blog/release/v18.17.0) or higher, either by installing manually or using [nvm](https://github.com/nvm-sh/nvm) (required by [Gatsby v5](https://www.gatsbyjs.com/docs))
-   Install [Gatsby CLI](https://www.gatsbyjs.com/docs/reference/gatsby-cli/): `npm install -g gatsby-cli`

### 2. Start Developing

If you have cloned this repo for the first time:

1. Clone the repo and install node modules: `npm install --legacy-peer-deps`
2. Start the Gatsby dev server: `gatsby develop`
3. The site can be opened at `localhost:8000`
4. You can stop the Gatsby server with: `CTRL + C`

If the repo already exists locally:

1. Check your Node.js version and, if necessary, update to [v18.17.0](https://nodejs.org/en/blog/release/v18.17.0) or higher, either by updating manually or using [nvm](https://github.com/nvm-sh/nvm) (required by [Gatsby v5](https://www.gatsbyjs.com/docs))
2. Delete the existing `node_modules`, `.cache`, and `public` folders in the repo's root directory
3. Delete the existing `package-lock.json` file
4. Install node modules with: `npm install --legacy-peer-deps`
5. Now the project is all set, you can start working with Gatsby commands
6. Start the Gatsby dev server: `gatsby develop`
7. The site can be opened at `localhost:8000`
8. You can stop the Gatsby server with: `CTRL + C`

### 3. Run a Build and Serve the Site

-   Build the project: `gatsby clean && gatsby build`
-   Serve the build: `gatsby serve`
-   The site can be opened at `localhost:9000`

### Running Gatsby Build on Server

-   The server build environment requires Node.js [v18.17.0](https://nodejs.org/en/blog/release/v18.17.0) or higher
-   For node modules installation, the `npm install --legacy-peer-deps` command should be defined in the node modules install config
-   For cached fast builds, the `npm run build` command should be defined in the build config
