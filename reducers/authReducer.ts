import { combineReducers } from 'redux';

export interface ReduxStateInterface {
    isAuthenticated: boolean,
    user: UserInterface | null,
    accessToken: string | null
}

export const INITIAL_STATE:ReduxStateInterface = {
    isAuthenticated: false,
    user: null,
    accessToken: null
}

export interface UserInterface {
    __typename: string,
    name: string,
    email: string,
    accessToken: string
}

export interface ActionInterface {
    type: string,
    payload: UserInterface
}

export const authReducer = (state = INITIAL_STATE, action: ActionInterface): ReduxStateInterface => {
    let newState = {...state}
    console.log('Before switch case');
    console.log(newState);
    switch(action.type) {
        case 'LOGIN':
            console.log('Inside switch case');
            console.log(action);
            newState.isAuthenticated = true;
            newState.user = action.payload;
            newState.accessToken = action.payload.accessToken;
            console.log('After switch case');
            console.log(newState);
            return newState;
        case 'LOGOUT':
            newState = {...state}
            newState.isAuthenticated = false;
            newState.user = null;
            return newState;
        default:
            console.log('We reach here');
            return newState;
    }
}