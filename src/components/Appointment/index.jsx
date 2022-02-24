import React from 'react'

import 'components/Appointment/style.scss'

import Header from './Header'
import Show from './Show'
import Empty from './Empty'

export default function Appointment(props) {
  const { interview, time } = props
  
  return (
    <article className="appointment">
      <Header time={time} />
      {interview ? (
        <Show
          {...interview}
        />
      ) : (
        <Empty />
      )}
    </article>
  )
}
