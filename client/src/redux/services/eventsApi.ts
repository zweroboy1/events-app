import {
  FetchBaseQueryError,
  createApi,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../../constants';
import { IEventResponse } from '../../types';

interface ErrorResponse {
  message: string | string[];
  error?: string;
  statusCode: number;
  timestamp?: string;
}

const getServerErrorMessage = (response: FetchBaseQueryError): Error => {
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
  }),
});

export const { useGetEventsQuery } = eventsApi;
