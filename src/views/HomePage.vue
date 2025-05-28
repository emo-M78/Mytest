<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import PortfolioItem from '@/components/PortfolioItem.vue'
import { CollectionTag, ChatDotRound } from '@element-plus/icons-vue'

const router = useRouter()

const personalInfo = ref({
  name: '范杰 / 24P1120108054',
  tagline: '一位正在学习中快速成长的编程学习者',
  introduction: '欢迎来到我的期末考核项目。在这里，您可以了解到我的技能、项目经验，每个项目都见证着我的理解和进步。非常荣幸能向您展示这个阶段性的学习成果。让我们一起探索技术的无限可能！',
  heroImageUrl: '/images/hero-placeholder.jpg'
})

const featuredProjects = ref([
  {
    id: 'proj1',
    title: '便易借',
    description: '一个完整的电子设备借用方案，包含设备展示、借用&归还、设备详情等功能。',
    imageUrl: '/images/project-placeholder.png',
    projectUrl: '#',
    tags: ['Java', 'Element Plus']
  },
  {
    id: 'proj2',
    title: '个人博客',
    description: '一个本地的个人网站，记录学习经验，借助Github存储代码。界面简洁，交互流畅。',
    imageUrl: '/images/project-placeholder.png',
    projectUrl: '#',
    tags: ['Github', 'Hexo']
  }
])

function navigateTo(routeName) {
  router.push({ name: routeName })
}
</script>

<template>
  <div class="home-page">
    <section class="hero-section"
      :style="{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${personalInfo.heroImageUrl})` }">
      <div class="container hero-content text-center">
        <h1 class="hero-title">{{ personalInfo.name }}</h1>
        <p class="hero-tagline">{{ personalInfo.tagline }}</p>
        <p class="hero-introduction">
          {{ personalInfo.introduction }}
        </p>
        <div class="hero-buttons">
          <el-button type="primary" size="large" @click="navigateTo('Portfolio')" round>
            <el-icon style="margin-right: 8px;">
              <CollectionTag />
            </el-icon>
            探索我的项目
          </el-button>
          <el-button size="large" @click="navigateTo('Contact')" round plain>
            <el-icon style="margin-right: 8px;">
              <ChatDotRound />
            </el-icon>
            联系我
          </el-button>
        </div>
      </div>
    </section>

    <section class="about-intro-section section-padding">
      <div class="container text-center">
        <h2 class="section-title">关于我</h2>
        <p class="section-paragraph">
          我是一名正在不断学习成长的全栈开发者。
          我坚信活到老学到老，并乐于学习和探索新的技术趋势。
        </p>
        <el-button type="primary" plain @click="navigateTo('About')">了解更多关于我</el-button>
      </div>
    </section>

    <section class="featured-projects-section section-padding bg-light">
      <div class="container">
        <h2 class="section-title text-center">项目展示</h2>
        <el-row :gutter="30">
          <el-col v-for="project in featuredProjects" :key="project.id" :xs="24" :sm="12" :md="8">
            <PortfolioItem :id="project.id" :title="project.title" :description="project.description"
              :image-url="project.imageUrl" :project-url="project.projectUrl" :tags="project.tags" />
          </el-col>
        </el-row>
        <div class="text-center mt-3">
          <el-button @click="navigateTo('Portfolio')" size="large">查看所有项目</el-button>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.home-page {
  overflow-x: hidden;
}

.hero-section {
  min-height: 70vh;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  text-align: center;
}

.hero-content {
  max-width: 1200px;
  padding: 40px;
  border-radius: 8px;
  backdrop-filter: blur(2px);
}

.hero-title {
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 1rem;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);
}

.hero-tagline {
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  opacity: 0.9;
  font-weight: 300;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
}

.hero-introduction {
  font-size: 1.1rem;
  margin-bottom: 2.5rem;
  line-height: 1.7;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
  opacity: 0.95;
}

.hero-buttons {
  display: flex;
  justify-content: center;
  gap: 15px;
  flex-wrap: wrap;
}

.section-padding {
  padding: 80px 20px;
}

.bg-light {
  background-color: #f8f9fa;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.text-center {
  text-align: center;
}

.section-title {
  font-size: 2.2rem;
  color: var(--el-text-color-primary);
  margin-bottom: 40px;
  font-weight: 600;
  position: relative;
  display: inline-block;
}

.section-title::after {
  content: '';
  position: absolute;
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
  width: 80px;
  height: 3px;
  background-color: var(--el-color-primary);
}

.section-paragraph {
  font-size: 1.1rem;
  color: var(--el-text-color-regular);
  max-width: 800px;
  margin: 0 auto 30px;
  line-height: 1.8;
}

.mt-3 {
  margin-top: 30px;
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 2.2rem;
  }

  .hero-tagline {
    font-size: 1.2rem;
  }

  .hero-introduction {
    font-size: 1rem;
  }

  .section-title {
    font-size: 1.8rem;
  }

  .section-paragraph {
    font-size: 1rem;
  }

  .hero-buttons {
    flex-direction: column;
    align-items: center;
  }

  .section-padding {
    padding: 60px 20px;
  }
}

@media (max-width: 576px) {
  .hero-content {
    padding: 20px;
  }

  .hero-title {
    font-size: 1.8rem;
  }
}
</style>