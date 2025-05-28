<script setup>
import { useRouter } from 'vue-router' // 导入 useRouter

const router = useRouter() // 获取 router 实例

// 定义 props (保持不变)
const props = defineProps({
    id: String,
    title: String,
    description: String,
    imageUrl: String,
    projectUrl: String,
    tags: Array
})

// 定义跳转函数
function viewDetails() {
    router.push({
        name: 'ProjectDetail', // 使用我们定义的路由名字
        params: { id: props.id } // 传递项目 id 作为参数
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
/* 样式保持不变 */
.portfolio-item-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
    transition: all 0.3s ease-in-out;
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