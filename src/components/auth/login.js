import { useState, useContext } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { SyncOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import { Context } from '../../context/auth'
import { useHistory } from 'react-router-dom'

const Login = () => {
  const history = useHistory()
  const [email, setEmail] = useState('trainer@gmail.com')
  const [password, setPassword] = useState('abcd1234')
  const [loading, setLoading] = useState(false)

  // state
  const { state, dispatch } = useContext(Context)

  // console.log('STATE', state)

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      const { data } = await axios.post(
        `${process.env.REACT_APP_PUBLIC_API}/authentication/login`,
        {
          email,
          password,
        }
      )
      dispatch({
        type: 'LOGIN',
        payload: data,
      })
      console.log(data)
      window.localStorage.setItem('user', JSON.stringify(data))

      history.replace('/')
    } catch (err) {
      toast(err.response.data)
      setLoading(false)
    }
  }

  return (
    <>
      <h1 className="text-center square">Login</h1>

      <div className="container col-md-4 offset-md-4 pb-5">
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            className="form-control mb-4 p-4"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email"
            required
          />

          <input
            type="password"
            className="form-control mb-4 p-4"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            required
          />

          <button
            type="submit"
            className="btn btn-block btn-primary"
            disabled={!email || !password || loading}
          >
            {loading ? <SyncOutlined spin /> : 'Submit'}
          </button>
        </form>

        <p className="text-center p-3">
          Not yet registered? <Link href="/register">Register</Link>
        </p>
      </div>
    </>
  )
}

export default Login
