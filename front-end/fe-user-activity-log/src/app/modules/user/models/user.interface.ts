import { Country } from './country.interface';

export interface User {
  id?: number,
  nombre: string,
  apellido: string,
  email: string,
  fechaNacimiento: Date,
  telefono?: string,
  paisResidencia: Country,
  preguntaContacto: boolean,
  actividades?: any[],
  estado?: number
}
