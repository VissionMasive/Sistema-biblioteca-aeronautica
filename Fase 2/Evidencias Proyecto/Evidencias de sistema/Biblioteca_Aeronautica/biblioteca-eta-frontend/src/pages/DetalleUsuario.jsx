import { useAuth } from "../hooks/useAuth";
import { useAuthContext } from "../context/authContext";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function DetalleUsuario() {
  const { token } = useAuthContext();
  const { user, fetchUserById, loading, error } = useAuth();
  const { id } = useParams();
  const nav = useNavigate();

  useEffect(() => {
    if (token && id) fetchUserById(token, id);
  }, [fetchUserById, token, id]);

  console.log(user)

  return <div>DetalleUsuario</div>;
}
