import React, { useContext } from 'react'

import AddEvent from '../modal/AddEvent'
import EditEvent from '../modal/EditEvent'
import SelectModal from '../modal/SelectModal'
import CalendarContext from '../../context/calendar/calendarContext'

const SideBar = () => {
  const calendarContext = useContext(CalendarContext)
  const { events, selected } = calendarContext

  return (
    <div className="col-lg-3">
      <button
        data-toggle="modal"
        data-target="#add-event"
        className="btn btn-primary btn-block"
      >
        Create New Event
      </button>

      <div className="m-t-20">
        <br />
        {events.length > 0
          ? events.map((event) => (
              <div
                className={`external-event bg-${event.bgColor}`}
                key={event.id}
                onClick={() => selected(event)}
                data-toggle="modal"
                data-target="#selection-modal"
              >
                {event.title}
              </div>
            ))
          : 'No events added'}
      </div>

      <AddEvent />
      <SelectModal />
      <EditEvent />
    </div>
  )
}

export default SideBar
