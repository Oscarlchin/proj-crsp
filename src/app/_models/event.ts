import { Comment } from './comment';

export class Event {
  program_id: number;
  program_name: string;
  district: string;
  venue: string;
  start_date: string;
  end_date: string;
  dayinweek: string;
  start_time: string;
  end_time: string;
  type_name: string;
  fee: number;
  quota: number;
  quota_left: number;
  min_age: number;
  max_age: number;
  url: string;
//  comments: Comment[];
}
