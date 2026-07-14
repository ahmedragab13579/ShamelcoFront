import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast"; 
import { AuthApi } from "../../API Data/Auth/AuthApi";
import { useAuth } from "../../../Context/Auth/AuthContext";
import { jwtDecode } from "jwt-decode";
import type { DecodedUser } from "../../Types/Auth/Context";
import type SuccessResult from "../../Types/Result/Success";
import type FailResult from "../../Types/Result/Fail";
import type { AuthTokensResponse } from "../../Types/Auth/Response";
import type { 
  ChangePasswordRequest, 
  ForgotPasswordRequest, 
  GoogleLoginRequest, 
  LocalLoginRequest, 
  RegisterRequestDto, 
  ResetPasswordRequest 
} from "../../Types/Auth/Request";
import { authKeys } from "../Keys/useAuthKeys";
import { queryClient } from "../../config/queryClient";
import { NotificationKeys } from "../Keys/useNotificationKeys";
import asGUID from "../../Types/shared/Guid";
import { useLanguage } from "../../../UserInterFace/Hooks/Shared/useLanguage";
import { getLocalizedMessage } from "../../../locales/i18nHelper";

const normalizeDecodedToken = (
  rawToken: Record<string, unknown>,
): DecodedUser => {
  return {
    userId: (rawToken.UserId || rawToken.userId) as string,
    email: (rawToken.Email || rawToken.email) as string | undefined,
    role: (rawToken.Role || rawToken.role) as string,
    name: (rawToken.Name || rawToken.name) as string | undefined,
    pitchId: (rawToken.PitchId || rawToken.pitchId) as string | undefined,
    venueId: (rawToken.VenueId || rawToken.venueId) as string | undefined,
    isAuthenticated: true,
  };
};

const useAuthSuccess = () => {
  const { loginState } = useAuth();
  const queryClient = useQueryClient(); 

  return (responseData: SuccessResult<AuthTokensResponse>) => {
    const rawToken = jwtDecode<Record<string, unknown>>(
      responseData.data.accessToken
    );
    const decodedToken = normalizeDecodedToken(rawToken);
    
    loginState(decodedToken);
    queryClient.invalidateQueries({ queryKey:authKeys.user() });
  };
};

export const useLoginMutation = () => {
  const handleSuccess = useAuthSuccess();
  const{t} = useLanguage();

  return useMutation<SuccessResult<AuthTokensResponse>, FailResult, LocalLoginRequest>({
    mutationKey: authKeys.action("login"),
    mutationFn: AuthApi.login,
    onSuccess: (data) => {
      handleSuccess(data);
      toast.success(t('messages.LOGIN_SUCCESSFUL'));
    },
    onError: (error) => {
      toast.error(getLocalizedMessage(error?.code));
    },
  });
};

export const useGoogleLoginMutation = () => {
  const handleSuccess = useAuthSuccess();
  const{t} = useLanguage();

  return useMutation<SuccessResult<AuthTokensResponse>, FailResult, GoogleLoginRequest>({
    mutationKey: authKeys.action("googleLogin"),
    mutationFn: AuthApi.loginWithGoogle,
    onSuccess: (data) => {
      handleSuccess(data);
      toast.success(t('messages.LOGIN_SUCCESSFUL'));
    },
    onError: (error) => {
      toast.error(getLocalizedMessage(error?.code));
    },
  });
};

export const useRegisterMutation = () => {
  const handleSuccess = useAuthSuccess();
    const{t} = useLanguage();

  const {user} = useAuth();
  return useMutation<SuccessResult<AuthTokensResponse>, FailResult, RegisterRequestDto>({
    mutationKey: authKeys.action("register"),
    mutationFn: AuthApi.register,
    onSuccess: (data) => {

      queryClient.invalidateQueries({ queryKey: NotificationKeys.list(asGUID(user?.userId||"00000000-0000-0000-0000-000000000000")) });
      handleSuccess(data);
      toast.success(t('messages.REGISTRATION_SUCCESSFUL'));
    },
    onError: (error) => {
      toast.error(getLocalizedMessage(error?.code));
    },
  });
};

export const useForgotPasswordMutation = () => {
    const{t} = useLanguage();

  return useMutation<SuccessResult<void>, FailResult, ForgotPasswordRequest>({
    mutationKey: authKeys.action("forgetPassword"),

    mutationFn: AuthApi.forgotPassword,
    onSuccess: () => {
      toast.success(t('messages.FORGOT_PASSWORD_EMAIL_SENT'));
    },
    onError: (error) => {
      toast.error(getLocalizedMessage(error?.code));
    }
  });
};

export const useResetPasswordMutation = () => {
    const {user} = useAuth();
  const{t} = useLanguage();

  return useMutation<SuccessResult<void>, FailResult, ResetPasswordRequest>({
    mutationKey: authKeys.action("resetPassword"),

    mutationFn: AuthApi.resetPassword,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: NotificationKeys.list(asGUID(user?.userId||"00000000-0000-0000-0000-000000000000")) });

      toast.success(t('messages.PASSWORD_RESET_SUCCESSFULLY'));
    },
    onError: (error) => {
      toast.error(getLocalizedMessage(error?.code));
    }
  });
};

export const useChangePasswordMutation = () => {
    const {user} = useAuth();
      const{t} = useLanguage();

  return useMutation<SuccessResult<boolean>, FailResult, ChangePasswordRequest>({
    
    mutationKey: authKeys.action("changePassword"),
    mutationFn: AuthApi.changePassword,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: NotificationKeys.list(asGUID(user?.userId||"00000000-0000-0000-0000-000000000000")) });

      toast.success(t('messages.PASSWORD_CHANGED_SUCCESSFULLY'));
    },
    onError: (error) => {
      toast.error(getLocalizedMessage(error?.code));
    }
  });
};

export const useLogoutMutation = () => {
  const { logoutState } = useAuth();
  const{t} = useLanguage();
  const queryClient = useQueryClient();

  return useMutation<SuccessResult<boolean>, FailResult, void>({
    mutationKey: authKeys.action("logout"),
    mutationFn: AuthApi.logout,
    onSuccess: () => {
      logoutState();
      queryClient.clear();
      toast.success(t('messages.LOGOUT_SUCCESS'));
    },
    onError: (error) => {
      toast.error(getLocalizedMessage(error?.code));
    }
  });
};  