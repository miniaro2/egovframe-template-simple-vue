<template>
  <!-- 네이버 콜백 처리 템플릿 -->
</template>

<script>
export default {
  name: 'SnsNaverCallback',
  methods: {
    handleNaverCallback() {
      // 네이버 로그인 콜백 로직
      const user = {}; // 네이버 로그인된 사용자 정보
      this.$emit('change-login', user);
    }
  },
  mounted() {
    this.handleNaverCallback();
  }
};
</script>

<style>
/* 스타일을 여기에 추가하세요 */
</style>
