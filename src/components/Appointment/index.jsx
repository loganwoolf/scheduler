import React from 'react';

import useVisualMode from 'hooks/useVisualMode';

import 'components/Appointment/style.scss';

import Header from './Header';
import Show from './Show';
import Empty from './Empty';
import Form from './Form';
import Status from './Status';
import Confirm from './Confirm';
import Error from './Error';

export default function Appointment(props) {
  const EMPTY = 'EMPTY';
  const SHOW = 'SHOW';
  const CREATE = 'CREATE';
  const SAVING = 'SAVING';
  const DELETING = 'DELETING';
  const CONFIRM = 'CONFIRM';
  const EDIT = 'EDIT';
  const ERROR_SAVE = 'ERROR_SAVE';
  const ERROR_DELETE = 'ERROR_DELETE';

  const {
    interview,
    time,
    interviewers,
    id,
    bookInterview,
    cancelInterview,
  } = props;

  const initial = interview ? SHOW : EMPTY;
  const { mode, transition, back } = useVisualMode(initial);

  const save = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer,
    };

    transition(SAVING);
    bookInterview(id, interview)
      .then(() => transition(SHOW))
      .catch(() => transition(ERROR_SAVE, true));
  };

  const remove = id => {
    transition(DELETING, true);
    cancelInterview(id)
      .then(() => transition(EMPTY))
      .catch(() => transition(ERROR_DELETE, true));
  };

  const confirmRemove = id => {
    transition(CONFIRM);
  };

  return (
    <article className="appointment">
      <Header time={time} />
      {mode === EMPTY && (
        <Empty onAdd={() => transition(CREATE)} />
      )}
      {mode === SHOW && (
        <Show
          {...interview}
          onEdit={() => transition(EDIT)}
          onDelete={() => confirmRemove()}
        />
      )}
      {mode === CREATE && (
        <Form
          interviewers={interviewers}
          onSave={save}
          onCancel={back}
        />
      )}
      {mode === SAVING && <Status message={'Saving...'} />}
      {mode === DELETING && (
        <Status message={'Deleting...'} />
      )}
      {mode === CONFIRM && (
        <Confirm
          message={'Are you sure you would like to delete?'}
          onConfirm={() => remove(id)}
          onCancel={() => transition(SHOW)}
        />
      )}
      {mode === EDIT && (
        <Form
          interviewers={interviewers}
          onSave={save}
          onCancel={back}
          student={interview.student}
          interviewer={interview.interviewer.id}
        />
      )}
      {mode === ERROR_SAVE && (
        <Error
          message={'Unable to save'}
          onClose={() => transition(back)}
        />
      )}
      {mode === ERROR_DELETE && (
        <Error
          message={'Unable to delete'}
          onClose={() => transition(back)}
        />
      )}
    </article>
  );
}
