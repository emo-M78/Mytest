import { ref } from 'vue'

export const projects = ref([
    {
        id: 'proj1',
        title: '便易借',
        description: '一个完整的电子设备借用方案，包含设备展示、借用&归还、设备详情等功能。',
        longDescription: [
            '使用若依框架搭建后端系统，实现用户管理、权限控制、数据持久化等核心功能，确保系统稳定运行。',
            '基于微信小程序框架进行前端开发，实现流畅的用户交互界面，完成页面布局、数据展示与交互逻辑编写。',
            '负责前后端接口联调，保障数据传输的准确性与高效性，优化系统性能，提升用户体验。'
        ],
        imageUrl: '/images/wxlogin.png',
        images: [
            '/images/wxlogin.png',
            '/images/wxregister.png',
            '/images/borrow.png',
            '/images/deviceinfo.png',
            '/images/Users.png',
            '/images/wxinfo.png',
        ],
        githubUrl: 'https://github.com/emo-M78/Mytest',
        tags: ['Java', 'Element Plus', 'Vue 3', 'WXML'],
        technologies: [
            { name: 'Vue 3', category: '前端' },
            { name: 'Element Plus', category: '前端' },
            { name: 'Java', category: '后端' }
        ],
        features: [
            '设备在线浏览', '扫码借用', '扫码归还', '记录查询'
        ]
    },
    {
        id: 'proj2',
        title: '个人博客',
        description: '一个本地的个人网站，记录学习经验，借助Github存储代码。界面简洁，交互流畅。',
        longDescription: [
            '熟练安装与配置 Hexo 框架，依据个人需求选择适配主题，并对主题进行深度定制，包括页面布局调整、色彩风格优化等。',
            '利用 Markdown 语法进行内容创作，发布个人博客文章、项目展示等内容，实现高效的内容管理与展示。',
            '定期维护网站，排查并修复潜在的样式与功能问题，探索并应用 Hexo 插件拓展网站功能，如添加评论系统、优化 SEO 等。'
        ],
        images: [
            '/images/bianyijie_1.png',
            '/images/bianyijie_2.png',
            '/images/bianyijie_3.png',
        ],
        githubUrl: 'https://github.com/emo-M78/Mytest',
        tags: ['Github', 'Hexo'],
        technologies: [
            { name: 'Vue 3', category: '前端' },
            { name: 'Element Plus', category: '前端' },
            { name: 'Java', category: '后端' }
        ],
        features: [
            '设备在线浏览', '扫码借用', '扫码归还', '记录查询'
        ]
    },
    {
        id: 'proj3',
        title: '校园电子意见箱',
        description: '“校园电子意见箱” 项目的前后端开发，后端采用若依框架结合Java语言，前端基于微信小程序。',
        longDescription: [
            '后端开发：基于若依框架，运用 Java 语言实现用户注册登录、权限管理等基础功能；设计并搭建数据库，合理存储用户信息、意见帖子及评论数据；开发接口，保障前后端数据交互顺畅，满足业务逻辑需求。',
            '前端开发：使用微信小程序框架构建界面，实现简洁友好的交互效果，方便同学登录、发布意见及评论；处理页面跳转、数据展示等逻辑，优化用户操作体验。',
            '项目管理：完成项目相关备案工作，确保项目在个人学习测试范围内合规进行；持续测试与优化，修复潜在问题，提升系统稳定性与性能。'
        ],
        imageUrl: '/images/wxComment.png',
        images: [
            '/images/Comment.png',
            '/images/wxComment.png',
        ],
        githubUrl: 'https://github.com/emo-M78/CampusVoiceHub.git',
        tags: ['Github', 'Java', 'Element Plus', 'WXML'],
        technologies: [
            { name: 'Vue 3', category: '前端' },
            { name: 'Element Plus', category: '前端' },
            { name: 'Java', category: '后端' }
        ],
        features: [
            '设备在线浏览', '扫码借用', '扫码归还', '记录查询'
        ]
    },
])

export function findProjectById(id) {
    return projects.value.find(project => project.id === id);
}
