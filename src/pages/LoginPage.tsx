import { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "@/contexts/AuthContext";
import cargotransLogo from "../assets/cargotransLogo.jpg"

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const auth = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await auth.login(email, password);
      navigate("/");
    } catch (error: any) {
      alert(error.message);
      console.log(error)
    }
  };


  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <img src={cargotransLogo} />
      <h2 className="text-xl font-bold">Iniciar Sesión</h2>
      <input
        type="email"
        placeholder="Correo"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full border p-2 rounded"
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full border p-2 rounded"
      />
      <button type="submit" className="w-full bg-blue-700 text-white p-2 rounded">
        Entrar
      </button>
    </form>
  );
}