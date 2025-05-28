<script setup>
import { ref, reactive, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/modules/auth';
import { ElMessage, ElCard, ElForm, ElFormItem, ElInput, ElButton, ElAlert, ElLink } from 'element-plus'; // 确保导入所有使用的组件

const router = useRouter();
const authStore = useAuthStore();

const loginFormRef = ref(null);
const loginForm = reactive({
    username: '', // CUSTOMIZATION: 可以改为 email 或其他登录凭据字段
    password: '',
});

// CUSTOMIZATION: 表单验证规则
const loginRules = reactive({
    username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
    password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
});

// 使用 authStore 的 isLoading 状态，或者在这里维护一个本地状态
// 如果 authStore.isLoading 是全局的，那么用它更好
// const isLoading = ref(false); // 如果 authStore 中没有 isLoading，则使用本地的

const handleLogin = async (formEl) => {
    if (!formEl) return;
    await formEl.validate(async (valid) => {
        if (valid) {
            // isLoading.value = true; // 如果使用本地 isLoading
            try {
                await authStore.login({
                    username: loginForm.username,
                    password: loginForm.password,
                });
                // 登录成功后，authStore.login action 内部会处理跳转
                ElMessage.success('登录成功！');
            } catch (error) {
                // *** 已修复: 取消注释 ElMessage.error ***
                ElMessage.error(authStore.loginError || '登录失败，请检查您的凭据。');
            } finally {
                // isLoading.value = false; // 如果使用本地 isLoading
            }
        } else {
            ElMessage.error('请检查表单输入项。');
            return false;
        }
    });
};

function goToRegister() {
    router.push({ name: 'Register' }); // 确保您有 'Register' 路由
}

// 组件挂载时检查认证状态，如果已登录则跳转
onMounted(() => {
    if (authStore.isAuthenticated) {
        ElMessage.info('您已登录，将跳转到首页。');
        router.replace({ name: 'Home' }); // 如果已登录，重定向到首页
    }
});
</script>

<template>
    <div class="auth-page">
        <el-card class="auth-card" header="用户登录">
            <el-form ref="loginFormRef" :model="loginForm" :rules="loginRules" label-position="top"
                @submit.prevent="handleLogin(loginFormRef)">
                <el-form-item label="用户名" prop="username">
                    <el-input v-model="loginForm.username" placeholder="请输入用户名或邮箱" clearable />
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input v-model="loginForm.password" type="password" placeholder="请输入密码" show-password clearable
                        @keyup.enter="handleLogin(loginFormRef)" />
                </el-form-item>

                <el-alert v-if="authStore.loginError" :title="authStore.loginError" type="error" show-icon
                    :closable="false" style="margin-bottom: 20px;" />

                <el-form-item>
                    <el-button type="primary" native-type="submit" :loading="authStore.isLoading" style="width: 100%;">
                        {{ authStore.isLoading ? '登录中...' : '登 录' }}
                    </el-button>
                </el-form-item>
            </el-form>
            <div class="form-footer text-center">
                <p>
                    还没有账户？
                    <el-link type="primary" @click="goToRegister">立即注册</el-link>
                </p>
            </div>
        </el-card>
    </div>
</template>

<style scoped>
.auth-page {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: calc(100vh - 128px);
    /* 减去页眉页脚大致高度 (需要根据您的实际布局调整) */
    padding: 20px;
    background-color: #f0f2f5;
    /* 背景色 */
}

.auth-card {
    width: 100%;
    max-width: 400px;
    border-radius: 8px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    /* 添加一点阴影 */
}

.el-card__header {
    /* 注意：这样选择器可能不会生效，因为 el-card__header 是内部元素，最好通过 :deep() 或全局样式修改 */
    font-size: 1.5rem;
    text-align: center;
    font-weight: 500;
}

.form-footer {
    margin-top: 20px;
    text-align: center;
    /* 确保居中 */
}

.form-footer p {
    font-size: 0.9rem;
    color: #606266;
}

.el-form-item {
    margin-bottom: 22px;
}
</style>

---
