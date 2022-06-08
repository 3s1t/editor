import React from "react";
import { Link } from "@remix-run/react";
import {
  CodeIcon,
  AnalysisIcon,
  SettingsIcon,
  ExplorerIcon,
} from "~/components/applicationComponents/Icon";

type NavLevel1Option = {
  route: string;
  name: string;
  Icon: React.FC;
};

const routeConfigMap: { [route: string]: NavLevel1Option } = {
  "./explorer": {
    route: "./explorer",
    name: "Explorer",
    Icon: ExplorerIcon,
  },
  "./search": {
    route: "./search",
    name: "Search",
    Icon: CodeIcon,
  },
  "./source-control": {
    route: "./source-control",
    name: "Source Control",
    Icon: AnalysisIcon,
  },
  "./extensions": {
    route: "./extensions",
    name: "Extensions",
    Icon: SettingsIcon,
  },
};

interface NavLevel1Props {
  currentRoute?: string;
  routes: string[];
}

export default function NavLevel1({ currentRoute, routes }: NavLevel1Props) {
  return (
    <>
      <ul className="menu bg-base-100 p-2 gap-2">
        {routes.map((route) => {
          const { Icon } = routeConfigMap[route];
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
