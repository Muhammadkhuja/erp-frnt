export interface Student {
  id?: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  password_hash?: string;
  confirm_password?: string;
  gender: string;
  date_of_birth: string;
  status?: string;
  role?: string;
  // lidId?: number;
  // eventsId: number[],
  // groupsId: number[]
  //   eventsId: number,
  // groupsId: number
}
