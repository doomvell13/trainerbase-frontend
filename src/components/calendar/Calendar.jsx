import React, { useState, useRef, useContext } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import momentPlugin from '@fullcalendar/moment'

import AddEventModal from './AddEventModal'
import interactionPlugin from '@fullcalendar/interaction'
import api from '../api/api'
import moment from 'moment'
import { Context } from '../../context/auth'
import { Link, useHistory } from 'react-router-dom'
import { toast } from 'react-toastify'

export default function Calendar() {
  const history = useHistory()
  const [modalOpen, setModalOpen] = useState(false)
  const [events, setEvents] = useState([])
  const calendarRef = useRef(null)
  const { state, dispatch } = useContext(Context)
  const { user } = state

  const onEventAdded = (event) => {
    let calendarApi = calendarRef.current.getApi()
    // console.log(event)
    calendarApi.addEvent({
      title: event.title,
      description: event.description,
      start: new Date(event.start),
      //use timestamp send with timestamp
      end: new Date(event.end),
    })
  }

  async function handleEventAdd(data) {
    const title = data.event.title
    const description = data.event.extendedProps.description
    const start = data.event._instance.range.start
    const end = data.event._instance.range.end
    const session = await api.post(
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
    console.log(session)
    data.event.setExtendedProp('id', session.data.id)
    console.log(data.event)
  }

  async function handleDatesSet(selectInfo) {
    // console.log(selectInfo)
    const response = await api.get('/sessions')
    // console.log(response.data)
    // console.log(response.data)
    setEvents(response.data)
    // console.log(selectInfo)
  }

  function renderEventContent(event) {
    return (
      <>
        <b>{event.timeText}</b>
        <i>{event.event.title}</i>
      </>
    )
  }
  async function updateEvent(event) {
    console.log(event)
    const id = event.event.extendedProps.id
    const title = event.event.title
    const description = event.event.extendedProps.description
    const start = event.event._instance.range.start
    const end = event.event._instance.range.end
    await api.put(
      `/sessions/${id}`,
      {
        id: id,
        title: title,
        description: description,
        start: start,
        end: end,
      },
      {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    )
  }

  async function deleteEvent(event) {
    const id = event.event._def.publicId

    if (
      // eslint-disable-next-line no-restricted-globals
      confirm(`Do you really want to delete: ${event.event.title}?`)
    ) {
      api.delete(`/sessions/${id}`, event.event, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
    }
    toast.success('Delete successful')
    history.replace('/calendar')
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
          timeZone="Asia/Singapore"
          ref={calendarRef}
          selectMirror={true}
          plugins={[dayGridPlugin, interactionPlugin, momentPlugin]}
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
