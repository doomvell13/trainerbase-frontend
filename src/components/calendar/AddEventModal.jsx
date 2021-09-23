import React, { useState } from 'react'
import Modal from 'react-modal'
import DateTime from 'react-datetime'

export default function AddEventModal({ isOpen, onClose, onEventAdded }) {
  const [title, setTitle] = useState(' ')
  const [description, setDescription] = useState(' ')
  const [start, setStart] = useState(new Date())
  const [end, setEnd] = useState(new Date())

  const onSubmit = (event) => {
    event.preventDefault()

    onEventAdded({
      title,
      description,
      start,
      end,
    })
    reset()
    onClose()
  }

  const reset = () => {
    setTitle('')
    setDescription('')
    setStart(new Date())
    setEnd(new Date())
  }

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} ariaHideApp={false}>
      <form className="form" onSubmit={onSubmit}>
        <div className="col-md-4">
          <label className="control-label">Title</label>
          <input
            className="form-control fom-white"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="col-md-4">
          <label className="control-label">Description</label>
          <input
            className="form-control fom-white"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="col-md-4">
          <label className="label">Start Date and Time</label>
          <DateTime value={start} onChange={(date) => setStart(date)} />
        </div>

        <div className="col-md-4">
          <label className="label">End Date and Time</label>
          <DateTime value={end} onChange={(date) => setEnd(date)} />
        </div>

        <button className="btn-form">Submit</button>
      </form>
    </Modal>
  )
}
