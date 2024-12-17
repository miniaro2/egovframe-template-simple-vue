<template>
    <a href="#!" @click.prevent="NaverLogin" class="btn_center social naver">
      <button>네이버 로그인</button>
    </a>
  </template>
  
  <script>
  export default {
    name: 'SnsNaverBt',
    methods: {
      NaverLogin() {
        const NAVER_CLIENT_ID = process.env.VUE_APP_NAVER_CLIENTID; // 발급받은 클라이언트 아이디
        const REDIRECT_URI = process.env.VUE_APP_NAVER_CALLBACKURL; // Callback URL
        const STATE = process.env.VUE_APP_STATE; // 다른 서버와 통신 시 암호화문자
        const NAVER_AUTH_URL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${NAVER_CLIENT_ID}&state=${STATE}&redirect_uri=${REDIRECT_URI}`;
  
        window.location.href = NAVER_AUTH_URL;
      },
    },
  };
  </script>
  
  <style scoped>
  /* 필요한 스타일을 여기에 추가하세요 */
  </style>
  