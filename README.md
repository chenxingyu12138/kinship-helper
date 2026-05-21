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

## 发布到 GitHub（公开访问）

### 1. 在 GitHub 创建仓库

1. 打开 https://github.com/new  
2. 仓库名例如：`kinship-helper`（可自定）  
3. 选择 **Public（公开）**  
4. **不要**勾选 “Add a README”（本地已有代码）  
5. 点击 Create repository  

### 2. 推送本地代码

在项目目录打开终端，执行（把 `你的用户名` 换成你的 GitHub 用户名）：

```bash
git remote add origin https://github.com/你的用户名/kinship-helper.git
git push -u origin main
```

### 3. 开启 GitHub Pages

1. 进入仓库 → **Settings** → **Pages**  
2. **Build and deployment** → Source 选 **GitHub Actions**  
3. 推送代码后，Actions 会自动部署（见 `.github/workflows/pages.yml`）  
4. 部署完成后，访问地址为：

```
https://你的用户名.github.io/kinship-helper/
```

该链接任何人可在浏览器打开使用。

## 技术说明

- 纯静态：`index.html` + `styles.css` + `app.js`
- 称谓算法：[relationship.js](https://github.com/mumuy/relationship)

## 许可

本项目仅供学习与交流使用。`relationship.min.js` 遵循其原项目许可协议。
