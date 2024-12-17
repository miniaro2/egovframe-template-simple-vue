<template>
  <div class="container">
    <div class="c_wrap">
      <!-- Location -->
      <div class="location">
        <ul>
          <li><router-link :to="URL.MAIN" class="home">Home</router-link></li>
          <li><router-link :to="URL.INFORM">알림마당</router-link></li>
          <li>일정관리</li>
        </ul>
      </div>
      <!--// Location -->

      <div class="layout">
        <!-- Navigation -->
        <EgovLeftNav />
        <!--// Navigation -->

        <div class="contents SITE_GALLARY_VIEW" id="contents">
          <!-- 본문 -->

          <div class="top_tit">
            <h1 class="tit_1">알림마당</h1>
          </div>

          <h2 class="tit_2">일정관리 상세보기</h2>

          <!-- 게시판 상세보기 -->
          <div class="board_view2">
            <dl>
              <dt>일정구분</dt>
              <dd>{{ scheduleDetail.schdulSeNm }}</dd>
            </dl>
            <dl>
              <dt>중요도</dt>
              <dd>{{ scheduleDetail.schdulIpcrCodeNm }}</dd>
            </dl>
            <dl>
              <dt>부서</dt>
              <dd>{{ scheduleDetail.schdulDeptName }}</dd>
            </dl>
            <dl>
              <dt>일정명</dt>
              <dd>{{ scheduleDetail.schdulNm }}</dd>
            </dl>
            <dl>
              <dt>일정내용</dt>
              <dd>{{ scheduleDetail.schdulCn }}</dd>
            </dl>
            <dl>
              <dt>반복구분</dt>
              <dd>{{ scheduleDetail.reptitSeCodeNm }}</dd>
            </dl>
            <dl>
              <dt>날짜/시간</dt>
              <dd>{{ scheduleDetail.startDateTime?.dateForm }} ~ {{ scheduleDetail.endDateTime?.dateForm }}</dd>
            </dl>
            <dl>
              <dt>담당자</dt>
              <dd>{{ scheduleDetail.schdulChargerName }}</dd>
            </dl>
            <EgovAttachFile :boardFiles="boardAttachFiles" />

            <!-- 버튼영역 -->
            <div class="board_btn_area">
              <div class="right_col btn1">
                <router-link :to="location.state?.prevPath" class="btn btn_blue_h46 w_100">목록</router-link>
              </div>
            </div>
            <!--// 버튼영역 -->
          </div>
          <!-- 게시판 상세보기 -->

          <!--// 본문 -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import * as EgovNet from '@/api/egovFetch';
import { URL } from '@/constants/url';
import EgovLeftNav from '@/components/leftmenu/EgovLeftNavInform';
import EgovAttachFile from '@/components/EgovAttachFile';

export default defineComponent({
  name: 'EgovDailyDetail',
  components: {
    EgovLeftNav,
    EgovAttachFile,
  },
  setup() {
    const location = useRoute();
    console.log("EgovDailyDetail [location] : ", location);

    const scheduleDetail = ref({});
    const boardAttachFiles = ref([]);

    const retrieveDetail = async () => {
      const retrieveDetailURL = `/schedule/${location.state?.schdulId}`;
      const requestOptions = {
        method: "GET",
        headers: {
          'Content-type': 'application/json',
        },
      };
      const resp = await EgovNet.requestFetch(retrieveDetailURL, requestOptions);
      let rawScheduleDetail = resp.result.scheduleDetail;
      rawScheduleDetail.startDateTime = convertDate(rawScheduleDetail.schdulBgnde);
      rawScheduleDetail.endDateTime = convertDate(rawScheduleDetail.schdulEndde);
      rawScheduleDetail.reptitSeCodeNm = getCodeName(resp.result.reptitSeCode, resp.result.scheduleDetail.reptitSeCode);
      rawScheduleDetail.schdulIpcrCodeNm = getCodeName(resp.result.schdulIpcrCode, resp.result.scheduleDetail.schdulIpcrCode);
      rawScheduleDetail.schdulSeNm = getCodeName(resp.result.schdulSe, resp.result.scheduleDetail.schdulSe);
      scheduleDetail.value = rawScheduleDetail;
      boardAttachFiles.value = resp.result.resultFiles;
    };

    const convertDate = (str) => {
      let year = str.substring(0, 4);
      let month = str.substring(4, 6);
      let date = str.substring(6, 8);
      let hour = str.substring(8, 10);
      let minute = str.substring(10, 12);
      return {
        year: year,
        month: month,
        date: date,
        hour: hour,
        minute: minute,
        dateForm: `${year}년 ${month}월 ${date}일 ${hour}시 ${minute}분`,
      };
    };

    const getCodeName = (codeArr, code) => {
      return codeArr.map((codeObj) => (codeObj.code === code.trim() ? codeObj.codeNm : "")).join('');
    };

    onMounted(() => {
      retrieveDetail();
    });

    return {
      URL,
      location,
      scheduleDetail,
      boardAttachFiles,
      retrieveDetail,
      convertDate,
      getCodeName,
    };
  },
});
</script>

<style scoped>
/* 스타일을 여기에 추가하세요 */
</style>
