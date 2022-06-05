import React from "react";

import { Box, Sphere, Cone, Cylinder, Html } from "@react-three/drei";
import { useDrop, useDrag } from "react-dnd";

import Scene from "~/components/applicationComponents/Scene";

import { XIcon } from "../Icon";
import {
  EditorTreeNode,
  GroupTreeNode,
  SplitGroupTreeNode,
  TabGroupTreeNode,
  TabTreeNode,
  useEditorStore,
} from "~/state/editorState";
import Engine from "~/components/modelComponents/Engine";
import { useNavigate } from "@remix-run/react";

const componentMap = {
  box: () => (
    <Box>
      <meshStandardMaterial color="green" />
    </Box>
  ),
  sphere: () => (
    <Sphere>
      <meshStandardMaterial color="blue" />
    </Sphere>
  ),
  cone: () => (
    <Cone>
      <meshStandardMaterial color="red" />
    </Cone>
  ),
  cylinder: () => (
    <Cylinder>
      <meshStandardMaterial color="rebeccapurple" />
    </Cylinder>
  ),
  engine: () => <Engine />,
};

type DraggableTabItem = {
  id: string;
  name: string;
  fromBreadcrumbs: number[];
  isDragging: boolean;
};

type DraggableTabProps = {
  id: string;
  name: string;
  active: boolean;
  tabBreadcrumbsFromRoot: number[];
};

function DraggableTab({
  id,
  name,
  active,
  tabBreadcrumbsFromRoot,
}: DraggableTabProps) {
  // Drag item definition
  const [, dragRef] = useDrag({
    type: "tab",
    item: {
      id,
      name,
      fromBreadcrumbs: tabBreadcrumbsFromRoot,
    },
  });

  const { setTabActive, deleteTab, moveTabOntoTab } = useEditorStore();

  // Drop Zone 1
  const [, tabDropRef] = useDrop({
    accept: "tab",
    drop: (item: DraggableTabItem) => {
      console.log(
        `tab was dragged from ${item.fromBreadcrumbs} onto another tab at ${tabBreadcrumbsFromRoot}`
      );
      moveTabOntoTab(item.fromBreadcrumbs, tabBreadcrumbsFromRoot);
      setTabActive(tabBreadcrumbsFromRoot);
    },
  });

  return (
    <div ref={tabDropRef}>
      <a
        ref={dragRef}
        className={`tab tab-bordered ${active ? "tab-active" : ""}`}
        onClick={() => {
          setTabActive(tabBreadcrumbsFromRoot);
        }}
      >
        {name}
        <div
          onClick={(e) => {
            deleteTab(tabBreadcrumbsFromRoot);
            e.stopPropagation();
          }}
        >
          <XIcon />
        </div>
      </a>
    </div>
  );
}

type TabGroupProps = {
  breadcrumbsFromRoot?: number[];
  tree: TabGroupTreeNode;
};

