import React, { useState, useRef, useContext } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import momentPlugin from '@fullcalendar/moment'

import AddEventModal from './AddEventModal'
import interactionPlugin from '@fullcalendar/interaction'
import api from '../api/api'
import moment from 'moment'
import { Context } from '../../context/auth'
import { toast } from 'react-toastify'
import { computeSmallestCellWidth } from '@fullcalendar/common'

export default function Calendar() {
  const [modalOpen, setModalOpen] = useState(false)
  const [events, setEvents] = useState([])
  const calendarRef = useRef(null)
  const { state, dispatch } = useContext(Context)
  const { user } = state

  const onEventAdded = (event) => {
    // console.log(event)
    let calendarApi = calendarRef.current.getApi()
    // console.log(event)
    calendarApi.addEvent({
      id: event._id,
      title: event.title,
      description: event.description,
      start: `${moment(event.start).format()}`,
      //use timestamp send with timestamp
      end: `${moment(event.end).format()}`,
    })
  }

  async function handleEventAdd(data) {
    // console.log(data.event)
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
    data.event.setProp('id', session.data.id)
  }

  async function handleDatesSet(selectInfo) {
    const response = await api.get('/sessions')
    setEvents(response.data)
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
    const id = event.event.id
    const title = event.event.title
    const description = event.event.extendedProps.description
    const start = event.event._instance.range.start
    const end = event.event._instance.range.end
    await api.put(
      `/sessions/${id}`,
      {
        _id: id,
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
    const id = event.event.id

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
    event.event.remove()

    toast.success('Delete successful')
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
