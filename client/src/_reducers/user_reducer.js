import {
    LOGIN_USER,
    REGISTER_USER,
    AUTH_USER,
    BOARD_WRITER,
    BOARD_REMOVE,
    BOARD_UPDATE
} from "../_actions/types";

export default function aaa(state = {}, action) {
    switch (action.type) {
        case LOGIN_USER:
            return { ...state, loginSuccess: action.payload };
        case REGISTER_USER:
            return { ...state, register: action.payload }
        case AUTH_USER:
            return { ...state, userData: action.payload }
        case BOARD_WRITER:
            return { ...state, writeData: action.payload }
        case BOARD_REMOVE:
            return { ...state, removeData: action.payload }
        case BOARD_UPDATE:
            return { ...state, updataData: action.payload }
        default:
            return state;
    }
}