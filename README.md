# react-mobx-ts-ssr
React V16 + ReactRouter V4 + Mobx + TypeScript + SSR + HMR

## Github地址：
https://github.com/stefaniepei/react-mobx-ts-ssr.git

# 特性

- [x] React V16 + ReactRouter V4 + Mobx + TypeScript V2 + SSR + HMR + Webpack V3
- [x] 服务端渲染
- [x] sass模块化
- [x] 支持热更新
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

### ps:/data1/app/services/nginx/conf/nginx.conf 参考配置(暂客户端渲染用)
````bash
http {
  include       mime.types;
  default_type  application/octet-stream;
  # max_ranges    0;
  log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
                    '$status $body_bytes_sent "$http_referer" '
                    '"$http_user_agent" "$http_x_forwarded_for"';

  log_format ip_log '$http_x_forwarded_for - $remote_user [$time_local] '
                      '"$request" $status $body_bytes_sent'
                      '"$http_referer" "$http_user_agent"';

  server_names_hash_bucket_size 128;
  client_header_buffer_size 32k;
  large_client_header_buffers 4 64k;
  client_max_body_size 100m;
  sendfile        on;
  tcp_nopush      on;
  tcp_nodelay     on;
  keepalive_timeout  120;
  server_tokens off;
  fastcgi_connect_timeout 120;
  fastcgi_send_timeout 120;
  fastcgi_read_timeout 120;
  fastcgi_buffer_size 64k;
  fastcgi_buffers 4 64k;
  fastcgi_busy_buffers_size 128k;
  fastcgi_temp_file_write_size 128k;
  fastcgi_intercept_errors on;
    
  #gzip
  gzip on;
  gzip_min_length 1k;
  gzip_buffers 4 16k;
  gzip_http_version 1.0;
  gzip_comp_level 2;
  gzip_types text/plain application/javascript text/css application/xml text/javascript application/x-httpd-php image/jpeg image/gif image/png;
  gzip_vary off;
  gzip_disable "MSIE [1-6]\.";

  output_buffers   1 32k;
  postpone_output  1460;

  server {
      listen 8806;
      listen       443;

      server_name  localhost;
      root /data2/www/react-redux-ts-ssr/dist;
      access_log off;
      #access_log /data1/app/services/nginx/logs/access.log ip_log;
      error_log  /data1/app/services/nginx/logs/error.log warn;

      location / {
        index  index.html index.htm;
        proxy_buffer_size 64k;
        proxy_buffers   32 32k;
        proxy_busy_buffers_size 128k;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP       $remote_addr;
        proxy_set_header X-Forwarded-For  $proxy_add_x_forwarded_for;
        root /data2/www/react-redux-ts-ssr/dist;
      }

      location ~ .*\.(jpg|jpeg|png|gif|bmp|js|css|swf|ico)$ {
        expires 30d;
        access_log off;
      }
      location /favicon.ico {
        root /data2/www/react-redux-ts-ssr/dist;
        log_not_found off;
        access_log off;
      }
      location ~* {
        rewrite .* /index.html break;
        root /data2/www/react-redux-ts-ssr/dist;
      }
  }
  include /data1/app/services/nginx/conf/vhost/*.conf;
}
````