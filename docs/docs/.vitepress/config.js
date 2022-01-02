/*
 * @Descripttion: 
 * @Author: peterroe
 * @Date: 2022-01-02 15:08:30
 * @LastEditors: peterroe
 * @LastEditTime: 2022-01-02 16:39:46
 */
export default {
    title: '第二课堂管理端文档',
    themeConfig: {
        nav: [
            { text: 'Guide', link: '/', activeMatch: '^/$|^/guide/' },
            {
                text: 'Config Reference',
                link: '/config/basics',
                activeMatch: '^/config/'
            },
            {
                text: 'Address',
                link: 'https://github.com/vuejs/vitepress/releases'
            }

        ],
        sidebar: {
            '/': [{
                text: '引导',
                children: [
                    { text: '安装与启动', link: '/guide/dir' },
                    { text: '本地开发', link: '/guide/dev' }
                ]
            }, {
                text: '目录结构',
                children: [
                    { text: 'src', link: '/guide/src' },
                    { text: 'src/views', link: '/guide/views' },
                ]
            }, ]
        }
    }
}