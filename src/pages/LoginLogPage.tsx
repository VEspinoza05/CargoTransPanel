import { DataTable } from "../components/DataTable";
import type { ILoginLogModel } from "@/models/LoginLog";
import { useState } from "react";
import { ColumnsLoginLog } from "@/components/ColumnsLoginLog";

export default function LoginLogPage() {
  const sampleLoginLogs: Array<ILoginLogModel> = [
    {
      loginLogId: "1",
      userId: "1",
      userName: "juan",
      userEmail: "juan@gmail.com",
      timestamp: new Date(),
    },
    {
      loginLogId: "2",
      userId: "2",
      userName: "pepe",
      userEmail: "pepe@gmail.com",
      timestamp: new Date(),
    },
    {
      loginLogId: "3",
      userId: "3",
      userName: "pablo",
      userEmail: "pablo@gmail.com",
      timestamp: new Date(),
    }
  ]


  const [loginLogs, setLoginLogs] = useState<ILoginLogModel[]>(sampleLoginLogs);
  const [loadingLoginLogs, setLoadingLoginLogs] = useState(false); //TODO: change later when fetching is implemented

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