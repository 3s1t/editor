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
  const complexEditorState: EditorState = {
    direction: "row",
    subGroups: [
      {
        activeTabIndex: 1,
        tabs: [
          { name: "Tab A", id: "abc123", component: "box" },
          { name: "Tab B", id: "xyz789", component: "sphere" },
          { name: "Tab C", id: "xyz789", component: "cone" },
        ],
      },
      {
        direction: "col",
        subGroups: [
          {
            activeTabIndex: 1,
            tabs: [
              { name: "Tab D", id: "abc123", component: "cylinder" },
              { name: "Tab E", id: "xyz789", component: "cone" },
            ],
          },
          {
            direction: "row",
            subGroups: [
              {
                activeTabIndex: 0,
                tabs: [
                  { name: "Tab F", id: "abc123", component: "sphere" },
                  { name: "Tab G", id: "xyz789", component: "cone" },
                ],
              },
              {
                activeTabIndex: 1,
                tabs: [
                  { name: "Tab H", id: "abc123", component: "cone" },
                  { name: "Tab I", id: "xyz789", component: "cylinder" },
                ],
              },
            ],
          },
        ],
      },
    ],
  };

  const simpleEditorState: EditorState = {
    activeTabIndex: 0,
    tabs: [
      { name: "Tab A", id: "abc123", component: "box" },
      { name: "Tab B", id: "xyz123", component: "sphere" },
    ],
  };

  const simpleEditorState2: GroupTreeNode = {
    type: "tabGroup",
    id: "001",
    activeTabIndex: 0,
    children: [
      {
        type: "tab",
        id: "002",
        component: "box",
      },
      {
        type: "tab",
        id: "003",
        component: "sphere",
      },
    ],
  };

  const complexEditorState2: GroupTreeNode = {
    type: "rowGroup",
    id: "001",
    children: [
      {
        type: "tabGroup",
        id: "002",
        activeTabIndex: 0,
        children: [
          {
            type: "tab",
            id: "003",
            component: "box",
          },
          {
            type: "tab",
            id: "004",
            component: "sphere",
          },
        ],
      },
      {
        type: "colGroup",
        id: "005",
        children: [
          {
            type: "tabGroup",
            id: "006",
            activeTabIndex: 1,
            children: [
              {
                type: "tab",
                id: "007",
                component: "cylinder",
              },
              {
                type: "tab",
                id: "008",
                component: "sphere",
              },
            ],
          },
          {
            type: "rowGroup",
            id: "009",
            children: [
              {
                type: "tabGroup",
                id: "010",
                activeTabIndex: 0,
                children: [
                  {
                    type: "tab",
                    id: "011",
                    component: "cone",
                  },
                  {
                    type: "tab",
                    id: "012",
                    component: "sphere",
                  },
                ],
              },
              {
                type: "tabGroup",
                id: "013",
                activeTabIndex: 0,
                children: [
                  {
                    type: "tab",
                    id: "014",
                    component: "sphere",
                  },
                  {
                    type: "tab",
                    id: "015",
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
