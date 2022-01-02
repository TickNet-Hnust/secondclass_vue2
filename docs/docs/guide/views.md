<!--
 * @Descripttion: 
 * @Author: peterroe
 * @Date: 2022-01-02 16:39:35
 * @LastEditors: peterroe
 * @LastEditTime: 2022-01-02 17:02:08
-->
:::info
views中存放着所有的视图页面，打感叹号的都值得你注意一下
:::

```shell
├─ views         
│  ├─ applications  # 二课所有重要的页面的都在这里！
│  ├─ components    # 不重要
│  ├─ dashboard     # 不重要
│  ├─ error         # 不重要
│  ├─ home          # 首页的页面！
│  ├─ monitor       # 不重要
│  ├─ system        # 系统管理的页面！
│  ├─ tool          # 不重要
│  ├─ index_v1.vue  # 没啥用
│  ├─ index.vue     # 没啥用
│  ├─ login.bak.vue # login.vue的复制品，没啥用
│  ├─ login.vue     # 登录页面！
│  └─ redirect.vue  # 不重要
```

## 蓝色侧边栏

蓝色侧边栏的位置在：/src/layout/index.vue

```vue
<div class="avatar" @click="logout">
    注销
</div>
<div
    v-if="device === 'mobile' && sidebar.opened"
    class="drawer-bg"
    @click="handleClickOutside"
/>
<!-- sidebar是蓝色侧边栏 -->
<sidebar
    class="sidebar-container"
    :style="{
        backgroundColor:
            sideTheme === 'theme-dark'
                ? variables.menuBg
                : variables.menuLightBg
    }"
/>
<!-- <router-view是右边的内容 -->
<router-view></router-view>
```

主要有两部分组成：

![img](https://img-blog.csdnimg.cn/16f36df409d84a4b9fb4a556a37e4420.png)

## 首页

首页的位置在：/src/views/home/index.vue

```vue
<!-- Menubar是左侧侧边栏 -->
<Menubar />  
<div
    style=" ;"
    :class="{ hasTagsView: needTagsView }"
    class="main-container"
>
    <div :class="{ 'fixed-header': fixedHeader }">
    <!-- tags-view是动态标签 -->
        <tags-view v-if="needTagsView" />
    </div>
    <!-- appMain是中间的内容 -->
    <app-main />
</div>
```
对应的页面：

![img](https://img-blog.csdnimg.cn/47c31e01dd5145b99183defe3dac3553.png)