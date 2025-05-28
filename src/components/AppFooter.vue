<script setup>
const currentYear = new Date().getFullYear();
</script>

<template>
    <div class="app-footer-content">
        <p>&amp;copy; {{ currentYear }} 你的名字或公司名. 保留所有权利.</p>
        <div class="social-links">
        </div>
    </div>
</template>

<style scoped>
.app-footer-content {
    font-size: 0.9rem;
    /* CUSTOMIZATION: 页脚文字颜色等 */
}

.social-links a {
    color: #a0aec0;
    /* CUSTOMIZATION: 社交链接颜色 */
    margin: 0 10px;
}

.social-links a:hover {
    color: #ffffff;
    /* CUSTOMIZATION: 社交链接悬停颜色 */
}
</style>