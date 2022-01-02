/*
 * @Descripttion: 
 * @Author: peterroe
 * @Date: 2022-01-02 15:08:30
 * @LastEditors: peterroe
 * @LastEditTime: 2022-01-02 15:18:59
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
                    { text: 'What is VitePress?', link: '/guide/dir' },
                    { text: 'Getting Started', link: '/guide/getting-started' },
                    { text: 'Configuration', link: '/guide/configuration' },
                    { text: 'Asset Handling', link: '/guide/assets' },
                    { text: 'Markdown Extensions', link: '/guide/markdown' },
                    { text: 'Using Vue in Markdown', link: '/guide/using-vue' },
                    { text: 'Deploying', link: '/guide/deploy' }
                ]
            }, {
                text: 'Introdudction',
                children: [
                    { text: 'What is VitePress?', link: '/' },
                    { text: 'Getting Started', link: '/guide/getting-started' },
                    { text: 'Configuration', link: '/guide/configuration' },
                    { text: 'Asset Handling', link: '/guide/assets' },
                    { text: 'Markdown Extensions', link: '/guide/markdown' },
                    { text: 'Using Vue in Markdown', link: '/guide/using-vue' },
                    { text: 'Deploying', link: '/guide/deploy' }
                ]
            }, ]
        }
    }
}