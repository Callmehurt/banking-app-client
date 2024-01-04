
const initialState = {
    isAuthenticated: false,
    user: {},
    token: ''
}

export const authReducer = (state = initialState, {type, payload}) => {
    switch (type) {
        case 'AUTHENTICATE_USER':
            return {...state, isAuthenticated: true, user: payload.user, token: payload.token}
        case 'UPDATE_TOKEN':
            return {...state, token: payload.token, user: payload.user, isAuthenticated: true}
        case 'LOGOUT_USER':
            return {...state, token: '', user: {}, isAuthenticated: false}
        default:
            return state;
    }
}
