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
    id: number,
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
    switch(action.type) {
        case 'LOGIN':
            newState.isAuthenticated = true;
            newState.user = action.payload;
            newState.accessToken = action.payload.accessToken;
            return newState;
        case 'LOGOUT':
            newState = {...state}
            newState.isAuthenticated = false;
            newState.user = null;
            return newState;
        default:
            return newState;
    }
}