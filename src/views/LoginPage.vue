<script setup>
import { ref, reactive, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/modules/auth';
import { ElMessage, ElCard, ElForm, ElFormItem, ElInput, ElButton, ElAlert, ElLink } from 'element-plus';
const router = useRouter();
const authStore = useAuthStore();

const loginFormRef = ref(null);
const loginForm = reactive({
    username: '',
    password: '',
});

const loginRules = reactive({
    username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
    password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
});

const isLoading = ref(false);

const handleLogin = async (formEl) => {
    if (!formEl) return;
    await formEl.validate(async (valid) => {
        if (valid) {
            isLoading.value = true;
            try {
                await authStore.login({
                    username: loginForm.username,
                    password: loginForm.password,
                });
                ElMessage.success('登录成功！');
            } catch (error) {
                ElMessage.error(authStore.loginError || '登录失败，请检查您的凭据。');
            } finally {
                isLoading.value = false;
            }
        } else {
            ElMessage.error('请检查表单输入项。');
            return false;
        }
    });
};

function goToRegister() {
    router.push({ name: 'Register' });
}

onMounted(() => {
    if (authStore.isAuthenticated) {
        ElMessage.info('您已登录，将跳转到首页。');
        router.replace({ name: 'Home' });
    }
});
</script>

<template>
    <div class="main-wrapper">
        <div class="auth-page">
            <el-card class="auth-card" header="用户登录">
                <el-form ref="loginFormRef" :model="loginForm" :rules="loginRules" label-position="top"
                    @submit.prevent="handleLogin(loginFormRef)">
                    <el-form-item label="用户名" prop="username">
                        <el-input v-model="loginForm.username" placeholder="请输入用户名" clearable />
                    </el-form-item>
                    <el-form-item label="密码" prop="password">
                        <el-input v-model="loginForm.password" type="password" placeholder="请输入密码" show-password
                            clearable @keyup.enter="handleLogin(loginFormRef)" />
                    </el-form-item>

                    <el-alert v-if="authStore.loginError" :title="authStore.loginError" type="error" show-icon
                        :closable="false" style="margin-bottom: 20px;" />

                    <el-form-item>
                        <el-button type="primary" native-type="submit" :loading="authStore.isLoading"
                            style="width: 100%;">
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
    </div>
</template>

<style scoped>
.auth-page {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: calc(95vh - 128px);
    padding: 20px;
    background-image: linear-gradient(to top, #accbee 0%, #e7f0fd 100%);
}

.auth-card {
    width: 100%;
    max-width: 430px;
    border-radius: 8px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.form-footer {
    margin-top: 20px;
    text-align: center;
}

.form-footer p {
    font-size: 0.9rem;
    color: #606266;
}

.el-form-item {
    margin-bottom: 22px;
}
</style>
