<template>
  <div class="container">
    <div class="c_wrap">
      <!-- Location -->
      <Location :masterBoard="masterBoard" />
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

          <h2 class="tit_2">{{ masterBoard?.bbsNm }} {{ modeInfo.modeTitle }}</h2>

          <div class="board_view2">
            <dl>
              <dt>
                <label for="nttSj">제목<span class="req">필수</span></label>
              </dt>
              <dd>
                <input
                  class="f_input2 w_full"
                  id="nttSj"
                  name="nttSj"
                  type="text"
                  v-model="boardDetail.nttSj"
                  maxlength="60"
                />
              </dd>
            </dl>
            <dl>
              <dt>
                <label for="nttCn">내용<span class="req">필수</span></label>
              </dt>
              <dd>
                <textarea
                  class="f_txtar w_full h_200"
                  id="nttCn"
                  name="nttCn"
                  cols="30"
                  rows="10"
                  v-model="boardDetail.nttCn"
                ></textarea>
              </dd>
            </dl>
            <!-- 답글이 아니고 게시판 파일 첨부 가능 상태에서만 첨부파일 컴포넌트 노출 -->
            <EgovAttachFile
              v-if="modeInfo.mode !== CODE.MODE_REPLY && masterBoard.fileAtchPosblAt === 'Y'"
              :fnChangeFile="handleFileChange"
              :fnDeleteFile="handleFileDelete"
              :boardFiles="boardAttachFiles"
              :mode="props.mode"
              :posblAtchFileNumber="masterBoard.posblAtchFileNumber"
            />

            <!-- 버튼영역 -->
            <div class="board_btn_area">
              <div v-if="sessionUserSe === 'ADM'" class="left_col btn1">
                <button class="btn btn_skyblue_h46 w_100" @click="updateBoard">
                  저장
                </button>
              </div>
              <div class="right_col btn1">
                <router-link to="{ path: URL.INFORM_NOTICE }" class="btn btn_blue_h46 w_100">
                  목록
                </router-link>
              </div>
            </div>
            <!--// 버튼영역 -->
          </div>
          <!--// 본문 -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

import EgovLeftNav from "@/components/leftmenu/EgovLeftNavInform.vue";
import EgovAttachFile from "@/components/EgovAttachFile.vue";
import * as EgovNet from "@/api/egovFetch";
import URL from "@/constants/url";
import CODE from "@/constants/code";
import { NOTICE_BBS_ID } from "@/config";
import bbsFormVaildator from "@/utils/bbsFormVaildator";
import { getSessionItem } from "@/utils/storage";

export default {
  name: "EgovNoticeEdit",
  components: {
    EgovLeftNav,
    EgovAttachFile,
  },
  props: {
    mode: String,
  },
  setup(props) {
    const router = useRouter();
    const route = useRoute();

    const sessionUser = getSessionItem("loginUser");
    const sessionUserSe = sessionUser?.userSe;

    const bbsId = ref(route.params.bbsId || NOTICE_BBS_ID);
    const nttId = ref(route.params.nttId || "");

    const modeInfo = reactive({
      mode: props.mode,
      modeTitle: "",
      method: "",
      editURL: "",
    });

    const masterBoard = reactive({});
    const boardDetail = reactive({
      nttSj: "",
      nttCn: "",
    });
    const boardAttachFiles = ref([]);

    const initMode = () => {
      if (props.mode === CODE.MODE_CREATE) {
        Object.assign(modeInfo, {
          modeTitle: "등록",
          method: "POST",
          editURL: "/board",
        });
      } else if (props.mode === CODE.MODE_MODIFY) {
        Object.assign(modeInfo, {
          modeTitle: "수정",
          method: "PUT",
          editURL: `/board/${nttId.value}`,
        });
      } else if (props.mode === CODE.MODE_REPLY) {
        Object.assign(modeInfo, {
          modeTitle: "답글쓰기",
          method: "POST",
          editURL: "/boardReply",
        });
      } else {
        router.push({ path: URL.ERROR, state: { msg: "" } });
      }
      retrieveDetail();
    };

    const retrieveDetail = () => {
      if (modeInfo.mode === CODE.MODE_CREATE) {
        const retrieveDetailURL = `/boardFileAtch/${bbsId.value}`;
        const requestOptions = {
          method: "GET",
          headers: {
            "Content-type": "application/json",
          },
        };
        EgovNet.requestFetch(retrieveDetailURL, requestOptions, (resp) => {
          Object.assign(masterBoard, resp.result.brdMstrVO);
        });
        Object.assign(boardDetail, { bbsId: bbsId.value, nttSj: "", nttCn: "" });
        return;
      }

      const retrieveDetailURL = `/board/${bbsId.value}/${nttId.value}`;
      const requestOptions = {
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
      };
      EgovNet.requestFetch(retrieveDetailURL, requestOptions, (resp) => {
        Object.assign(masterBoard, resp.result.brdMstrVO);
        if (modeInfo.mode === CODE.MODE_REPLY) {
          Object.assign(boardDetail, {
            ...resp.result.boardVO,
            nttSj: `RE: ${resp.result.boardVO.nttSj}`,
            nttCn: "",
            inqireCo: 0,
            atchFileId: "",
          });
        } else if (modeInfo.mode === CODE.MODE_MODIFY) {
          Object.assign(boardDetail, resp.result.boardVO);
          boardAttachFiles.value = resp.result.resultFiles;
        }
      });
    };

    const handleFileChange = (attachfile) => {
      console.log("Changed attachfile:", attachfile);
      attachfile.forEach((file, index) => {
        boardDetail[`file_${index}`] = file;
      });
    };

    const handleFileDelete = (deletedFile) => {
      console.log("Deleted file:", deletedFile);
      boardAttachFiles.value = deletedFile;
    };

    const updateBoard = () => {
      const formData = new FormData();
      Object.entries(boardDetail).forEach(([key, value]) => {
        formData.append(key, value);
      });

      if (bbsFormVaildator(formData)) {
        const requestOptions = {
          method: modeInfo.method,
          body: formData,
        };
        EgovNet.requestFetch(modeInfo.editURL, requestOptions, (resp) => {
          if (Number(resp.resultCode) === Number(CODE.RCV_SUCCESS)) {
            router.push({ path: URL.INFORM_NOTICE, state: { bbsId: bbsId.value } });
          } else {
            router.push({ path: URL.ERROR, state: { msg: resp.resultMessage } });
          }
        });
      }
    };

    onMounted(initMode);

    return {
      masterBoard,
      modeInfo,
      boardDetail,
      boardAttachFiles,
      sessionUserSe,
      updateBoard,
      handleFileChange,
      handleFileDelete,
    };
  },
};
</script>

<style scoped>
/* 필요한 스타일 추가 */
</style>
