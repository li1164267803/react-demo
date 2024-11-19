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
        // 同步添加账单方法
        addBill(state, action) {
            state.billList.push(action.payload)
        },
    },
})

const { setBillList, addBill } = billStore.actions
const getBillList = () => {
    return async disp => {
        const res = await axios.get('http://localhost:8888/ka')
        console.log(res, '结果')
        disp(setBillList(res.data))
    }
}
const addBillList = data => {
    return async dispatch => {
        // 编写异步请求
        const res = await axios.post('http://localhost:8888/ka', data)
        // 触发同步reducer
        dispatch(addBill(res.data))
    }
}
export { getBillList, setBillList, addBillList }
const reducer = billStore.reducer
export default reducer
