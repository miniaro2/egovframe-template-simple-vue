<template>
  <div class="footer">
    <div class="inner">
      <h1>
        <router-link to="/">
          <img class="w" src="/assets/images/logo_footer_w.png" alt="" />
          <img class="m" src="/assets/images/logo_footer_m.png" alt="" />
        </router-link>
      </h1>
      <div class="info">
        <p>
          대표문의메일 : egovframeexample@gmail.com  <span class="m_hide">|</span><br class="m_show" />  대표전화 : 0000-0000 (000-0000-0000)<br />
          호환성확인 : 000-0000-0000  |  교육문의 : 0000-0000-0000
        </p>
        <p class="copy">Copyright © 2021 Ministry Of The Interior And Safety. All Rights Reserved.</p>
      </div>
      <div class="right_col">
        <router-link to="/">
          <img class="w" src="/assets/images/banner_w_01.png" alt="" />
          <img class="m" src="/assets/images/banner_m_01.png" alt="" />
        </router-link>
        <router-link to="/">
          <img class="w" src="/assets/images/banner_w_02.png" alt="" />
          <img class="m" src="/assets/images/banner_m_02.png" alt="" />
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EgovFooter',
};
</script>

<style scoped>
/* 필요한 스타일을 여기에 추가하세요 */
</style>
