<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import PortfolioItem from '@/components/PortfolioItem.vue'
import { CollectionTag, ChatDotRound } from '@element-plus/icons-vue'

const router = useRouter()

const personalInfo = ref({
  name: '您的名字 / 您的品牌',
  tagline: '一位充满激情的前端开发者 / UI/UX 设计师 / 热爱创造者',
  introduction: '欢迎来到我的个人空间。我致力于通过代码和设计创造富有吸引力且实用的数字体验。在这里，您可以了解到我的技能、项目经验以及我对技术的热情。让我们一起探索技术的无限可能！',
  heroImageUrl: '/images/hero-placeholder.jpg'
})

const featuredProjects = ref([
  {
    id: 'proj1',
    title: '特色项目一：电子商务平台',
    description: '一个完整的电子商务解决方案，包含商品展示、购物车、支付系统等功能。',
    imageUrl: '/images/project-placeholder.png',
    projectUrl: '#',
    tags: ['Vue 3', 'Element Plus', 'Node.js']
  },
  {
    id: 'proj2',
    title: '特色项目二：智能任务管理器',
    description: '一款帮助用户高效管理日常任务和项目的应用。界面简洁，交互流畅，支持多平台同步。',
    imageUrl: '/images/project-placeholder.png',
    projectUrl: '#',
    tags: ['Pinia', 'Axios', '响应式设计']
  }
  // 可以添加更多项目
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
            探索我的作品
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
          我是一名热衷于构建美观且用户友好的 Web 应用的开发者。拥有 X 年前端开发经验，擅长 Vue.js 生态系统、响应式设计和性能优化。
          我坚信技术能够改变世界，并乐于学习和探索新的技术趋势。
        </p>
        <el-button type="primary" plain @click="navigateTo('About')">了解更多关于我</el-button>
      </div>
    </section>

    <section class="featured-projects-section section-padding bg-light">
      <div class="container">
        <h2 class="section-title text-center">特色项目</h2>
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