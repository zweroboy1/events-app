import React from 'react';
import { Card, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

interface EventProps {
  id: number;
  title: string;
  description: string;
}

export const Event: React.FC<EventProps> = (props) => {
  const { id, title, description } = props;

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
        <Card.Body className="d-flex flex-column justify-content-between">
          <h4 className="text-start">{title}</h4>
          <Card.Text className="text-start">{description}</Card.Text>
          <div className="d-flex justify-content-between align-items-center mt-3">
            <Link to={`/register/${id}`}>Register</Link>
            <Link to={`/view/${id}`}>View</Link>
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
};
