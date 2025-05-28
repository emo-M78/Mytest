<script setup>
// 定义这个组件接收哪些属性 (props)
defineProps({
    id: String,
    title: String,
    description: String,
    imageUrl: String,
    projectUrl: String,
    tags: Array
})
</script>

<template>
    <el-card class="portfolio-item-card" shadow="hover">
        <img :src="imageUrl || '/images/project-placeholder.png'" class="image" alt="Project Image">
        <div style="padding: 14px;">
            <h3>{{ title }}</h3>
            <p class="description">{{ description }}</p>
            <div class="bottom">
                <div class="tags">
                    <el-tag v-for="tag in tags" :key="tag" type="info" size="small"
                        style="margin-right: 5px; margin-bottom: 5px;">
                        {{ tag }}
                    </el-tag>
                </div>
                <el-button type="primary" link :href="projectUrl" target="_blank" class="button">查看详情</el-button>
            </div>
        </div>
    </el-card>
</template>

<style scoped>
.portfolio-item-card {
    height: 100%;
    display: flex;
    flex-direction: column;
}

.image {
    width: 100%;
    height: 200px;
    object-fit: cover;
    display: block;
}

.description {
    font-size: 0.9rem;
    color: #606266;
    line-height: 1.5;
    margin-bottom: 15px;
    min-height: 60px;
}

.bottom {
    margin-top: 13px;
    line-height: 12px;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    flex-wrap: wrap;
    flex-grow: 1;
}

.tags {
    margin-bottom: 10px;
}

.button {
    padding: 0;
    min-height: auto;
    align-self: flex-end;
}
</style>