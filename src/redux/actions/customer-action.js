export const fetchCustomers = (customers) => {
    return {
        type: 'FETCH_ALL_CUSTOMERS',
        payload: customers
    }
}