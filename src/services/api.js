import axios from 'axios';
import { useAuthStore } from '@/stores/modules/auth'; // 用于获取 token
// 如果需要在拦截器中使用 ElMessage，理论上不推荐，但如果要用，需要导入
// import { ElMessage } from 'element-plus';

// CUSTOMIZATION: 将 baseURL 替换为您的实际后端 API 地址
const apiClient = axios.create({
    baseURL: 'http://localhost:5173/api', // 示例: 假设您的后端API在本地3000端口
    // baseURL: 'https://api.example.com/v1', // 生产环境示例
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 10000, // 添加一个合理的超时时间
});

// CUSTOMIZATION: 请求拦截器 - 在每个请求发送前执行
apiClient.interceptors.request.use(
    (config) => {
        // 注意：在拦截器中直接调用 useAuthStore() 可能存在风险，
        // 确保 Pinia 在此文件被导入和使用时已经初始化。
        // 在大部分情况下这能工作，但如果遇到问题，考虑在 Vue 插件或 main.js 中设置拦截器。
        try {
            const authStore = useAuthStore(); // 获取 Pinia store 实例
            const token = authStore.token; // 从 store 获取 token

            if (token && config.headers) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        } catch (error) {
            console.warn("无法在 Axios 请求拦截器中获取 Auth Store。Pinia 可能尚未初始化。", error);
        }
        return config;
    },
    (error) => {
        // 对请求错误做些什么
        console.error('Request Error:', error);
        return Promise.reject(error);
    }
);

// CUSTOMIZATION: 响应拦截器 - 在接收到响应后执行
apiClient.interceptors.response.use(
    (response) => {
        // 2xx 范围内的状态码都会触发该函数。
        // 对响应数据做点什么，例如可以直接返回 response.data
        return response;
    },
    (error) => {
        // 超出 2xx 范围的状态码都会触发该函数。
        // 对响应错误做点什么
        console.error('Response Error:', error.response || error.message);

        if (error.response && error.response.status === 401) {
            // CUSTOMIZATION: 处理未授权错误，例如 token 过期
            console.warn('捕获到 401 未授权错误，准备处理登出...');
            try {
                const authStore = useAuthStore();
                authStore.logout(); // 调用登出 action
                // ElMessage.error('会话已过期，请重新登录。'); // 推荐在 UI 层处理
                // alert('会话已过期，请重新登录。'); // 避免使用 alert
                console.error('会话已过期，请重新登录。'); // 在控制台提示
                // 这里的跳转逻辑最好也在 authStore.logout 或更高层处理
                // router.push('/login');
            } catch (storeError) {
                console.error("处理 401 错误时无法访问 Auth Store 或执行登出。", storeError);
            }
        }

        // 将错误继续抛出，以便调用者可以捕获和处理
        return Promise.reject(error);
    }
);

// === 模拟 API 服务 ===
// CUSTOMIZATION: 以下所有 API 调用都应替换为真实的后端 API 端点和逻辑

// 模拟用户数据库 (仅用于演示，实际项目中绝不应如此处理用户数据)
const mockUsers = [
    { id: 1, username: 'testuser', email: 'testuser@example.com', password: 'password123' /* 实际项目中密码应哈希存储 */ }
];
let mockToken = 'mock-jwt-token-12345abc';

export default {
    // === 用户登录 ===
    login(credentials) {
        console.warn('正在使用模拟登录 API。请替换为真实的后端 API 调用。');
        return new Promise((resolve, reject) => {
            setTimeout(() => { // 模拟网络延迟
                const user = mockUsers.find(u => u.username === credentials.username && u.password === credentials.password);
                if (user) {
                    const { password, ...userWithoutPassword } = user; // 不返回密码
                    resolve({
                        data: {
                            token: mockToken, // CUSTOMIZATION: 后端应生成真实的 JWT
                            user: userWithoutPassword
                        }
                    });
                } else {
                    reject({
                        response: { // 模拟 Axios 错误响应结构
                            data: { message: '用户名或密码无效。' },
                            status: 401
                        }
                    });
                }
            }, 1000);
        });
        // 真实 API 调用示例:
        // return apiClient.post('/auth/login', credentials);
    },

    // === 用户注册 ===
    register(userData) {
        console.warn('正在使用模拟注册 API。请替换为真实的后端 API 调用。');
        return new Promise((resolve, reject) => {
            setTimeout(() => { // 模拟网络延迟
                if (mockUsers.some(u => u.username === userData.username) || mockUsers.some(u => u.email === userData.email)) {
                    reject({
                        response: {
                            data: { message: '用户名或邮箱已被注册。' },
                            status: 409 // Conflict
                        }
                    });
                    return;
                }
                const newUser = {
                    id: mockUsers.length + 1,
                    username: userData.username,
                    email: userData.email,
                    password: userData.password, // 实际项目中密码应哈希处理
                };
                mockUsers.push(newUser);
                const { password, ...userWithoutPassword } = newUser;
                resolve({
                    data: {
                        message: '用户注册成功！请登录。',
                        user: userWithoutPassword
                    }
                });
            }, 1000);
        });
        // 真实 API 调用示例:
        // return apiClient.post('/auth/register', userData);
    },

    // === 获取作品集数据 (示例) ===
    getPortfolioProjects() {
        console.warn('正在使用模拟获取作品集 API。请替换为真实的后端 API 调用。');
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    data: [ // *** 已修复: 添加了 [ 和第一个项目 ***
                        { id: 'p1', title: '模拟项目A', description: '这是一个使用 Vue 和 Element Plus 构建的示例项目。', imageUrl: '/images/project-placeholder.png', tags: ['Vue', 'ElementPlus', 'Mock'] },
                        { id: 'p2', title: '模拟项目B', description: '这是项目B，它使用了先进的模拟技术。', imageUrl: '/images/project-placeholder.png', tags: ['API', 'Axios'] },
                        { id: 'p3', title: '模拟项目C', description: '项目C 展示了数据可视化能力。', imageUrl: '/images/project-placeholder.png', tags: ['Charts', 'Data'] },
                    ]
                });
            }, 500);
        });
        // 真实 API 调用示例:
        // return apiClient.get('/portfolio/projects');
    },

    // === 提交联系表单 (示例) ===
    submitContactForm(formData) {
        console.warn('正在使用模拟提交联系表单 API。请替换为真实的后端 API 调用。');
        return new Promise((resolve) => {
            setTimeout(() => {
                console.log("模拟接收到联系表单数据:", formData);
                resolve({
                    data: {
                        message: "表单已成功提交 (模拟)！"
                    }
                });
            }, 1200);
        });
        // 真实 API 调用示例:
        // return apiClient.post('/contact', formData);
    }

    // CUSTOMIZATION: 根据您的后端 API 设计，添加更多方法
    // 例如：获取用户信息、更新用户信息等
    // getUserProfile() {
    //   return apiClient.get('/users/me');
    // },
};

// 您也可以选择导出 apiClient 实例，以便在需要时直接使用
// export { apiClient };