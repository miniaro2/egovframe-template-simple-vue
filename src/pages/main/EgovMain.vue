<template>
  <div class="container P_MAIN">
    <div class="c_wrap">
      <div class="colbox">
        <div class="left_col">
          <img src="/assets/images/img_simple_main.png" alt="단순 홈페이지 전자정부 표준프레임워크의 경량환경 내부업무에 대한 최신 정보와 기술을 제공하고 있습니다." />
        </div>

        <div class="right_col">
          <div class="mini_board">
            <ul class="tab">
              <li><a href="#공지사항" class="on">공지사항</a></li>
              <li><a href="#갤러리">갤러리</a></li>
            </ul>
            <div class="list">
              <div class="notice">
                <h2 class="blind">공지사항</h2>
                <ul>
                  <li v-for="item in noticeBoard" :key="item.nttId">
                    <router-link
                      :to="{ pathname: URL.INFORM_NOTICE_DETAIL, params: { nttId: item.nttId, bbsId: item.bbsId } }"
                    >
                      {{ item.nttSj }}
                      <span>{{ item.frstRegisterPnttm }}</span>
                    </router-link>
                  </li>
                </ul>
                <router-link :to="URL.INFORM_NOTICE" class="more">더보기</router-link>
              </div>

              <div class="gallary">
                <h2 class="blind">갤러리</h2>
                <ul>
                  <li v-for="item in gallaryBoard" :key="item.nttId">
                    <router-link
                      :to="{ pathname: URL.INFORM_GALLERY_DETAIL, params: { nttId: item.nttId, bbsId: item.bbsId } }"
                    >
                      {{ item.nttSj }}
                      <span>{{ item.frstRegisterPnttm }}</span>
                    </router-link>
                  </li>
                </ul>
                <router-link :to="URL.INFORM_GALLERY" class="more">더보기</router-link>
              </div>
            </div>
          </div>

          <div class="banner">
            <router-link :to="URL.SUPPORT_DOWNLOAD" class="bn1">
              <strong>자료실</strong>
              <span>다양한 자료를<br />다운로드 받으실 수 있습니다.</span>
            </router-link>
            <router-link :to="URL.ABOUT" class="bn2">
              <strong>표준프레임워크센터</strong>
              <span>표준프레임워크센터의<br />약도 등의 정보를 제공합니다.</span>
            </router-link>
          </div>
        </div>
      </div>

      <div class="banner_bot">
        <div class="b1">
          <div>
            <h2>주요사업 소개</h2>
            <p>표준프레임워크가 제공하는<br />주요 사업을 소개합니다.</p>
          </div>
          <router-link :to="URL.INTRO_WORKS">자세히 보기</router-link>
        </div>
        <div class="b2">
          <div>
            <h2>대표서비스 소개</h2>
            <p>표준프레임워크 실행환경의<br />서비스 그룹에서 제공하는<br />대표서비스입니다.</p>
          </div>
          <router-link :to="URL.INTRO_SERVICE">자세히 보기</router-link>
        </div>
        <div class="b3">
          <div>
            <h2>서비스 신청</h2>
            <p>표준프레임워크 경량환경<br />홈페이지의 다양한 서비스를<br />신청 하실 수 있습니다.</p>
          </div>
          <router-link :to="URL.SUPPORT_APPLY">자세히 보기</router-link>
        </div>
        <div class="b4">
          <div>
            <h2>일정 현황</h2>
            <p>표준프레임워크 경량환경<br />홈페이지의 전체적인 일정<br />현황을 조회하실 수 있습니다.</p>
          </div>
          <router-link :to="URL.INFORM">자세히 보기</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import * as EgovNet from '@/api/egovFetch';
import URL from '@/constants/url';

export default {
  name: 'EgovMain',
  setup() {
    // eslint-disable-next-line
    const route = useRoute();

    const noticeBoard = ref([]);
    const gallaryBoard = ref([]);
    const noticeListTag = ref([]);
    const gallaryListTag = ref([]);

    const retrieveList = async () => {
        try {
          const retrieveListURL = '/mainPage';
          const requestOptions = {
            method: 'GET',
            headers: {
              'Content-type': 'application/json',
            },
          };
          
          const resp = await EgovNet.requestFetch(retrieveListURL, requestOptions);
          noticeListTag.value = resp.result.notiList.length ? resp.result.notiList : [{ nttId: 0, nttSj: '검색된 결과가 없습니다.' }];
          gallaryListTag.value = resp.result.galList.length ? resp.result.galList : [{ nttId: 0, nttSj: '검색된 결과가 없습니다.' }];
        } catch (error) {
          console.error('err response:', error);
        }
      };

    onMounted(() => {
      retrieveList();
    });

    return {
      noticeBoard,
      gallaryBoard,
      noticeListTag,
      gallaryListTag,
      URL
    };
  }
};
</script>

<style scoped>
/* 필요한 스타일을 여기에 추가하세요 */
</style>
