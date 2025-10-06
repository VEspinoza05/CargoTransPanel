import { DataTable } from "../components/DataTable";
import type { ILoginLogModel } from "@/models/LoginLog";
import { useEffect, useState } from "react";
import { ColumnsLoginLog } from "@/components/ColumnsLoginLog";
import { getLoginLogs } from "@/services/LoginLogService";

export default function LoginLogPage() {
  const [loginLogs, setLoginLogs] = useState<ILoginLogModel[]>([]);
  const [loadingLoginLogs, setLoadingLoginLogs] = useState(true);

  useEffect(() => {
    const fetchLoginLogs = async () => {
      try {
        const data = await getLoginLogs();
        setLoginLogs(data);
      } catch (error) {
        console.error("Error al cargar los datos de login:", error);
      } finally {
        setLoadingLoginLogs(false);
      }
    }

    fetchLoginLogs()
  }, [])


  return(
    <>
      <h1>Envios</h1>
      {loadingLoginLogs ? 
        <p>Cargando datos...</p> :
        <div className="container py-10">
          <DataTable columns={ColumnsLoginLog} data={loginLogs} />
        </div>
      }
    </>
  )
}