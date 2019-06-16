import store from '@/store'
import router from '@/router'

const defaultHeaders = {
  'Content-Type': 'application/json',
  "Origin": "http://lunchdeal24.de"
}

const ErrorsCodes = {
  SESSION_EXPIRED: 105
}

export const postData = ({payload, url, token = '', id = '', headers = {}}) => {
  return fetch(url, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      ...defaultHeaders,
	    ...headers
    },
    redirect: "follow",
    referrer: "no-referrer",
    body: JSON.stringify(payload),
  })
    .then(data => data.json())
    .then(data => {
      if (!data.success) {
        return handleErrors(data)
      }
      return data
    })
}

export const getData = (url, query = '', token = '', headers = {}) => {
  return fetch(url + query, {
    method: "GET",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      ...defaultHeaders,
	    ...headers
    },
    redirect: "follow",
    referrer: "no-referrer",
  })
    .then(data => data.json())
    .then(data => {
      if (!data.success) {
        return handleErrors(data)
      }
      return data
    })
}

export const formatDate = (date) => {
  let dateArray = date.split(' ')
  return {
    date: dateArray[0],
    time: dateArray[1],
    visible: false
  }
}

export const reverseFormatDate = ({date, time}) => {
  return [date, time].join(' ')
}

const handleErrors = (data) => {
  switch (data.error.code) {
    case ErrorsCodes.SESSION_EXPIRED:
      router.push('login')
      store.dispatch('authentication/setIsUserLogged', false)
  }

  store.dispatch('snackbar/setState', {snackbar: true, message: data.error.message, color: 'red'})
}