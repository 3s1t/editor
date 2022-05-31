import create from "zustand";
import produce from "immer";
import { defaultInitialEditorState } from "./defaultState";
import { getItemAtBreadcrumbs } from "./helpers";

/**
 * Engine
 */
export interface EngineState {
  elapsedTime: number;
  setElapsedTime: (to: number) => void;

  crankshaftAngle: number;
  setCrankshaftAngle: (to: number) => void;
}

export const useEngineStore = create<EngineState>()((set) => ({
  elapsedTime: 0,
  setElapsedTime: (to) => set(() => ({ elapsedTime: to })),

  crankshaftAngle: 0,
  setCrankshaftAngle: (to) => set(() => ({ crankshaftAngle: to })),
}));

/**
 * Editor
 */
export type TabState = {
  name: string;
  id: string;
  component: "box" | "sphere" | "cone" | "cylinder";
};

export type SplitGroupState = {
  direction: "row" | "col";
  subGroups: EditorState[];
};

export type TabGroupState = {
  activeTabIndex?: number;
  tabs?: TabState[];
};

export type EditorState = TabGroupState | SplitGroupState;

export type ViewDropArea = "top" | "bottom" | "left" | "right" | "center";

export type EditorStore = {
  editorState: EditorState;
  setEditorState: (state: EditorState) => void;
  setTabActive: (breadcrumbs: number[]) => void;
  deleteTab: (breadcrumbs: number[]) => void;
  moveTabOntoAnotherTab: (
    breadcrumbsFrom: number[],
    breadcrumbsTo: number[]
  ) => void;
  moveTabOntoView: (
    breadcrumbsFrom: number[],
    breadcrumbsTo: number[],
    direction: ViewDropArea
  ) => void;
};

