import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { account } from "../appWriteConfig";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { ID, Models } from "appwrite";
import Spinner from "../ui/Spinner";

type UserType = Models.User<Models.Preferences>;

type UserContextType = {
  user: UserType | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  loading: boolean;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

// eslint-disable-next-line react-refresh/only-export-components
export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}

type UserProviderProps = {
  children: ReactNode;
};

export function UserProvider({ children }: UserProviderProps) {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [user, setUser] = useState<UserType | null>(null);
  useEffect(() => {
    getUser();
  }, []);

  async function getUser() {
    try {
      const accountDetails = await account.get();
      setUser(accountDetails);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function login(email: string, password: string) {
    try {
      setLoading(true);
      await account.createEmailSession(email, password);
      const accountDetails = await account.get();
      setUser(accountDetails);
      navigate("/");
      toast.success("User Login Successfully");
      setLoading(false);
    } catch {
      toast.error("Error while login");
    } finally {
      setLoading(false);
    }
  }

  async function logout() {
    try {
      setLoading(true);
      await account.deleteSession("current");
      navigate("/login");
      setLoading(false);
    } catch (error) {
      toast.error("Error while logging out");
    } finally {
      setLoading(false);
    }
  }

  async function register(email: string, password: string, name: string) {
    try {
      await account.create(ID.unique(), email, password, name);
      await account.createEmailSession(email, password);
      const accountDetails = await account.get();
      setUser(accountDetails);
      toast.success("User Registered Successfully");

      navigate("/");
    } catch {
      toast.error("Error while registering");
    } finally {
      setLoading(false);
    }
  }

  const contextValue: UserContextType = {
    user,
    login,
    logout,
    register,
    loading,
  };

  return (
    <UserContext.Provider value={contextValue}>
      {loading ? <Spinner /> : children}
    </UserContext.Provider>
  );
}
