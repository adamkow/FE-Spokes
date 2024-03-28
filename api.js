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
