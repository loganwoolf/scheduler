import { useState } from 'react'
import axios from 'axios'

export default function useApplicationData() {
  const [state, setState] = useState({
    day: 'Monday',
    days: [],
    appointments: {},
    interviewers: {},
  })

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

  const setDay = day => {
    setState({ ...state, day })
  }

  return {
    state,
    setState,
    bookInterview,
    cancelInterview,
    setDay,
  }
}
