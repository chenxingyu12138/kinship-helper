# 亲戚关系助手

基于 Web 的中文亲戚称谓查询工具，支持关系链拼接、反向查询与关系图谱高亮。

## 功能

- 关系链查询：点击称谓卡片或输入如「爸爸的姐姐的儿子」
- 反向查询：输入称呼查看常见关系链
- 关系图谱：以「我」为中心的家谱视图，查询后高亮路径
- 本地运行，无需后端

## 本地使用

直接用浏览器打开 `index.html`，或在项目目录执行：

```bash
python -m http.server 8080
```

然后访问 http://localhost:8080

## 在线访问（GitHub Pages）

仓库启用 GitHub Pages 后，可通过以下地址访问（将 `用户名` 和 `仓库名` 替换为你的）：

```
https://用户名.github.io/仓库名/
```

## 技术说明

- 纯静态：`index.html` + `styles.css` + `app.js`
- 称谓算法：[relationship.js](https://github.com/mumuy/relationship)

## 许可

本项目仅供学习与交流使用。`relationship.min.js` 遵循其原项目许可协议。
