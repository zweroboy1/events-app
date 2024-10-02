import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { Container, Row, Spinner } from 'react-bootstrap';

import {
  getServerErrorMessage,
  useGetEventQuery,
  useGetUsersQuery,
} from '../../redux/services/eventsApi';
import { Participant } from '../Participant/Participant';

export const View: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const {
    data: event,
    error: eventError,
    isSuccess,
  } = useGetEventQuery(Number(id));

  const {
    data: usersResponse,
    isUninitialized,
    isLoading,
    isFetching,
  } = useGetUsersQuery({ id: Number(id), page: 1, limit: 100 });

  if (eventError) {
    const errorFromServer = getServerErrorMessage(
      eventError as FetchBaseQueryError
    );
    return <h1>{errorFromServer?.message}</h1>;
  }

  const users = usersResponse?.users || [];

  if (isSuccess) {
    return (
      <Container className="mt-4">
        <h1>
          {event?.title ? `"${event.title}" participants` : 'Participants'}
        </h1>

        {isUninitialized || isLoading || isFetching ? (
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        ) : (
          <Container fluid className="h-100 w-100 mt-5">
            <Row className="gx-4 gy-4 w-100">
              {users.length === 0 && <div>No participants</div>}
              {users.map((user) => (
                <Participant key={user.id} {...user} />
              ))}
            </Row>
          </Container>
        )}

        <div className="mt-5">
          <Link to={`/`}>To main page</Link>
        </div>
      </Container>
    );
  }
};
