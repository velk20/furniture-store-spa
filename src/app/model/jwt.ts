import {User} from "./user";

export interface JwtToken {
  accessToken: string;
}

export interface JwtTokenWithUser extends JwtToken {
  user: User;
}
