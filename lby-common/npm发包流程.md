把自己写的包发布到 **npm** 其实就是几个步骤，
你可以理解成 **“打包 → 登录 → 上传”**，我给你一个详细流程，按这个走基本不会出错。

---

## 1️⃣ 先准备你的包

假设你已经写好了一个包，项目结构大概是：

```
my-package/
 ├─ package.json
 ├─ index.js
 ├─ README.md
 └─ ...
```

**检查 `package.json` 必须有：**

```json
{
  "name": "your-package-name",  // 包名，全网唯一
  "version": "1.0.0",           // 版本号
  "description": "你的包的描述",
  "main": "index.js",           // 入口文件
  "keywords": ["关键字1", "关键字2"],
  "author": "你的名字",
  "license": "MIT"
}
```

> **注意：**
>
> * `name` 必须全网唯一，可以先去 [npmjs.com](https://www.npmjs.com/) 搜一下有没有重名。
> * 如果你想私有发布，加 `"private": true` 或者用作用域包（`@yourname/package`）。

---

## 2️⃣ 注册 & 登录 npm

如果你没 npm 账号：

```bash
npm adduser
```

然后按提示输入：

* 用户名
* 密码
* 邮箱（必须是能收到邮件的，因为需要验证）

如果已有账号：

```bash
npm login
```

---

## 3️⃣ 检查 npm 镜像

国内很多人用淘宝镜像，但淘宝镜像不能发布，要切回官方源：

```bash
npm config set registry https://registry.npmjs.org/
```

---

## 4️⃣ 发布包

直接运行：

```bash
npm publish
```

如果是作用域包（例如 `@boyuli/my-package`）并且要公开发布：

```bash
npm publish --access public
```

---

## 5️⃣ 更新包

改了代码后：

1. 修改 `package.json` 里的 `version`（必须递增）
2. 再次：

```bash
npm publish
```

---

## 6️⃣ 删除包（谨慎）

```bash
npm unpublish your-package-name --force
```

> 注意：npm 规定 72 小时后不能删除，只能废弃（`npm deprecate`）。

---

💡 **小建议：**

* 发布前跑一下 `npm pack`，看看打包出来的 tar 文件内容，避免把不该传的文件（比如 `.env`、源码大文件）传上去。
* 用 `.npmignore` 或 `package.json` 里的 `files` 字段控制发布内容。

---

如果你需要的话，我可以帮你写一个 **最简 npm 包项目模板**，直接复制就能发布成功。

