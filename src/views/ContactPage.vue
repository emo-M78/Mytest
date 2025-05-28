<script setup>
import { ref, reactive } from 'vue';
import { ElMessage, ElForm, ElInput, ElButton, ElRow, ElCol, ElFormItem, ElCard, ElIcon, ElLink, ElDivider } from 'element-plus'; // 按需导入 Element Plus 组件
import { Message, Phone, Location, Promotion, User, Link as LinkIcon } from '@element-plus/icons-vue'; // 导入所需图标

// 表单引用
const contactFormRef = ref(null);

// 表单数据模型
const contactForm = reactive({
    name: '',
    email: '',
    subject: '',
    message: '',
});

// 表单验证规则
const formRules = reactive({
    name: [{ required: true, message: '请输入您的姓名', trigger: 'blur' }],
    email: [
        { required: true, message: '请输入您的邮箱地址', trigger: 'blur' },
        { type: 'email', message: '请输入有效的邮箱地址', trigger: ['blur', 'change'] },
    ],
    subject: [{ required: true, message: '请输入邮件主题', trigger: 'blur' }],
    message: [{ required: true, message: '请输入邮件内容', trigger: 'blur' }],
});

// 提交状态
const isSubmitting = ref(false);

// 联系信息 (请替换为您的真实信息)
const contactInfo = reactive({
    email: 'your.email@example.com',
    phone: '+86 138 0013 8000',
    address: '中国，北京市，某某区，某某街道123号',
    // 社交链接示例 (请替换或添加您的链接)
    // 使用 'icon' 属性存储导入的图标组件
    social: [
        { name: 'GitHub', url: 'https://github.com/yourusername', icon: User }, // 使用导入的图标
        { name: '个人网站', url: 'https://yourwebsite.com', icon: LinkIcon },
        // 您可以添加更多社交链接...
    ]
});

// 表单提交处理
const handleSubmit = async () => {
    const formEl = contactFormRef.value;
    if (!formEl) return;

    await formEl.validate(async (valid) => {
        if (valid) {
            isSubmitting.value = true;
            try {
                // --- 在这里实现您的表单提交逻辑 ---
                // 例如：使用 Axios 或 fetch 发送邮件或保存到后端
                console.log('表单数据:', { ...contactForm }); // 使用展开运算符复制数据，避免直接修改
                await new Promise(resolve => setTimeout(resolve, 1500)); // 模拟网络请求

                ElMessage.success('感谢您的留言，我会尽快回复您！');
                formEl.resetFields(); // 提交成功后重置表单
                // --- 提交逻辑结束 ---
            } catch (error) {
                console.error('提交失败:', error);
                ElMessage.error('抱歉，留言发送失败，请稍后再试。');
            } finally {
                isSubmitting.value = false;
            }
        } else {
            ElMessage.error('请检查表单输入项！');
        }
    });
};

// 重置表单 (可选，如果需要手动重置按钮)
const resetForm = () => {
    contactFormRef.value?.resetFields();
};
</script>

