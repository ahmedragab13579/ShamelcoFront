import apiClient from "../SharedAPIConfig/api";
import type SuccessResult from "../../Types/Result/Success";
import type { ChangePasswordRequest, ForgotPasswordRequest, GoogleLoginRequest, LocalLoginRequest, RegisterRequestDto, ResetPasswordRequest } from "../../Types/Auth/Request";
import type { AuthTokensResponse } from "../../Types/Auth/Response";

export const AuthApi = {
  login: async (
    data: LocalLoginRequest,
  ): Promise<SuccessResult<AuthTokensResponse>> => {
    const response = await apiClient.post<never,SuccessResult<AuthTokensResponse>>(
      "auth/login/local",
      data,
    );
    return response;
  },

  register: async (
    data: RegisterRequestDto,
  ): Promise<SuccessResult<AuthTokensResponse>> => {
    const response = await apiClient.post<never,SuccessResult<AuthTokensResponse>>(
      "auth/register",
      data,
    );
    return response;
  },

  forgotPassword: async (
    data: ForgotPasswordRequest,
  ): Promise<SuccessResult<void>> => {
    const response = await apiClient.post<never,SuccessResult<void>>(
      "/auth/forgot-password",
      data,
    );
    return response;
  },

  changePassword: async (
    data: ChangePasswordRequest,
  ): Promise<SuccessResult<boolean>> => {
    const response = await apiClient.post<never,SuccessResult<boolean>>(
      "/auth/change-password",
      data,
    );
    return response;
  },

  resetPassword: async (
    data: ResetPasswordRequest,
  ): Promise<SuccessResult<void>> => {
    const response = await apiClient.post<never,SuccessResult<void>>(
      "/auth/reset-password",
      data,
    );
    return response;
  },

  logout: async (): Promise<SuccessResult<boolean>> => {
    const response =
      await apiClient.post<never,SuccessResult<boolean>>("/auth/revoke");
    return response;
  },
  loginWithGoogle: async (
    data: GoogleLoginRequest,
  ): Promise<SuccessResult<AuthTokensResponse>> => {
    const response = await apiClient.post<never,SuccessResult<AuthTokensResponse>>(
      "/auth/login/google",
      data,
    );
    return response;
  },

  refreshToken: async (): Promise<SuccessResult<AuthTokensResponse>> => {
    const response = await apiClient.post<never,SuccessResult<AuthTokensResponse>>(
      "/auth/refresh-token",
    );
    return response;
  },
};