function TabGroup({
  tree: { children = [], activeTabIndex = 0 },
  breadcrumbsFromRoot = [],
}: TabGroupProps) {
  const { moveTabOntoView } = useEditorStore();

  // determine which model is shown in the viewer
  let ActiveComponent;
  if (children[activeTabIndex] && children[activeTabIndex].component) {
    const componentType = children[activeTabIndex].component;
    if (!componentType) throw "component type invalid";
    ActiveComponent = componentMap[componentType];
  } else {
    ActiveComponent = () => (
      <Html>
        <div>Please select a new tab</div>
      </Html>
    );
  }

  // Drop Zone 2
  const [, tabGroupRef] = useDrop({
    accept: "tab",
    drop: (item: DraggableTabItem) => {
      console.log(
        `tab was dragged from ${item.fromBreadcrumbs} into blank space of group at ${breadcrumbsFromRoot}`
      );
    },
  });

  // Drop Zone 3a
  const [{ isOver: isOver3a, canDrop: canDrop3a }, dropZone3a] = useDrop({
    accept: "tab",
    drop: (item: DraggableTabItem) => {
      console.log(
        `tab was dragged from ${item.fromBreadcrumbs} into center of viewer at ${breadcrumbsFromRoot}`
      );
      moveTabOntoView(item.fromBreadcrumbs, breadcrumbsFromRoot, "center");
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });
  // Drop Zone 3b
  const [{ isOver: isOver3b, canDrop: canDrop3b }, dropZone3b] = useDrop({
    accept: "tab",
    drop: (item: DraggableTabItem) => {
      console.log(
        `tab was dragged from ${item.fromBreadcrumbs} into top of viewer at ${breadcrumbsFromRoot}`
      );
      moveTabOntoView(item.fromBreadcrumbs, breadcrumbsFromRoot, "top");
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });
  // Drop Zone 3c
  const [{ isOver: isOver3c, canDrop: canDrop3c }, dropZone3c] = useDrop({
    accept: "tab",
    drop: (item: DraggableTabItem) => {
      console.log(
        `tab was dragged from ${item.fromBreadcrumbs} into bottom of viewer at ${breadcrumbsFromRoot}`
      );
      moveTabOntoView(item.fromBreadcrumbs, breadcrumbsFromRoot, "bottom");
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });
  // Drop Zone 3d
  const [{ isOver: isOver3d, canDrop: canDrop3d }, dropZone3d] = useDrop({
    accept: "tab",
    drop: (item: DraggableTabItem) => {
      console.log(
        `tab was dragged from ${item.fromBreadcrumbs} into left of viewer at ${breadcrumbsFromRoot}`
      );
      moveTabOntoView(item.fromBreadcrumbs, breadcrumbsFromRoot, "left");
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });
  // Drop Zone 3e
  const [{ isOver: isOver3e, canDrop: canDrop3e }, dropZone3e] = useDrop({
    accept: "tab",
    drop: (item: DraggableTabItem) => {
      console.log(
        `tab was dragged from ${item.fromBreadcrumbs} into right of viewer at ${breadcrumbsFromRoot}`
      );
      moveTabOntoView(item.fromBreadcrumbs, breadcrumbsFromRoot, "right");
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  return (
    <div className="flex flex-col w-full h-full">
      <div className="flex flex-row tabs">
        {children.map((tab, i) => {
          const tabBreadcrumbsFromRoot = [...breadcrumbsFromRoot, i];

          return (
            <DraggableTab
              key={i}
              id={tab.name}
              name={tab.name}
              active={activeTabIndex == i}
              tabBreadcrumbsFromRoot={tabBreadcrumbsFromRoot}
            />
          );
        })}
        <div
          className="tab-group-empty-space grow h-full tab-drop-zone-2"
          ref={tabGroupRef}
        />
      </div>
      <div className="w-full h-full relative">
        <div
          className={`p-2 absolute top-1/4 left-1/4 w-1/2 h-1/2 ${
            canDrop3a ? "z-10" : "-z-10"
          }`}
        >
          <div
            ref={dropZone3a}
            className={`tab-drop-zone-3a-viewer-center w-full h-full ${
              isOver3a ? "bg-amber-500/50" : "bg-slate-500/50"
            }`}
          />
        </div>
        <div
          className={`p-2 absolute top-0 left-1/4 w-1/2 h-1/4 ${
            canDrop3a ? "z-10" : "-z-10"
          }`}
        >
          <div
            ref={dropZone3b}
            className={`tab-drop-zone-3b-viewer-top w-full h-full ${
              isOver3b ? "bg-amber-500/50" : "bg-slate-500/50"
            }`}
          />
        </div>
        <div
          className={`p-2 absolute bottom-0 left-1/4 w-1/2 h-1/4 ${
            canDrop3a ? "z-10" : "-z-10"
          }`}
        >
          <div
            ref={dropZone3c}
            className={`tab-drop-zone-3c-viewer-bottom w-full h-full ${
              isOver3c ? "bg-amber-500/50" : "bg-slate-500/50"
            }`}
          />
        </div>
        <div
          className={`p-2 absolute left-0 w-1/4 h-full ${
            canDrop3a ? "z-10" : "-z-10"
          }`}
        >
          <div
            ref={dropZone3d}
            className={`tab-drop-zone-3d-viewer-left w-full h-full ${
              isOver3d ? "bg-amber-500/50" : "bg-slate-500/50"
            }`}
          />
        </div>
        <div
          className={`p-2 absolute right-0 w-1/4 h-full ${
            canDrop3a ? "z-10" : "-z-10"
          }`}
        >
          <div
            ref={dropZone3e}
            className={`tab-drop-zone-3e-viewer-right w-full h-full ${
              isOver3e ? "bg-amber-500/50" : "bg-slate-500/50"
            }`}
          />
        </div>
        <Scene>
          <ActiveComponent />
        </Scene>
      </div>
    </div>
  );
}

type SplitGroupProps = {
  breadcrumbsFromRoot?: number[];
  tree: SplitGroupTreeNode;
};

function SplitGroup({
  tree: { children, type },
  breadcrumbsFromRoot = [],
}: SplitGroupProps) {
  return (
    <div
      className={`flex ${
        type == "rowGroup" ? "flex-row" : "flex-col"
      } w-full h-full`}
    >
      {children &&
        children.map((subGroupState, i) => {
          if (!("children" in subGroupState))
            throw "Child of SplitGroup must be a Group";
          const props = {
            key: i,
            tree: subGroupState,
            breadcrumbsFromRoot: [...breadcrumbsFromRoot, i],
          };
          return <Editor {...props} />;
        })}
    </div>
  );
}

type EditorProps = {
  breadcrumbsFromRoot?: number[];
  tree: GroupTreeNode;
};

export default function Editor({
  breadcrumbsFromRoot = [],
  tree,
}: EditorProps) {
  return (
    <div className="w-full h-full border border-[#243c5a]">
      {tree.type == "tabGroup" ? (
        <TabGroup tree={tree} breadcrumbsFromRoot={breadcrumbsFromRoot} />
      ) : (
        <SplitGroup tree={tree} breadcrumbsFromRoot={breadcrumbsFromRoot} />
      )}
    </div>
  );
}
