import classes from './StartingPageContent.module.css'
import { useContext } from 'react'
import { Context } from '../../context/auth'

const StartingPageContent = () => {
  const { state } = useContext(Context)
  const { user } = state
  return (
    <section className={classes.starting}>
      <h1>Welcome on Board! {user && user.fullName}</h1>
    </section>
  )
}

export default StartingPageContent
