import { combineReducers } from 'redux';

export interface ReduxStateInterface {
    isAuthenticated: boolean,
    user: object | null,
    accessToken: string | null
}

const INITIAL_STATE:ReduxStateInterface = {
    isAuthenticated: true,
    user: null,
    accessToken: null
}

export interface UserInterface {
    name: string,
    email: string,
    accessToken: string
}

export interface LoginActionInterface {
    type: string,
    payload: UserInterface
}

export const authReducer = (state = INITIAL_STATE, action:LoginActionInterface) => {
    switch(action.type) {
        case 'LOGIN':
            state.isAuthenticated = true;
            state.user = action.payload;
            state.accessToken = action.payload.accessToken;
        case 'LOGOUT':
            state.isAuthenticated = false;
            state.user = null;
        default:
            return state;
    }
}