import { defineStore } from 'pinia';
import apiService from '@/services/api'; // 引入封装的 API 服务
import router from '@/router'; // 引入 Vue Router 实例用于导航
// 推荐在这里导入您使用的 UI 库的消息提示组件，例如：
import { ElMessage } from 'element-plus';

// 辅助函数：安全地从 localStorage 获取并解析用户数据
function getInitialUser() {
    const userString = localStorage.getItem('user');
    if (userString) {
        try {
            return JSON.parse(userString);
        } catch (error) {
            console.error('从 localStorage 解析用户信息失败:', error);
            localStorage.removeItem('user'); // 解析失败则移除损坏的数据
            localStorage.removeItem('token'); // 同时移除 token 保持一致
            return null;
        }
    }
    return null;
}

// 'auth' 是此 store 的唯一 ID，请确保其唯一性
export const useAuthStore = defineStore('auth', {
    state: () => ({
        // 从 localStorage 初始化用户和 token
        // *** 已修复: 使用 || 并添加了安全的 JSON.parse ***
        user: getInitialUser(),
        token: localStorage.getItem('token') || null,
        loginError: null,
        registrationError: null,
        isLoading: false,
        // CUSTOMIZATION: 可以添加更多与认证相关的状态，如用户角色、权限等
    }),

    getters: {
        // 确保 token 和 user 都存在才视为已认证
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

                // 设置 Axios 默认头最好在 apiService 的拦截器中完成。
                // 如果在那里处理，这里就不需要了。

                // 登录成功后跳转
                router.push({ name: 'Home' });

            } catch (error) {
                this.token = null;
                this.user = null;
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                // delete axios.defaults.headers.common['Authorization'];

                // *** 已修复: 使用 || ***
                this.loginError = error.response?.data?.message || '登录失败，用户名或密码错误。';
                console.error('登录失败:', error); // 增加日志记录
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

                // *** 已修复: 使用 || ***
                const successMessage = response.data.message || '注册成功！请登录。';

                // 推荐使用 UI 库的消息提示，而不是 alert
                // ElMessage.success(successMessage); 
                alert(successMessage); // 保留 alert 但建议替换

                router.push({ name: 'Login' });

            } catch (error) {
                // *** 已修复: 使用 || ***
                this.registrationError = error.response?.data?.message || '注册失败，请检查输入信息或稍后再试。';
                console.error('注册失败:', error); // 增加日志记录
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
            // delete axios.defaults.headers.common['Authorization'];

            // 退出登录后跳转到登录页
            router.push({ name: 'Login' });
        },

        // 应用加载时检查本地存储的认证状态
        checkAuthStatus() {
            const token = localStorage.getItem('token');
            const user = getInitialUser(); // 使用辅助函数获取

            if (token && user) {
                this.token = token;
                this.user = user;
                // 可以在这里再次确认 token 有效性 (可选，例如发一个请求到后端 /users/me)
                // 如果 token 无效，则调用 this.logout()
            } else if (this.token || this.user) {
                // *** 已修复: 使用 || ***
                // 如果 store 和 localStorage 不一致，则登出
                this.logout();
            }
        }
    }
});