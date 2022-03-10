import axios from "axios";
import { LOGIN_USER, REGISTER_USER, AUTH_USER, BOARD_WRITER, BOARD_REMOVE, BOARD_UPDATE, BOARD_SERACH } from "./types";

interface IUserDTO {
    email?: string;
    password?: string;
    name?: string;
}

interface IBoardDTO {
    id?: any;
    title?: string;
    contents?: string;
    writer?: string;
    writeDate?: string;
}

export async function loginUser(dataTosubmit: IUserDTO) {
    const request = await axios.post("/api/users/login", dataTosubmit).then((response) => response.data);

    return {
        type: LOGIN_USER,
        payload: request,
    };
}

export async function registerUser(dataTosubmit: IUserDTO) {
    const request = await axios.post("/api/users/register", dataTosubmit).then((response) => response.data);

    return {
        type: REGISTER_USER,
        payload: request,
    };
}

export async function boardWrite(dataTosubmit: IBoardDTO) {
    const request = await axios.post("/api/board/write", dataTosubmit).then((response) => response.data);

    return {
        type: BOARD_WRITER,
        payload: request,
    };
}

export async function boardRemove(dataTosubmit: any) {
    const request = await axios.post("/api/board/remove", dataTosubmit).then((response) => response.data);

    return {
        type: BOARD_REMOVE,
        payload: request,
    };
}

export async function boardUpdate(dataTosubmit: IBoardDTO) {
    const request = await axios.post("/api/board/update", dataTosubmit).then((response) => response.data);

    return {
        type: BOARD_UPDATE,
        payload: request,
    };
}

export async function boardSearch(dataTosubmit: IBoardDTO) {
    const request = await axios.post("/api/board/search", dataTosubmit).then((response) => response.data);

    return {
        type: BOARD_SERACH,
        payload: request,
    };
}

export async function auth() {
    const request = await axios.get("/api/users/auth").then((response) => response.data);

    return {
        type: AUTH_USER,
        payload: request,
    };
}
