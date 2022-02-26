import React from 'react'

import useVisualMode from 'hooks/useVisualMode'

import 'components/Appointment/style.scss'

import Header from './Header'
import Show from './Show'
import Empty from './Empty'

export default function Appointment(props) {
  const EMPTY = 'EMPTY'
  const SHOW = 'SHOW'

  const { interview, time } = props
  const initial = interview ? SHOW : EMPTY
  const { mode, transition, back } = useVisualMode(initial)

  return (
    <article className="appointment">
      <Header time={time} />
      {/* {interview ? <Show {...interview} /> : <Empty />} */}
      {mode === EMPTY && <Empty onAdd={() => console.log('clicked onAdd')} />}
      {mode === SHOW && (
        <Show
          student={interview.student}
          interviewer={interview.interviewer}
          onEdit={() => console.log('clicked onEdit')}
          onDelete={() => console.log('clicked onDelete')}
        />
      )}
    </article>
  )
}
