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
        updateSpots(id, false)
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
        updateSpots(id, true)
        setState(prev => {
          return { ...prev, updatedAppointments }
        })
      })
  }

  const updateSpots = (id, increment = true) => {
    const day = state.days.filter((day, index) =>
      day.appointments.includes(id)
    )[0]
    increment ? (day.spots += 1) : (day.spots -= 1)

    const days = [...state.days]
    const dayIndex = day.id - 1
    days[dayIndex] = day

    setState(prev => {
      return { ...prev, days }
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
