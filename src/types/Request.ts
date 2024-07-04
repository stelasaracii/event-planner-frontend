export interface Request {
  request_id: number;
  user_id: number;
  event_id: number;
  status: "pending" | "approved" | "rejected";
  request_date: Date;
}
