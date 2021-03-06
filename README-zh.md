# vue-admin-anihub

> 这是以 vue-admin 为模版设计的 AniHub 管理界面。它包含了 Element UI & axios & iconfont & permission control & lint。

[线上地址](https://anihub.injahow.cn)

## Build Setup

```bash
# 克隆项目
git clone https://github.com/injahow/vue-admin-anihub.git

# 进入项目目录
cd vue-admin-anihub

# 安装依赖
npm install

# 可使用淘宝镜像源，建议不要使用 cnpm ，会有各种诡异的 bug。
npm install --registry=https://registry.npm.taobao.org

# 启动服务
npm run dev
```

浏览器访问 [http://localhost:9528](http://localhost:9528)

## 发布

```bash
# 构建测试环境
npm run build:stage

# 构建生产环境
npm run build:prod
```

## 其它

```bash
# 预览发布环境效果
npm run preview

# 预览发布环境效果 + 静态资源分析
npm run preview -- --report

# 代码格式检查
npm run lint

# 代码格式检查并自动修复
npm run lint -- --fix
```

## License

[MIT](https://github.com/injahow/vue-admin-anihub/blob/master/LICENSE) license.

Copyright (c) 2020 injahow
