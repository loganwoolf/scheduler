import React from 'react'

import InterviewerListItem from './InterviewerListItem'

import 'components/InterviewerList.scss'

export default function InterviewerList(props) {
  const { interviewers, interviewer, setInterviewer } = props

  const list = interviewers.map(item => (
    <InterviewerListItem
      key={item.id}
      {...item}
      setInterviewer={setInterviewer}
      selected={interviewer === item.id}
    />
  ))

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{list}</ul>
    </section>
  )
}
