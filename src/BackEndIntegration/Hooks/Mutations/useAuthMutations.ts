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

  return useMutation<SuccessResult<AuthTokensResponse>, FailResult, LocalLoginRequest>({
    mutationKey: authKeys.action("login"),
    mutationFn: AuthApi.login,
    onSuccess: (data) => {
      handleSuccess(data);
      toast.success("تم تسجيل الدخول بنجاح، أهلاً بك في شاميلكو!");
    },
    onError: (error) => {
      toast.error(error?.error || "بيانات الدخول غير صحيحة، يرجى المحاولة مرة أخرى.");
    },
  });
};

export const useGoogleLoginMutation = () => {
  const handleSuccess = useAuthSuccess();

  return useMutation<SuccessResult<AuthTokensResponse>, FailResult, GoogleLoginRequest>({
    mutationKey: authKeys.action("googleLogin"),
    mutationFn: AuthApi.loginWithGoogle,
    onSuccess: (data) => {
      handleSuccess(data);
      toast.success("تم تسجيل الدخول بواسطة جوجل بنجاح، أهلاً بك في شاميلكو!");
    },
    onError: (error) => {
      toast.error(error?.error || "حدث خطأ أثناء تسجيل الدخول بواسطة جوجل.");
    },
  });
};

export const useRegisterMutation = () => {
  const handleSuccess = useAuthSuccess();
  const {user} = useAuth();
  return useMutation<SuccessResult<AuthTokensResponse>, FailResult, RegisterRequestDto>({
    mutationKey: authKeys.action("register"),
    mutationFn: AuthApi.register,
    onSuccess: (data) => {

      queryClient.invalidateQueries({ queryKey: NotificationKeys.list(asGUID(user?.userId||"00000000-0000-0000-0000-000000000000")) });
      handleSuccess(data);
      toast.success("تم إنشاء الحساب بنجاح، أهلاً بك في شاميلكو!");
    },
    onError: (error) => {
      toast.error(error?.error || "حدث خطأ أثناء إنشاء الحساب، يرجى التأكد من البيانات.");
    },
  });
};

export const useForgotPasswordMutation = () => {
  
  return useMutation<SuccessResult<void>, FailResult, ForgotPasswordRequest>({
    mutationKey: authKeys.action("forgetPassword"),

    mutationFn: AuthApi.forgotPassword,
    onSuccess: () => {
      toast.success("تم إرسال رابط استعادة كلمة المرور إلى بريدك الإلكتروني بنجاح.");
    },
    onError: (error) => {
      toast.error(error?.error || "حدث خطأ أثناء محاولة استعادة كلمة المرور.");
    }
  });
};

export const useResetPasswordMutation = () => {
    const {user} = useAuth();

  return useMutation<SuccessResult<void>, FailResult, ResetPasswordRequest>({
    mutationKey: authKeys.action("resetPassword"),

    mutationFn: AuthApi.resetPassword,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: NotificationKeys.list(asGUID(user?.userId||"00000000-0000-0000-0000-000000000000")) });

      toast.success("تم تغيير كلمة المرور بنجاح، يمكنك الآن تسجيل الدخول.");
    },
    onError: (error) => {
      toast.error(error?.error || "حدث خطأ أثناء تغيير كلمة المرور.");
    }
  });
};

export const useChangePasswordMutation = () => {
    const {user} = useAuth();
  return useMutation<SuccessResult<boolean>, FailResult, ChangePasswordRequest>({
    
    mutationKey: authKeys.action("changePassword"),
    mutationFn: AuthApi.changePassword,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: NotificationKeys.list(asGUID(user?.userId||"00000000-0000-0000-0000-000000000000")) });

      toast.success("تم تحديث كلمة المرور بنجاح.");
    },
    onError: (error) => {
      toast.error(error?.error || "حدث خطأ أثناء تحديث كلمة المرور.");
    }
  });
};

export const useLogoutMutation = () => {
  const { logoutState } = useAuth();
  const queryClient = useQueryClient();

  return useMutation<SuccessResult<boolean>, FailResult, void>({
    mutationKey: authKeys.action("logout"),
    mutationFn: AuthApi.logout,
    onSuccess: () => {
      logoutState();
      queryClient.clear();
      toast.success("تم تسجيل الخروج بنجاح. نتمنى رؤيتك قريباً!");
    },
    onError: (error) => {
      toast.error(error?.error || "حدث خطأ أثناء تسجيل الخروج.");
    }
  });
};