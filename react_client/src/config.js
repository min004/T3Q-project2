const BASE_URL = 'http://localhost:5000/api';

export const API = {
  LOGIN: `${BASE_URL}/phishing/login`,
  LOGOUT: `${BASE_URL}/phishing/logout`,
  REGISTER: `${BASE_URL}/phishing/register`,
  ARTICLES: `${BASE_URL}/phishing/hello`,
  CHECK: `${BASE_URL}/phishing/check`,
  GETLIST: `${BASE_URL}/board/list`,
  WRITE: `${BASE_URL}/board/write`,
  UPDATE: `${BASE_URL}/board/update`,
//   WRITERDATA: `${BASE_URL}/users/?user_tag_id=`,
//   TAGDATA: `${BASE_URL}/branch_tags/userTagList`,
//   DITAILLIST: `${BASE_URL}/postings`,
//   KEYWORDS: `${BASE_URL}/keywords/list`,
//   LOGIN: `${BASE_URL}/users/signin`,
//   DETAIL_PAGE: `${BASE_URL}/postings/detail`,
//   RELATED: `${BASE_URL}/postings`,
};