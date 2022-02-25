export function getAppointmentsForDay(state, day) {
  const selectedDay = state.days.filter(x => x.name === day)[0]

  return selectedDay
    ? selectedDay.appointments.map(apptId => state.appointments[apptId])
    : []
}
