const initialState = {
    availableCustomers: []
}


export const customerReducer = (state = initialState, {type, payload}) => {
    switch (type){
        case 'FETCH_ALL_CUSTOMERS':
            return {...state, availableCustomers: payload};
        default:
            return state;    
    }
}