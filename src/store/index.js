import billStore from './modules/billStore'
import { configureStore } from '@reduxjs/toolkit'

const store = configureStore({
    reducer: {
        bill: billStore,
    },
})

export default store
