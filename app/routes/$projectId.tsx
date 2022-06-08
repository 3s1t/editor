import { LoaderFunction } from "@remix-run/node";
import { useParams, Outlet } from "@remix-run/react";

import NavLevel1 from "~/components/applicationComponents/NavLevel1";

// export const loader: LoaderFunction = async () => {
//   const { projectId } = useParams();
// };

export default function () {
  return (
    <div className="flex h-screen w-screen">
      <Outlet />
    </div>
  );
}
