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
        const days = updateSpots(id, false)
        setState(prev => {
          return { ...prev, appointments, days }
        })
      })
  }

  const cancelInterview = id => {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    }
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    }

    return axios
      .delete(`/api/appointments/${id}`)
      .then(res => {
        setState(prev => {
          const days = updateSpots(id)
          return { ...prev, appointments, days }
        })
      })
  }

  const updateSpots = (id, increment = true) => {
    const day = state.days.filter(day =>
      day.appointments.includes(id)
    )[0]
    increment ? (day.spots += 1) : (day.spots -= 1)

    const days = [...state.days]
    const dayIndex = day.id - 1
    days[dayIndex] = day

    return days
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
