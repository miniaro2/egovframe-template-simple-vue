// src/api/egovFetch.js
import { SERVER_URL } from '../config'
import URL from '../constants/url'
import CODE from '../constants/code'
import { useStorage } from '../composables/useStorage'

export function getQueryString(params) {
  return `?${Object.entries(params).map(e => e.join('=')).join('&')}`
}

export async function requestFetch(url, requestOptions, handler, errorHandler) {
  console.groupCollapsed('requestFetch')
  console.log('requestFetch [URL] : ', SERVER_URL + url)
  console.log('requestFetch [requestOption] : ', requestOptions)

  const { getSessionItem, setSessionItem } = useStorage()

  try {
    // JWT 설정
    const sessionUser = getSessionItem('loginUser')
    const sessionUserId = sessionUser?.id || null
    const jToken = getSessionItem('jToken')
    
    if (sessionUserId != null && sessionUserId !== undefined) {
      if (!requestOptions['headers']) requestOptions['headers'] = {}
      if (!requestOptions['headers']['Authorization']) requestOptions['headers']['Authorization'] = null
      requestOptions['headers']['Authorization'] = jToken
    }

    // CORS 설정
    requestOptions = {
      ...requestOptions,
      origin: requestOptions.origin || SERVER_URL,
      credentials: requestOptions.credentials || 'include'
    }

    const response = await fetch(SERVER_URL + url, requestOptions)
    const resp = await response.json()

    // 인증 에러 체크
    if (Number(resp.resultCode) === Number(CODE.RCV_ERROR_AUTH)) {
      alert('Login Alert')
      setSessionItem('loginUser', { id: '' })
      window.location.href = URL.LOGIN
      return false
    }

    // 성공 핸들러 실행
    console.groupCollapsed('requestFetch.then()')
    console.log('requestFetch [response] ', resp)
    if (typeof handler === 'function') {
      handler(resp)
    } else {
      console.log('egov fetch handler not assigned!')
    }
    console.groupEnd('requestFetch.then()')

    return resp

  } catch (error) {
    console.error('There was an error!', error)
    
    if (error.toString() === 'TypeError: Failed to fetch') {
      alert('서버와의 연결이 원활하지 않습니다. 서버를 확인하세요.')
    }

    if (typeof errorHandler === 'function') {
      errorHandler(error)
    } else {
      console.error('egov error handler not assigned!')
      alert('ERR : ' + error.message)
    }
    
    throw error
  } finally {
    console.log('requestFetch finally end')
    console.groupEnd('requestFetch')
  }
}