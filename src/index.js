import 'bootstrap/dist/css/bootstrap.min.css'; import React from "react"
import ReactDOM from "react-dom/client"
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from "./App"
import configStore from './store/configStore';
import "./style.css"

const store = configStore()

const root = ReactDOM.createRoot(document.getElementById('root'))

console.log(store.getState())

root.render(
    <BrowserRouter>
        <Provider store={store}>
            <App />
        </Provider>
    </BrowserRouter>
)