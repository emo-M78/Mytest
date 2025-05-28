<script setup>
import { ref } from 'vue'
import { Message, Link, School, Calendar } from '@element-plus/icons-vue'

const profile = ref({
  name: '您的名字',
  title: '前端开发者 / UI/UX爱好者',
  bio: `你好！我是一名充满激情的前端开发者，专注于使用现代技术栈（如Vue.js, React）构建美观、易用且高性能的Web应用程序。
  
  我对用户体验和界面设计有浓厚的兴趣，并始终致力于学习最新的行业趋势和最佳实践。在我的职业生涯中，我参与了多个不同规模的项目，从初创公司的快速迭代产品到大型企业的复杂系统。
  
  我乐于接受挑战，并享受通过技术解决实际问题的过程。除了编码，我还喜欢摄影、阅读和探索新的城市。我相信生活中的多样体验能够激发创造力，并帮助我从不同角度看待问题。
  
  感谢您访问我的个人网站，期待与您交流！`,
  imageUrl: '/images/profile-placeholder.jpg',
  email: 'your.email@example.com',
  linkedin: 'https://linkedin.com/in/yourprofile',
  github: 'https://github.com/yourusername'
})

const skills = ref([
  { name: 'Vue.js', level: 90, category: '前端框架' },
  { name: 'React', level: 80, category: '前端框架' },
  { name: 'JavaScript', level: 95, category: '编程语言' },
  { name: 'TypeScript', level: 85, category: '编程语言' },
  { name: 'CSS/SCSS', level: 90, category: '样式设计' },
  { name: 'UI/UX设计', level: 75, category: '设计技能' }
])

const experiences = ref([
  {
    id: 1,
    title: '高级前端开发工程师',
    company: '某科技公司',
    period: '2021年3月 - 至今',
    description: '负责公司核心产品的前端架构设计和开发工作，带领小型前端团队。',
    responsibilities: [
      '设计和实现前端架构和组件库',
      '优化应用性能，提升用户体验',
      '指导初级开发人员，进行代码审查'
    ]
  },
  {
    id: 2,
    title: '前端开发工程师',
    company: '另一家创新企业',
    period: '2019年7月 - 2021年2月',
    description: '参与公司多个Web项目的开发，使用React和Redux构建用户界面。负责响应式布局的实现和跨浏览器兼容性调试。',
    responsibilities: [
      '根据产品需求开发前端页面和交互功能',
      '参与UI设计评审，提供技术可行性建议',
      '与测试团队协作，确保产品质量'
    ]
  }
])

const educations = ref([
  {
    id: 1,
    degree: '计算机科学学士',
    institution: '某某大学',
    period: '2015年9月 - 2019年6月',
    description: '主修计算机科学，辅修设计。在校期间获得多次奖学金，参与多个软件开发项目。'
  }
])
</script>

<template>
  <div class="about-page container">
    <el-row :gutter="40" class="profile-section">
      <el-col :xs="24" :sm="8" :md="6" class="text-center">
        <el-avatar :size="150" :src="profile.imageUrl" class="profile-avatar">
          {{ profile.name.charAt(0) }}
        </el-avatar>
        <h1 class="profile-name">{{ profile.name }}</h1>
        <p class="profile-title">{{ profile.title }}</p>
        <div class="profile-contact">
          <el-link :href="`mailto:${profile.email}`" target="_blank" :icon="Message">邮箱</el-link>
          <el-link :href="profile.linkedin" target="_blank" :icon="Link">LinkedIn</el-link>
          <el-link :href="profile.github" target="_blank" :icon="Link">GitHub</el-link>
        </div>
      </el-col>
      <el-col :xs="24" :sm="16" :md="18">
        <h2 class="section-heading">关于我</h2>
        <p class="bio-text" v-html="profile.bio.replace(/\n/g, '<br>')"></p>
      </el-col>
    </el-row>

    <el-divider />

    <section class="skills-section">
      <h2 class="section-heading text-center">专业技能</h2>
      <el-row :gutter="20">
        <el-col :xs="24" :sm="12" :md="8" v-for="skill in skills" :key="skill.name" class="skill-item">
          <el-card shadow="hover">
            <div class="skill-name">{{ skill.name }}</div>
            <el-progress :percentage="skill.level" :stroke-width="10" striped striped-flow />
            <div class="skill-category">{{ skill.category }}</div>
          </el-card>
        </el-col>
      </el-row>
    </section>

    <el-divider />

    <section class="experience-section">
      <h2 class="section-heading text-center">工作与项目经历</h2>
      <el-timeline>
        <el-timeline-item v-for="exp in experiences" :key="exp.id" :timestamp="exp.period" placement="top"
          type="primary" hollow>
          <el-card>
            <h4>{{ exp.title }} @ {{ exp.company }}</h4>
            <p>{{ exp.description }}</p>
            <ul v-if="exp.responsibilities && exp.responsibilities.length > 0" class="responsibilities-list">
              <li v-for="(resp, index) in exp.responsibilities" :key="index">{{ resp }}</li>
            </ul>
          </el-card>
        </el-timeline-item>
      </el-timeline>
    </section>

    <el-divider />

    <section class="education-section">
      <h2 class="section-heading text-center">教育背景</h2>
      <div class="education-items">
        <el-card v-for="edu in educations" :key="edu.id" class="education-card" shadow="never">
          <h4>{{ edu.degree }}</h4>
          <p class="institution-period">
            <el-icon>
              <School />
            </el-icon> {{ edu.institution }} |
            <el-icon>
              <Calendar />
            </el-icon> {{ edu.period }}
          </p>
          <p>{{ edu.description }}</p>
        </el-card>
      </div>
    </section>
  </div>
