import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Provider } from './context/auth'
import CalendarState from './context/calendar/calendarState'
import './index.css'
import App from './App'

ReactDOM.render(
  <Provider>
    <BrowserRouter>
      <CalendarState>
        <App />
      </CalendarState>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
)
