### Vue 项目开发步骤

#### 一、项目初始化
1. 安装 `Vue` 脚手架
    ```js
    npm install -g @vue/cli
    // 或者
    yarn global add @vue/cli
    ```
2. 通过 `Vue` 脚手架创建项目
    ```js
    vue create my-project
    # 或者
    vue ui
    ```
3. 配置 `Vue` 路由
4. 配置 `Element-UI` 组件库
5. 配置 `Axios` 库
6. 初始化 `git`远程仓库并托管到远端仓库
    ```js
    ssh-keygen -t rsa -C "xxxxx@xxxxx.com"  
    #Generating public/private rsa key pair...
    ```
    按照提示完成三次回车，即可生成 ssh key。通过查看 `~/.ssh/id_rsa.pub` 文件内容，获取到你的 public key
    `cat ~/.ssh/id_rsa.pub`
    ![](./ssh-keygen.png)
    复制ssh key然后 「管理」->「部署公钥管理」->「添加部署公钥」

    git 全局设置：
    ```js
    git config --global user.name "pdeng"
    git config --global user.email "635639654@qq.com"
    ```
    如果本地**已经有了**仓库：
    ```js
    cd existing_git_repo
    git remote add origin https://gitee.com/idenpin/vue-ui-test.git
    git push -u origin master
    ```
    创建 git 仓库：
    ```js
    mkdir vue-ui-test
    cd vue-ui-test
    git init
    touch README.md
    git add README.md
    git commit -m "first commit"
    git remote add origin https://gitee.com/idenpin/vue-ui-test.git
    git push -u origin master
    ```
    