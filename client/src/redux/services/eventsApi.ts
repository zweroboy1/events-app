import {
  FetchBaseQueryError,
  createApi,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../../constants';
import { IEvent, IEventResponse } from '../../types';

interface ErrorResponse {
  message: string | string[];
  error?: string;
  statusCode: number;
  timestamp?: string;
}

interface IRegistrationRequest {
  fullName: string;
  email: string;
  dateOfBirth: string;
  source: string;
  eventId: number;
}

interface IRegistrationResponse {
  id: number;
}

export const getServerErrorMessage = (response: FetchBaseQueryError): Error => {
  let message = 'Server error';
  if ('data' in response && response.data) {
    const errorResponse = response.data as ErrorResponse;
    if (Array.isArray(errorResponse.message)) {
      message = errorResponse.message.join(', ');
    } else {
      message = errorResponse.message;
    }
  } else if ('error' in response && response.error) {
    message = response.error;
  }
  return { message, name: `${response.status} Error` };
};

export const eventsApi = createApi({
  reducerPath: 'eventsApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  tagTypes: ['Events'],
  endpoints: (builder) => ({
    getEvents: builder.query<IEventResponse, { page: number }>({
      query: ({ page }) => `events?page=${page}`,
      transformErrorResponse: (response: FetchBaseQueryError): Error => {
        return getServerErrorMessage(response);
      },
      providesTags: ['Events'],
    }),

    getEvent: builder.query<IEvent, number>({
      query: (id) => `events/${id}`,
    }),

    createRegistration: builder.mutation<
      IRegistrationResponse,
      IRegistrationRequest
    >({
      query: (body) => ({
        url: 'registrations',
        method: 'POST',
        body,
      }),
      transformErrorResponse: (response: FetchBaseQueryError): Error => {
        return getServerErrorMessage(response);
      },
    }),
  }),
});

export const {
  useGetEventsQuery,
  useGetEventQuery,
  useCreateRegistrationMutation,
} = eventsApi;
