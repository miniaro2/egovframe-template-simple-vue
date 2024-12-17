import { createRouter, createWebHistory } from 'vue-router';
import axios from 'axios';
import URL from '@/constants/url'; // URL 상수 가져오기
import CODE from '@/constants/code';
//import CODE from '@/constants/code'; // CODE 상수 가져오기

// COMMON
//import EgovHeader from '@/components/EgovHeader.vue';
//import EgovFooter from '@/components/EgovFooter.vue';
//import EgovInfoPopup from '@/components/EgovInfoPopup.vue';
// import EgovError from '@/components/EgovError.vue';

// MAIN
import EgovMain from '@/pages/main/EgovMain.vue';
import EgovLogin from '@/pages/login/EgovLogin.vue';
// SNS
// import SnsNaverCallback from '@/components/sns/SnsNaverCallback.vue';
// import SnsKakaoCallback from '@/components/sns/SnsKakaoCallback.vue';
// ABOUT
import EgovAboutSite from '@/pages/about/EgovAboutSite.vue';

import EgovAboutHistory from '@/pages/about/EgovAboutHistory.vue';
// import EgovAboutOrganization from '@/pages/about/EgovAboutOrganization.vue';
// import EgovAboutLocation from '@/pages/about/EgovAboutLocation.vue';

// INTRO
// import EgovIntroWork from '@/pages/intro/EgovIntroWork.vue';
// import EgovIntroService from '@/pages/intro/EgovIntroService.vue';

// SUPPORT
import EgovSupportDownloadList from '@/pages/support/download/EgovDownloadList.vue';
import EgovSupportDownloadDetail from '@/pages/support/download/EgovDownloadDetail.vue';
//import EgovSupportDownloadCreate from '@/pages/support/download/EgovDownloadCreate.vue';
//import EgovSupportQnaList from '@/pages/support/qna/EgovQnaList.vue';
//import EgovSupportQnaDetail from '@/pages/support/qna/EgovQnaDetail.vue';
//import EgovSupportApply from '@/pages/support/apply/EgovSupportApply.vue';

// INFORM
import EgovDailyList from '@/pages/inform/daily/EgovDailyList.vue';
//import EgovDailyDetail from '@/pages/inform/daily/EgovDailyDetail.vue';
//import EgovWeeklyList from '@/pages/inform/weekly/EgovWeeklyList.vue';

import EgovNoticeList from '@/pages/inform/notice/EgovNoticeList.vue';
//import EgovNoticeDetail from '@/pages/inform/notice/EgovNoticeDetail.vue';
import EgovNoticeEdit from '@/pages/inform/notice/EgovNoticeEdit.vue';

//import EgovGalleryList from '@/pages/inform/gallery/EgovGalleryList.vue';
//import EgovGalleryDetail from '@/pages/inform/gallery/EgovGalleryDetail.vue';
//import EgovGalleryEdit from '@/pages/inform/gallery/EgovGalleryEdit.vue';

// ADMIN
// import EgovAdminScheduleList from '@/pages/admin/schedule/EgovAdminScheduleList.vue';
// import EgovAdminScheduleDetail from '@/pages/admin/schedule/EgovAdminScheduleDetail.vue';
// import EgovAdminScheduleEdit from '@/pages/admin/schedule/EgovAdminScheduleEdit.vue';

// import EgovAdminBoardList from '@/pages/admin/board/EgovAdminBoardList.vue';
// import EgovAdminBoardEdit from '@/pages/admin/board/EgovAdminBoardEdit.vue';

// import EgovAdminUsageList from '@/pages/admin/usage/EgovAdminUsageList.vue';
// import EgovAdminUsageEdit from '@/pages/admin/usage/EgovAdminUsageEdit.vue';

// import EgovAdminNoticeList from '@/pages/admin/notice/EgovAdminNoticeList.vue';
// import EgovAdminNoticeDetail from '@/pages/admin/notice/EgovAdminNoticeDetail.vue';
// import EgovAdminNoticeEdit from '@/pages/admin/notice/EgovAdminNoticeEdit.vue';

