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
const AuthContext = createContext<AuthContextType | undefined>(undefined);

const normalizeUserData = (rawData: Record<string, unknown>): DecodedUser => {
  return {
    userId: (rawData.userId || rawData.UserId) as string,
    email: (rawData.email || rawData.Email) as string | undefined,
    role: (rawData.role || rawData.Role) as string,
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
  }, []);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const response = await apiClient.get("/auth/me");
        const actualUserData = response.data.data
          ? response.data.data
          : response.data;
        setUser(normalizeUserData(actualUserData as Record<string, unknown>));
     } catch (error: any) {
        const statusCode = error.response?.status;
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
  }, []);
  const contextValue = useMemo(
    () => ({ user, isAuthenticated, loginState, logoutState }),
    [user, isAuthenticated, loginState, logoutState]
  );

  if (isInitializing) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-[#DCD7C9]/10">
        <span className="w-10 h-10 border-4 border-[#A27B5C] border-t-transparent rounded-full animate-spin"></span>
      </div>
    );
  }

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