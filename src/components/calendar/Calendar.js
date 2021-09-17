import React, { useContext, useEffect } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'

import CalendarContext from '../../context/calendar/calendarContext'
import Toast from '../toast/Toast'
import './calendar.css'

const Calendar = () => {
  const calendarContext = useContext(CalendarContext)
  const { events, selected, getEvents, getActiveEvents, activeCalendarEvents } =
    calendarContext

  useEffect(() => {
    getEvents()

    // eslint-disable-next-line
  }, [events])

  useEffect(() => {
    getActiveEvents()

    // eslint-disable-next-line
  }, [activeCalendarEvents])

  const handleEventClick = (info) => {
    const event = events.find((e) => e.id === parseInt(info.event.id, 10))
    selected(event)
    info.el.setAttribute('data-toggle', 'modal')
    info.el.setAttribute('data-target', '#selection-modal')
  }

  return (
    <div className="col-lg-9">
      <div>
        <FullCalendar
          defaultView="dayGridMonth"
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          header={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay',
          }}
          events={events}
          eventClick={handleEventClick}
          eventLimit="true"
        />
      </div>

      <Toast />
    </div>
  )
}

export default Calendar
