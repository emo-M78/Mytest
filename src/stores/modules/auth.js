import { defineStore } from 'pinia';
import apiService from '@/services/api';
import router from '@/router';
import { ElMessage } from 'element-plus';

function getInitialUser() {
    const userString = localStorage.getItem('user');
    if (userString) {
        try {
            return JSON.parse(userString);
        } catch (error) {
            console.error('从 localStorage 解析用户信息失败:', error);
            localStorage.removeItem('user');
            localStorage.removeItem('token');
            return null;
        }
    }
    return null;
}

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: getInitialUser(),
        token: localStorage.getItem('token') || null,
        loginError: null,
        registrationError: null,
        isLoading: false,
    }),

    getters: {
        isAuthenticated: (state) => !!state.token && !!state.user,
        currentUser: (state) => state.user,
        // userRole: (state) => state.user ? state.user.role : null,
    },

    actions: {
        async login(credentials) {
            this.isLoading = true;
            this.loginError = null;
            try {
                const response = await apiService.login(credentials);
                const { token, user } = response.data;

                this.token = token;
                this.user = user;

                localStorage.setItem('token', token);
                localStorage.setItem('user', JSON.stringify(user));

                router.push({ name: 'Home' });

            } catch (error) {
                this.token = null;
                this.user = null;
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                // delete axios.defaults.headers.common['Authorization'];

                this.loginError = error.response?.data?.message || '登录失败，用户名或密码错误。';
                console.error('登录失败:', error);
                throw error;
            } finally {
                this.isLoading = false;
            }
        },

        async register(userData) {
            this.isLoading = true;
            this.registrationError = null;
            try {
                const response = await apiService.register(userData);

                const successMessage = response.data.message || '注册成功！请登录。';

                ElMessage.success(successMessage);

                router.push({ name: 'Login' });

            } catch (error) {
                this.registrationError = error.response?.data?.message || '注册失败，请检查输入信息或稍后再试。';
                console.error('注册失败:', error);
                throw error;
            } finally {
                this.isLoading = false;
            }
        },

        logout() {
            this.user = null;
            this.token = null;
            this.loginError = null;
            this.registrationError = null;

            localStorage.removeItem('user');
            localStorage.removeItem('token');

            router.push({ name: 'Login' });
        },

        checkAuthStatus() {
            const token = localStorage.getItem('token');
            const user = getInitialUser();

            if (token && user) {
                this.token = token;
                this.user = user;
            } else if (this.token || this.user) {
                this.logout();
            }
        }
    }
});