export enum Roles {
  ADMINISTRATOR = 'ADMINISTRATOR',
  STAFF = 'STAFF',
  USER = 'USER'
}

export interface Role {
  id: number;
  name: string;
  uid: string; // ADMINISTRATOR, STAFF, USER
  extends?: number | null; // id of the role to be extended
}

export interface User {
  id: number;
  name: string;
  email: string;
  username: string;
  role: Role;
}

