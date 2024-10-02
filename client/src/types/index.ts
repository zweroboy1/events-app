export interface IEvent {
  id: number;
  title: string;
  description: string;
  eventDate: Date;
  organizer: string;
}

export interface IEventResponse {
  events: IEvent[];
  count: number;
}

export interface ErrorResponse {
  message: string | string[];
  error?: string;
  statusCode: number;
  timestamp?: string;
}

export interface IRegistrationRequest {
  fullName: string;
  email: string;
  dateOfBirth: string;
  source: string;
  eventId: number;
}

export interface IRegistrationResponse {
  id: number;
}

export interface IUserResponse {
  users: IUser[];
  count: number;
}

export interface IUser extends IRegistrationRequest {
  id: number;
  createdAt: string;
}
