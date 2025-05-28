<script setup>
import { ref } from 'vue'
import { Message, Link, School, Calendar } from '@element-plus/icons-vue'

const profile = ref({
  name: '范杰',
  title: '24P1120108054',
  bio: `你好！
  我是一名河北工程技术学院人工智能学院的学生，目前正在学习课程有：
  📌VUE应用程序开发
  📌Java EE轻量级框架应用实战——SSM框架(Spring MVC + Spring + MyBatis)；
  📌数据分析与管理应用
  📌大数据存储与治理
  📌Java框架项目实训
  📌Android系统应用开发
  📌单片机原理及应用（STM32）

  我对前端用户界面设计以及后端技术开发有浓厚的兴趣，为此不断学习和拓展技术池，在此期间跟随老师的指导独立完成多个项目。
  我乐于接受挑战，并享受通过技术解决实际问题的过程。除了编码，我还喜欢听音乐，打羽毛球，玩游戏和探索新的城市。我相信生活中的多样体验能够激发创造力，并帮助我从不同角度看待问题。
  `,
  project: `这是我的VUE课程期末考核项目。虽然当前版本功能相对基础，但它真实记录了我作为前端开发初学者的成长足迹。正如代码会不断迭代升级，我也在持续学习和精进技术。

这个项目凝聚了我对VUE框架的理解与实践，每个组件都见证着我的进步。非常荣幸能向您展示这个阶段性的学习成果，期待能与您深入交流前端开发的乐趣与挑战！
`,
  imageUrl: '/images/profile-placeholder.jpg',
  email: 'vckt377602@Outlook.com',
  github: 'https://github.com/emo-M78'
})

const skills = ref([
  { name: 'Vue.js', level: 80, category: '前端框架' },
  { name: 'Linux', level: 80, category: '操作系统' },
  { name: 'JavaScript', level: 78, category: '编程语言' },
  { name: 'Python', level: 50, category: '编程语言' },
  { name: 'CSS/SCSS', level: 85, category: '样式设计' },
  { name: 'UI/UX设计', level: 75, category: '设计技能' }
])

const experiences = ref([
  {
    id: 1,
    title: '便易借',
    company: 'Java框架项目实训课程',
    period: '2025年3月 - 至今',
    description: '独立负责基于 Java 的全栈项目开发，涵盖后端逻辑搭建与前端微信小程序界面构建。',
    responsibilities: [
      '使用若依框架搭建后端系统，实现用户管理、权限控制、数据持久化等核心功能，确保系统稳定运行。',
      '基于微信小程序框架进行前端开发，实现流畅的用户交互界面，完成页面布局、数据展示与交互逻辑编写。',
      '负责前后端接口联调，保障数据传输的准确性与高效性，优化系统性能，提升用户体验。'
    ]
  },
  {
    id: 2,
    title: '个人网站&博客搭建',
    company: '个人课外拓展',
    period: '2025年4月23日 - 2025年4月27日',
    description: '独立搭建基于 Hexo 框架的本地个人网站，负责从框架搭建到个性化定制的全流程工作。',
    responsibilities: [
      '熟练安装与配置 Hexo 框架，依据个人需求选择适配主题，并对主题进行深度定制，包括页面布局调整、色彩风格优化等。',
      '利用 Markdown 语法进行内容创作，发布个人博客文章、项目展示等内容，实现高效的内容管理与展示。',
      '定期维护网站，排查并修复潜在的样式与功能问题，探索并应用 Hexo 插件拓展网站功能，如添加评论系统、优化 SEO 等。'
    ]
  },
  {
    id: 3,
    title: '校园电子意见箱',
    company: 'Java项目实训课程',
    period: '2024年10月 - 2024年12月',
    description: '独立完成 “校园电子意见箱” 项目的前后端开发，后端采用若依框架结合 Java 语言，前端基于微信小程序。',
    responsibilities: [
      '基于若依框架，运用 Java 语言实现用户注册登录、权限管理等基础功能；设计并搭建数据库，合理存储用户信息、意见帖子及评论数据；开发接口，保障前后端数据交互顺畅，满足业务逻辑需求。',
      '使用微信小程序框架构建界面，实现简洁友好的交互效果，方便同学登录、发布意见及评论；处理页面跳转、数据展示等逻辑，优化用户操作体验。',
      '完成项目相关备案工作，确保项目在个人学习测试范围内合规进行；持续测试与优化，修复潜在问题，提升系统稳定性与性能。'
    ]
  },
])

const educations = ref([
  {
    id: 1,
    degree: '大数据管理与应用',
    institution: '河北工程技术学院',
    period: '2024年9月 - 2026年6月',
    description: '主修Java编程语言，Vue框架等。在校期间积极参加各种活动比赛，参与多个项目的开发。'
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
          <el-link :href="profile.github" target="_blank" :icon="Link">GitHub</el-link>
        </div>
      </el-col>
      <el-col :xs="24" :sm="16" :md="18">
        <h2 class="section-heading">关于我</h2>
        <p class="bio-text" v-html="profile.bio.replace(/\n/g, '<br>')"></p>
        <hr style="margin: 15px; height: 1px; border: none; background-color: black;">
        <h2 class="section-heading">关于此项目</h2>
        <p class="bio-text" v-html="profile.project.replace(/\n/g, '<br>')"></p>
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
      <h2 class="section-heading text-center">项目经历</h2>
      <el-timeline>
        <el-timeline-item v-for="exp in experiences" :key="exp.id" :timestamp="exp.period" placement="top"
          type="primary" hollow>
          <el-card>
            <h4>{{ exp.title }} --@ {{ exp.company }}</h4>
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