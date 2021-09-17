import { Switch, Route } from 'react-router-dom'

import Layout from './components/layout/Layout'
import RegisterPage from './pages/RegisterPage'
import LoginPage from './pages/LoginPage'
import HomePage from './pages/HomePage'
import CalendarPage from './pages/CalendarPage'

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
        <Route path="register">
          <RegisterPage />
        </Route>
      </Switch>
    </Layout>
  )
}

export default App
