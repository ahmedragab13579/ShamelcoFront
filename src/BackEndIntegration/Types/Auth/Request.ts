export  interface ChangePasswordRequest {
  CurrentPassword: string;
  NewPassword: string;
  ConfirmPassword: string;
}

export  interface ForgotPasswordRequest {
  Email: string;
}
export  interface GoogleLoginRequest {
  IdToken: string;
}

export  interface LocalLoginRequest {
  Email: string;
  Password: string;
}

export  interface RegisterRequestDto {
  name: string;
  email: string;
  password: string;
  userType: string;
}
export  interface ResetPasswordRequest {
  Email: string;
  Token: string;
  NewPassword: string;
}
export  interface RevokeRequest {
  RefreshToken: string;
}
