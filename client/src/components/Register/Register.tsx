import React, { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Container, Form, Button } from 'react-bootstrap';
import { useForm, Controller } from 'react-hook-form';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { parseISO, subYears } from 'date-fns';

import {
  getServerErrorMessage,
  useCreateRegistrationMutation,
  useGetEventQuery,
} from '../../redux/services/eventsApi';
import { useToast } from '../../context/useToast';

interface RegisterFormValues {
  fullName: string;
  email: string;
  dateOfBirth: string;
  source: string;
}

export const Register: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [createRegistration] = useCreateRegistrationMutation();

  const {
    data: event,
    error: eventError,
    isSuccess,
  } = useGetEventQuery(Number(id));

  const { showToast } = useToast();
  const navigate = useNavigate();

  const [inactive, setInactive] = useState(false);

  const schema = yup.object().shape({
    fullName: yup
      .string()
      .min(3, 'Full name must be at least 3 characters')
      .required('Full name is required'),
    email: yup
      .string()
      .email('Invalid email address')
      .required('Email is required'),
    dateOfBirth: yup
      .string()
      .test('dateOfBirth', 'You must be at least 18 years old', (value) => {
        if (!value) {
          return false;
        }
        const date = parseISO(value);
        const minDate = subYears(new Date(), 18);
        return date <= minDate;
      })
      .required('Date of birth is required'),
    source: yup.string().required('Please select a source'),
  });

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    defaultValues: {
      fullName: '',
      email: '',
      dateOfBirth: '',
      source: '',
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: RegisterFormValues) => {
    try {
      const response = await createRegistration({
        eventId: Number(id),
        ...data,
      });
      if ('error' in response) {
        const errorResponse = response.error as Error;
        throw new Error(errorResponse.message);
      }
      showToast('success', `Your registration was successful!`);
      setInactive(true);
      setTimeout(() => {
        navigate('/view/' + id);
      }, 3000);
    } catch (err: unknown) {
      const itemError = err as Error;
      showToast('error', itemError.message);
    }
  };

  if (eventError) {
    const errorFromServer = getServerErrorMessage(
      eventError as FetchBaseQueryError
    );
    return <h1>{errorFromServer?.message}</h1>;
  }
  if (isSuccess) {
    return (
      <Container className="mt-4" style={{ maxWidth: '600px' }}>
        <h1 className="mb-4">Register to "{event?.title || ''}"</h1>
        <Form className="text-start" onSubmit={handleSubmit(onSubmit)}>
          <Form.Group
            className="mb-4 text-start position-relative"
            controlId="formFullName"
          >
            <Form.Label>Full name</Form.Label>
            <Controller
              name="fullName"
              control={control}
              render={({ field }) => (
                <Form.Control
                  type="text"
                  placeholder="Enter your full name"
                  isInvalid={!!errors.fullName}
                  {...field}
                />
              )}
            />
            <Form.Control.Feedback
              type="invalid"
              className="position-absolute top-100 start-0"
            >
              {errors.fullName?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group
            className="mb-4 text-start position-relative"
            controlId="formEmail"
          >
            <Form.Label>Email</Form.Label>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <Form.Control
                  type="email"
                  placeholder="Enter your email"
                  isInvalid={!!errors.email}
                  {...field}
                />
              )}
            />
            <Form.Control.Feedback
              type="invalid"
              className="position-absolute top-100 start-0"
            >
              {errors.email?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group
            className="mb-4 text-start position-relative"
            controlId="formDateOfBirth"
          >
            <Form.Label>Date of birth</Form.Label>
            <Controller
              name="dateOfBirth"
              control={control}
              render={({ field }) => (
                <Form.Control
                  type="date"
                  isInvalid={!!errors.dateOfBirth}
                  {...field}
                />
              )}
            />
            <Form.Control.Feedback
              type="invalid"
              className="position-absolute top-100 start-0"
            >
              {errors.dateOfBirth?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3 text-start position-relative">
            <Form.Label>Where did you hear about this event?</Form.Label>
            <Controller
              name="source"
              control={control}
              render={({ field }) => (
                <div className="mt-2 d-flex flex-row gap-3">
                  <Form.Check
                    type="radio"
                    id="socialMedia"
                    label="Social media"
                    {...field}
                    checked={field.value === 'socialMedia'}
                    onChange={() => field.onChange('socialMedia')}
                    isInvalid={!!errors.source}
                  />
                  <Form.Check
                    type="radio"
                    id="friends"
                    label="Friends"
                    {...field}
                    checked={field.value === 'friends'}
                    onChange={() => field.onChange('friends')}
                    isInvalid={!!errors.source}
                  />
                  <Form.Check
                    type="radio"
                    id="foundMyself"
                    label="Found myself"
                    {...field}
                    checked={field.value === 'foundMyself'}
                    onChange={() => field.onChange('foundMyself')}
                    isInvalid={!!errors.source}
                  />
                </div>
              )}
            />
            <div className="text-danger position-absolute top-100 start-0">
              {errors.source?.message}
            </div>
          </Form.Group>

          <Button
            variant="dark"
            disabled={isSubmitting || inactive}
            className="mt-3"
            type="submit"
          >
            Register
          </Button>
        </Form>
        <div className="mt-5">
          <Link to={`/`}>To main page</Link>
        </div>
      </Container>
    );
  }
};
