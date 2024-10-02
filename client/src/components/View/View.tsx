import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { Container } from 'react-bootstrap';

import {
  getServerErrorMessage,
  useGetEventQuery,
} from '../../redux/services/eventsApi';

export const View: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const {
    data: event,
    error: eventError,
    isSuccess,
  } = useGetEventQuery(Number(id));

  if (eventError) {
    const errorFromServer = getServerErrorMessage(
      eventError as FetchBaseQueryError
    );
    return <h1>{errorFromServer?.message}</h1>;
  }
  if (isSuccess) {

  return (
    <Container className="mt-4">
      <h1>"{event?.title || ''}" participants</h1>

      <div className="mt-5">
          <Link to={`/`}>To main page</Link>
        </div>
    </Container>
  );
}
};
