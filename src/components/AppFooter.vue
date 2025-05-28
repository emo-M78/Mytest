<script setup>
const currentYear = new Date().getFullYear();
</script>

<template>
    <div class="app-footer-content">
        <p>&copy; {{ currentYear }} 范杰-24P1120108054.</p>
        <div class="social-links">
        </div>
    </div>
</template>

<style scoped>
.app-footer-content {
    font-size: 0.9rem;
}

.social-links a {
    color: #a0aec0;
    margin: 0 10px;
}

.social-links a:hover {
    color: #ffffff;
}
</style>