import store from '@/store'
import router from '@/router'

import moment from 'moment'

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
    credentials: "include",
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
      if (!data.userIsLogged) {
        store.dispatch('authentication/setIsUserLogged', false)
      }
      if (!data.success) {
        handleErrors(data)
      }
      return data
    })
}

export const getData = (url, query = '', token = '', headers = {}) => {
  return fetch(url + query, {
    method: "GET",
    mode: "cors",
    cache: "no-cache",
    credentials: "include",
    headers: {
      ...defaultHeaders,
	    ...headers
    },
    redirect: "follow",
    referrer: "no-referrer",
  })
    .then(data => data.json())
    .then(data => {
      if (!data.userIsLogged) {
        store.dispatch('authentication/setIsUserLogged', false)
      }
      if (!data.success) {
        handleErrors(data)
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

export const changeDateFormat = (date, utc = true, reverse = false) => {  
  if (!date) return null
    
  let arr = date.split(' ')
  let ISODate = !utc ? arr[0].split('-').reverse() : arr[0].split('-')
  let time = arr[1]

  let [currentYear, currentMonth, currentDay] = ISODate
  let [currentHour, currentMinute] = time.split(':')

  const {year, month, day, hour, minute} = utcParser({
    utc,
    year: currentYear,
    month: currentMonth,
    day: currentDay,
    hour: currentHour,
    minute: currentMinute,
  })

  return reverse ? `${day}-${month}-${year} ${hour}:${minute}` : `${year}-${month}-${day} ${hour}:${minute}` 
}

export const utcParser = ({utc, year, month, day, hour, minute}) => {
  let newDate

  if (utc) {
    newDate = moment().year(year).month(month).date(day).hours(hour).minute(minute)
    newDate = newDate.utc()
  } else {
    newDate = moment.utc().year(year).month(month).date(day).hours(hour).minute(minute)
    newDate = newDate.local()
  }
  
  year = newDate.year()
  day = newDate.date().toString().padStart(2, '0').slice(-2)
  month = newDate.month().toString().padStart(2, '0').slice(-2)
  hour = newDate.hour().toString().padStart(2, '0').slice(-2)
  minute = newDate.minute().toString().padStart(2, '0').slice(-2)

  return {year, month, day, hour, minute}
} 

export const addressParser = (data) => {
  const address = (data.results && data.results[0]) ? data.results[0] : null;

  if (address) {
    const {address_components, formatted_address} = address;
    const city = keyParser(address_components, 'locality');
    const country = keyParser(address_components, 'country');
    const postalCode = keyParser(address_components, 'postal_code');
    const location = address.geometry.location;

    return {
      city,
      country,
      postalCode,
      formatted_address,
      location
    }

  } else {
    return false
  }
}

export const keyParser = (data, searchedKey) => {
  for (let key in data) {
    if (data[key].types.includes(searchedKey)) {
    return data[key].long_name;
    }
  }
}