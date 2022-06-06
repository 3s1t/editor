import { Outlet } from "@remix-run/react";
import NavLevel1 from "~/components/applicationComponents/NavLevel1";

const viewRoutes: string[] = ["./explorer", "./search", "./extensions"];

export default function () {
  return (
    <div className="flex h-screen w-screen">
      <NavLevel1 routes={viewRoutes} />

      <Outlet />
    </div>
  );
}
