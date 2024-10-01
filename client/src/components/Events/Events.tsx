import React, { useState } from 'react';
import { Container, Row, Spinner, Pagination } from 'react-bootstrap';

import { Event } from '../Event/Event';
import { useGetEventsQuery } from '../../redux/services/eventsApi';
export const Events: React.FC = () => {
  const [page, setPage] = useState(1);

  const {
    data: eventsResponse,
    error: fetchError,
    isUninitialized,
    isLoading,
    isFetching,
    isError,
  } = useGetEventsQuery({ page });

  const events = eventsResponse?.events || [];
  const last = Math.ceil((eventsResponse?.count || 1) / 12);
  const handlePageChange = (pageNumber: number) => {
    setPage(pageNumber);
  };

  if (isUninitialized || isLoading || isFetching) {
    return (
      <>
        <h1 className="text-center mb-3">Events</h1>
        <Container
          fluid
          className="d-flex justify-content-center align-items-center vh-50"
        >
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </Container>
      </>
    );
  }

  if (isError) {
    const serverError = fetchError as Error;
    return <div>{serverError.message}</div>;
  }

  return (
    <>
      <h1 className="text-center mb-3">Events</h1>
      <Container fluid className="h-100">
        <Row className="gx-4 gy-4">
          {events.length === 0 && <div>No events</div>}
          {events.map((event) => (
            <Event key={event.id} {...event} />
          ))}
        </Row>

        <div className="d-flex justify-content-center mt-4">
          <Pagination>
            <Pagination.First onClick={() => handlePageChange(1)} />
            <Pagination.Prev
              onClick={() => page > 1 && handlePageChange(page - 1)}
            />
            {[...Array(last)].map((_, index) => {
              const pageNumber = index + 1;
              return (
                <Pagination.Item
                  key={pageNumber}
                  active={pageNumber === page}
                  onClick={() => handlePageChange(pageNumber)}
                >
                  {pageNumber}
                </Pagination.Item>
              );
            })}
            <Pagination.Next
              onClick={() => page < last && handlePageChange(page + 1)}
            />
            <Pagination.Last onClick={() => handlePageChange(last)} />
          </Pagination>
        </div>
      </Container>
    </>
  );
};
