<template>
  <div class="container">
    <div class="c_wrap">
      <!-- Location -->
      <div class="location">
        <ul>
          <li><router-link :to="URL.MAIN" class="home">Home</router-link></li>
          <li><router-link :to="URL.ABOUT">사이트 소개</router-link></li>
          <li>연혁</li>
        </ul>
      </div>
      <!--// Location -->

      <div class="layout">
        <!-- Navigation -->
        <EgovLeftNav />
        <!--// Navigation -->

        <div class="contents SITE_INTRO" id="contents">
          <!-- 본문 -->
          <h1 class="tit_3">사이트 소개</h1>
          <p class="txt_1">표준프레임워크 경량환경 포털사이트를 소개합니다.</p>
          <h2 class="tit_4">전자정부표준프레임워크 연혁</h2>
          <h3 class="tit_5">연혁</h3>
          <p class="msg_1">
            표준프레임워크 활성화 전담조직으로 한국정보화진흥원(NIA)에 2010년 11월 4일 「표준프레임워크센터」가
            <br />
            설립되었으며 정책지원, 글로벌 확산 등을 담당할 NIA 인력과 R&D, 기술지원 등을 담당할 외부 민간 전문가로
            <br />
            구성되었습니다.
          </p>
          <!--// 본문 -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import URL from '@/constants/url';
import EgovLeftNav from '@/components/leftmenu/EgovLeftNavAbout';

export default defineComponent({
  name: 'EgovAboutHistory',
  components: {
    EgovLeftNav,
  },
  data() {
    return {
      URL,
    };
  },
});
</script>

<style scoped>
/* 스타일을 여기에 추가하세요 */
</style>
