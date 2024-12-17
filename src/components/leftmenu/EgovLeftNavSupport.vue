<template>
  <div class="nav">
    <div class="inner">
      <h2>고객지원</h2>
      <ul class="menu4">
        <li>
          <router-link :to="URL.SUPPORT_DOWNLOAD" :class="{ cur: isActive('SUPPORT_DOWNLOAD') }">
            자료실
          </router-link>
        </li>
        <li>
          <router-link :to="URL.SUPPORT_QNA" :class="{ cur: isActive('SUPPORT_QNA') }">
            묻고답하기
          </router-link>
        </li>
        <li>
          <router-link :to="URL.SUPPORT_APPLY" :class="{ cur: isActive('SUPPORT_APPLY') }">
            서비스신청
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
  name: 'EgovLeftNavSupport',
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
