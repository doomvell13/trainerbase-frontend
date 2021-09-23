import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Provider } from './context/auth'
import 'react-datetime/css/react-datetime.css'

import './index.css'
import App from './App'

ReactDOM.render(
  <React.StrictMode>
    <Provider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)
