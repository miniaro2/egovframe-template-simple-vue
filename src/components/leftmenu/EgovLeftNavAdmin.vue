<template>
  <div class="nav">
    <div class="inner">
      <h2>사이트관리</h2>
      <ul class="menu4">
        <li>
          <router-link :to="URL.ADMIN_SCHEDULE" :class="{ cur: isActive('ADMIN_SCHEDULE') }">
            일정관리
          </router-link>
        </li>
        <li>
          <router-link :to="URL.ADMIN_BOARD" :class="{ cur: isActive('ADMIN_BOARD') }">
            게시판생성관리
          </router-link>
        </li>
        <li>
          <router-link :to="URL.ADMIN_USAGE" :class="{ cur: isActive('ADMIN_USAGE') }">
            게시판사용관리
          </router-link>
        </li>
        <li>
          <router-link :to="URL.ADMIN_NOTICE" :class="{ cur: isActive('ADMIN_NOTICE') }">
            공지사항관리
          </router-link>
        </li>
        <li>
          <router-link :to="URL.ADMIN_GALLERY" :class="{ cur: isActive('ADMIN_GALLERY') }">
            사이트갤러리관리
          </router-link>
        </li>
        <li>
          <router-link :to="URL.ADMIN_MANAGER" :class="{ cur: isActive('ADMIN_MANAGER') }">
            사이트관리자 암호변경
          </router-link>
        </li>
        <li>
          <router-link :to="URL.ADMIN_MEMBERS" :class="{ cur: isActive('ADMIN_MEMBERS') }">
            회원관리
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
  name: 'EgovLeftNavAdmin',
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
