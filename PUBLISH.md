### 项目基本信息
#### Gitlab地址：
https://github.com/stefaniepei/react-mobx-ts-ssr.git
#### 分支：
origin/master
#### 测服地址：
http://172.16.0.240:8010

#### 前端部署
1. **本地hosts添加：**
 172.16.0.240 dev-mobx
2. **前端本地生成文件：**
 npm run deploy
3. **将前端文件部署到服务器：**
 pm2 deploy ecosystem.config.js dev setup   *执行一次，以后不用执行了*
 pm2 deploy ecosystem.config.js dev
4. **解决每次部署都需要输入密码的命令：**
 打开本地git bash输入：
 ```
 ssh-copy-id -i ~/.ssh/id_rsa.pub root@172.16.0.240
 ```
 如果是MAC找不到*ssh-copy-id*命令，请先安装
 ```
 brew install ssh-copy-id
 ```
> NPM方式部署

npm run publish:setup # 只能执行一次
npm run publish # 发布前请先检查dist的文件夹下index.html和index.tpl需两个文件同时存在


#### 后端部署
pm2 deploy ecosystem.config.js dev    *部署后会自动启动服务*
1. **解决每次部署都需要输入密码的命令：**
 打开本地git bash输入：
 ssh-copy-id -i ~/.ssh/id_rsa.pub root@172.16.0.240
#### 测服启动
cd /data2/www/dev-pre-reg/source
pm2 start  ecosystem.config.js --env development

#### 备注
*本地hosts添加* 172.16.0.240 dev-mobx
上传文档如果报错需要在om项目中建立upload文件夹
---
