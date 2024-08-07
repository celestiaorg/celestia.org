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

1. Check your Node.js version and if necessary, update to [v18.17.0](https://nodejs.org/en/blog/release/v18.17.0) or higher, either by updating manually or using [nvm](https://github.com/nvm-sh/nvm) (required by [Gatsby v5](https://www.gatsbyjs.com/docs))
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

### Build page query parameters for specific tabs

All possible combinations based on the data files. Let's break it down for each section:

1. Framework categories (from frameworks.js):

-   All
-   Ethereum
-   Sovereign

2. Rollups categories (from rollups.js):

-   All
-   Arbitrum ORBIT
-   OP Stack
-   Polygon CDK
-   Starknet Stack

#### Here are all possible query parameter combinations:

1. Single parameter combinations:

```
// Frameworks
?framework_category=All
?framework_category=Ethereum
?framework_category=Sovereign

// Rollups
?rollups_category=All
?rollups_category=Arbitrum%20ORBIT
?rollups_category=OP%20Stack
?rollups_category=Polygon%20CDK
?rollups_category=Starknet%20Stack
```

2. All possible combinations of both parameters:

```
?framework_category=All&rollups_category=All
?framework_category=All&rollups_category=Arbitrum%20ORBIT
?framework_category=All&rollups_category=OP%20Stack
?framework_category=All&rollups_category=Polygon%20CDK
?framework_category=All&rollups_category=Starknet%20Stack

?framework_category=Ethereum&rollups_category=All
?framework_category=Ethereum&rollups_category=Arbitrum%20ORBIT
?framework_category=Ethereum&rollups_category=OP%20Stack
?framework_category=Ethereum&rollups_category=Polygon%20CDK
?framework_category=Ethereum&rollups_category=Starknet%20Stack

?framework_category=Sovereign&rollups_category=All
?framework_category=Sovereign&rollups_category=Arbitrum%20ORBIT
?framework_category=Sovereign&rollups_category=OP%20Stack
?framework_category=Sovereign&rollups_category=Polygon%20CDK
?framework_category=Sovereign&rollups_category=Starknet%20Stack
```

3. Combinations with the possible IDs at the end to jump to sections in the same time.

```
?framework_category=All#build
?framework_category=All#integrate
?framework_category=All#deploy
?framework_category=Ethereum#build
?framework_category=Ethereum#integrate
?framework_category=Ethereum#deploy
// ...

?rollups_category=All#build
?rollups_category=All#integrate
?rollups_category=All#deploy

?rollups_category=Arbitrum%20ORBIT#build
?rollups_category=Arbitrum%20ORBIT#integrate
?rollups_category=Arbitrum%20ORBIT#deploy
// ...

?framework_category=All&rollups_category=All#build
?framework_category=All&rollups_category=All#integrate
?framework_category=All&rollups_category=All#deploy

?framework_category=All&rollups_category=Arbitrum%20ORBIT#build
?framework_category=All&rollups_category=Arbitrum%20ORBIT#integrate
?framework_category=All&rollups_category=Arbitrum%20ORBIT#deploy
// ...

```

**Remember that:**

1. These can be appended to the base URL: `https://celestia.org/build/`
2. You can add `#build` etc. id's at the end of any URL to anchor to the specific section.
3. Spaces in categories should be URL-encoded (%20) in actual use.

These combinations cover all possible states based on the data in the provided files. The implementation will default to "All" for any category if an invalid or non-existent category is provided in the URL parameters.
