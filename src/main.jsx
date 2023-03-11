import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './assets/styles/main.scss'
import { Provider } from 'react-redux'
import { store } from './store/store'
import 'moment/dist/locale/id'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>,
)
