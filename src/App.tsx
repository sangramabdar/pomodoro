import "./App.css";

import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";

import { useContext, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import { userContext } from "./context/userContext";
import TimerPage from "./pages/TimerPage";
import HomePage from "./pages/HomePage";

const routes = [
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/timer",
    element: <TimerPage />,
  },
];

function App() {
  const { dispatch, user } = useContext(userContext);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      if (!user) {
        dispatch({
          type: "REMOVE",
        });
      } else {
        dispatch({
          type: "ADD",
          payload: user,
        });
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (!user) return;

    navigate("/timer", { replace: true });
  }, [user]);

  return (
    <Routes>
      {routes.map((route: any) => {
        return (
          <Route key={route.path} path={route.path} element={route.element} />
        );
      })}
    </Routes>
  );
}

export default App;
