import React from 'react'

import useVisualMode from 'hooks/useVisualMode'

import 'components/Appointment/style.scss'

import Header from './Header'
import Show from './Show'
import Empty from './Empty'
import Form from './Form'

export default function Appointment(props) {
  const EMPTY = 'EMPTY'
  const SHOW = 'SHOW'
  const CREATE = 'CREATE'

  const {interview, time, interviewers, id, bookInterview } = props
  const initial = interview ? SHOW : EMPTY
  const { mode, transition, back } = useVisualMode(initial)

  const save = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer
    }
    bookInterview(id, interview)
    transition(SHOW)
  }

  return (
    <article className="appointment">
      <Header time={time} />
      {/* {interview ? <Show {...interview} /> : <Empty />} */}
      {mode === EMPTY && (
        <Empty
          onAdd={() => transition(CREATE)}
        />
      )}
      {mode === SHOW && (
        <Show
          // student={interview.student}
          // interviewer={interview.interviewer}
          {...interview}
          onEdit={() => console.log('clicked onEdit')}
          onDelete={() => console.log('clicked onDelete')}
        />
      )}
      {mode === CREATE && (
        <Form
          interviewers={interviewers}
          onSave={save}
          onCancel={() => back()}
        />
      )}
    </article>
  )
}
