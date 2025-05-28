<script setup>
import { ref } from 'vue'
// **** 关键修改：导入正确的组件 ****
import PortfolioItem from '@/components/PortfolioItem.vue'

const projects = ref([
    {
        id: 'proj1',
        title: '项目一：电子商务平台',
        description: '一个完整的电子商务解决方案，包含商品展示、购物车、支付系统等功能。前端使用Vue 3和Element Plus构建，后端采用Node.js和MongoDB。',
        imageUrl: '/images/project-placeholder.png',
        projectUrl: '#',
        tags: ['Vue 3', 'Element Plus', 'Node.js']
    },
    {
        id: 'proj2',
        title: '项目二：在线协作白板',
        description: '一款实现在线协作绘图和笔记功能的Web应用。后端采用Node.js和WebSocket实现实时同步。前端使用Fabric.js进行画布操作。',
        imageUrl: '/images/project-placeholder.png',
        projectUrl: '#',
        tags: ['WebSocket', 'Fabric.js', '实时协作']
    },
    {
        id: 'proj3',
        title: '项目三：UI组件库实践',
        description: '为了深入理解组件化开发和UI设计原则，我构建了一个小型的个人UI组件库，包含常用的按钮、卡片、模态框等组件。',
        imageUrl: '/images/project-placeholder.png',
        projectUrl: '#',
        tags: ['Vue 3', '组件化', 'UI设计']
    },
    {
        id: 'proj4',
        title: '项目四：数据可视化仪表盘',
        description: '使用ECharts和Vue 3开发的一个数据可视化仪表盘，用于展示和分析销售数据。支持多种图表类型和数据筛选功能。',
        imageUrl: '/images/project-placeholder.png',
        projectUrl: '#',
        tags: ['Vue 3', 'ECharts', '数据可视化']
    }
])
</script>

<template>
    <div class="portfolio-page container">
        <h1 class="page-title text-center">我的作品集</h1>
        <p class="page-intro text-center">
            这里展示了我参与和独立完成的一些精选项目，涵盖了不同的技术栈和应用领域。
            每一个项目都代表了我在特定阶段的学习成果和技术实践，希望能展现我的技术能力和对细节的追求。
            欢迎浏览，并随时与我联系交流！
        </p>

        <el-row :gutter="30">
            <el-col v-for="project in projects" :key="project.id" :xs="24" :sm="12" :md="8"
                style="margin-bottom: 30px;">
                <PortfolioItem :id="project.id" :title="project.title" :description="project.description"
                    :image-url="project.imageUrl" :project-url="project.projectUrl" :tags="project.tags" />
            </el-col>
        </el-row>

        <div v-if="projects.length === 0" class="empty-state text-center">
            <el-empty description="暂无项目展示，敬请期待！" />
        </div>
    </div>
</template>

<style scoped>
/* 样式保持不变 */
.portfolio-page {
    padding-top: 30px;
    padding-bottom: 50px;
}

.page-title {
    font-size: 2.5rem;
    color: var(--el-text-color-primary);
    margin-bottom: 20px;
    font-weight: 600;
    position: relative;
}

.page-title::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 3px;
    background-color: var(--el-color-primary);
}

.page-intro {
    font-size: 1.1rem;
    color: var(--el-text-color-regular);
    max-width: 800px;
    margin: 0 auto 40px;
    line-height: 1.8;
}

.empty-state {
    padding: 40px 0;
}

@media (max-width: 768px) {
    .page-title {
        font-size: 2rem;
    }

    .page-intro {
        font-size: 1rem;
        padding: 0 15px;
    }

    .el-col {
        padding: 0 15px;
    }
}
</style>