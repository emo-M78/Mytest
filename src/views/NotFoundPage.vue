<script setup>
import { useRouter } from 'vue-router';
const router = useRouter();

function goHome() {
    router.push({ name: 'Home' });
}
</script>

<template>
    <div class="not-found-page text-center">
        <el-result icon="error" title="404 - 页面未找到" sub-title="抱歉，您访问的页面不存在或已被移除。">
            <template #extra>
                <el-button type="primary" @click="goHome">返回首页</el-button>
            </template>
        </el-result>
    </div>
</template>

<style scoped>
.not-found-page {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: calc(100vh - 128px);
    padding: 20px;
}

.not-found-image {
    max-width: 300px;
    margin-top: 30px;
}
</style>