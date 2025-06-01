<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const props = defineProps({
    id: String,
    title: String,
    description: String,
    imageUrl: String,
    projectUrl: String,
    tags: Array
})

function viewDetails() {
    router.push({
        name: 'ProjectDetail',
        params: { id: props.id }
    })
}
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
                <el-button type="primary" link @click="viewDetails" class="button">
                    查看详情
                </el-button>
            </div>
        </div>
    </el-card>
</template>

<style scoped>
.portfolio-item-card:hover {
    transform: translateY(-20px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
    transition: all 0.3s ease-in-out;
    background-image: linear-gradient(to top, #fff1eb 0%, #ace0f9 100%);
}

.portfolio-item-card {
    transition: all 0.3s ease-in-out;
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
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    justify-content: space-between;
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