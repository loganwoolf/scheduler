import React from 'react'

import useVisualMode from 'hooks/useVisualMode'

import 'components/Appointment/style.scss'

import Header from './Header'
import Show from './Show'
import Empty from './Empty'
import Form from './Form'
import Status from './Status'
import Confirm from './Confirm'

export default function Appointment(props) {
  const EMPTY = 'EMPTY'
  const SHOW = 'SHOW'
  const CREATE = 'CREATE'
  const SAVING = 'SAVING'
  const CONFIRM = 'CONFIRM'
  const EDIT = 'EDIT'

  const { interview, time, interviewers, id, bookInterview, cancelInterview } =
    props

  const initial = interview ? SHOW : EMPTY
  const { mode, transition, back } = useVisualMode(initial)

  const save = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer,
    }

    transition(SAVING)
    bookInterview(id, interview).then(() => transition(SHOW))
  }

  const remove = id => {
    transition(SAVING)
    cancelInterview(id).then(() => transition(EMPTY))
  }

  const confirmRemove = id => {
    transition(CONFIRM)
  }

  return (
    <article className="appointment">
      <Header time={time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          {...interview}
          onEdit={() => transition(EDIT)}
          // onDelete={() => remove(id)}
          onDelete={() => confirmRemove()}
        />
      )}
      {mode === CREATE && (
        <Form interviewers={interviewers} onSave={save} onCancel={back} />
      )}
      {mode === SAVING && <Status message={'Saving...'} />}
      {mode === CONFIRM && (
        <Confirm
          message={'Are you sure you would like to delete?'}
          onConfirm={() => remove(id)}
          onCancel={() => transition(SHOW)}
        />
      )}
      {mode === EDIT && (
        <Form interviewers={interviewers} onSave={save} onCancel={back} student={interview.student} interviewer={interview.interviewer.id} />
      )}
    </article>
  )
}
