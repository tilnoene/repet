type AuthContextType = {
  token: string;
  userId: string;
  // email: string;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: () => boolean;
};
