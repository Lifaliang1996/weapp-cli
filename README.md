# weapp-cli

[![License][license-img]][license-url]
[![NPM Downloads][downloads-img]][downloads-url]
[![NPM Version][version-img]][version-url]
[![Dependency Status][dependency-img]][dependency-url]
[![devDependency Status][devdependency-img]][devdependency-url]
[![Code Style][style-img]][style-url]

> 一个支持在原生微信小程序中使用 TypeScript、Scss、Less 的脚手架工具。

## 介绍

此工具项目结构使用 [caz](https://github.com/zce/caz) 创建，核心功能基于 [Gulp](https://gulpjs.com/) 开发，简单易用，适合原生小程序。

欢迎提交 [Issues](https://github.com/Lifaliang1996/weapp-cli/issues) 或 [PR](https://github.com/Lifaliang1996/weapp-cli/pulls) 。

## 安装

为更好的使用全部功能，推荐安装到全局。

### NPM

```bash
npm install weapp-cli -g
```

### Yarn

```bash
yarn global add weapp-cli
```

## 创建项目

```bash
weapp create <project-name>
```
以下是项目的目录结构：

```tex
|- miniprogram				# 处理后的文件，与 src 目录结构一致，小程序将编译此目录。
|- src						# 源代码目录。
  |- components				# 自定义组件。
  |- pages					# 页面文件。
  |- typings				# type 定义文件，仅在 ts 项目中存在。
  |- app.json
  |- app.{wxss,less,scss}
  |- app.{js,ts}
  |- sitmap.json
|- package.json
|- project.config.json		# 小程序配置文件。
|- tsconfig.json			# ts 配置文件，仅在 ts 项目中存在。			
|- weapp.config.js			# 此工具的配置文件。
```

```js
// weapp.config.js

module.exports = {
  style: 'scss',  						// 项目使用的样式编写方式：wxss/less/scss
  script: 'ts',  						// 项目使用的脚本编写方式：js/ts
  css: ['~/styles/variable.scss'],		// 全局样式注入，详细参见后面
  page: 'home'							// 单页编译，详细参见后面
}
```

## 编译

### 基本使用

在项目根目录下运行：

```bash
weapp build
```

若要监听文件并自动编译：

```bash
weapp build --watch
```

或者在 package.json 中添加脚本命令：

```json
{
  "scripts": {
    "build": "weapp build"
  }
}
```

```bash
npm run build
```

结合微信开发者工具，可在 project.config.json 中添加以下字段：

```json
{
  "scripts": {
    "beforeCompile": "npm run build",
    "beforePreview": "npm run build",
    "beforeUpload": "npm run build"
  }
}
```

并在开发者工具中 “详情” - “本地设置” - “启用自定义命令”，点击 “编译” 时会自动编译源代码。

### 单页编译

可以选择只编译某一个页面，只需配置 `page` 字段，值为 pages 目录下的页面的名称。

```js
// weapp.config.js

module.exports = {
  page: 'home'
}
```

此时只会编译 home  页面。

### 路径别名

原生小程序中只能使用相对路径，此工具支持绝对路径别名。

`@` 与 `~` 都指向 src 目录，示例：

```js
// 编译前
import say from '@/utils/util'

// 编译后
import say from '../../utils/util'
```

```scss
// 编译前
@import "~/styles/main.scss";

// 编译后
@import "../../styles/main.scss"
```

此语法可在任何文件中使用。

### 全局样式注入

配置 `css` 字段，必须为数组，值为样式文件的绝对路径，这些样式文件将被添加到所有 page 的样式中，一般只用于定义 less/scss 变量，全局样式可在 app 样式文件中定义。

```js
// weapp.config.js

module.exports = {
  css: ['~/styles/variable.scss']
}
```

## 添加 Component / Page

### Component

组件会添加到 src/components 目录下。

```bash
weapp component <component-name>
```

或使用简写：

```
weapp cpt <component-name>
```

### Page

页面会添加到 src/pages 目录下，页面路径会自动追加到 app.json 的 pages 字段中。

```bash
weapp component <page-name>
```

或使用简写：

```
weapp p <page-name>
```



## License

[MIT](LICENSE) &copy; [LI_FA_LIANG](https://github.com/Lifaliang1996)



[license-img]: https://img.shields.io/github/license/Lifaliang1996/weapp-cli
[license-url]: https://github.com/Lifaliang1996/weapp-cli/blob/master/LICENSE
[downloads-img]: https://img.shields.io/npm/dm/@weapp/cli
[downloads-url]: https://npmjs.org/package/@weapp/cli
[version-img]: https://img.shields.io/npm/v/@weapp/cli
[version-url]: https://npmjs.org/package/@weapp/cli
[dependency-img]: https://img.shields.io/david/@weapp/cli
[dependency-url]: https://david-dm.org/@weapp/cli
[devdependency-img]: https://img.shields.io/david/dev/@weapp/cli
[devdependency-url]: https://david-dm.org/@weapp/cli?type=dev
[style-img]: https://img.shields.io/badge/code_style-standard-brightgreen
[style-url]: https://standardjs.com
