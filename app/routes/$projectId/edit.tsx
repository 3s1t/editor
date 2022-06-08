import { Outlet } from "@remix-run/react";
import NavLevel1 from "~/components/applicationComponents/NavLevel1";

const editRoutes: string[] = [
  "./explorer",
  "./search",
  "./source-control",
  "./extensions",
];

export default function () {
  return (
    <div className="flex h-screen w-screen">
      <NavLevel1 routes={editRoutes} />

      <Outlet />
    </div>
  );
}
