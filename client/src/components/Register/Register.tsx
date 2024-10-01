import React from 'react';
import { useParams } from 'react-router-dom';

export const Register: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <div>
      <h1>Register for Event ID: {id}</h1>
    </div>
  );
};
