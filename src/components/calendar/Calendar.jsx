import React, { useState, useRef, useContext } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import AddEventModal from './AddEventModal'
import interactionPlugin from '@fullcalendar/interaction'
import api from '../api/api'
import moment from 'moment'
import { Context } from '../../context/auth'

export default function Calendar() {
  const [modalOpen, setModalOpen] = useState(false)
  const [events, setEvents] = useState([])
  const calendarRef = useRef(null)
  const { state, dispatch } = useContext(Context)
  const { user } = state

  const onEventAdded = (event) => {
    let calendarApi = calendarRef.current.getApi()
    calendarApi.addEvent({
      title: event.title,
      description: event.description,
      start: moment(event.start).toDate(),
      end: moment(event.end).toDate(),
    })
  }

  async function handleEventAdd(data) {
    const title = data.event.title
    const description = data.event.extendedProps.description
    const start = data.event._instance.range.start
    const end = data.event._instance.range.end

    await api.post(
      '/sessions',
      {
        title,
        description,
        start,
        end,
      },
      {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    )
  }

  async function handleDatesSet() {
    const response = await api.get('/sessions')
    setEvents(response.data.data)
    // console.log(response.data.data)
  }

  function renderEventContent(event) {
    return (
      <>
        <b>{event.timeText}</b>
        <i>{event.event.extendedProps.title}</i>
      </>
    )
  }
  async function updateEvent(event) {
    const id = event.event._def.extendedProps._id
    const title = event._def.extendedProps.title
    const description = event._def.extendedProps.description
    const start = event.event._instance.range.start
    const end = event.event._instance.range.end

    await api.put(`/sessions/${id}`, {
      title: title,
      description: description,
      start: start,
      end: end,
    })
  }

  async function deleteEvent(event) {
    const id = event.event._def.extendedProps._id

    if (
      // eslint-disable-next-line no-restricted-globals
      confirm(
        `Do you really want to delete: ${event.event.extendedProps.title}?`
      )
    ) {
      api.delete(`/sessions/${id}`, event.event)
    }
  }

  return (
    <section>
      <div className="container-btn">
        <button className="btn" onClick={() => setModalOpen(true)}>
          Add new session
        </button>
      </div>
      <div style={{ position: 'relative', zIndex: 0 }}>
        <FullCalendar
          events={events}
          ref={calendarRef}
          selectMirror={true}
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          eventContent={renderEventContent}
          eventAdd={handleEventAdd}
          datesSet={handleDatesSet}
          eventDrop={updateEvent}
          eventClick={deleteEvent}
          editable={true}
        />
      </div>

      <AddEventModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onEventAdded={(event) => onEventAdded(event)}
      />
    </section>
  )
}
