import { Switch, Route } from 'react-router-dom'

import Layout from './components/layout/layout'
import RegisterPage from './pages/RegisterPage'
import LoginPage from './pages/LoginPage'
import HomePage from './pages/HomePage'
import CalendarPage from './pages/CalendarPage'

import '@fullcalendar/daygrid/main.css'
import '@fullcalendar/timegrid/main.css'

import './App.css'

function App() {
  return (
    <Layout>
      <Switch>
        <Route path="/" exact>
          <HomePage />
        </Route>
        <Route path="/calendar">
          <CalendarPage />
        </Route>
        <Route path="/login">
          <LoginPage />
        </Route>
        <Route path="/register">
          <RegisterPage />
        </Route>
      </Switch>
    </Layout>
  )
}

export default App
