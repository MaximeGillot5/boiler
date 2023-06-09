import React, { useState } from "react";
import { useAtom } from "jotai";
import { userAtom } from "../atom";

function Login() {
  const [, setUser] = useAtom(userAtom);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();
    setError("");

    try {
      const response = await fetch("http://localhost:4000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: {
            email: email,
            password: password,
          },
        }),
      });

      if (response.ok) {
        const responseData = await response.json();
        const token = response.headers.get("Authorization");
        const email = responseData.data.email;

        localStorage.setItem("token", token);
        localStorage.setItem("email", email);

        setUser((prevUser) => ({
          ...prevUser,
          isLoggedIn: true,
          email: email,
        }));
      } else {
        setError("Identifiants invalides");
      }
    } catch (error) {
      setError("Une erreur s'est produite");
    }
  };

  return (
    <div>
      <form onSubmit={handleLogin}>
        <h2>Se connecter</h2>
        {error && <p>{error}</p>}
        <div>
          <label htmlFor="email">Email :</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Mot de passe :</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Se connecter</button>
      </form>
    </div>
  );
}

export default Login;