</template>

<style scoped>
.about-page {
  padding-top: 30px;
  padding-bottom: 50px;
}

.profile-section {
  margin-bottom: 40px;
  align-items: center;
}

.profile-avatar {
  margin-bottom: 15px;
  border: 3px solid var(--el-color-primary-light-5);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.profile-name {
  font-size: 2rem;
  margin-bottom: 5px;
  color: var(--el-text-color-primary);
}

.profile-title {
  font-size: 1.1rem;
  color: var(--el-text-color-regular);
  margin-bottom: 15px;
}

.profile-contact .el-link {
  margin: 0 8px 8px 0;
  font-size: 0.9rem;
}

.profile-contact .el-link .el-icon {
  margin-right: 4px;
}

.section-heading {
  font-size: 1.8rem;
  color: var(--el-text-color-primary);
  margin-bottom: 30px;
  font-weight: 500;
  position: relative;
  display: inline-block;
}

.section-heading::after {
  content: '';
  position: absolute;
  bottom: -10px;
  left: 0;
  width: 60px;
  height: 3px;
  background-color: var(--el-color-primary);
}

.text-center .section-heading::after {
  left: 50%;
  transform: translateX(-50%);
}

.bio-text {
  font-size: 1rem;
  line-height: 1.8;
  color: var(--el-text-color-regular);
}

.skills-section,
.experience-section,
.education-section {
  margin-bottom: 40px;
  padding-top: 20px;
}

.skill-item {
  margin-bottom: 20px;
}

.skill-item .el-card {
  text-align: center;
  padding: 20px;
}

.skill-name {
  font-size: 1.1rem;
  font-weight: 500;
  margin-bottom: 10px;
}

.skill-category {
  font-size: 0.8rem;
  color: var(--el-text-color-secondary);
  margin-top: 8px;
}

.el-timeline-item h4 {
  font-size: 1.2rem;
  margin-bottom: 8px;
  color: var(--el-text-color-primary);
}

.el-timeline-item p {
  font-size: 0.95rem;
  color: var(--el-text-color-regular);
  line-height: 1.7;
}

.responsibilities-list {
  list-style-type: disc;
  padding-left: 20px;
  margin-top: 10px;
  font-size: 0.9rem;
  color: var(--el-text-color-secondary);
}

.education-card {
  margin-bottom: 20px;
  border-left: 4px solid var(--el-color-primary);
  padding-left: 15px;
}

.education-card h4 {
  font-size: 1.2rem;
  margin-bottom: 5px;
  color: var(--el-text-color-primary);
}

.institution-period {
  font-size: 0.9rem;
  color: var(--el-text-color-secondary);
  margin-bottom: 10px;
  display: flex;
  align-items: center;
}

.institution-period .el-icon {
  margin-right: 5px;
}

@media (max-width: 768px) {
  .profile-section .el-col {
    text-align: center;
  }

  .bio-text {
    text-align: justify;
  }

  .section-heading {
    font-size: 1.5rem;
  }

  .profile-name {
    font-size: 1.5rem;
  }
}
</style>