<template>
    <div class="contact-page container">
        <h1 class="page-title text-center">联系我</h1>
        <p class="page-intro text-center">
            如果您有任何项目合作意向、技术交流或者只是想打个招呼，都非常欢迎通过以下方式联系我。
            我期待与您的交流！
        </p>

        <el-row :gutter="50">
            <el-col :xs="24" :md="12" class="contact-form-section">
                <h2 class="section-subtitle">发送消息给我</h2>
                <el-form ref="contactFormRef" :model="contactForm" :rules="formRules" label-position="top"
                    @submit.prevent="handleSubmit">
                    <el-form-item label="您的姓名" prop="name">
                        <el-input v-model.trim="contactForm.name" placeholder="例如：张三" clearable>
                            <template #prefix>
                                <el-icon>
                                    <User />
                                </el-icon>
                            </template>
                        </el-input>
                    </el-form-item>
                    <el-form-item label="您的邮箱" prop="email">
                        <el-input v-model.trim="contactForm.email" placeholder="例如：zhangsan@example.com" clearable>
                            <template #prefix>
                                <el-icon>
                                    <Message />
                                </el-icon>
                            </template>
                        </el-input>
                    </el-form-item>
                    <el-form-item label="主题" prop="subject">
                        <el-input v-model.trim="contactForm.subject" placeholder="例如：关于项目合作的咨询" clearable />
                    </el-form-item>
                    <el-form-item label="内容" prop="message">
                        <el-input v-model="contactForm.message" type="textarea" :rows="5" placeholder="请在此处输入您的留言内容..."
                            show-word-limit maxlength="500" />
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" native-type="submit" :loading="isSubmitting" style="width: 100%;">
                            <el-icon style="margin-right: 5px;" v-if="!isSubmitting">
                                <Promotion />
                            </el-icon>
                            {{ isSubmitting ? '发送中...' : '发送留言' }}
                        </el-button>
                    </el-form-item>
                </el-form>
            </el-col>

            <el-col :xs="24" :md="12" class="contact-info-section">
                <h2 class="section-subtitle">其他联系方式</h2>
                <el-card shadow="never" class="info-card">
                    <div v-if="contactInfo.email" class="info-item">
                        <el-icon>
                            <Message />
                        </el-icon>
                        <span><strong>邮箱:</strong> <el-link :href="`mailto:${contactInfo.email}`" target="_blank">{{
                                contactInfo.email }}</el-link></span>
                    </div>
                    <div v-if="contactInfo.phone" class="info-item">
                        <el-icon>
                            <Phone />
                        </el-icon>
                        <span><strong>电话:</strong> {{ contactInfo.phone }}</span>
                    </div>
                    <div v-if="contactInfo.address" class="info-item">
                        <el-icon>
                            <Location />
                        </el-icon>
                        <span><strong>地址:</strong> {{ contactInfo.address }}</span>
                    </div>

                    <el-divider
                        v-if="contactInfo.social.length > 0 && (contactInfo.email || contactInfo.phone || contactInfo.address)" />

                    <div v-if="contactInfo.social.length > 0" class="social-links-contact">
                        <p><strong>保持联系:</strong></p>
                        <el-link v-for="social in contactInfo.social" :key="social.name" :href="social.url"
                            target="_blank" rel="noopener noreferrer" class="social-link-item" type="primary"
                            :underline="false">
                            <el-icon v-if="social.icon" class="social-icon">
                                <component :is="social.icon" />
                            </el-icon>
                            {{ social.name }}
                        </el-link>
                    </div>
                </el-card>

            </el-col>
        </el-row>
    </div>
</template>

<style scoped>
.container {
    max-width: 1140px;
    margin: 0 auto;
    padding: 0 15px;
}

.contact-page {
    padding-top: 30px;
    padding-bottom: 50px;
}

.page-title {
    font-size: 2.5rem;
    color: #303133;
    margin-bottom: 20px;
    font-weight: 600;
}

.page-intro {
    font-size: 1.1rem;
    color: #606266;
    /* 稍微调整颜色增加对比度 */
    max-width: 800px;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 50px;
    /* 增加与下方内容的间距 */
    line-height: 1.8;
}

.section-subtitle {
    font-size: 1.5rem;
    color: #303133;
    margin-bottom: 25px;
    font-weight: 500;
    border-bottom: 2px solid #409EFF;
    /* 添加下划线突出 */
    padding-bottom: 5px;
    display: inline-block;
    /* 使下划线只覆盖文本 */
}

/* 统一表单项间距 */
.el-form-item {
    margin-bottom: 22px;
}

.info-card {
    background-color: #f9fafc;
    border: 1px solid #e4e7ed;
    /* 添加细边框 */
    border-radius: 8px;
    padding: 30px;
    /* 增加内边距 */
    height: 100%;
    /* 尝试让卡片高度与表单对齐 (可能需要JS或更复杂的CSS) */
}

.info-item {
    display: flex;
    align-items: center;
    margin-bottom: 18px;
    /* 增加项目间距 */
    font-size: 1rem;
    color: #606266;
}

.info-item .el-icon {
    margin-right: 12px;
    /* 增加图标与文字间距 */
    font-size: 1.3rem;
    /* 增大图标 */
    color: #409EFF;
    flex-shrink: 0;
    /* 防止图标被压缩 */
}

.info-item strong {
    color: #303133;
    margin-right: 5px;
}

.info-item .el-link {
    font-size: 1rem;
    /* 确保链接文字大小一致 */
    vertical-align: middle;
    /* 尝试垂直居中 */
}


.social-links-contact p {
    margin-bottom: 15px;
    /* 增加与链接的间距 */
    font-weight: bold;
    color: #303133;
}

.social-link-item {
    margin-right: 20px;
    /* 增加链接间距 */
    margin-bottom: 10px;
    font-size: 1rem;
    display: inline-flex;
    /* 使用 flex 布局 */
    align-items: center;
    /* 垂直居中图标和文字 */
}

.social-icon {
    margin-right: 6px;
    /* 图标与文字间距 */
    font-size: 1.1rem;
    /* 图标大小 */
}


.text-center {
    text-align: center;
}

@media (max-width: 991px) {

    /* md 断点 */
    .contact-info-section {
        margin-top: 40px;
    }

    .info-card {
        padding: 20px;
    }
}
</style>