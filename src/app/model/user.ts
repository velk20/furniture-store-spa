export interface UserLogin {
  email: string;
  password: string;
}
export type UserUpdate = {
  firstName: string
  lastName: string
  username: string
  isAdmin: boolean
  email: string;
  phone: string;
}
export interface UserRegister extends UserLogin {
  firstName: string
  lastName: string
  username: string
  isAdmin: boolean
  phone: string;
}

export interface User extends UserRegister {
  id: number;
}
