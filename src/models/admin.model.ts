import {User} from '@loopback/authentication-jwt';
import {model, property} from '@loopback/repository';

@model()
export class Admin extends User {
  @property({
    type: 'string',
    required: true,
  })
  role: string;

  constructor(data?: Partial<Admin>) {
    super(data);
  }
}

export interface AdminRelations {
  // describe navigational properties here
}

export type AdminWithRelations = Admin & AdminRelations;
