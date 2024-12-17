<template>
  <div class="container">
    <div class="c_wrap">
      <!-- Location -->
      <div class="location">
        <ul>
          <li><a class="home" href="#!">Home</a></li>
          <li>마이페이지</li>
        </ul>
      </div>

      <div class="layout">
        <div class="contents BOARD_CREATE_REG" id="contents">
          <div class="top_tit">
            <h1 class="tit_1">마이페이지</h1>
          </div>

          <h2 class="tit_2" v-if="modeInfo.mode === CODE.MODE_CREATE">회원 생성</h2>
          <h2 class="tit_2" v-if="modeInfo.mode === CODE.MODE_MODIFY">회원 수정</h2>

          <div class="board_view2">
            <dl>
              <dt>
                <label for="mberId">회원ID</label><span class="req">필수</span>
              </dt>
              <dd>
                <template v-if="modeInfo.mode === CODE.MODE_CREATE">
                  <input
                    class="f_input2 w_full"
                    type="text"
                    name="mberId"
                    id="mberId"
                    v-model="memberDetail.mberId"
                    ref="mberIdRef"
                    required
                  />
                  <button class="btn btn_skyblue_h46" @click="checkIdDplct">
                    {{ memberDetail.checkIdResult }}
                  </button>
                </template>
                <template v-if="modeInfo.mode === CODE.MODE_MODIFY">
                  <input
                    class="f_input2 w_full"
                    type="text"
                    name="mberId"
                    id="mberId"
                    v-model="memberDetail.mberId"
                    ref="mberIdRef"
                    readonly
                    required
                  />
                </template>
              </dd>
            </dl>

            <dl>
              <dt>
                <label for="password">회원암호</label><span class="req">필수</span>
              </dt>
              <dd>
                <template v-if="modeInfo.mode === CODE.MODE_CREATE">
                  <input
                    class="f_input2 w_full"
                    type="password"
                    name="password"
                    id="password"
                    v-model="memberDetail.password"
                    ref="passwordRef"
                    required
                  />
                </template>
                <template v-if="modeInfo.mode === CODE.MODE_MODIFY">
                  <input
                    class="f_input2 w_full"
                    type="password"
                    name="password"
                    id="password"
                    v-model="memberDetail.password"
                    placeholder="빈값이면 기존 암호가 변경되지 않고 그대로 유지됩니다."
                    ref="passwordRef"
                  />
                </template>
              </dd>
            </dl>

            <dl>
              <dt>
                <label for="mberNm">회원명</label><span class="req">필수</span>
              </dt>
              <dd>
                <input
                  class="f_input2 w_full"
                  type="text"
                  name="mberNm"
                  id="mberNm"
                  v-model="memberDetail.mberNm"
                  ref="mberNmRef"
                  required
                />
              </dd>
            </dl>

            <div class="board_btn_area">
              <div class="left_col btn1">
                <button class="btn btn_skyblue_h46 w_100" @click="updateMember">
                  저장
                </button>
                <template v-if="modeInfo.mode === CODE.MODE_MODIFY">
                  <button class="btn btn_skyblue_h46 w_100" @click="deleteMember">
                    탈퇴
                  </button>
                </template>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive, onMounted, inject } from "vue"; // inject 추가
import { useRouter } from "vue-router";
import * as EgovNet from "@/api/egovFetch";
import URL from "@/constants/url";
import CODE from "@/constants/code";

export default {
  name: "EgovMypageEdit",
  setup() {
    const router = useRouter();

    const sessionUser = inject("sessionUser"); // 전역 상태로 로그인 사용자 정보 주입
    const mberIdRef = ref(null);
    const passwordRef = ref(null);
    const mberNmRef = ref(null);

    const modeInfo = reactive({
      mode: CODE.MODE_CREATE, // 기본값은 "Create"
      modeTitle: "",
      editURL: "",
    });

    const memberDetail = reactive({
      mberId: "",
      password: "",
      mberNm: "",
      tmplatId: "TMPLAT_MYPAGE_DEFAULT",
      groupId: "GROUP_00000000000001",
      mberSttus: "P",
      checkIdResult: "중복ID를 체크해 주세요.",
    });

    const initMode = () => {
      if (sessionUser.value && sessionUser.value.id) {
        // 사용자가 로그인되어 있는 경우
        modeInfo.mode = CODE.MODE_MODIFY;
        modeInfo.modeTitle = "수정";
        modeInfo.editURL = "/mypage/update";
        retrieveDetail();
      } else {
        // 로그인이 되어 있지 않은 경우
        modeInfo.mode = CODE.MODE_CREATE;
        modeInfo.modeTitle = "등록";
        modeInfo.editURL = "/etc/member_insert";
      }
    };

    const retrieveDetail = () => {
      if (modeInfo.mode === CODE.MODE_CREATE) return;

      const retrieveDetailURL = "/mypage/update";

      const requestOptions = {
        method: "GET",
        headers: { "Content-type": "application/json" },
      };

      EgovNet.requestFetch(retrieveDetailURL, requestOptions, (resp) => {
        Object.assign(memberDetail, resp.result.mberManageVO);
      });
    };

    const checkIdDplct = () => {
      if (!memberDetail.mberId) {
        alert("회원ID를 입력해 주세요");
        return;
      }

      const checkIdURL = `/etc/member_checkid/${memberDetail.mberId}`;
      const reqOptions = {
        method: "GET",
        headers: { "Content-type": "application/json" },
      };

      EgovNet.requestFetch(checkIdURL, reqOptions, (resp) => {
        if (Number(resp.resultCode) === Number(CODE.RCV_SUCCESS)) {
          memberDetail.checkIdResult =
            resp.result.usedCnt > 0
              ? "이미 사용중인 아이디입니다."
              : "사용 가능한 아이디입니다.";
        }
      });
    };

    const updateMember = () => {
      const method = modeInfo.mode === CODE.MODE_CREATE ? "POST" : "PUT";

      const requestOptions = {
        method,
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ ...memberDetail }),
      };

      EgovNet.requestFetch(modeInfo.editURL, requestOptions, (resp) => {
        if (Number(resp.resultCode) === Number(CODE.RCV_SUCCESS)) {
          alert("회원 정보가 저장되었습니다.");
          router.push({ path: URL.MAIN });
        } else {
          alert(resp.resultMessage);
        }
      });
    };

    const deleteMember = () => {
      const deleteURL = "/mypage/delete";
      const requestOptions = {
        method: "PUT",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ ...memberDetail }),
      };

      EgovNet.requestFetch(deleteURL, requestOptions, (resp) => {
        if (Number(resp.resultCode) === Number(CODE.RCV_SUCCESS)) {
          alert("회원이 탈퇴되었습니다.");
          router.push({ path: URL.MAIN });
        } else {
          alert(resp.resultMessage);
        }
      });
    };

    onMounted(() => {
      initMode(); // 초기 모드 설정
    });

    return {
      CODE,
      modeInfo,
      memberDetail,
      mberIdRef,
      passwordRef,
      mberNmRef,
      updateMember,
      deleteMember,
      checkIdDplct,
    };
  },
};
</script>

<style scoped>
/* 스타일 추가 */
</style>
