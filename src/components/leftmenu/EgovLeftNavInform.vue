<template>
  <div class="nav">
    <div class="inner">
      <h2>알림마당</h2>
      <ul class="menu4">
        <li>
          <router-link :to="URL.INFORM_DAILY" :class="{ cur: isActive('INFORM_DAILY') }">
            오늘의행사
          </router-link>
        </li>
        <li>
          <router-link :to="URL.INFORM_WEEKLY" :class="{ cur: isActive('INFORM_WEEKLY') }">
            금주의행사
          </router-link>
        </li>
        <li>
          <router-link :to="URL.INFORM_NOTICE" :class="{ cur: isActive('INFORM_NOTICE') }">
            공지사항
          </router-link>
        </li>
        <li>
          <router-link :to="URL.INFORM_GALLERY" :class="{ cur: isActive('INFORM_GALLERY') }">
            사이트갤러리
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
  name: 'EgovLeftNavInform',
  data() {
    return {
      URL,
    };
  },
  methods: {
    isActive(page) {
      const route = useRoute();
      return route.path.includes(page.toLowerCase());
    },
  },
  mounted() {
    console.groupCollapsed("EgovLeftNavInform");
    console.log("[Start] EgovLeftNavInform ------------------------------");
    console.log("------------------------------EgovLeftNavInform [End]");
    console.groupEnd("EgovLeftNavInform");
  }
});
</script>

<style scoped>
/* 스타일을 여기에 추가하세요 */
</style>
