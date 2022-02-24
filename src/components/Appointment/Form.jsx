import React, { useState } from 'react'
import InterviewerList from 'components/InterviewerList'
import Button from 'components/Button'

export default function Form(props) {
  const { student, interviewers, interviewer, onSave, onCancel } = props

  const [studentName, setStudentName] = useState(student || '')
  const [currentInterviewer, setCurrentInterviewer] = useState(interviewer || null)

  const reset = () => {
    setStudentName('')
    setCurrentInterviewer('')
  }

  const cancel = () => {
    reset()
    onCancel()
  }

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form onSubmit={e => e.preventDefault()} autoComplete="off">
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            value={studentName}
            onChange={e => setStudentName(e.target.value)}
          />
        </form>
        <InterviewerList
          interviewers={interviewers}
          value={currentInterviewer}
          onChange={setCurrentInterviewer}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>
            Cancel
          </Button>
          <Button confirm onClick={() => onSave(studentName, currentInterviewer)}>
            Save
          </Button>
        </section>
      </section>
    </main>
  )
}
