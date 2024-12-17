<template>
  <div class="nav">
    <div class="inner">
      <h2>정보마당</h2>
      <ul class="menu4">
        <li>
          <router-link :to="URL.INTRO_WORKS" :class="{ cur: isActive('INTRO_WORKS') }">
            주요사업 소개
          </router-link>
        </li>
        <li>
          <router-link :to="URL.INTRO_SERVICE" :class="{ cur: isActive('INTRO_SERVICE') }">
            대표서비스 소개
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import URL from '@/constants/url';
import { useRoute } from 'vue-router';

export default defineComponent({
  name: 'EgovLeftNavIntro',
  data() {
    return {
      URL,
    };
  },
  methods: {
    isActive(page) {
      const route = useRoute();
      return route.path.includes(page.toLowerCase());
    }
  }
});
</script>

<style scoped>
/* 스타일을 여기에 추가하세요 */
</style>
