import React from 'react'
import { Provider } from './context/auth'
import CalendarState from './context/calendar/calendarState'

import '@fullcalendar/daygrid/main.css'
import '@fullcalendar/timegrid/main.css'

import './App.css'
import Main from './components/Main'
import TopNav from './layout/TopNav'

const App = () => {
  return (
    <>
      <Provider>
        <CalendarState>
          <TopNav />
          <Main />
        </CalendarState>
      </Provider>
    </>
  )
}

export default App
