import { Fragment } from 'react'

import TopNav from './TopNav'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
const Layout = (props) => {
  return (
    <Fragment>
      <TopNav />
      <ToastContainer position="top-center" />

      <main>{props.children}</main>
    </Fragment>
  )
}

export default Layout
