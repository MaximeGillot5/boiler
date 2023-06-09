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

        // Utilisez le token JWT pour effectuer des actions d'authentification, telles que le stockage dans le localStorage.
        // Par exemple :
        localStorage.setItem("token", token);

        setUser({
          isLoggedIn: true,
          userData: responseData.user, // Suppose que le serveur renvoie un objet `user`
        });
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
        <input
          type="text"
          placeholder="Adresse email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Se connecter</button>
      </form>
    </div>
  );
}

export default Login;
