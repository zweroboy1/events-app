import {
  FetchBaseQueryError,
  createApi,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../../constants';
import {
  IEvent,
  IEventResponse,
  ErrorResponse,
  IRegistrationRequest,
  IRegistrationResponse,
  IUserResponse,
} from '../../types';

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
  tagTypes: ['Events', 'Users'],
  endpoints: (builder) => ({
    getEvents: builder.query<IEventResponse, { page: number }>({
      query: ({ page }) => `events?page=${page}`,
      transformErrorResponse: (response: FetchBaseQueryError): Error => {
        return getServerErrorMessage(response);
      },
      providesTags: ['Events'],
    }),

    getUsers: builder.query<
      IUserResponse,
      { id: number; page: number; limit: number }
    >({
      query: ({ id, page, limit }) =>
        `registrations/${id}?page=${page}&limit=${limit}`,
      providesTags: ['Users'],
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
      invalidatesTags: ['Users'],
    }),
  }),
});

export const {
  useGetEventsQuery,
  useGetEventQuery,
  useCreateRegistrationMutation,
  useGetUsersQuery,
} = eventsApi;
