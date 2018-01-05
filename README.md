# react-mobx-ts-ssr
React V16 + ReactRouter V4 + Mobx + TypeScript + SSR + HMR

## Gitlab地址：
https://github.com/stefaniepei/react-mobx-ts-ssr.git

# 特性

- [x] React V16 + ReactRouter V4 + Mobx + TypeScript + SSR + HMR + Webpack
- [x] sass模块化
- [x] 支持热更新
- [x] 支持后端渲染
- [x] 支持tslint语法检查,提交检查
- [x] 支持i18n国际化

no-ssr版本：https://github.com/stefaniepei/react-mobx-ts

# 快速开始

## 安装

````bash
$ npm install
$ npm install -g ts-node
$ npm install -g typescript
````

## 客户端启动

````bash
$ npm run start
````

## 运行测试环境(开启服务端渲染)

````bash
$ npm run dev
````

## 运行QA环境(开启服务端渲染)

````bash
$ npm run qa
````

## 运行生产环境(开启服务端渲染)

````bash
$ npm run server
````

## 文件内关闭lint语法检查

````bash
//tslint:disable-line
/* tslint:disable */ - Disable all rules for the rest of the file
/* tslint:enable */ - Enable all rules for the rest of the file
/* tslint:disable:rule1 rule2 rule3... */ - Disable the listed rules for the rest of the file
/* tslint:enable:rule1 rule2 rule3... */ - Enable the listed rules for the rest of the file
// tslint:disable-next-line - Disables all rules for the following line someCode();
// tslint:disable-line - Disables all rules for the current line
// tslint:disable-next-line:rule1 rule2 rule3... - Disables the listed rules for the next line
/* eslint-disable */
/* eslint-disable no-alert, no-console */
// eslint-disable-line
````