import {
  useContext,
  useState,
  useEffect,
  useMemo,
  useCallback,
  type ReactNode,
  createContext,
} from "react";
import type {
  AuthContextType,
  DecodedUser,
} from "../../BackEndIntegration/Types/Auth/Context";
import apiClient from "../../BackEndIntegration/API Data/SharedAPIConfig/api";
import toast from 'react-hot-toast';
import { useLanguage } from "../../UserInterFace/Hooks/Shared/useLanguage";
import { secureStorage } from "../../utils/secureStorage";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const normalizeUserData = (rawData: Record<string, unknown>): DecodedUser => {
  const rawRole = (rawData.role || rawData.Role) as string;
  const role = rawRole ? rawRole.charAt(0).toUpperCase() + rawRole.slice(1).toLowerCase() : "";

  return {
    userId: (rawData.userId || rawData.UserId) as string,
    email: (rawData.email || rawData.Email) as string | undefined,
    role,
    name: (rawData.name || rawData.Name) as string | undefined,
    pitchId: (rawData.pitchId || rawData.PitchId) as string | undefined,
    venueId: (rawData.venueId || rawData.VenueId) as string | undefined,
    isAuthenticated: true,
  };
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<DecodedUser | null>(null);
  const [isInitializing, setIsInitializing] = useState(true);
  const{t} = useLanguage();
  const isAuthenticated: boolean = user?.isAuthenticated === true;

  const loginState = useCallback((userData: DecodedUser) => {
    setUser(userData);
  }, []);

  const logoutState = useCallback(() => {
    setUser(null);
    secureStorage.clearSensitiveData();
  }, []);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const response = await apiClient.get("/auth/me");
        const actualUserData = response.data.data
          ? response.data.data
          : response.data;
        setUser(normalizeUserData(actualUserData as Record<string, unknown>));
     } catch (error) {
        const err = error as { response?: { status?: number } };
        const statusCode = err.response?.status;
        if (statusCode === 401 || statusCode === 403) {
          toast.error(t('messages.SERVER_ERROR'));
        } 
     
        console.log("No valid session found on load.", error);
        setUser(null); 
      } finally {
        setIsInitializing(false);
      }
    };

    initializeAuth();
  }, [t]);
  const contextValue = useMemo(
    () => ({ user, isAuthenticated, isInitializing, loginState, logoutState }),
    [user, isAuthenticated, isInitializing, loginState, logoutState]
  );

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};