<template>
  <div class="container">
    <div class="c_wrap">
      <!-- Location -->
      <div class="location">
        <ul>
          <li><router-link to="/" class="home">Home</router-link></li>
          <li><router-link to="">고객지원</router-link></li>
          <li>소개</li>
        </ul>
      </div>
      <!--// Location -->

      <div class="layout">
        <!-- Navigation -->
        <EgovLeftNav />
        <!--// Navigation -->

        <div class="contents PDS_LIST" id="contents">
          <!-- 본문 -->

          <div class="top_tit">
            <h1 class="tit_1">고객지원</h1>
          </div>

          <h2 class="tit_2">자료실</h2>

          <!-- 검색조건 -->
          <div class="condition">
            <ul>
              <li class="third_1 L">
                <label class="f_select" for="search_select">
                  <select v-model="searchOption" name="search_select" id="search_select">
                    <option value="0">전체</option>
                    <option value="1">제목</option>
                    <option value="2">제목/내용</option>
                    <option value="3">작성자</option>
                  </select>
                </label>
              </li>
              <li class="third_2 R">
                <span class="f_search w_500">
                  <input type="text" v-model="searchText" placeholder=""/>
                  <button type="button" @click="search">조회</button>
                </span>
              </li>
              <li>
                <router-link :to="URL.SUPPORT_DOWNLOAD_CREATE" class="btn btn_blue_h46 pd35">등록</router-link>
              </li>
            </ul>
          </div>
          <!--// 검색조건 -->

          <h3 class="tit_5">추천 다운로드 자료</h3>

          <div class="pdslist">
            <ul>
              <li v-for="item in recommendedDownloads" :key="item.id">
                <router-link :to="URL.SUPPORT_DOWNLOAD_DETAIL">
                  <img :src="item.image" alt=""/>
                  <span>
                    <strong>{{ item.title }}</strong>
                    <span>{{ item.description }}</span>
                  </span>
                </router-link>
              </li>
            </ul>
          </div>

          <h3 class="tit_5">최신 등록 자료</h3>

          <div class="recent">
            <ul class="left_col">
              <li v-for="item in recentDownloadsLeft" :key="item.id">
                <span class="no">{{ item.no }}</span>
                <router-link :to="URL.SUPPORT_DOWNLOAD_DETAIL">{{ item.title }}</router-link>
                <span class="ymd">{{ item.date }}</span>
              </li>
            </ul>

            <ul class="right_col">
              <li v-for="item in recentDownloadsRight" :key="item.id">
                <span class="no">{{ item.no }}</span>
                <router-link :to="URL.SUPPORT_DOWNLOAD_DETAIL">{{ item.title }}</router-link>
                <span class="ymd">{{ item.date }}</span>
              </li>
            </ul>
          </div>
          
          <!-- 게시판목록 -->
          <div className="board_list BRD007">
              <div className="head">
                  <span>번호</span>
                  <span>소프트웨어명</span>
                  <span>다운</span>
                  <span>크기</span>
                  <span>등록일</span>
              </div>
              <div className="result">
                  <!-- case : 데이터 없을때 -->
                  <!--<p className="no_data" key="0">검색된 결과가 없습니다.</p> -->
                  
                  <!-- case : 데이터 있을때 -->
                  <Link :to="URL.SUPPORT_DOWNLOAD_DETAIL" className="list_item">
                      <div>3</div>
                      <div className="al">전자정부표준프레임워크 인스톨러(Egovframework installer) V1.037</div>
                      <div>100</div>
                      <div>16Mb</div>
                      <div>2021-7-24</div>
                  </Link>
                  <Link :to="URL.SUPPORT_DOWNLOAD_DETAIL" className="list_item">
                      <div>2</div>
                      <div className="al">전자정부표준프레임워크 인스톨러(Egovframework installer) V1.037</div>
                      <div>100</div>
                      <div>16Mb</div>
                      <div>2021-7-24</div>
                  </Link>
                  <Link :to="URL.SUPPORT_DOWNLOAD_DETAIL" className="list_item">
                      <div>1</div>
                      <div className="al">전자정부표준프레임워크 인스톨러(Egovframework installer) V1.037</div>
                      <div>100</div>
                      <div>16Mb</div>
                      <div>2021-7-24</div>
                  </Link>
              </div>
          </div>
          {/* <!--// 게시판목록 --> */}

          <div className="board_bot">
              {/* <!-- Paging --> */}
              <div className="paging">
                  <ul>
                      <li className="btn"><button to="#" className="first">처음</button></li>
                      <li className="btn"><button to="#" className="prev">이전</button></li>
                      <li><button to="#" className="cur">1</button></li>
                      <li><button to="#">2</button></li>
                      <li><button to="#">3</button></li>
                      <li><button to="#">4</button></li>
                      <li><button to="#">5</button></li>
                      <li className="btn"><button to="#" className="next">다음</button></li>
                      <li className="btn"><button to="#" className="last">마지막</button></li>
                  </ul>
              </div>
              {/* <!--/ Paging --> */}
          </div>

          <div className="board_btn_area">
              <div className="left_col btn1">
              </div>

              <div className="right_col btn1">
                  <Link to={URL.SUPPORT_DOWNLOAD_CREATE} className="btn btn_upload"><span>자료 올리기</span></Link>
              </div>
          </div>

          {/* <!--// 본문 --> */}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import URL from '@/constants/url';
import EgovLeftNav from '@/components/leftmenu/EgovLeftNavSupport';

export default defineComponent({
  name: 'EgovDownloadList',
  components: {
    EgovLeftNav,
  },
  data() {
    return {
      URL,
      searchOption: '0',
      searchText: '',
      recommendedDownloads: [
        // 여기에 추천 다운로드 항목을 추가하세요.
      ],
      recentDownloadsLeft: [
        // 여기에 왼쪽 열에 표시될 최신 등록 항목을 추가하세요.
      ],
      recentDownloadsRight: [
        // 여기에 오른쪽 열에 표시될 최신 등록 항목을 추가하세요.
      ],
    };
  },
  methods: {
    search() {
      // 검색 기능을 구현하세요.
    },
  },
});
</script>

<style scoped>
/* 스타일을 여기에 추가하세요 */
</style>
