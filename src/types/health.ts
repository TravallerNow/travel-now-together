
export interface Patient {
  id?: number;
  name: string;
  age: number;
  email: string;
  phone: string;
}

export interface Doctor {
  id?: number;
  name: string;
  specialization: string;
  email: string;
  phone: string;
}

export interface Appointment {
  id?: number;
  patientId: number;
  doctorId: number;
  date: string;
  time: string;
  status: 'SCHEDULED' | 'CANCELLED' | 'COMPLETED';
}

export interface Slot {
  id?: number;
  doctorId: number;
  date: string;
  startTime: string;
  endTime: string;
  isBooked: boolean;
}

export interface User {
  email: string;
  password: string;
  role: 'PATIENT' | 'DOCTOR' | 'ADMIN';
}
