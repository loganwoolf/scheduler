import React from 'react'

import InterviewerListItem from './InterviewerListItem'

import 'components/InterviewerList.scss'

export default function InterviewerList(props) {
  const { interviewers, value, onChange } = props

  const list = interviewers.map(person => (
    <InterviewerListItem
      key={person.id}
      name={person.name}
      avatar={person.avatar}
      setInterviewer={() => onChange(person.id)}
      selected={value === person.id}
    />
  ))

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">
        Interviewer
      </h4>
      <ul className="interviewers__list">{list}</ul>
    </section>
  )
}
