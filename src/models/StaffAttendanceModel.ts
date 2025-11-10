export type IStaffAttendanceModel = {
  id: string;
  name: string;
  position: string;
  checkIn: string | null;
  checkOut: string | null;
  status: string;
};