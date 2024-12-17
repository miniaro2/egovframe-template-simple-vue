<template>
  <div class="container">
    <div class="c_wrap">
      <!-- Location -->
      <div class="location">
        <ul>
          <li><router-link :to="URL.MAIN" class="home">Home</router-link></li>
          <li>로그인</li>
        </ul>
      </div>
      <!--// Location -->

      <div class="layout">
        <!-- EgovLoginContent에 onChangeLogin 전달 -->
        <EgovLoginContent :onChangeLogin="onChangeLogin" />
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import EgovLoginContent from '@/pages/login/EgovLoginContent.vue';
import URL from '@/constants/url';

export default defineComponent({
  name: 'EgovLogin',
  components: {
    EgovLoginContent,
  },
  props: {
    onChangeLogin: Function, // 부모로부터 이벤트 핸들러를 props로 전달받음
  },
  setup(props) {
    console.group('EgovLogin');
    console.log('[Start] EgovLogin ------------------------------');
    console.log('EgovLogin [props] : ', props);
    console.log('------------------------------EgovLogin [End]');
    console.groupEnd('EgovLogin');

    return {
      URL,
      //onChangeLogin: props.onChangeLogin, // props로 전달받은 핸들러 사용
    };
  },
});
</script>

<style scoped>
/* 필요한 스타일을 여기에 추가하세요 */
</style>
