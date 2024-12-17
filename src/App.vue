<template>
  <v-app>
    <v-img :src="require('@/img/backImage.jpg')" max-height="200" max-width="50%"></v-img>
    <div class="layout-top">
      <EgovHeader @open-popup="openPopup" />
      <router-view :onChangeLogin="handleChangeLogin" />
    </div>
    <div class="layout-footer">
      <EgovFooter />
    </div>
    <!-- 팝업 컴포넌트 추가 -->
    <EgovInfoPopup v-if="isPopupOpen" @close-popup="closePopup" />
  </v-app>
</template>

<script>
import { ref, provide } from 'vue';
import EgovHeader from './components/EgovHeader.vue';
import EgovFooter from './components/EgovFooter.vue';
import EgovInfoPopup from './components/EgovInfoPopup.vue';
import { getSessionItem, setSessionItem } from '@/utils/storage';

export default {
  name: 'App',
  components: {
    EgovHeader,
    EgovFooter,
    EgovInfoPopup,
  },
  setup() {

    // 팝업 상태
    const isPopupOpen = ref(false);
    const sessionUser = ref(getSessionItem('loginUser') || {});

    const handleChangeLogin = (user) => {
      
      console.log('sessionUser in App.vue:', sessionUser.value);
      console.log('sessionUser in EgovHeader.vue:', sessionUser.value);

      sessionUser.value = user;
      setSessionItem('loginUser', user);
    };

    // 팝업 열기/닫기 핸들러
    const openPopup = () => {
      isPopupOpen.value = true;
    };
    const closePopup = () => {
      isPopupOpen.value = false;
    };

    provide('sessionUser', sessionUser);
    //provide('handleChangeLogin', handleChangeLogin);

    return {
      sessionUser,
      handleChangeLogin,
      isPopupOpen,
      openPopup,
      closePopup,
    };
  },
};
</script>

<style>
div.layout-top {
  width: 100%;
  /*text-align: right;*/
}

div.layout-footer {
  width: 100%;
  /*text-align: right;*/
}

@import './css/base.css';
@import './css/layout.css';
@import './css/component.css';
@import './css/response.css';
@import './css/page.css';
</style>
