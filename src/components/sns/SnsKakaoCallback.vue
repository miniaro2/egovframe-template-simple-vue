<template>
  <!-- 카카오 콜백 처리 템플릿 -->
</template>

<script>
export default {
  name: 'SnsKakaoCallback',
  methods: {
    handleKakaoCallback() {
      // 카카오 로그인 콜백 로직
      const user = {}; // 카카오 로그인된 사용자 정보
      this.$emit('change-login', user);
    }
  },
  mounted() {
    this.handleKakaoCallback();
  }
};
</script>

<style>
/* 스타일을 여기에 추가하세요 */
</style>
