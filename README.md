# egovframe-template-simple-vue

이상한 거 있으면 miniaron@empal.com로 메일 주셔도 됩니다^^


본 프로젝트는 React로 구성된 

"표준프레임워크 심플홈페이지 FrontEnd"를 Vue.js로 컨버전 하여 구성되었습니다.

https://github.com/eGovFramework/egovframe-template-simple-react

창작품이 아니므로 별도의 라이센스는 존재하지 않지만,
라이센스가 존재한다면, "표준프레임워크 심플홈페이지 FrontEnd"의 라이센스와 동일합니다.

자세한 사항은 egovframe-template-simple-react의 설명을 참조하기 바라며,

지난 몇일 제가 고생했던 것을 '어디선가', '누군가가' 반복하지 않기를 바라며 공유합니다.

당신의 잠재적 동업자가 당신을 응원하겠습니다^^


# BackEnd 구동
심플 홈페이지 Backend 소스를 받아 구동한다.

https://github.com/eGovFramework/egovframe-template-simple-backend

-------------------------------------------------------------------------------------------

![Backend 구동](/Docs/startBackend.jpg)


-------------------------------------------------------------------------------------------

Backend : 8080

Frontend : 8081
-------------------------------------------------------------------------------------------
##.env.development

NODE_ENV=development
VUE_APP_API_BASE_URL=http://localhost:8081

NODE_PATH=src/

VUE_APP_EGOV_CONTEXT_URL=localhost:8080
-------------------------------------------------------------------------------------------
