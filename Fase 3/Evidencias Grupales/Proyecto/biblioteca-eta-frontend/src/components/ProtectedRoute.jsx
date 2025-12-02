import React from "react";
import { Navigate,Outlet } from "react-router-dom";
import { useAuthContext } from "../context/authContext";

export default function ProtectedRoute({ redirectTo = "/cuenta", requiredRoles = null }) {
  const { isAuthenticated, hasRole } = useAuthContext()

  if (!isAuthenticated) {
    return <Navigate to={redirectTo} replace />
  }

  if (requiredRoles) {
    const ok = Array.isArray(requiredRoles)
      ? requiredRoles.some((r) => hasRole(r))
      : hasRole(requiredRoles)

    console.log(ok)

    if (!ok) {
      return <Navigate to="/no-autorizado" replace />
    }
  }

  return <Outlet />
}