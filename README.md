# ArcProfile CodingTest

ArcBlock CodingTest 项目

## 目录结构

- public/ - 静态文件目录
  - favicon.ico - favicon
  - favicon.svg - favicon
  - index.html - main html file, template for react
- api/    - app服务器
  - index.js - 服务端入口
  - controllers/ - app api controllers 服务层
  - libs/ - app 通用库
  - models/ - app api 数据层
  - routes/ - app api 路由层
  - validations/ - app api 切片校验
- src/    - app客户端端
  - index.js - 客户端入口
  - app.js   - 客户端启动文件
  - router   - 路由器
  - pages    - 路由页面文件夹
      - index - 路由页面主入口
      - api  - 私有api文件
      - libs - 私有库
      - const - 私有常量
      - hooks - 私有hooks
  - libs     - 通用库
  - hooks    - 通用hooks
  - components    - 通用组件
  - assets   - 静态资源
- .env - Environment variables
- .env.local - Local environment variables
- .eslintrc.js - ESLint configuration
- .gitignore - Git ignore file
- .prettierrc - Prettier configuration
- blocklet.md - Blocklet README
- blocklet.yml - Blocklet configuration
- LICENSE - License file
- logo.png - Blocklet logo file
- Makefile - Makefile
- package.json - Npm package file
- README.md - A guide for this blocklet
- version - Version file

PS： 
1. 文件夹 —— React组件为大驼峰，其余为小驼峰

## CSS模块化规范

1. 组件 —— CSS modules模块化
2. 页面 —— BEM 命名模块化，内容较少采用该方式
 
## Development

1. Make sure you have [@blocklet/cli](https://www.npmjs.com/package/@blocklet/cli) installed

   Blocklet needs blocklet server as a dependency. So you need to install it first.
   `npm install -g @blocklet/cli`
   See details in [https://www.arcblock.io/docs/blocklet-developer/install-blocklet-cli](https://www.arcblock.io/docs/blocklet-developer/install-blocklet-cli)

2. Init blocklet server & start blocklet server

   Before starting an blocklet server, you need to init blocklet server.
   `blocklet server init --mode=debug`
   `blocklet server start`
   See details in [https://www.arcblock.io/docs/blocklet-developer/getting-started](https://www.arcblock.io/docs/blocklet-developer/getting-started)

3. Go to the project directory `cd [name]`
4. Install dependencies: `npm install` or `yarn`
5. Start development server: `blocklet dev`

## Bundle

After developing a blocklet, you may need to bundle it. Use `npm run bundle` command.

## Deploy

- If you want to deploy this blocklet to local blocklet server, you can use `blocklet deploy .blocklet/bundle` command(Make sure the blocklet is bundled before deployment).
  > Or you can simply use `npm run deploy` command.
- If you want to deploy this blocklet to remote blocklet server, you can use the command below.

  ```shell
  blocklet deploy .blocklet/bundle --endpoint {your blocklet server url} --access-key {blocklet server access key} --access-secret {blocklet server access secret}
  ```

  > Make sure the blocklet is bundled before deployment.

## Upload to blocklet store

- If you want to upload the blocklet to any store for other users to download and use, you can following the following instructions.

  Bump version at first.

  ```shell
  npm run bump-version
  ```

  Then config blocklet store url.
  You can use those store url in below.

  1. [https://store.blocklet.dev/](https://store.blocklet.dev/)
  2. [https://dev.store.blocklet.dev/](https://dev.store.blocklet.dev/)
  3. A blocklet store started by yourself.
     > Make sure you have installed a `blocklet store` on your own blocklet server. Check it on here: [https://store.blocklet.dev/blocklet/z8ia29UsENBg6tLZUKi2HABj38Cw1LmHZocbQ](https://store.blocklet.dev/blocklet/z8ia29UsENBg6tLZUKi2HABj38Cw1LmHZocbQ)

  ```shell
  blocklet config set store {store url}
  ```

  Get a `accessToken` by using this command.

  > Why we need a `accessToken`?
  > A `accessToken` is genrate by blocklet store, which help us upload our blocklet to any store.

  Set `accessToken` to blocklet config

  ```shell
  blocklet config set accessToken {accessToken}
  ```

  Upload a new version to a store.

  > Make sure the blocklet is bundled before upload.

  ```shell
  blocklet upload
  ```

  Or you can simply use `npm run upload` command.

- You also can upload a new version to a store by Github CI.
  Bump version at first.

  ```shell
  npm run bump-version
  ```

  Push your code to Github main/master branch, or make a pull request to the main/master branch.
  The CI workflow will automatically upload a new version to a store.

## Q & A

1. Q: How to change a blocklet's name?

   A: Change the `name` field in the `package.json` file, change the `name` field in the `blocklet.yml` file.

   You can also change the `title` field and `description` field in the `blocklet.yml` file.

   Run `blocklet meta` command, you will get a `did` config, copy the `did` value.

   Replace this command `"bundle:client": "PUBLIC_URL='/.blocklet/proxy/{did}' npm run build",` in `package.json`

   Replace `did` field in the `blocklet.yml`

2. Q: How to change a blocklet's logo?

   Change the `logo.png` file root folder.

   Or you can change the `logo` field in the `blocklet.yml` file.

   > Make sure you have added the logo path to the `blocklet.yml` file `files` field.

## Learn More

- Full specification of `blocklet.yml`: [https://github.com/blocklet/blocklet-specification/blob/main/docs/meta.md](https://github.com/blocklet/blocklet-specification/blob/main/docs/meta.md)
- Full document of Blocklet Server & blocklet development: [https://www.arcblock.io/docs/blocklet-developer](https://www.arcblock.io/docs/blocklet-developer)

## License

The code is licensed under the Apache 2.0 license found in the
[LICENSE](LICENSE) file.
