import ReactDOM from "react-dom/client"
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'leaflet/dist/leaflet.css'
import React from "react"
import App from "./App"
import configStore from './store/configStore';
import "./style.css"

const root = ReactDOM.createRoot(document.getElementById('root'))

const store = configStore()
console.log(store.getState())

root.render(
    <BrowserRouter>
        <Provider store={store}>
            <App />
        </Provider>
    </BrowserRouter>
)