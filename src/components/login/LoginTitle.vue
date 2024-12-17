<template>
  <v-row justify="center" style="place-content: center;">
    <v-col
      cols="12"
      sm="10"
      md="8"
      lg="6"
    >
      <v-card ref="form">
        <!-- 입력폼 -->
        <v-card-text>
          <v-text-field
            v-model="id"
            :rules="[rules.required, rules.idMax]"
            :style="color='color'"
            label="아이디"
            placeholder="아이디를 입력해주세요"
            counter="25"
            >{{id}}</v-text-field>
          <v-text-field
            v-model="pw"
            :append-icon="pwShow ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="pwShow = !pwShow"
            :rules="[rules.required]"
            :type="pwShow ? 'text' : 'password'"
            label="비밀번호"
            placeholder="비밀번호를 입력해주세요"
            >{{pw}}</v-text-field>
        </v-card-text>
        <v-divider class="mt-12"></v-divider>
        <!-- 버튼 -->
        <v-card-actions>
          <v-btn 
          depressed
          color="primary" 
          @click="loginResult" 
          @keydown.enter="loginResult"
          >로그인
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn 
          depressed
          color="error" 
          @click="register"
          >회원가입
          </v-btn>
        </v-card-actions>
      </v-card>
      <v-alert
        dense
        type="info"
      >{{alertText}}
      </v-alert>
    </v-col>
  </v-row>
</template>

<script>
import axios from 'axios';

export default {
    data () {
      return {
        id: 'admin',
        pw: '1234',
        pwShow : false,
        color : 'red',
        rules: {
          required: value => !! value || '필수항목 입니다.',
          idMax: v => v.length <= 25 || '아이디는 25자 이내입니다.',
        },
        alert : false,
        alertText : '로그인 버튼을 눌러주세요.',
        loginChk : false
      }
    },
    methods:{
      loginResult(){
        console.log("---loginResult---")
        // 입력이 없을 때
        // ! this.pw = true
        // !! this.pw = false
        if(!!this.id && !!this.pw){
          this.loginCheck()
        }else{
          console.log("미입력")
        }
      },
      loginCheck(){
        console.log("---loginCheck---")
        axios.post('/common/user/login.json', { // 로그인 검증 컨트롤러를 타야함
          userId: this.id,
          passwd: this.pw
        }).then(res => {
          console.log(res.data)
          if(res.data.data == 'SUCCESS'){
            this.loginChk = true
            this.alertText = "로그인에 성공하셨습니다."
          }else{ // 현재 틀리는 경우는 JAVA 자체의 에러가 발생함(test 프로젝트기에 생략)
            this.loginChk = false
            this.alertText = "아이디와 비밀번호를 확인해주세요."
          }
        })
      },
      register(){
        console.log("회원가입 이동")
      },
      // IdCheck(){
      //   console.log("---loginCheck---")
      //   axios.post('/sfc/user/userIdCheck.json', {
      //     userId: this.id,
      //     passwd: this.pw
      //   }).then(res => {
      //     console.log(res.data)
      //     if(res.data.data == 'SUCCESS'){
      //       this.IdChk = true
      //       this.alertText = "사용가능한 아이디입니다."
      //     }else{
      //       this.IdChk = false
      //       this.alertText = "사용할 수 없는 아이디입니다."
      //     }
      //   })
      // },
    }
}
</script>

<style>


</style>