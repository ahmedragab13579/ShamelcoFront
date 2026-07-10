export interface DecodedUser {
  userId: string;
  email?: string;
  role: string;
  name?: string;
  pitchId?: string;
  venueId?: string;
  isAuthenticated: boolean;
}

export interface AuthContextType {
  user: DecodedUser | null;
  isAuthenticated: boolean;
  loginState: (tokens: DecodedUser, token?: string) => void;
  logoutState: () => void;
}
