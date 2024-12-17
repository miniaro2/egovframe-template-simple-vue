<template>
  <div class="nav">
    <div class="inner">
      <h2>사이트 소개</h2>
      <ul class="menu4">
        <li><router-link :to="URL.ABOUT_SITE" :class="{ cur: isActive(URL.ABOUT_SITE) }">소개</router-link></li>
        <li><router-link :to="URL.ABOUT_HISTORY" :class="{ cur: isActive(URL.ABOUT_HISTORY) }">연혁</router-link></li>
        <li><router-link :to="URL.ABOUT_ORGANIZATION" :class="{ cur: isActive(URL.ABOUT_ORGANIZATION) }">조직소개</router-link></li>
        <li><router-link :to="URL.ABOUT_LOCATION" :class="{ cur: isActive(URL.ABOUT_LOCATION) }">찾아오시는 길</router-link></li>
      </ul>
    </div>
  </div>
</template>

<script>
import { useRoute } from 'vue-router';
import URL from '@/constants/url';

export default {
  setup() {
    const route = useRoute();

    const isActive = (path) => {
      return route.path === path;
    };

    return {
      URL,
      isActive,
    };
  },
};
</script>

<style scoped>
/* 필요한 스타일을 여기에 추가하세요 */
</style>
