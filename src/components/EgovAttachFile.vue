<template>
  <dl>
    <dt>첨부파일</dt>
    <dd>
      <span class="file_attach">
        <!-- 기존 첨부 파일 목록 -->
        <template v-for="(item, index) in boardFiles" :key="index">
          <span>
            <a
              href="#LINK"
              @click.prevent="onClickDownFile(item.atchFileId, item.fileSn)"
              download
            >
              {{ item.orignlFileNm }}
            </a>
            <span>[{{ item.fileMg }}byte]</span>
          </span>
          <button
            v-if="mode === CODE.MODE_MODIFY"
            class="btn btn_delete"
            @click="onClickDeleteFile(item.atchFileId, item.fileSn, index)"
          ></button>
          <br />
        </template>

        <!-- 파일 업로드 -->
        <template v-if="mode === CODE.MODE_CREATE">
          <input
            name="file_0"
            id="egovComFileUploader"
            type="file"
            multiple
            @change="onChangeFileInput"
          />
          총 업로드 가능한 첨부파일 개수는 {{ posblAtchFileNumber }} 개 입니다.
        </template>

        <template
          v-if="
            mode === CODE.MODE_MODIFY &&
            boardFiles.length < posblAtchFileNumber
          "
        >
          <input
            name="file_0"
            id="egovComFileUploader"
            type="file"
            multiple
            @change="onChangeFileInput"
          />
          현재 업로드 가능한 첨부파일 개수는
          {{ posblAtchFileNumber - boardFiles.length }} 개 입니다.
        </template>
      </span>
    </dd>
  </dl>
</template>

<script>
// eslint-disable-next-line
import { ref, onMounted } from "vue";
import * as EgovNet from "@/api/egovFetch";
// eslint-disable-next-line
import URL from "@/constants/url";
import { SERVER_URL } from "@/config";
import CODE from "@/constants/code";

export default {
  name: "EgovAttachFile",
  props: {
    boardFiles: {
      type: Array,
      default: () => [],
    },
    mode: {
      type: String,
      required: true,
    },
    fnChangeFile: {
      type: Function,
      required: true,
    },
    fnDeleteFile: {
      type: Function,
      required: true,
    },
    posblAtchFileNumber: {
      type: Number,
      default: 1, // 기본값 설정
    },
  },
  setup(props) {
    const onClickDownFile = (atchFileId, fileSn) => {
      window.open(
        `${SERVER_URL}/file?atchFileId=${atchFileId}&fileSn=${fileSn}`
      );
    };

    const onClickDeleteFile = (atchFileId, fileSn, fileIndex) => {
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          atchFileId,
          fileSn,
        }),
      };

      EgovNet.requestFetch("/file", requestOptions, (resp) => {
        if (Number(resp.resultCode) === Number(CODE.RCV_SUCCESS)) {
          // 삭제 성공
          const updatedFiles = [...props.boardFiles];
          updatedFiles.splice(fileIndex, 1); // 파일 목록 업데이트
          props.fnDeleteFile(updatedFiles); // 상위 컴포넌트에 전달
          alert("첨부파일이 삭제되었습니다.");
          props.fnChangeFile([]);
        } else {
          alert(resp.resultMessage || "첨부파일 삭제 실패");
        }
      });
    };

    const onChangeFileInput = (event) => {
      const files = event.target.files;

      if (files.length + props.boardFiles.length > props.posblAtchFileNumber) {
        alert(
          `총 첨부파일 개수는 ${props.posblAtchFileNumber} 까지 가능합니다.`
        );
        event.target.value = null; // 입력 초기화
        props.fnChangeFile([]);
        return;
      }

      props.fnChangeFile(files); // 파일 변경 시 부모 컴포넌트에 전달
    };

    return {
      onClickDownFile,
      onClickDeleteFile,
      onChangeFileInput,
    };
  },
};
</script>

<style scoped>
/* 필요에 따라 스타일을 추가하세요 */
</style>
