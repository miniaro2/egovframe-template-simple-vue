<template>
    <div class="header">
      <div class="inner">
        <button class="ico lnk_go_template" @click="$emit('open-popup')">홈페이지 템플릿 소개 페이지로 이동</button>
        <h1 class="logo">
          <router-link :to="URL.MAIN" class="w">
            <img src="/assets/images/logo_w.png" alt="표준프레임워크포털 eGovFrame 심플홈페이지" />
          </router-link>
        </h1>
        <div class="gnb">
          <h2 class="blind">주메뉴</h2>
          <ul>
            <li></li>
            <li><router-link :to="'/about'" class="{ cur: isActiveRoute('/about') }">사이트소개</router-link></li>
            <li><router-link :to="URL.INTRO" class="{ cur: isActiveRoute(URL.INTRO) }">정보마당</router-link></li>
            <li><router-link :to="URL.SUPPORT" class="{ cur: isActiveRoute(URL.SUPPORT) }">고객지원</router-link></li>
            <li><router-link :to="URL.INFORM" class="{ cur: isActiveRoute(URL.INFORM) }">알림마당</router-link></li>
            <li v-if="sessionUserSe === 'ADM'">
              <router-link :to="URL.ADMIN" class="{ cur: isActiveRoute(URL.ADMIN) }">사이트관리</router-link>
            </li>
          </ul>
        </div>
  
        <div class="user_info">
          <div v-if="sessionUserId">
            <span class="person">{{ sessionUserName }}</span> 님이, {{ sessionUserSe }}로 로그인하셨습니다.
            <router-link 
              v-if="sessionUserSe === 'USR'" 
              :to="{ path: URL.MYPAGE_MODIFY}" 
              class="btn login">
              마이페이지
            </router-link>
            <button @click="logOutHandler" class="btn">로그아웃</button>
          </div>
          <div v-else>
            <button @click="logInHandler" class="btn login">로그인</button>
            <router-link :to="URL.MYPAGE_CREATE" class="btn login">회원가입</router-link>
          </div>
        </div>
  
        <div class="right_a">
          <button type="button" class="btn btnAllMenu" title="전체메뉴 닫힘">전체메뉴</button>
          <button type="button" class="btn mobile btnAllMenuM" title="전체메뉴 닫힘">전체메뉴</button>
        </div>
      </div>
      <!-- All Menu -->
      <!--<div class="all_menu WEB closed">-->
      <div :class="['all_menu WEB', { closed: !isMenuOpen }]">
        <h2 class="blind">전체메뉴</h2>
        <div class="inner">
          <!-- Add menu items here similar to the above structure -->
        </div>
      </div>
      <div class="all_menu Mobile closed">
        <div class="user_info_m">
          <template v-if="sessionUserId">
            <span class="person">{{ sessionUserName }}</span> 님이, {{ sessionUserSe }}로 로그인하셨습니다.
            <button @click="logOutHandler" class="btn logout">로그아웃</button>
          </template>
          <template v-else>
            <button @click="logInHandler" class="btn login">로그인</button>
            <router-link :to="URL.MYPAGE_CREATE" class="btn login">회원가입</router-link>
          </template>
          <button class="btn noscript close" type="button">전체메뉴 닫기</button>
        </div>
        <!-- Add mobile menu items here -->
      </div>
    </div>
  </template>

<script>
// eslint-disable-next-line
import { inject, computed, ref } from 'vue'; // inject 추가
import { useRouter, useRoute } from 'vue-router';
// eslint-disable-next-line
import { requestFetch } from '@/api/egovFetch';
import URL from '@/constants/url';
import CODE from '@/constants/code';
import * as EgovNet from '@/api/egovFetch';
// eslint-disable-next-line
import { getSessionItem, setSessionItem } from '@/utils/storage';

export default {
  name: 'EgovHeader',
  setup() {
    const router = useRouter();
    const route = useRoute();

    // 전역 상태 주입
    const sessionUser = inject('sessionUser'); // 상위 컴포넌트(App.vue)에서 제공
    //const handleChangeLogin = inject('handleChangeLogin'); // 상태 변경 함수 주입

    // 반응형 상태로 컴퓨팅
    const sessionUserId = computed(() => sessionUser?.value?.id || '');
    const sessionUserName = computed(() => sessionUser?.value?.name || '');
    const sessionUserSe = computed(() => sessionUser?.value?.userSe || '');

    const logInHandler = () => {
      router.push(URL.LOGIN);
      closeAllMenus();
    };

    const logOutHandler = () => {
      const logOutUrl = '/auth/logout';
      const requestOptions = {
        headers: {
          'Content-type': 'application/json',
        },
        credentials: 'include',
      };

      EgovNet.requestFetch(logOutUrl, requestOptions, (resp) => {
        console.log('Logout API Response:', resp);

        if (resp && parseInt(resp.resultCode) === parseInt(CODE.RCV_SUCCESS)) {
          //handleChangeLogin({ id: '', name: '', userSe: '' }); // 상태 초기화
          setSessionItem('loginUser', null); // 로컬 스토리지 초기화
          setSessionItem('jToken', null); // 인증 토큰 제거
          alert('로그아웃되었습니다!');
          router.push(URL.MAIN);

          // 상태 업데이트
          sessionUser.value = null;
          sessionUserId.value = null;
          sessionUserName.value = null;
          sessionUserSe.value = null;

          closeAllMenus();
        } else {
          console.error('Logout failed:', resp);
          alert(resp?.message || '로그아웃 실패: 서버 오류');
        }
      });
    };

    const closeAllMenus = () => {
      const webMenu = document.querySelector('.all_menu.WEB');
      if (webMenu) webMenu.classList.add('closed');

      const btnAllMenu = document.querySelector('.btnAllMenu');
      if (btnAllMenu) {
        btnAllMenu.classList.remove('active');
        btnAllMenu.title = '전체메뉴 닫힘';
      }

      const mobileMenu = document.querySelector('.all_menu.Mobile');
      if (mobileMenu) mobileMenu.classList.add('closed');
    };

    const isActiveRoute = (path) => route.path.startsWith(path);

    return {
      URL,
      sessionUserId,
      sessionUserName,
      sessionUserSe,
      logInHandler,
      logOutHandler,
      isActiveRoute,
    };
  },
};
</script>

  
  

<style scoped>
/* 필요한 스타일을 여기에 추가하세요 */
</style>