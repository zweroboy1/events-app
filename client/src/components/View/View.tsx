import React from 'react';
import { useParams } from 'react-router-dom';

export const View: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <div>
      <h1>View Event ID: {id}</h1>
    </div>
  );
};
