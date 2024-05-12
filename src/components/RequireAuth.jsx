import React from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const RequireAuth = ({ allowedRoles }) => {
  const { auth } = useAuth();
  const location = useLocation();
  return (
    <>
     {auth?.roles?.find((role) => allowedRoles.includes(role)) ? console.log("true"): console.log("HAHAHAHA")}
     {console.log("Auth.roles: "+ console.log(auth.roles))}
     {console.log("Allowed Roles: "+console.log(allowedRoles))}
     {console.log(auth.roles === allowedRoles)}
      {auth?.roles?.find((role) => allowedRoles.includes(role)) ? (
        <Outlet />
      ) : auth.user ? (
        <Navigate to="/unauthorized" state={{ from: location }} replace />
      ) : (
        <Navigate to="/login" state={{ from: location }} replace />
      )}
    </>
  );
};

export default RequireAuth;
