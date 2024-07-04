export interface Event {
    event_id: number;
    event_name: string;
    event_date: Date;
    description: string;
    capacity: number;
    participated?: boolean;
  }

  export interface EventRequest {
    status: boolean;
    event: Event;
  }