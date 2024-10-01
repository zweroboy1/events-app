import React from 'react';
import { Container, Row, Spinner } from 'react-bootstrap';

import { Event } from '../Event/Event';
import { useGetEventsQuery } from '../../redux/services/eventsApi';
export const Events: React.FC = () => {
  const {
    data: events,
    error: fetchError,
    isUninitialized,
    isLoading,
    isFetching,
    isError,
  } = useGetEventsQuery();

  if (isUninitialized || isLoading || isFetching) {
    return (
      <Container
        fluid
        className="d-flex justify-content-center align-items-center vh-50"
      >
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  if (isError) {
    const serverError = fetchError as Error;
    return <div>{serverError.message}</div>;
  }

  return (
    <Container fluid className="h-100">
      <Row className="gx-4 gy-4">
        {events.length === 0 && <div>No events</div>}
        {events.map((event) => (
          <Event key={event.id} {...event} />
        ))}
      </Row>
    </Container>
  );
};
