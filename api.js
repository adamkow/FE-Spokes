import axios from "axios";

const api = axios.create({
    baseURL: 'https://spokes-yrzx.onrender.com/api/'
});

export function getAllUsers () {
    return api.get(`users`)
    .then(({data : {users}}) => {
        return users
    })
}
