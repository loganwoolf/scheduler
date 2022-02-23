import React from 'react'
import classNames from 'classnames'

import 'components/DayListItem.scss'

export default function DayListItem(props) {
  const { name, setDay, spots } = props

  const classes = classNames('day-list__item', {
    'day-list__item--selected': props.selected,
    'day-list__item--full': props.spots === 0,
  })

  const formatSpots = (() => {
    return spots === 1
      ? '1 spot'
      : spots === 0
      ? 'no spots'
      : `${props.spots} spots`
  })()

  return (
    <li className={classes} onClick={() => setDay(name)}>
      <h2 className="text--regular">{name}</h2>
      <h3 className="text--light">{formatSpots} remaining</h3>
    </li>
  )
}
