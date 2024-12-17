<template>
    <a href="#!" @click.prevent="KakaoLogin" class="btn_center social kakao">
      <button>카카오 로그인</button>
    </a>
  </template>
  
  <script>
  export default {
    name: 'SnsKakaoBt',
    methods: {
      KakaoLogin() {
        const KAKAO_CLIENT_ID = process.env.VUE_APP_KAKAO_CLIENTID; // 발급받은 클라이언트 아이디
        const REDIRECT_URI = process.env.VUE_APP_KAKAO_CALLBACKURL; // Callback URL
        const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${KAKAO_CLIENT_ID}&redirect_uri=${REDIRECT_URI}`;
  
        window.location.href = KAKAO_AUTH_URL;
      },
    },
  };
  </script>
  
  <style scoped>
  /* 필요한 스타일을 여기에 추가하세요 */
  </style>
  