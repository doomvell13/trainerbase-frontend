import React from 'react'

import Calendar from '../components/calendar2/Calendar'

const Calendar2Page = () => {
  return (
    <div className="wrapper">
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="card-body">
                <div className="row">
                  <Calendar />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Calendar2Page
