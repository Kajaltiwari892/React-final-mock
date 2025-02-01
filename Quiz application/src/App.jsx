import React from "react";
import Home from "./components/Home";
import Result from "./components/Result";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { Navigate } from "react-router-dom";
import { Route } from "react-router-dom";
import { Routes } from "react-router-dom";
import Quiz from "./components/Quiz";

const App = () => {
  return (
    <AuthProvider>
     
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/quiz"
            element={
              <PrivateRoute>
                <Quiz />
              </PrivateRoute>
            }
          />
           <Route
            path="/result"
            element={
              <PrivateRoute>
                <Result />
              </PrivateRoute>
            }
          />
        </Routes>
    </AuthProvider>
  );
};
const PrivateRoute=({children}) =>{
  const {user} = useAuth();
  return user ?children : <Navigate to="/" replace />
}
export default App;
