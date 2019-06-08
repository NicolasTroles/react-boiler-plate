// Types
import {
    TOKEN_DECODED
} from './types';

const INITIAL_STATE = {
    tokenDecoded: {},
}

const authenticationReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case TOKEN_DECODED.SUCCESS:
            return {
                ...state,
                tokenDecoded: action.tokenDecoded,
            }

        case TOKEN_DECODED.RESET:
            return {
                ...state,
                tokenDecoded: {},
            }

        default:
            return state

    }
}

export default authenticationReducer;

