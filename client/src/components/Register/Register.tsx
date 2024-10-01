import React from 'react';
import { useParams } from 'react-router-dom';
import { Container, Form, Button } from 'react-bootstrap';

export const Register: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <Container className="mt-4">
      <h1 className="mb-4">Register for Event ID: {id}</h1>
      <Form className="text-start">
        <Form.Group className="mb-3 text-start" controlId="formFullName">
          <Form.Label>Full name</Form.Label>
          <Form.Control type="text" placeholder="Enter your full name" />
        </Form.Group>

        <Form.Group className="mb-3 text-start" controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" placeholder="Enter your email" />
        </Form.Group>

        <Form.Group className="mb-3 text-start" controlId="formDateOfBirth">
          <Form.Label>Date of birth</Form.Label>
          <Form.Control type="date" />
        </Form.Group>

        <Form.Group className="mb-3 text-start">
          <Form.Label>Where did you hear about this event?</Form.Label>
          <div className="mt-2 d-flex flex-row gap-3">
            <Form.Check
              type="radio"
              id="socialMedia"
              name="source"
              label="Social media"
              value="socialMedia"
            />
            <Form.Check
              type="radio"
              id="friends"
              name="source"
              label="Friends"
              value="friends"
            />
            <Form.Check
              type="radio"
              id="foundMyself"
              name="source"
              label="Found myself"
              value="foundMyself"
            />
          </div>
        </Form.Group>

        <Button variant="dark" className="mt-3" type="submit">
          Register
        </Button>
      </Form>
    </Container>
  );
};
