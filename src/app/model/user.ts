export interface UserLogin {
  email: string;
  password: string;
}

export interface IsAdminUser {
  isAdmin: boolean;
}

export interface UserUpdate extends IsAdminUser {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  phone: string;
}

export interface UserRegister extends UserLogin {
  firstName: string;
  lastName: string;
  username: string;
  isAdmin: boolean;
  phone: string;
  likedItems: number[];
}

export interface User extends UserRegister {
  id: number;
}
