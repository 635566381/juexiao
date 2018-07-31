


## 目录结构

    ├─  package.json        # 项目配置
    ├─  README.md           # 项目说明
    ├─  node_modules        # npm依赖包
    ├─  webpack.config.js   # webpack配置文件
    ├─  .babelrc            # babel配置
    │
    │
    ├─  src                 # 前端代码
    │    │
    │    ├─ App.js               #  项目入口文件
    │    ├─ index.html           #  首页
    │    ├─ data.js              #  图片数据文件，由build-data-json.js生成
    │    ├─ css                  #  样式文件夹
    │    ├─ js                   #  脚本文件夹
    │    ├─ media                #  背景音乐文件夹 
    │    └─ img                  #  图片文件夹
    │
    │
    ├─  utils               # 工具文件
    │    │
    │    └─ build-data-json.js   # 用于自动生成图片数据文件，并复制打包图片
    │    
    │
    └  Demo                 # 案例文件


## 运行

安装依赖模块：
```
npm install
```

生成图片data.js图片数据文件：
```
npm run build-json
```

生成打包文件：
```
npm run build
```

app running at http://localhost:9000/：
注：运行第一次运行项目或是img文件夹里面的文件有变动时，运行 npm start 命令前需要先运行 npm run build-json 或 npm run build 命令，先生成或更新data.js文件
```
npm start
```

## 说明

项目由于需要按一定格式自动生成图片json数据，用于项目预加载以及图片拖拽元素的遍历生成

这里图片预加载和页面中拖拽元素的图片引用的路径，都交给node去生成，要注意的是图片文件的放置要按要求来，页面UI界面相关的图片请统一放在 img/ 文件夹的根目录下，而选项图片请分类放在不同文件夹中，并将这些分类文件夹放在 img/Assest 目录里。这样项目运行时会根据分类文件夹，以文件夹名自动生成对于的元素菜单选项，如下图:



## 初始化配置

暂时只有选项名一项配置，后续将逐步更新其他的功能和配置选项，如果背景更换，元素是否可旋转，缩放等等功能。
```
var config = {
    tabBtnNames: {
        "Furniture": "家具",
        "Kid": "人物",
        "Cat": "猫",
        "Dog": "狗",
    }
}
App.init(config)
```



