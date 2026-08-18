import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  async function signup(name, email, password) {
    // Check if the email already exists
    const response = await fetch(
      `http://localhost:3000/users?email=${email}`
    );

    const users = await response.json();

    if (users.length > 0) {
      throw new Error("Email already exists");
    }

    // Create a new user
    const createResponse = await fetch(
      "http://localhost:3000/users",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
          role: "user",
        }),
      }
    );

    const newUser = await createResponse.json();

    setUser(newUser);

    return newUser;
  }

  async function login(email, password) {
    const response = await fetch(
      `http://localhost:3000/users?email=${email}&password=${password}`
    );

    const users = await response.json();

    if (users.length === 0) {
      throw new Error("Invalid email or password");
    }

    setUser(users[0]);

    return users[0];
  }

  function logout() {
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        signup,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  return useContext(AuthContext);
}

export { AuthProvider, useAuth };