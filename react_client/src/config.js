const BASE_URL = 'http://172.16.16.132:30915';

// const BASE_URL = 'http://localhost:5000';
export const API = {
    LOGIN: `${BASE_URL}/api/login`,
    LOGOUT: `$${BASE_URL}/api/logout`,
    REGISTER: `${BASE_URL}/api/register`,
    GETNAME: `${BASE_URL}/api/getusername`
}
export const BOARD = {
    GETLIST: `${BASE_URL}/board/list`,
    WRITE: `${BASE_URL}/board/create`,
    UPDATE: `${BASE_URL}/board/update`,
    DELETE: `${BASE_URL}`,
    ARTICLES: `${BASE_URL}/board/article`
}

export const COMMENT = {
    REPLYLIST: `${BASE_URL}/comment`,
    DELETE: `${BASE_URL}/comment/delete`,
    CREATE: `${BASE_URL}/comment/create`,
    REFRESH: `${BASE_URL}/comment/refreshname`,
    COUNT: `${BASE_URL}/comment/count`
};