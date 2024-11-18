import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
const billStore = createSlice({
    name: 'bill',
    initialState: {
        billList: [],
        total: 0,
    },
    reducers: {
        setBillList: (state, action) => {
            state.billList = action.payload
        },
        removeBill: (state, action) => {},
    },
})

const { setBillList } = billStore.actions
const getBillList = () => {
    return async disp => {
        const res = await axios.get('http://localhost:8888/ka')
        console.log(res, '结果')
        disp(setBillList(res.data))
    }
}
export { getBillList, setBillList }
const reducer = billStore.reducer
export default reducer
