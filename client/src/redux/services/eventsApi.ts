import {
  FetchBaseQueryError,
  createApi,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../../constants';
import { IEvent } from '../../types';

interface ErrorResponse {
  message: string | string[];
  error?: string;
  statusCode: number;
  timestamp?: string;
}

console.log(BASE_URL);

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
    getEvents: builder.query<IEvent[], void>({
      query: () => 'events',
      transformResponse: (response: IEvent[]) => {
        return response;
      },
      transformErrorResponse: (response: FetchBaseQueryError): Error => {
        return getServerErrorMessage(response);
      },
      providesTags: ['Events'],
    }),
    /*
    addList: builder.mutation<List, string>({
      query: (name) => ({
        url: 'lists',
        method: 'POST',
        body: { name },
      }),
      transformResponse: (response: List) => {
        return response;
      },
      transformErrorResponse: (response: FetchBaseQueryError) => {
        return getServerErrorMessage(response);
      },
      invalidatesTags: ['List'],
    }),

    deleteList: builder.mutation<null, number>({
      query: (id) => ({
        url: `lists/${id}`,
        method: 'DELETE',
      }),
      transformErrorResponse: (response: FetchBaseQueryError) => {
        return getServerErrorMessage(response);
      },
      invalidatesTags: ['List'],
    }),

    updateList: builder.mutation<Event, { id: number; name: string }>({
      query: (list) => ({
        url: `lists/${list.id}`,
        method: 'PATCH',
        body: { name: list.name },
      }),
      transformResponse: (response: List) => {
        return response;
      },
      transformErrorResponse: (response: FetchBaseQueryError) => {
        return getServerErrorMessage(response);
      },
      invalidatesTags: ['List'],
    }), */
  }),
});

export const { useGetEventsQuery } = eventsApi;
