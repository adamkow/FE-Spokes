import axios from 'axios'

const api = axios.create({
  baseURL: 'https://spokes-yrzx.onrender.com/api/',
})

export function getAllUsers() {
  return api.get(`users`).then(({ data: { users } }) => {
    return users
  })
}

export function sendRequest(user_id, receiver_id) {
  const body = {
    sender_id: user_id,
    receiver_id: receiver_id,
  }
  return api
    .post(`users/${user_id}/requests`, body)
    .then(({ data: { request } }) => {
      return request
    })
}

export function deleteRequest(request_id) {
  return api.delete(`requests/${request_id}`)
}

export function getUserByUserID(user_id) {
  return api.get(`users/${user_id}`).then(({ data: { user } }) => {
    return user
  })
}

export function getRequestsData(user_id, type, status) {
  return api
    .get(`users/${user_id}/requests`, {
      params: { type: type, status: status },
    })
    .then(({ data: { requests } }) => {
      return requests
    })
}

export function patchRequest(request_id, body) {
  return api
    .patch(`requests/${request_id}`, body)
    .then(({ data: { request } }) => {
      return request
    })
}

export function patchRating(user_id, body) {
  return api
    .patch(`users/${user_id}/rating`, body)
    .then(({ data: { user } }) => {
      return user
    })
}

export function getUsersByLocation(town) {
  return api.get(`users?location=${town}`).then(({ data: { users } }) => {
    return users
  })
}
