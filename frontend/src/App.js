import React, { useEffect } from 'react';
import { useAtom } from 'jotai';
import { userAtom } from './atom';
import Register from './page/register';
import Login from './page/login';
import PostList from './components/PostList';
import CreatePost from './components/CreatePostButton';
import Logout from './components/logout';

function App() {
  const [user, setUser] = useAtom(userAtom);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedEmail = localStorage.getItem("email");



    if (token && storedEmail) {
      setUser({
        isLoggedIn: true,
        email: storedEmail,
      });
    }

    if (!token && !storedEmail && user.isLoggedIn) {
      // L'utilisateur est déconnecté, effacer les données du stockage local
      localStorage.removeItem('email');
    }
  }, [setUser, user.isLoggedIn]);

  return (
    <div>
      <h1>Mon application</h1>
      {user.isLoggedIn ? (
        <div>
          <p>Bienvenue, Utilisateur n°{user.email} !</p>
          <PostList />
          <CreatePost />
          <Logout />
        </div>
      ) : (
        <div>
          <Register />
          <Login />
        </div>
      )}
    </div>
  );
}

export default App;
