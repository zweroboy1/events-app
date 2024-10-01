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
