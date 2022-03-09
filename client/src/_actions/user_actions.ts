import axios from "axios";
import { LOGIN_USER, REGISTER_USER, AUTH_USER, BOARD_WRITER, BOARD_REMOVE, BOARD_UPDATE, BOARD_SERACH } from "./types";

export function loginUser(dataTosubmit) {
    const request = axios.post("/api/users/login", dataTosubmit).then((response) => response.data);

    return {
        type: LOGIN_USER,
        payload: request,
    };
}

export function registerUser(dataTosubmit) {
    const request = axios.post("/api/users/register", dataTosubmit).then((response) => response.data);

    return {
        type: REGISTER_USER,
        payload: request,
    };
}

export function boardWrite(dataTosubmit) {
    const request = axios.post("/api/board/write", dataTosubmit).then((response) => response.data);

    return {
        type: BOARD_WRITER,
        payload: request,
    };
}

export function boardRemove(dataTosubmit) {
    const request = axios.post("/api/board/remove", dataTosubmit).then((response) => response.data);

    return {
        type: BOARD_REMOVE,
        payload: request,
    };
}

export function boardUpdate(dataTosubmit) {
    const request = axios.post("/api/board/update", dataTosubmit).then((response) => response.data);

    return {
        type: BOARD_UPDATE,
        payload: request,
    };
}

export function boardSearch(dataTosubmit) {
    const request = axios.post("/api/board/search", dataTosubmit).then((response) => response.data);

    return {
        type: BOARD_SERACH,
        payload: request,
    };
}

export function auth() {
    const request = axios.get("/api/users/auth").then((response) => response.data);

    return {
        type: AUTH_USER,
        payload: request,
    };
}
