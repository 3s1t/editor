import { Outlet } from "@remix-run/react";
import NavLevel1 from "~/components/applicationComponents/NavLevel1";

export default function () {
  return (
    <div className="flex h-screen">
      <NavLevel1 />

      <Outlet />
    </div>
  );
}
