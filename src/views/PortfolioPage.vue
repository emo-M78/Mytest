<script setup>
import PortfolioItem from '@/components/PortfolioItem.vue'
import { projects } from '@/data/projects.js'
</script>

<template>
    <div class="main-wrapper">
        <div class="portfolio-page container">
            <h1 class="page-title text-center">我的作品集</h1>
            <p class="page-intro text-center">
                这里展示了我参与完成的一些项目。
                每一个项目都代表了我在特定阶段的学习成果和技术实践。<br>
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
    </div>

</template>

<style scoped>
.portfolio-page {
    padding: 30px 20px 50px 20px;
    height: 100%;
}

.page-title {
    font-size: 2.5rem;
    color: var(--el-text-color-primary);
    margin-bottom: 20px;
    font-weight: 600;
    position: relative;
    display: inline-block;
    padding-bottom: 5px;
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