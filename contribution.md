# 贡献指南

## 目录介绍

贡献者只需要关心./src 目录，对其它配置感兴趣可自行品鉴

```
./src
├── assets          静态资源css/img
├── constants       常量
│   ├── index.js    存放路径与中文title的映射
│   ├── schema      存放每个简历模板的默认JSON数据,与pages中的模板一一对应
│   ├────── demo1.js
│   ├────── react1.js
│   └────── vue1.js
├── pages           简历模板
│   ├── demo1           - 原生js编写的简历
│   ├── react1          - react编写的简历
│   ├── vue1            - vue编写的简历
│   └── introduce       - 应用的使用文档
├── utils
├── app
│   ├── index.js        项目的入口js
│   └── index.html      项目的入口页面
│
```

## 新增模板

目前对于框架接入了 React/Vue 的支持，其余框架（如 Angular）在后续有需求可接入

### 1.创建描述文件

在 schema 目录下创建页面的 json 描述文件,如 abc.js

```
./src
├── constants
│   └── schema
│   └────── abc.js
```

abc.js

```js
export default {
  name: "王五",
  position: "求职目标： Web前端工程师",
  infos: ["1:很多文字", "2:很多文字", "3:很多文字"],
};
```

### 2.创建 page

在 pages 目录下创建与 json 描述文件同名的目录,如 abc

```
./src
├── pages
│   └── abc
```

### 3.编写页面代码

下面提供了 4 种方式实现同一效果

期望的效果

![图片](https://img.cdn.sugarat.top/mdImg/MTYxNDQ4MDYyMjQ1Ng==614480622456)

期望的渲染结构

```html
<div id="resume">
  <div id="app">
    <header>
      <h1>王五</h1>
      <h2>求职目标： Web前端工程师</h2>
    </header>
    <ul class="infos">
      <li>1:很多文字</li>
      <li></li>
      <li>2:很多文字</li>
      <li></li>
      <li>3:很多文字</li>
      <li></li>
    </ul>
  </div>
</div>
```

下面开始编写代码

**为方便阅读，代码进行了折叠**

首先是样式，这里选择 sass 预处理语言，当然也可以用原生 css

<details>
    <summary>index.scss</summary>

```scss
@import "./../../assets/css/base.scss";
html,
body,
#resume {
  height: 100%;
  overflow: hidden;
}
// 上面部分是推荐引入的通用样式

// 下面书写我们的样式
$themeColor: red;

#app {
  padding: 1rem;
}

header {
  h1 {
    color: $themeColor;
  }
  h2 {
    font-weight: lighter;
  }
}

.infos {
  list-style: none;
  li {
    color: $themeColor;
  }
}
```

</details>

其次是页面描述文件

<details>
    <summary>index.html</summary>

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>
      <%= htmlWebpackPlugin.options.title %>
    </title>
  </head>

  <body>
    <div id="resume">
      <div id="app"></div>
    </div>
  </body>
</html>
```

</details>

**下面就开始使用各种技术栈进行逻辑代码编写**

<details>
    <summary>原生js</summary>

**目录结构**

```
./src
├── pages
│   └── abc
│   └───── index.html
│   └───── index.scss
│   └───── index.js
```

**index.js**

```js
import { getSchema } from "../../utils";
import "./index.scss";

window.refresh = function() {
  const schema = getSchema();
  const { name, position, infos } = schema;

  clearPage();
  renderHeader(name, position);
  renderInfos(infos);
};

function clearPage() {
  document.getElementById("app").innerHTML = "";
}

function renderHeader(name, position) {
  const html = `
    <header>
        <h1>${name}</h1>
        <h2>${position}</h2>
    </header>`;
  document.getElementById("app").innerHTML += html;
}

function renderInfos(infos = []) {
  if (infos?.length === 0) {
    return;
  }
  const html = `
    <ul class="infos">
    ${infos
      .map((info) => {
        return `<li>${info}</li>`;
      })
      .join("")}
    </ul>`;
  document.getElementById("app").innerHTML += html;
}

window.onload = function() {
  refresh();
};
```

</details>

<details>
    <summary>Vue</summary>

**目录结构**

```
./src
├── pages
│   └── abc
│   └───── index.html
│   └───── index.scss
│   └───── index.js
│   └───── App.vue
```

**index.js**

```js
import Vue from "vue";
import App from "./App.vue";
import "./index.scss";

Vue.config.productionTip = process.env.NODE_ENV === "development";

new Vue({
  render: (h) => h(App),
}).$mount("#app");
```

**App.vue**

```vue
<template>
  <div id="app">
    <header>
      <h1>{{ schema.name }}</h1>
      <h2>{{ schema.position }}</h2>
    </header>
    <div class="infos">
      <p v-for="(info, i) in schema.infos" :key="i">
        {{ info }}
      </p>
    </div>
  </div>
</template>

<script>
import { getSchema } from "../../utils";
export default {
  data() {
    return {
      schema: getSchema(),
    };
  },
  mounted() {
    window.refresh = this.refresh;
  },
  methods: {
    refresh() {
      this.schema = getSchema();
    },
  },
};
</script>
```

</details>

<details>
    <summary>React</summary>

**目录结构**

```
./src
├── pages
│   └── abc
│   └───── index.html
│   └───── index.scss
│   └───── index.js
│   └───── App.jsx
```

**index.js**

```js
import React from "react";
import ReactDOM from "react-dom";
import App from "./App.jsx";
import "./index.scss";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("app")
);
```

**App.jsx**

```jsx
import React, { useEffect, useState } from "react";
import { getSchema } from "../../utils";

export default function App() {
  const [schema, updateSchema] = useState(getSchema());
  const { name, position, infos = [] } = schema;
  useEffect(() => {
    window.refresh = function() {
      updateSchema(getSchema());
    };
  }, []);
  return (
    <div>
      <header>
        <h1>{name}</h1>
        <h2>{position}</h2>
      </header>
      <div className="infos">
        {infos.map((info, i) => {
          return <p key={i}>{info}</p>;
        })}
      </div>
    </div>
  );
}
```

</details>

<details>
    <summary>jQuery</summary>

**目录结构**

```
./src
├── pages
│   └── abc
│   └───── index.html
│   └───── index.scss
│   └───── index.js
```

**index.js**

```js
import { getSchema } from "../../utils";
import "./index.scss";

window.refresh = function() {
  const schema = getSchema();
  const { name, position, infos } = schema;

  clearPage();
  renderHeader(name, position);
  renderInfos(infos);
};

function clearPage() {
  $("#app").empty();
}

function renderHeader(name, position) {
  const html = `
    <header>
        <h1>${name}</h1>
        <h2>${position}</h2>
    </header>`;
  $("#app").append(html);
}

function renderInfos(infos = []) {
  if (infos?.length === 0) {
    return;
  }
  const html = `
    <ul class="infos">
    ${infos
      .map((info) => {
        return `<li>${info}</li>`;
      })
      .join("")}
    </ul>`;
  $("#app").append(html);
}

window.onload = function() {
  refresh();
};
```

</details>

如果觉得导航栏展示 abc 不友好，当然也可以更改

```
./src
├── constants
│   ├── index.js    存放路径与中文title的映射
```

**./src/constants/index.js** 中加入别名

```js
export const navTitle = {
  abc: "开发示例",
};
```

![图片](https://img.cdn.sugarat.top/mdImg/MTYxNDQ5MDMyMDA3Nw==614490320077)
