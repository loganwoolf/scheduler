import React, { useEffect } from 'react'
import axios from 'axios'

import Appointment from './Appointment'
import DayList from './DayList'

import 'components/Application.scss'

import {
  getAppointmentsForDay,
  getInterviewersForDay,
  getInterview,
} from 'helpers/selectors'

import useApplicationData from 'hooks/useApplicationData'

export default function Application(props) {
  const {
    state,
    setState,
    bookInterview,
    cancelInterview,
    setDay,
  } = useApplicationData()

  const dailyAppointments = getAppointmentsForDay(
    state,
    state.day
  )
  const dailyInterviewers = getInterviewersForDay(
    state,
    state.day
  )

  const schedule = dailyAppointments.map(appt => {
    const interview = getInterview(state, appt.interview)
    return (
      <Appointment
        key={appt.id}
        {...appt}
        interview={interview}
        interviewers={dailyInterviewers}
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}
      />
    )
  })

  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers'),
    ])
      .then(all => {
        setState(prev => ({
          ...prev,
          days: all[0].data,
          appointments: all[1].data,
          interviewers: all[2].data,
        }))
      })
      .catch(err => console.log(err.message))
  }, [setState])

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            value={state.day}
            onChange={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {schedule}
        <Appointment key={'final'} time={'5pm'} />
      </section>
    </main>
  )
}
