<template>
  <div class="container">
    <div class="c_wrap">
      <!-- Location -->
      <div class="location">
        <ul>
          <li><router-link :to="URL.MAIN" class="home">Home</router-link></li>
          <li><router-link :to="URL.INFORM">알림마당</router-link></li>
          <li>{{ masterBoard?.bbsNm }}</li>
        </ul>
      </div>
      <!--// Location -->

      <div class="layout">
        <!-- Navigation -->
        <EgovLeftNav />
        <!--// Navigation -->

        <div class="contents NOTICE_LIST" id="contents">
          <!-- 본문 -->

          <div class="top_tit">
            <h1 class="tit_1">알림마당</h1>
          </div>

          <h2 class="tit_2">{{ masterBoard?.bbsNm }}</h2>

          <!-- 검색조건 -->
          <div class="condition">
            <ul>
              <li class="third_1 L">
                <label class="f_select" for="sel1">
                  <select id="sel1" title="조건" v-model="searchCondition.searchCnd">
                    <option value="0">제목</option>
                    <option value="1">내용</option>
                    <option value="2">작성자</option>
                  </select>
                </label>
              </li>
              <li class="third_2 R">
                <span class="f_search w_500">
                  <input type="text" v-model="searchCondition.searchWrd" placeholder="" />
                  <button type="button" @click="retrieveList({ ...searchCondition, pageIndex: 1 })">조회</button>
                </span>
              </li>
              <li v-if="user && sessionUserSe === 'ADM' && masterBoard?.bbsUseFlag === 'Y'">
                <router-link :to="{ path: URL.INFORM_NOTICE_CREATE, query: { bbsId: bbsId } }" class="btn btn_blue_h46 pd35">등록</router-link>
              </li>
            </ul>
          </div>
          <!--// 검색조건 -->

          <!-- 게시판목록 -->
          <div class="board_list BRD002">
            <div class="head">
              <span>번호</span>
              <span>제목</span>
              <span>작성자</span>
              <span>작성일</span>
              <span>조회수</span>
            </div>
            <div class="result">
              <p v-if="scheduleList.length === 0" class="no_data">검색된 결과가 없습니다.</p>
              <router-link
                v-for="(item, index) in scheduleList"
                :key="index"
                :to="{ pathname: URL.INFORM_NOTICE_DETAIL, state: { nttId: item.nttId, bbsId: item.bbsId, searchCondition: searchCondition }}"
                class="list_item"
              >
                <div>{{ itemIdxByPage(paginationInfo.resultCnt, paginationInfo.currentPageNo, paginationInfo.pageSize, index) }}</div>
                <div v-if="item.replyLc * 1" class="al reply">{{ item.nttSj }}</div>
                <div v-else class="al">{{ item.nttSj }}</div>
                <div>{{ item.frstRegisterNm }}</div>
                <div>{{ item.frstRegisterPnttm }}</div>
                <div>{{ item.inqireCo }}</div>
              </router-link>
            </div>
          </div>
          <!--// 게시판목록 -->

          <div class="board_bot">
            <!-- Paging -->
            <EgovPaging :pagination="paginationInfo" @moveToPage="moveToPage" />
            <!--/ Paging -->
          </div>

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
//import { URL, CODE, NOTICE_BBS_ID } from '@/constants';
import { NOTICE_BBS_ID } from '@/config';
import URL from '@/constants/url';
import CODE from '@/constants/code';
import EgovLeftNav from '@/components/leftmenu/EgovLeftNavInform';
import EgovPaging from '@/components/EgovPaging';
import { itemIdxByPage } from '@/utils/calc';
import { getSessionItem } from '@/utils/storage';

export default defineComponent({
  name: 'EgovNoticeList',
  components: {
    EgovLeftNav,
    EgovPaging,
  },
  setup() {
    console.group("EgovNoticeList");
    console.log("[Start] EgovNoticeList ------------------------------");

    const location = useRoute();
    console.log("EgovNoticeList [location] : ", location);

    const sessionUser = getSessionItem('loginUser');
    const sessionUserSe = sessionUser?.userSe;

    const bbsId = location.state?.bbsId || NOTICE_BBS_ID;

    const searchCondition = ref(location.state?.searchCondition || { bbsId: bbsId, pageIndex: 1, searchCnd: '0', searchWrd: '' });
    const masterBoard = ref({});
    const user = ref({});
    const paginationInfo = ref({});
    const scheduleList = ref([]);

    const retrieveList = async (searchCondition) => {
      console.groupCollapsed("EgovNoticeList.retrieveList()");

      const retrieveListURL = '/board' + EgovNet.getQueryString(searchCondition);
      const requestOptions = {
        method: "GET",
        headers: {
          'Content-type': 'application/json',
        },
      };

      try {
        const resp = await EgovNet.requestFetch(retrieveListURL, requestOptions);
        masterBoard.value = resp.result.brdMstrVO;
        paginationInfo.value = resp.result.paginationInfo;
        user.value = resp.result.user;
        scheduleList.value = resp.result.resultList;
      } catch (error) {
        console.log("err response : ", error);
      }

      console.groupEnd("EgovNoticeList.retrieveList()");
    };

    const moveToPage = (page) => {
      retrieveList({ ...searchCondition.value, pageIndex: page });
    };
    /*
    */

    onMounted(() => {
      retrieveList(searchCondition.value);
    });

    console.log("------------------------------EgovNoticeList [End]");
    console.groupEnd("EgovNoticeList");

    return {
      URL,
      CODE,
      location,
      searchCondition,
      masterBoard,
      user,
      paginationInfo,
      scheduleList,
      retrieveList,
      moveToPage,
      sessionUserSe,
      itemIdxByPage,
    };
  },
});
</script>

<style scoped>
/* 스타일을 여기에 추가하세요 */
</style>
