import React, { useEffect } from "react";
import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData, useNavigate, useParams } from "@remix-run/react";
import Editor from "~/components/applicationComponents/Editor";
import Scene from "~/components/applicationComponents/Scene";
import CamFollowerScene from "~/components/applicationComponents/CamFollowerScene";
import Engine from "~/components/modelComponents/Engine";
import { EditorState } from "~/state";
import PistonAssembly from "~/components/modelComponents/PistonAssembly";
import {
  EditorTreeNode,
  GroupTreeNode,
  useEditorStore,
} from "~/state/editorState";

export const loader: LoaderFunction = async () => {
  const simpleEditorState2: GroupTreeNode = {
    type: "tabGroup",
    activeTabIndex: 0,
    children: [
      {
        type: "tab",
        component: "box",
      },
      {
        type: "tab",
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
            component: "box",
          },
          {
            type: "tab",
            component: "sphere",
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
                component: "cylinder",
              },
              {
                type: "tab",
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
                    component: "cone",
                  },
                  {
                    type: "tab",
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
                    component: "sphere",
                  },
                  {
                    type: "tab",
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
      {navLevel1 == "model" && <Editor tree={editorState} />}
      {navLevel1 == "code" && (
        <Scene>
          <Engine navigate={navigate} />
        </Scene>
      )}
      {navLevel1 == "analysis" && <CamFollowerScene />}
      {navLevel1 == "settings" && (
        <Scene>
          <PistonAssembly />
        </Scene>
      )}
    </div>
  );
}
