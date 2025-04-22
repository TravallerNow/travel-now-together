
import axios from 'axios';
import { Patient, Doctor, Appointment, Slot, User } from '../types/health';

const BASE_URL = 'http://localhost:8084';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Patients
export const getAllPatients = () => api.get('/patients/all');
export const getPatient = (id: number) => api.get(`/patients/${id}`);
export const addPatient = (patient: Patient) => api.post('/patients/add', patient);
export const updatePatient = (patient: Patient) => api.put('/patients/update', patient);
export const deletePatient = (id: number) => api.delete(`/patients/${id}`);

// Doctors
export const getAllDoctors = () => api.get('/doctors/all');
export const getDoctor = (id: number) => api.get(`/doctors/get/${id}`);
export const addDoctor = (doctor: Doctor) => api.post('/doctors/add', doctor);
export const updateDoctor = (doctor: Doctor) => api.put('/doctors/update', doctor);
export const deleteDoctor = (id: number) => api.delete(`/doctors/${id}`);

// Appointments
export const getAllAppointments = () => api.get('/appointments/all');
export const getAppointment = (id: number) => api.get(`/appointments/get/${id}`);
export const bookAppointment = (appointment: Appointment) => api.post('/appointments/book', appointment);
export const updateAppointment = (appointment: Appointment) => api.put('/appointments/update', appointment);
export const cancelAppointment = (id: number) => api.delete(`/appointments/cancel/${id}`);
export const downloadAppointmentsCsv = () => api.get('/appointments/csv', { responseType: 'blob' });

// Slots
export const getAvailableSlots = (doctorId: number) => api.get(`/slots/available/${doctorId}`);
export const addSlot = (slot: Slot) => api.post('/slots/add', slot);
export const updateSlot = (slot: Slot) => api.post('/slots/update', slot);
export const deleteSlot = (slot: Slot) => api.post('/slots/delete', slot);

// Auth
export const loginPatient = (credentials: Pick<User, 'email' | 'password'>) => 
  api.post('/authenticate/patient', credentials);
export const loginDoctor = (credentials: Pick<User, 'email' | 'password'>) => 
  api.post('/authenticate/doctor', credentials);
export const loginAdmin = (credentials: Pick<User, 'email' | 'password'>) => 
  api.post('/authenticate/admin', credentials);
export const registerUser = (user: User) => api.post('/users/register', user);
