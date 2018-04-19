# 运维部署文档

## 一、开发环境

### node版本
* 8.9.0 （可能会根据版本迭代变更）


## 二、部署流程

### 1.在服务器存放该项目的地方拉取gitlab仓库上的代码
```
git clone https://github.com/stefaniepei/react-mobx-ts-ssr.git
```

### 2.进入文件夹内安装前端所需要的包
```
$ npm install
$ npm install -g ts-node
$ npm install -g typescript
```

### 3.打包命令
```
npm run deploy
```

### 4.修改配置文件ecosystem.config.js


### 5.pm2 启动
$ pm2 startOrRestart ecosystem.config.js --env production


## 三、备注
1. **解决每次部署都需要输入密码的命令：**
 打开本地git bash输入：
 ```
 ssh-copy-id -i ~/.ssh/id_rsa.pub root@172.16.0.240
 ```
 如果是MAC找不到*ssh-copy-id*命令，请先安装
 ```
 brew install ssh-copy-id
 ```
