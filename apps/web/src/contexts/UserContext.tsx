import { User } from "@supabase/supabase-js";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

const mockUser: User = {
  id: "mock-user-id",
  app_metadata: {},
  user_metadata: {},
  aud: "authenticated",
  created_at: new Date().toISOString(),
};

type UserContentType = {
  getUser: () => Promise<User | undefined>;
  user: User | undefined;
  loading: boolean;
};

const UserContext = createContext<UserContentType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user || typeof window === "undefined") return;

    getUser();
  }, []);

  async function getUser() {
    if (user) {
      setLoading(false);
      return user;
    }

    console.log("Auth route disabled: Using mock user");
    setUser(mockUser);
    setLoading(false);
    return mockUser;
  }

  const contextValue: UserContentType = {
    getUser,
    user,
    loading,
  };

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
}

export function useUserContext() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
}
