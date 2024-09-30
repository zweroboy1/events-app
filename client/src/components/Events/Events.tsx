import React from 'react';
import { Container, Row } from 'react-bootstrap';

import { Event } from '../Event/Event';

interface IEvent {
  id: number;
  title: string;
  description: string;
  eventDate: Date;
  organizer: string;
}

export const Events: React.FC = () => {
  /*
  const {
    data: lists,
    error: fetchError,
    isUninitialized,
    isLoading,
    isFetching,
    isError,
  } = useGetListsQuery(undefined);
*/

  const events: IEvent[] = [
    {
      id: 1,
      title: 'Event 1',
      description: 'Description 1',
      eventDate: new Date(),
      organizer: 'Organizer 1',
    },
    {
      id: 2,
      title: 'Event 2',
      description: 'Description 2',
      eventDate: new Date(),
      organizer: 'Organizer 2',
    },
    {
      id: 3,
      title: 'Event 3',
      description: 'Description 3',
      eventDate: new Date(),
      organizer: 'Organizer 3',
    },
    {
      id: 4,
      title: 'Event 4',
      description: 'Description 4',
      eventDate: new Date(),
      organizer: 'Organizer 4',
    },
    {
      id: 5,
      title: 'Event 5',
      description: 'Description 5',
      eventDate: new Date(),
      organizer: 'Organizer 5',
    },
    {
      id: 6,
      title: 'Event 6',
      description: 'Description 6',
      eventDate: new Date(),
      organizer: 'Organizer 6',
    },
  ];
  /*
const isUninitialized = true;
const isLoading = true;
const isFetching = true;
const isError = true;
const fetchError = { message: 'Failed to fetch lists' };



  if (isUninitialized || isLoading || isFetching) {
    return (
      <Placeholder className="opacity-50" as="p" animation="glow">
        <Placeholder className="p-4" xs={12} />
      </Placeholder>
    );
  }

  if (isError) {
    const serverError = fetchError as Error;
    return <div>{serverError.message}</div>;
  }
*/
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
