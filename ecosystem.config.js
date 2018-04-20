module.exports = (function () {
  this.path = '/data2/www/dev-mobx' // 服务器上的目录
  return {
    apps: [ // 应用可以配置多个应用，这里是启动的配置项
      {
        name: 'dev-mobx', // 显示在pm2里的名称
        script: 'dist/server.bundle.js', // 启动脚本
        exec_mode: 'cluster', // 集群模式
        instance: 1, // 启动一个实例
        env: { // 默认环境为development 端口号请直接在前端的package.json中配置
          NODE_ENV: 'development', // 环境变量
        },
        env_qa: {
          NODE_ENV: 'qa',
        },
        env_production: { // 其他环境的名称跟在“env_”之后
          NODE_ENV: 'production'
        },
      },
    ],
  }
})()
