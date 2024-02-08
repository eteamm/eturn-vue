import httpClient from "@/api/httpClient";

const END_POINT = '/users/';
const getUser = (userID) => httpClient.get('/user/1')

export {
  getUser
}
