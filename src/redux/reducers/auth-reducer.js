
const initialState = {
    isAuthenticated: false,
    user: {},
    customer: {},
    role: '',
    token: ''
}

export const authReducer = (state = initialState, {type, payload}) => {
    switch (type) {
        case 'AUTHENTICATE_USER':
            return {...state, isAuthenticated: true, user: payload?.user, token: payload.token, role: payload.role}
        case 'AUTHENTICATE_CUSTOMER':
            return {...state, isAuthenticated: true, customer: payload?.customer, token: payload.token, role: payload.role}
        case 'UPDATE_USER_TOKEN':
            return {...state, token: payload.token, user: payload.user, isAuthenticated: true, role: payload.role}
        case 'LOGOUT_USER':
            return {...state, token: '', user: {}, customer: {},isAuthenticated: false, role: ''}
        default:
            return state;
    }
}
