import { Switch, Route, Redirect } from 'react-router-dom'

import Layout from './components/layout/Layout'
import RegisterPage from './pages/RegisterPage'
import LoginPage from './pages/LoginPage'
import HomePage from './pages/HomePage'
import CalendarPage from './pages/CalendarPage'
import { useContext } from 'react'
import { Context } from './context/auth'

function App() {
  const { state, dispatch } = useContext(Context)
  const { user } = state

  return (
    <Layout>
      <Switch>
        <Route path="/" exact>
          <HomePage />
        </Route>

        <Route path="/calendar">
          {user !== null}
          {user === null && <Redirect to="/login" />}
          <CalendarPage />
        </Route>

        <Route path="/login">
          <LoginPage />
        </Route>
        <Route path="/register">
          <RegisterPage />
        </Route>
        <Route path="*">
          <Redirect to="/" />
        </Route>
      </Switch>
    </Layout>
  )
}

export default App
