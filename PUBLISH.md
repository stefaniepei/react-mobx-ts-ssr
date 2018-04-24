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
$ npm install -g cnpm
$ npm install -g pm2
$ npm install -g ts-node
$ npm install -g typescript
$ cnpm install
```
### 3.修改配置文件ecosystem.config.js

### 4.修改端口号package.json中deploy的端口号（如果需要的话）

### 5.打包命令
```
npm run deploy
```

### 6.pm2 启动
$ pm2 startOrRestart ecosystem.config.js --env production

### 7.nginx反向代理配置参考
server {
        listen       80;
        server_name  xxx.com;
        access_log off;
        error_log  /data1/app/log/nginx/error.log warn;
        rewrite /assets/(\d+)/(.+)$ /$2 last;
	location / {
        proxy_pass http://127.0.0.1:1114/;
        proxy_redirect off;
		    proxy_set_header Host $http_host;
        proxy_set_header Cookie $http_cookie;
		    proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        client_max_body_size 128m;
        client_body_buffer_size 128k;
        proxy_connect_timeout 600;
        proxy_send_timeout 600;
        proxy_read_timeout 600; 
        proxy_buffers 32 2048k;
		    proxy_buffer_size  2048k;
        proxy_busy_buffers_size 4096k;
	      #	expires 7d;
  }
	location ~ .*\.(jpg|jpeg|png|gif|bmp|js|css|swf|txt)$ {
        root /data1/www/html/react-mobx-ts-ssr/dist;
        if (-f $request_filename) {
            expires 7d;
            access_log off;
        }
  }

  location ~ /(status|ping).*$ {

      allow 54.227.248.211;
      allow 127.0.0.1;
      deny all;

      fastcgi_pass   unix:/tmp/php553.sock;
      fastcgi_index  index.php;
      include        fastcgi.conf;
  }
  location ~ \.svn {

      return 403;
  }
  location /NginxStatus {
      stub_status on;
      access_log off;
      allow 54.227.248.211;
      allow 127.0.0.1;
      deny all;
  }
}


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
