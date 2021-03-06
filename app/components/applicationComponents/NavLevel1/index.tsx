import React from "react";
import { Link } from "@remix-run/react";
import {
  ModelIcon,
  CodeIcon,
  AnalysisIcon,
  SettingsIcon,
} from "~/components/applicationComponents/Icon";

type NavLevel1Option = {
  route: string;
  name: string;
  Icon: React.FC;
};

const navLevel1Options: NavLevel1Option[] = [
  {
    route: "/model",
    name: "Model",
    Icon: ModelIcon,
  },
  {
    route: "/code",
    name: "Code",
    Icon: CodeIcon,
  },
  {
    route: "/analysis",
    name: "Analysis",
    Icon: AnalysisIcon,
  },
  {
    route: "/settings",
    name: "Settings",
    Icon: SettingsIcon,
  },
];

interface NavLevel1Props {
  currentRoute?: string;
}

export default function NavLevel1({ currentRoute }: NavLevel1Props) {
  return (
    <>
      <ul className="menu bg-base-100 p-2 gap-2">
        {navLevel1Options.map(({ route, Icon }) => {
          const routeIsActive = route == `/${currentRoute}`;
          return (
            <li key={route}>
              <Link
                className={`justify-center ${routeIsActive ? "active" : ""}`}
                to={routeIsActive ? "/" : route}
                // to={route}
              >
                <Icon />
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
}
