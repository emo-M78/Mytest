<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { findProjectById } from '@/data/projects'

const route = useRoute()
const projectId = route.params.id

const project = ref(findProjectById(projectId))

const projectFound = computed(() => !!project.value)
</script>

<template>
    <div class="project-detail-page container" v-if="projectFound">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ name: 'Home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ name: 'Portfolio' }">作品集</el-breadcrumb-item>
            <el-breadcrumb-item>{{ project.title }}</el-breadcrumb-item>
        </el-breadcrumb>

        <h1 class="project-title">{{ project.title }}</h1>

        <el-carousel :interval="2000" type="card" height="400px" v-if="project.images && project.images.length > 0"
            indicator-position="outside">
            <el-carousel-item v-for="img in project.images" :key="img">
                <el-image :src="img" fit="contain" style="width: 100%; height: 100%;"></el-image>
            </el-carousel-item>
        </el-carousel>

        <div class=" tags-section">
            <el-tag v-for="tag in project.tags" :key="tag" type="success" style="margin: 5px;">
                {{ tag }}
            </el-tag>
        </div>

        <div class="description-section">
            <h2>项目描述</h2>
            <ul class="description-list">
                <li v-for="(item, index) in project.longDescription" :key="index">
                    {{ item }}
                </li>
            </ul>
        </div>

        <div class="tech-section" v-if="project.technologies && project.technologies.length > 0">
            <h2>技术栈</h2>
            <el-tag v-for="tech in project.technologies" :key="tech.name" type="primary" effect="plain" size="large"
                style="margin: 5px 8px;">
                {{ tech.name }}
                <span v-if="tech.category" style="font-size: 0.8em; opacity: 0.7;"> ({{ tech.category }})</span>
            </el-tag>
        </div>
        <hr>
        <div class="links-section">
            <el-button v-if="project.githubUrl && project.githubUrl !== '#'" type="info" tag="a"
                :href="project.githubUrl" target="_blank">查看源码(GitHub仓库)</el-button>
        </div>

    </div>
    <div v-else class="container text-center">
        <el-empty description="抱歉，未找到该项目信息。">
            <el-button type="primary" @click="$router.push({ name: 'Portfolio' })">返回作品集</el-button>
        </el-empty>
    </div>
</template>

<style scoped>
hr {
    margin: 10px;
}

.project-detail-page {
    padding: 30px 0;
}

.el-breadcrumb {
    margin-bottom: 30px;
}

.project-title {
    font-size: 2.5rem;
    margin-bottom: 20px;
    text-align: center;
}

.el-carousel {
    margin-bottom: 30px;
}

.tags-section {
    margin-bottom: 30px;
    text-align: center;
}

.description-section {
    margin-bottom: 30px;
    line-height: 1.8;
}

.links-section {
    text-align: center;
}

.text-center {
    text-align: center;
    padding: 50px 0;
}
</style>