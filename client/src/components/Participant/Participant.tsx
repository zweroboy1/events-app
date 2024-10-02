import React from 'react';
import { Card, Col } from 'react-bootstrap';

interface ParticipantProps {
  fullName: string;
  email: string;
}

export const Participant: React.FC<ParticipantProps> = (props) => {
  const { fullName, email } = props;

  return (
    <Col className="d-flex justify-content-center" xs={12} sm={6} md={4} lg={3}>
      <Card
        className="border border-dark h-100"
        style={{
          borderRadius: 0,
          width: '100%',
          padding: '10px',
          maxWidth: '300px',
        }}
      >
        <Card.Body className="d-flex flex-column justify-content-between w-content">
          <h4 className="text-start">{fullName}</h4>
          <Card.Text className="text-start small">{email}</Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
};
