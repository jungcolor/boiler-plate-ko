import { BOARD_WRITER, BOARD_REMOVE, BOARD_UPDATE, BOARD_SERACH } from "../actions/types";

export default function (state: object = {}, action: { type: string; payload: object }) {
    switch (action.type) {
        case BOARD_WRITER:
            return { ...state, writeData: action.payload };
        case BOARD_REMOVE:
            return { ...state, removeData: action.payload };
        case BOARD_UPDATE:
            return { ...state, updataData: action.payload };
        case BOARD_SERACH:
            return { ...state, searchData: action.payload };
        default:
            return state;
    }
}
