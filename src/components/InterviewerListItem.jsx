import classNames from 'classnames'
import React from 'react'

import 'components/InterviewerListItem.scss'

export default function InterviewerListItem(props) {
  const { id, name, avatar, selected, setInterviewer } = props

  const classes = classNames({
    'interviewers__item': true,
    'interviewers__item--selected': selected
  })

  return (
    <li onClick={() => setInterviewer(id)} className={classes}>
      <img
        src={avatar}
        alt={name}
        className="interviewers__item-image"
      />
      {selected && name}
    </li>
  )
}
