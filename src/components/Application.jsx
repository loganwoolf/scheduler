import React, { useState, useEffect } from 'react'
import axios from 'axios'

import Appointment from './Appointment'
import DayList from './DayList'

import 'components/Application.scss'

import {
  getAppointmentsForDay,
  getInterviewersForDay,
  getInterview,
} from 'helpers/selectors'

export default function Application(props) {
  const [state, setState] = useState({
    day: 'Monday',
    days: [],
    appointments: {},
    interviewers: {},
  })

  const dailyAppointments = getAppointmentsForDay(
    state,
    state.day
  )
  const dailyInterviewers = getInterviewersForDay(
    state,
    state.day
  )

  // state actions
  const bookInterview = (id, interview) => {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    }
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    }

    return axios
      .put(`/api/appointments/${id}`, { interview })
      .then(res => {
        setState(prev => {
          return { ...prev, appointments }
        })
      })
  }

  const cancelInterview = id => {
    const updatedAppointment = {
      ...state.appointments[id],
      interview: null,
    }
    const updatedAppointments = {
      ...state.appointments,
      [id]: updatedAppointment,
    }

    return axios
      .delete(`/api/appointments/${id}`)
      .then(res => {
        setState(prev => {
          return { ...prev, updatedAppointments }
        })
      })
  }

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

  const setDay = day => {
    setState({ ...state, day })
  }

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
  }, [])

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
