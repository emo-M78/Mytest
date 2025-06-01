import axios from 'axios';
import { useAuthStore } from '@/stores/modules/auth';

const apiClient = axios.create({
    baseURL: 'http://localhost:3000/api',
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 10000,
});

apiClient.interceptors.request.use(
    (config) => {
        try {
            const authStore = useAuthStore();
            const token = authStore.token;

            if (token && config.headers) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        } catch (error) {
            console.warn("无法在 Axios 请求拦截器中获取 Auth Store。Pinia 可能尚未初始化。", error);
        }
        return config;
    },
    (error) => {
        console.error('Request Error:', error);
        return Promise.reject(error);
    }
);

apiClient.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        console.error('Response Error:', error.response || error.message);

        if (error.response && error.response.status === 401) {
            console.warn('捕获到 401 未授权错误，准备处理登出...');
            try {
                const authStore = useAuthStore();
                authStore.logout();
                console.error('会话已过期，请重新登录。');
            } catch (storeError) {
                console.error("处理 401 错误时无法访问 Auth Store 或执行登出。", storeError);
            }
        }
        return Promise.reject(error);
    }
);

const mockUsers = [
    { id: 1, username: 'testuser', email: 'testuser@example.com', password: 'password123' /* 实际项目中密码应哈希存储 */ }
];
let mockToken = 'mock-jwt-token-12345abc';

export default {
    login(credentials) {
        console.warn('正在使用模拟登录 API。');
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const user = mockUsers.find(u => u.username === credentials.username && u.password === credentials.password);
                if (user) {
                    const { password, ...userWithoutPassword } = user;
                    resolve({
                        data: {
                            token: mockToken,
                            user: userWithoutPassword
                        }
                    });
                } else {
                    reject({
                        response: {
                            data: { message: '用户名或密码无效。' },
                            status: 401
                        }
                    });
                }
            }, 1000);
        });
    },

    register(userData) {
        console.warn('正在使用模拟注册 API。');
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
    },

    getPortfolioProjects() {
        console.warn('正在使用模拟获取作品集 API。');
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    data: [
                        { id: 'p1', title: '模拟项目A', description: '这是一个使用 Vue 和 Element Plus 构建的示例项目。', imageUrl: '/images/project-placeholder.png', tags: ['Vue', 'ElementPlus', 'Mock'] },
                        { id: 'p2', title: '模拟项目B', description: '这是项目B，它使用了先进的模拟技术。', imageUrl: '/images/project-placeholder.png', tags: ['API', 'Axios'] },
                        { id: 'p3', title: '模拟项目C', description: '项目C 展示了数据可视化能力。', imageUrl: '/images/project-placeholder.png', tags: ['Charts', 'Data'] },
                    ]
                });
            }, 500);
        });

    },


    submitContactForm(formData) {
        console.warn('正在使用模拟提交联系表单 API。');
        return new Promise((resolve) => {
            setTimeout(() => {
                console.log("模拟接收到联系表单数据:", formData);
                resolve({
                    data: {
                        message: "表单已成功提交！"
                    }
                });
            }, 1200);
        });
    }
};
