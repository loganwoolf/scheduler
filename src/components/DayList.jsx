import React from 'react'
import DayListItem from './DayListItem'

export default function (props) {
  const { days, day, setDay } = props

  const componentArray = days.map(item => (
    <DayListItem
      key={item.id}
      name={item.name}
      spots={item.spots}
      selected={item.name === day}
      setDay={setDay}
    />
  ))

  return <ul>{componentArray}</ul>
}
