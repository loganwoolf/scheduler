import React from 'react'

import 'components/Appointment/style.scss'

export default function Appointment(props) {
  const { time } = props
  return <article className="appointment">Appointment at {time}</article>
}
