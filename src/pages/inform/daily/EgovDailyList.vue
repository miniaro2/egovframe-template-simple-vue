<template>
  <div class="container">
    <div class="c_wrap">
      <!-- Location -->
      <Location />
      <!--// Location -->

      <div class="layout">
        <!-- Navigation -->
        <EgovLeftNav />
        <!--// Navigation -->

        <div class="contents TODAY_SCHEDULE" id="contents">
          <!-- 본문 -->

          <div class="top_tit">
            <h1 class="tit_1">알림마당</h1>
          </div>

          <h2 class="tit_2">오늘의 행사</h2>

          <!-- 검색조건 -->
          <div class="condition">
            <ul>
              <li>
                <label class="f_select" for="sel1">
                  <select
                    name="schdulSe"
                    id="sel1"
                    title="조건"
                    v-model="searchCondition.schdulSe"
                  >
                    <option value="">전체</option>
                    <option value="1">회의</option>
                    <option value="2">세미나</option>
                    <option value="3">강의</option>
                    <option value="4">교육</option>
                    <option value="5">기타</option>
                  </select>
                </label>
              </li>
              <li>
                <button class="prev" @click="changeDate(CODE.DATE_YEAR, -1)"></button>
                <span>{{ searchCondition.year }}년</span>
                <button class="next" @click="changeDate(CODE.DATE_YEAR, 1)"></button>
              </li>
              <li class="half L">
                <button class="prev" @click="changeDate(CODE.DATE_MONTH, -1)"></button>
                <span>{{ searchCondition.month + 1 }}월</span>
                <button class="next" @click="changeDate(CODE.DATE_MONTH, 1)"></button>
              </li>
              <li class="half R">
                <button class="prev" @click="changeDate(CODE.DATE_DATE, -1)"></button>
                <span>{{ searchCondition.date }}일</span>
                <button class="next" @click="changeDate(CODE.DATE_DATE, 1)"></button>
              </li>
            </ul>
          </div>
          <!--// 검색조건 -->

          <!-- 게시판목록 -->
          <div class="board_list BRD001">
            <div class="head">
              <span>시간</span>
              <span>제목</span>
              <span>담당자</span>
            </div>
            <div class="result">
              <p v-if="scheduleList.length === 0" class="no_data">검색된 결과가 없습니다.</p>
              <router-link
                v-for="(item, index) in scheduleList"
                :key="index"
                :to="{ pathname: URL.INFORM_DAILY_DETAIL, state: { schdulId: item.schdulId, prevPath: URL.INFORM_DAILY }}"
                class="list_item"
              >
                <div>{{ getTimeForm(item.schdulBgnde) }} ~ {{ getTimeForm(item.schdulEndde) }}</div>
                <div class="al">{{ item.schdulNm }}</div>
                <div>{{ item.userNm }}</div>
              </router-link>
            </div>
          </div>
          <!--// 게시판목록 -->
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
//import { URL, CODE } from '@/constants';
import URL from '@/constants/url';
import CODE from '@/constants/code';
import EgovLeftNav from '@/components/leftmenu/EgovLeftNavInform';

export default defineComponent({
  name: 'EgovDailyList',
  components: {
    EgovLeftNav,
  },
  setup() {
    console.group("EgovDailyDetail");
    console.log("[Start] EgovDailyDetail ------------------------------");

    const location = useRoute();
    console.log("EgovDailyDetail [location] : ", location);

    const DATE = new Date();
    const TODAY = new Date(DATE.getFullYear(), DATE.getMonth(), DATE.getDate());

    const searchCondition = ref(location.state?.searchCondition || { schdulSe: '', year: TODAY.getFullYear(), month: TODAY.getMonth(), date: TODAY.getDate() });
    const scheduleList = ref([]);

    const changeDate = (target, amount) => {
      let changedDate;

      if (target === CODE.DATE_YEAR) {
        changedDate = new Date(searchCondition.value.year + amount, searchCondition.value.month, searchCondition.value.date);
      }

      if (target === CODE.DATE_MONTH) {
        changedDate = new Date(searchCondition.value.year, searchCondition.value.month + amount, searchCondition.value.date);
      }

      if (target === CODE.DATE_DATE) {
        changedDate = new Date(searchCondition.value.year, searchCondition.value.month, searchCondition.value.date + amount);
      }

      searchCondition.value = { ...searchCondition.value, year: changedDate.getFullYear(), month: changedDate.getMonth(), date: changedDate.getDate() };
    };

    const retrieveList = async (srchcnd) => {
      console.groupCollapsed("EgovDailyDetail.retrieveList()");

      const retrieveListURL = '/schedule/daily' + EgovNet.getQueryString(srchcnd);
      const requestOptions = {
        method: "GET",
        headers: {
          'Content-type': 'application/json',
        },
      };

      try {
        const resp = await EgovNet.requestFetch(retrieveListURL, requestOptions);
        scheduleList.value = resp.result.resultList;
      } catch (error) {
        console.log("err response : ", error);
      }

      console.groupEnd("EgovDailyDetail.retrieveList()");
    };

    const getTimeForm = (str) => {
      let hour = str.substring(8, 10);
      let starminute = str.substring(10, 12);
      return hour + ":" + starminute;
    };

    onMounted(() => {
      retrieveList(searchCondition.value);
    });

    console.log("------------------------------EgovDailyDetail [End]");
    console.groupEnd("EgovDailyDetail");

    return {
      URL,
      CODE,
      location,
      searchCondition,
      scheduleList,
      changeDate,
      retrieveList,
      getTimeForm,
    };
  },
});
</script>

<style scoped>
/* 스타일을 여기에 추가하세요 */
</style>
