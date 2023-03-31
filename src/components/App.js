import Home from "./Home";
import Login from "./Login";
import { Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from '../context/AuthContext'


function App() {

  const { currentUser } = useContext(AuthContext)

  const AccessRoute = ({ children }) => {
    if (currentUser) {
      return <Navigate to="/home" />
    }
    return children;
  };

  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/" />
    }
    return children;
  };

  return (
    <Routes>
      <Route path="/" element={
        <AccessRoute>
          <Login />
        </AccessRoute>
      } />
      <Route path="/home" element={
        <ProtectedRoute>
          <Home />
        </ProtectedRoute>
      } />
    </Routes>

  );
}

export default App;
