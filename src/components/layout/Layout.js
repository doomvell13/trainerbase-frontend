import { Fragment } from 'react'

import TopNav from './TopNav'

const Layout = (props) => {
  return (
    <Fragment>
      <TopNav />
      <main>{props.children}</main>
    </Fragment>
  )
}

export default Layout
