import { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { SyncOutlined } from '@ant-design/icons'
import { useHistory } from 'react-router-dom'

const Register = () => {
  const history = useHistory()
  const [firstName, setFirstName] = useState('Anthony')
  const [lastName, setLastName] = useState('Trainer3')
  const [email, setEmail] = useState('anthonytrain@gmail.com')
  const [password, setPassword] = useState('abcd1234')
  const [role] = useState('TRAINER')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.table({ firstName, lastName, role, email, password })
    try {
      setLoading(true)
      const { data } = await axios.post(
        `${process.env.REACT_APP_PUBLIC_API}/authentication/register`,
        {
          firstName,
          lastName,
          email,
          password,
          role,
        }
      )

      setLoading(false)
      history.replace('/login')
      toast('Registration successful. Please login.')
    } catch (err) {
      console.log(err.message)
      toast(
        'Something went wrong, please check your credentials and try again.'
      )
      setLoading(false)
    }
  }

  return (
    <>
      <h1 className="jumbotron text-center bg-primary square">Register</h1>

      <div className="container col-md-4 offset-md-4 pb-5">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="form-control mb-4 p-4"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="Enter First Name"
            required
          />
          <input
            type="text"
            className="form-control mb-4 p-4"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Enter Last Name"
            required
          />
          {/* <input
            type="text"
            className="form-control mb-4 p-4"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            placeholder="TRAINER"
            required
          /> */}

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
            disabled={
              !firstName || !lastName || !email || !password || !role || loading
            }
          >
            {loading ? <SyncOutlined spin /> : 'Submit'}
          </button>
        </form>
      </div>
    </>
  )
}

export default Register