// import EgovAdminGalleryList from '@/pages/admin/gallery/EgovAdminGalleryList.vue';
// import EgovAdminGalleryDetail from '@/pages/admin/gallery/EgovAdminGalleryDetail.vue';
// import EgovAdminGalleryEdit from '@/pages/admin/gallery/EgovAdminGalleryEdit.vue';

// MYPAGE
import EgovMypageEdit from '@/pages/mypage/EgovMypageEdit.vue';

const routes = [
  { path: URL.MAIN, component: EgovMain },
  { path: URL.LOGIN, component: EgovLogin,
    props: (route) => ({
      onChangeLogin: route.meta.onChangeLogin, // 이벤트 핸들러 전달
    }),
  },
//   { path: URL.SNS_NAVER_CB, component: SnsNaverCallback },
//   { path: URL.SNS_KAKAO_CB, component: SnsKakaoCallback },
  { path: URL.ABOUT, redirect: URL.ABOUT_SITE },
  { path: URL.ABOUT_SITE, component: EgovAboutSite },
  { path: URL.ABOUT_HISTORY, component: EgovAboutHistory },
//   { path: URL.ABOUT_ORGANIZATION, component: EgovAboutOrganization },
//   { path: URL.ABOUT_LOCATION, component: EgovAboutLocation },
//   { path: URL.INTRO_WORKS, component: EgovIntroWork },
//   { path: URL.INTRO_SERVICE, component: EgovIntroService },
  { path: URL.SUPPORT, redirect: URL.SUPPORT_DOWNLOAD },
  { path: URL.SUPPORT_DOWNLOAD, component: EgovSupportDownloadList },
  { path: URL.SUPPORT_DOWNLOAD_DETAIL, component: EgovSupportDownloadDetail },
//  { path: URL.SUPPORT_DOWNLOAD_CREATE, component: EgovSupportDownloadCreate },
//  { path: URL.SUPPORT_QNA, component: EgovSupportQnaList },
//  { path: URL.SUPPORT_QNA_DETAIL, component: EgovSupportQnaDetail },
//  { path: URL.SUPPORT_APPLY, component: EgovSupportApply },
  { path: URL.INFORM, redirect: URL.INFORM_DAILY },
  { path: URL.INFORM_DAILY, component: EgovDailyList },
  { path: URL.INFORM_NOTICE, component: EgovNoticeList },
  { path: URL.INFORM_NOTICE_CREATE, component: EgovNoticeEdit },
//   { path: URL.ADMIN_SCHEDULE, component: EgovAdminScheduleList },
//   { path: URL.ADMIN_NOTICE, component: EgovAdminNoticeList },
//   { path: URL.ADMIN_GALLERY, component: EgovAdminGalleryList },
  { path: URL.MYPAGE_CREATE, component: EgovMypageEdit, props: { mode: CODE.MODE_CREATE } },
  { path: URL.MYPAGE_MODIFY, component: EgovMypageEdit, props: { mode: CODE.MODE_MODIFY } },
//   { path: URL.ERROR, component: EgovError },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// JWT 인증 함수
async function jwtAuthentication() {
    try {
      const response = await axios.post('/jwtAuthAPI'); // 서버에 인증 요청
      return response.data; // 서버 응답에 따라 인증 결과 반환
    } catch (error) {
      console.error('JWT Authentication failed:', error);
      return false;
    }
  }
  
  // 라우터 가드 설정
  router.beforeEach(async (to, from, next) => {
    if (to.path.startsWith('/admin/')) {
      const isAuthenticated = await jwtAuthentication();
      if (!isAuthenticated) {
        next('/login'); // 인증 실패 시 로그인 페이지로 이동
      } else {
        next(); // 인증 성공 시 해당 경로로 이동
      }
    } else {
      next(); // 인증이 필요하지 않은 경로
    }
  });

export default router;
