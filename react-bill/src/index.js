import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './router'
import './theme.css'
import App from './App'
import { Provider } from 'react-redux'
import store from '@/store'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <Provider store={store}>
        <App />
        {/* <RouterProvider router={router} /> */}
    </Provider>
)
