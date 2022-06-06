import React, { useEffect } from "react";
import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData, useNavigate, useParams } from "@remix-run/react";
import Editor from "~/components/applicationComponents/Editor";
import Scene from "~/components/applicationComponents/Scene";
import CamFollowerScene from "~/components/applicationComponents/CamFollowerScene";
import Engine from "~/components/modelComponents/Engine";
import PistonAssembly from "~/components/modelComponents/PistonAssembly";
import { GroupTreeNode, useEditorStore } from "~/state/editorState";

export const loader: LoaderFunction = async () => {
  const simpleEditorState2: GroupTreeNode = {
    type: "tabGroup",
    activeTabIndex: 0,
    children: [
      {
        type: "tab",
        name: "a",
        component: "box",
      },
      {
        type: "tab",
        name: "b",
        component: "sphere",
      },
    ],
  };

  const complexEditorState2: GroupTreeNode = {
    type: "rowGroup",
    children: [
      {
        type: "tabGroup",
        activeTabIndex: 0,
        children: [
          {
            type: "tab",
            name: "c",
            component: "engine",
          },
          {
            type: "tab",
            name: "d",
            component: "box",
          },
        ],
      },
      {
        type: "colGroup",
        children: [
          {
            type: "tabGroup",
            activeTabIndex: 1,
            children: [
              {
                type: "tab",
                name: "e",
                component: "cylinder",
              },
              {
                type: "tab",
                name: "f",
                component: "sphere",
              },
            ],
          },
          {
            type: "rowGroup",
            children: [
              {
                type: "tabGroup",
                activeTabIndex: 0,
                children: [
                  {
                    type: "tab",
                    name: "g",
                    component: "cone",
                  },
                  {
                    type: "tab",
                    name: "h",
                    component: "sphere",
                  },
                ],
              },
              {
                type: "tabGroup",
                activeTabIndex: 0,
                children: [
                  {
                    type: "tab",
                    name: "i",
                    component: "sphere",
                  },
                  {
                    type: "tab",
                    name: "j",
                    component: "sphere",
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  };

  return json(complexEditorState2);
};

export default function () {
  const { navLevel1 } = useParams();
  const backendEditorState = useLoaderData<GroupTreeNode>();
  const { editorState, setEditorState } = useEditorStore();
  useEffect(() => {
    setEditorState(backendEditorState); // TODO: look into how to pass in state to initialization (prev line) instead of setting it here
  }, []);

  const navigate = useNavigate();

  return (
    <div className="w-full h-full">
      <Editor tree={editorState} />
      {/* {navLevel1 == "model" && } */}
      {/* {navLevel1 == "code" && (
        <Scene>
          <Engine navigate={navigate} />
        </Scene>
      )} */}
      {navLevel1 == "analysis" && <CamFollowerScene />}
      {navLevel1 == "settings" && (
        <Scene>
          <PistonAssembly />
        </Scene>
      )}
    </div>
  );
}
