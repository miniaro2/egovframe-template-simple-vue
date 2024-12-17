// src/constants/code.js

const CODE = {
    RCV_SUCCESS: "200", // 성공

    RCV_ERROR_AUTH: "403", // 인증 오류
    RCV_ERROR_DELETE: "700", // 삭제 오류
    RCV_ERROR_SAVE: "800", // 저장 오류
    RCV_ERROR_VALIDATION: "900", // 입력 오류

    MODE_CREATE: "create", // 등록 모드
    MODE_MODIFY: "modify", // 수정 모드 
    MODE_READ: "read", // 읽기 모드
    MODE_REPLY: "reply", // 답글 모드

    DATE_YEAR: "year",
    DATE_MONTH: "month",
    DATE_DATE: "date",
    DATE_WEEK: "week",
    DATE_DAY: "day",
};

export default CODE;

/*
export const MODE_CREATE = "create";
export const MODE_MODIFY = "modify";
export const MODE_READ = "read";
export const MODE_REPLY = "reply";

export const RCV_SUCCESS = "200";
export const RCV_ERROR_AUTH = "403";
export const RCV_ERROR_DELETE = "700";
export const RCV_ERROR_SAVE = "800";
export const RCV_ERROR_VALIDATION = "900";

export const DATE_YEAR = "year";
export const DATE_MONTH = "month";
export const DATE_DATE = "date";
export const DATE_WEEK = "week";
export const DATE_DAY = "day";

*/

