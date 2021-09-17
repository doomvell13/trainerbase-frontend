import { useState, useContext } from 'react'
import { Context } from '../../context/auth'
import axios from 'axios'
import { Link, useHistory } from 'react-router-dom'
import classes from './TopNav.module.css'
import { toast } from 'react-toastify'

const MainNavigation = () => {
  const history = useHistory()
  const [current, setCurrent] = useState('')

  const { state, dispatch } = useContext(Context)
  const { user } = state

  const logout = async () => {
    dispatch({ type: 'LOGOUT' })
    window.localStorage.removeItem('user')
    const { data } = await axios.get(
      `${process.env.REACT_APP_PUBLIC_API}/authentication/logout`
    )
    toast(data.message)
    history.replace('/login')
  }

  return (
    <header className={classes.header}>
      <Link to="/">
        <div className={classes.logo}>Trainerbase</div>
      </Link>
      <nav>
        <ul>
          {user === null && (
            <>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/register">Register</Link>
              </li>
            </>
          )}
          {user !== null && (
            <>
              <li>
                <Link to="/calendar">Sessions</Link>
              </li>
              <li>
                <button onClick={logout}>Logout</button>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  )
}

export default MainNavigation
