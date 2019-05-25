export const postData = ({payload, url, token = '', id = ''}) => {
  return fetch(url, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrer: "no-referrer",
    body: JSON.stringify(payload),
  })
}

export const getData = (url, query = '', token = '') => {
  return fetch(url + query, {
    method: "GET",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrer: "no-referrer",
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

