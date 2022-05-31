import { useParams, Outlet } from "@remix-run/react";

import NavLevel1 from "~/components/applicationComponents/NavLevel1";

export default function () {
  const { navLevel1 } = useParams();

  return (
    <div className="flex h-screen w-screen">
      <NavLevel1 currentRoute={navLevel1} />
      <Outlet />
    </div>
  );
}
