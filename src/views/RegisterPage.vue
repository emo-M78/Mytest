### RegisterPage.vue (注册页面)

<script setup>
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/modules/auth';
import { ElMessage, ElCard, ElForm, ElFormItem, ElInput, ElButton, ElAlert, ElLink } from 'element-plus'; // 确保导入所有使用的组件

const router = useRouter();
const authStore = useAuthStore();

const registerFormRef = ref(null);
const registerForm = reactive({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
});

const validatePass = (rule, value, callback) => {
    if (value === '') {
        callback(new Error('请输入密码'));
    } else {
        if (registerForm.confirmPassword !== '') {
            if (!registerFormRef.value) return;
            registerFormRef.value.validateField('confirmPassword');
        }
        callback();
    }
};
const validatePassConfirm = (rule, value, callback) => {
    if (value === '') {
        callback(new Error('请再次输入密码'));
    } else if (value !== registerForm.password) {
        callback(new Error("两次输入的密码不一致！"));
    } else {
        callback();
    }
};

const registerRules = reactive({
    username: [
        { required: true, message: '请输入用户名', trigger: 'blur' },
        { min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
    ],
    email: [
        { required: true, message: '请输入邮箱地址', trigger: 'blur' },
        { type: 'email', message: '请输入有效的邮箱地址', trigger: ['blur', 'change'] }
    ],
    password: [
        { required: true, validator: validatePass, trigger: 'blur' },
        { min: 6, message: '密码长度至少为6位', trigger: 'blur' }
    ],
    confirmPassword: [
        { required: true, validator: validatePassConfirm, trigger: 'blur' }
    ],
});

const isLoading = ref(false);

const handleRegister = async (formEl) => {
    if (!formEl) return;
    await formEl.validate(async (valid) => {
        if (valid) {
            isLoading.value = true;
            try {
                await authStore.register({
                    username: registerForm.username,
                    email: registerForm.email,
                    password: registerForm.password,
                });
                // ElMessage.success('注册成功！将跳转到登录页。');
                router.push({ name: 'Login' });
            } catch (error) {
                ElMessage.error(authStore.registrationError || '注册失败，请稍后再试。');
            } finally {
                isLoading.value = false;
            }
        } else {
            ElMessage.error('请检查表单输入项。');
            return false;
        }
    });
};

function goToLogin() {
    router.push({ name: 'Login' });
}
</script>

<template>
    <div class="auth-page">
        <el-card class="auth-card" header="创建新账户">
            <el-form ref="registerFormRef" :model="registerForm" :rules="registerRules" label-position="top"
                @submit.prevent="handleRegister(registerFormRef)">
                <el-form-item label="用户名" prop="username">
                    <el-input v-model="registerForm.username" placeholder="设置您的用户名" clearable />
                </el-form-item>
                <el-form-item label="邮箱地址" prop="email">
                    <el-input v-model="registerForm.email" placeholder="用于登录和接收通知" clearable />
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input v-model="registerForm.password" type="password" placeholder="设置您的登录密码 (至少6位)"
                        show-password clearable />
                </el-form-item>
                <el-form-item label="确认密码" prop="confirmPassword">
                    <el-input v-model="registerForm.confirmPassword" type="password" placeholder="请再次输入密码" show-password
                        clearable @keyup.enter="handleRegister(registerFormRef)" />
                </el-form-item>

                <el-alert v-if="authStore.registrationError" :title="authStore.registrationError" type="error" show-icon
                    :closable="false" style="margin-bottom: 20px;" />

                <el-form-item>
                    <el-button type="primary" native-type="submit" :loading="authStore.isLoading" style="width: 100%;">
                        {{ authStore.isLoading ? '注册中...' : '注 册' }}
                    </el-button>
                </el-form-item>
            </el-form>
            <div class="form-footer text-center">
                <p>
                    已经有账户了？
                    <el-link type="primary" @click="goToLogin">直接登录</el-link>
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
    padding: 20px;
    background-color: #f0f2f5;
}

.auth-card {
    width: 100%;
    max-width: 470px;
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
    margin-bottom: 20px;
}
</style>