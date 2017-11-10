module.exports = (function () {
  this.path = '/data2/www/dev-mobx' // 服务器上的目录
  return {
    apps: [ // 应用可以配置多个应用，这里是启动的配置项
      {
        name: 'dev-mobx', // 显示在pm2里的名称
        script: 'backend/index.js', // 启动脚本
        exec_mode: 'cluster', // 集群模式
        instance: 1, // 启动一个实例
        env: { // 默认环境为development
          NODE_ENV: 'development', // 环境变量
          PORT: 8010, // 端口号
        },
        env_production: { // 其他环境的名称跟在“env_”之后
          NODE_ENV: 'production'
        },
        env_qa: {
          NODE_ENV: 'qa',
          PORT: 3333,
        },
      },
    ],
    deploy: { // 这里是部署的配置项
      development: { // 部署时用到的名称
        user: 'root', // 将要部署的主机的用户
        host: [ 'dev-mobx' ], // 将要部署的主机的域名或者IP，可以多个
        repo: 'git@github.com:stefaniepei/shinezone-generator-reactts.git', // git仓库
        ref: 'origin/master', // 要使用的分支
        path: this.path, // 远程主机上的将要部署到的目录
        // 在setup的时候执行，这里只是在远程主机上建立目录，只在第一次执行
        'post-setup': `[ ! -d ${this.path}/source/dist ] && mkdir -p ${this.path}/source/dist; [ ! -d ${this.path}/source/backend/logs ] && mkdir -p ${this.path}/source/backend/logs `,
        // 在本地执行的命令
        'pre-deploy-local': `scp -r dist/* root@dev-game4us:${this.path}/source/dist`,
        // 在远程主机执行的命令
        'post-deploy': `cd ${this.path}/source/backend && npm install && cd .. && pm2 startOrRestart ecosystem.config.js --env development`,
      },
    }
  }
})()