export const useEditorStore = create<EditorStore>()((set) => ({
  editorState: defaultInitialEditorState,

  setEditorState: (newState: any) =>
    set((baseState) =>
      produce(baseState, (draftState) => {
        draftState.editorState = newState;
      })
    ),

  setTabActive: (breadcrumbs) =>
    set((baseState) =>
      produce(baseState, (draftState) => {
        const tabGroupBreadcrumbs: number[] = breadcrumbs.slice(0, -1);
        const tabBreadcrumb: number = breadcrumbs[breadcrumbs.length - 1];

        const tabGroup = getItemAtBreadcrumbs(
          draftState.editorState,
          tabGroupBreadcrumbs
        );

        if ("activeTabIndex" in tabGroup) {
          tabGroup.activeTabIndex = tabBreadcrumb;
        } else {
          throw "Invalid state/breadcrumb combination";
        }
      })
    ),

  deleteTab: (breadcrumbs) =>
    set((baseState) =>
      produce(baseState, (draftState) => {
        const tabGroupBreadcrumbs: number[] = breadcrumbs.slice(0, -1);
        const tabBreadcrumb: number = breadcrumbs[breadcrumbs.length - 1];

        const tabGroup = getItemAtBreadcrumbs(
          draftState.editorState,
          tabGroupBreadcrumbs
        );

        if (
          "activeTabIndex" in tabGroup &&
          tabGroup.tabs !== undefined &&
          tabGroup.activeTabIndex != undefined
        ) {
          const tabToLeftOfActiveTab = tabBreadcrumb < tabGroup.activeTabIndex;
          const tabIsActive = tabBreadcrumb == tabGroup.activeTabIndex;
          const tabIsLast = tabBreadcrumb == tabGroup.tabs.length - 1;
          const tabActiveAndLast = tabIsActive && tabIsLast;

          tabGroup.tabs.splice(tabBreadcrumb, 1);

          if (tabToLeftOfActiveTab || tabActiveAndLast) {
            tabGroup.activeTabIndex--;
          }
        } else {
          throw "Invalid state/breadcrumb combination";
        }
      })
    ),

  moveTabOntoAnotherTab: (breadcrumbsFrom, breadcrumbsTo) =>
    set((baseState) =>
      produce(baseState, (draftState) => {
        const originTabGroupBreadcrumbs: number[] = breadcrumbsFrom.slice(
          0,
          -1
        );
        const originTabBreadcrumb: number =
          breadcrumbsFrom[breadcrumbsFrom.length - 1];
        const destinationTabGroupBreadcrumbs: number[] = breadcrumbsTo.slice(
          0,
          -1
        );
        const destinationTabBreadcrumb: number =
          breadcrumbsTo[breadcrumbsTo.length - 1];

        const originTabGroup = getItemAtBreadcrumbs(
          draftState.editorState,
          originTabGroupBreadcrumbs
        );
        const destinationTabGroup = getItemAtBreadcrumbs(
          draftState.editorState,
          destinationTabGroupBreadcrumbs
        );
        const tab = getItemAtBreadcrumbs(
          draftState.editorState,
          breadcrumbsFrom
        );

        if (
          "tabs" in originTabGroup &&
          "tabs" in destinationTabGroup &&
          "id" in tab &&
          originTabGroup.tabs !== undefined &&
          destinationTabGroup.tabs !== undefined
        ) {
          // delete tab from origin group
          originTabGroup.tabs.splice(originTabBreadcrumb, 1);

          // add tab to destination group
          destinationTabGroup.tabs.splice(destinationTabBreadcrumb, 0, tab);
        } else {
          throw "Invalid state/breadcrumb combination";
        }
      })
    ),

  moveTabOntoView: (breadcrumbsFrom, breadcrumbsTo, viewDropArea) =>
    set((baseState) =>
      produce(baseState, (draftState) => {
        console.log(1);
        const originTabGroupBreadcrumbs: number[] = breadcrumbsFrom.slice(
          0,
          -1
        );
        const originTabBreadcrumb: number =
          breadcrumbsFrom[breadcrumbsFrom.length - 1];
        const destinationTabGroupBreadcrumbs: number[] = breadcrumbsTo.slice(
          0,
          -1
        );
        const originTabGroupParentBreadcrumbs: number[] = breadcrumbsFrom.slice(
          0,
          -2
        );
        const destinationTabGroupParentBreadcrumbs: number[] =
          breadcrumbsTo.slice(0, -2);
        const destinationTabBreadcrumb: number =
          breadcrumbsTo[breadcrumbsTo.length - 1];

        // groups
        const originTabGroup = getItemAtBreadcrumbs(
          draftState.editorState,
          originTabGroupBreadcrumbs
        );
        const originTabParentGroup: any = getItemAtBreadcrumbs(
          draftState.editorState,
          originTabGroupParentBreadcrumbs
        );
        const destinationTabGroup = getItemAtBreadcrumbs(
          draftState.editorState,
          destinationTabGroupBreadcrumbs
        );
        const destinationTabParentGroup: any = getItemAtBreadcrumbs(
          draftState.editorState,
          destinationTabGroupParentBreadcrumbs
        );

        // tab
        const tab = getItemAtBreadcrumbs(
          draftState.editorState,
          breadcrumbsFrom
        );

        console.log(JSON.parse(JSON.stringify(originTabGroup)));
        console.log(JSON.parse(JSON.stringify(destinationTabGroup)));

        if (originTabGroup == destinationTabGroup) {
          if (viewDropArea == "center") {
            return;
          } else {
            // grab a ref to the tabs
            const tabsRef = destinationTabParentGroup.tabs;
            const activeTabIndexRef = destinationTabParentGroup.activeTabIndex;

            // delete the tab from the origin group
            tabsRef.splice(originTabBreadcrumb, 1);

            // delete the keys that are used for a tab group
            delete destinationTabParentGroup.tabs;
            delete destinationTabParentGroup.activeTabIndex;

            console.log("1");
            // convert parent to a split group
            if (viewDropArea == "top") {
              // first check if originTabParentGroup is already a col
              console.log("top");
              if (originTabParentGroup.direction == "col") {
                // adds a sibling to the group with the new group above the current
                console.log("foo");
              } else {
                // create a new split group
                destinationTabParentGroup.direction = "col";
                destinationTabParentGroup.subGroups = [
                  {
                    activeTabIndex: 0,
                    tabs: [tab],
                  },
                  {
                    activeTabIndex: activeTabIndexRef,
                    tabs: tabsRef,
                  },
                ];
              }
            } else if (viewDropArea == "bottom") {
              destinationTabParentGroup.direction = "col";
              destinationTabParentGroup.subGroups = [
                {
                  activeTabIndex: activeTabIndexRef,
                  tabs: tabsRef,
                },
                {
                  activeTabIndex: 0,
                  tabs: [tab],
                },
              ];
            } else if (viewDropArea == "left") {
              destinationTabParentGroup.direction = "row";
              destinationTabParentGroup.subGroups = [
                {
                  activeTabIndex: 0,
                  tabs: [tab],
                },
                {
                  activeTabIndex: activeTabIndexRef,
                  tabs: tabsRef,
                },
              ];
            } else if (viewDropArea == "right") {
              destinationTabParentGroup.direction = "row";
              destinationTabParentGroup.subGroups = [
                {
                  activeTabIndex: activeTabIndexRef,
                  tabs: tabsRef,
                },
                {
                  activeTabIndex: 0,
                  tabs: [tab],
                },
              ];
            }
          }
        }
      })
    ),
}));
