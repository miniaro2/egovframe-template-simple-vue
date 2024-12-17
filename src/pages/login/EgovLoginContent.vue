<template>
  <div class="contents" id="contents">
    <!-- 본문 -->
    <div class="Plogin">
      <h1>로그인</h1>
      <p class="txt">
        전자정부표준프레임워크 경량환경 홈페이지 로그인 페이지입니다.<br />
        로그인을 하시면 모든 서비스를 제한없이 이용하실 수 있습니다.
      </p>

      <div class="login_box">
        <form @submit.prevent="submitFormHandler">
          <fieldset>
            <legend>로그인</legend>
            <span class="group">
              <input
                type="text"
                title="아이디"
                placeholder="아이디"
                v-model="userInfo.id"
                ref="idRef"
                @keydown="activeEnter"
              />
              <input
                type="password"
                title="비밀번호"
                placeholder="비밀번호"
                v-model="userInfo.password"
                ref="passwordRef"
                @keydown="activeEnter"
              />
            </span>
            <div class="chk">
              <label :class="{ f_chk: true, on: saveIDFlag }" ref="checkRef">
                <input
                  type="checkbox"
                  @change="handleSaveIDFlag"
                  v-model="saveIDFlag"
                />
                <em>ID저장</em>
              </label>
            </div>
            <button type="submit"><span>LOGIN</span></button>
          </fieldset>
        </form>
      </div>

      <ul class="list">
        <li>비밀번호는 6~12자의 영문 대/소문자, 숫자, 특수문자를 혼합해서 사용하실 수 있습니다.</li>
        <li>쉬운 비밀번호나 자주 쓰는 사이트의 비밀번호가 같을 경우, 도용되기 쉬우므로 주기적으로 변경하셔서 사용하는 것이 좋습니다.</li>
      </ul>
      <div class="btn_social">
        <SnsNaverBt />
        <SnsKakaoBt />
      </div>
    </div>
    <!--// 본문 -->
  </div>
</template>

<script>
import { ref, reactive, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import * as EgovNet from '@/api/egovFetch';
import URL from '@/constants/url';
import CODE from '@/constants/code';
import { getLocalItem, setLocalItem, setSessionItem } from '@/utils/storage';
import SnsNaverBt from '@/components/sns/SnsNaverBt.vue';
import SnsKakaoBt from '@/components/sns/SnsKakaoBt.vue';

export default {
  name: 'EgovLoginContent',
  components: {
    SnsNaverBt,
    SnsKakaoBt,
  },
  props: {
    onChangeLogin: Function, // 부모로부터 전달받은 핸들러
  },
  setup(props) {
    const router = useRouter();
    const userInfo = reactive({
      id: '',
      password: '',
      userSe: 'USR',
    });
    const saveIDFlag = ref(false);
    const idRef = ref(null);
    const passwordRef = ref(null);
    const checkRef = ref(null);
    const KEY_ID = 'KEY_ID';
    const KEY_SAVE_ID_FLAG = 'KEY_SAVE_ID_FLAG';

    const handleSaveIDFlag = () => {
      setLocalItem(KEY_SAVE_ID_FLAG, !saveIDFlag.value);
      saveIDFlag.value = !saveIDFlag.value;
    };

    onMounted(() => {
      let idFlag = getLocalItem(KEY_SAVE_ID_FLAG);
      if (idFlag === null) {
        saveIDFlag.value = false;
      } else {
        saveIDFlag.value = idFlag;
      }

      if (idFlag) {
        const savedId = getLocalItem(KEY_ID);
        if (savedId) {
          userInfo.id = savedId;
        }
        checkRef.value.className = 'f_chk on';
      } else {
        checkRef.value.className = 'f_chk';
        setLocalItem(KEY_ID, '');
      }
    });

    const activeEnter = (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        if (e.target === idRef.value && passwordRef.value === '') {
          alert('비밀번호 입력 여부를 확인하여 주세요');
          passwordRef.value.focus();
        } else {
          submitFormHandler();
        }
      }
    };

    const submitFormHandler = () => {
      console.log('EgovLoginContent submitFormHandler() called.');

      const loginUrl = '/auth/login-jwt';

      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userInfo),
      };

      EgovNet.requestFetch(loginUrl, requestOptions, (resp) => {
        const resultVO = resp.resultVO;
        const jToken = resp?.jToken || null;

        setSessionItem('jToken', jToken);

        if (Number(resp.resultCode) === Number(CODE.RCV_SUCCESS)) {
          setSessionItem('loginUser', resultVO);
          if (props.onChangeLogin) {
            props.onChangeLogin(resultVO); // 부모로 이벤트 전달
          }
          if (saveIDFlag.value) {
            setLocalItem(KEY_ID, resultVO.id);
          }
          router.push(URL.MAIN);
        } else {
          alert('로그인 실패: ' + resp.resultMessage);
        }
      });
    };

    return {
      userInfo,
      saveIDFlag,
      idRef,
      passwordRef,
      checkRef,
      handleSaveIDFlag,
      activeEnter,
      submitFormHandler,
    };
  },
};
</script>

<style scoped>
/* 필요한 스타일을 여기에 추가하세요 */
</style>
