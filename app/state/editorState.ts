import create from "zustand";
import produce from "immer";
import { defaultInitialEditorState } from "./defaultState";
import { getItemAtBreadcrumbs } from "./helpers";

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

// attempt refactor to simplify data model

export type EditorTreeNode = {
  type: "rowGroup" | "colGroup" | "tabGroup" | "tab";
  id: string;
  activeTabIndex?: number; // only for tabGroups
  children?: EditorTreeNode[]; // only for groups
  component?: "box" | "sphere" | "cone" | "cylinder";
};

export type EditorStore2 = {
  editorState: EditorTreeNode;
  setEditorState: (state: EditorTreeNode) => void;
  setTabActive: (breadcrumbs: number[]) => void;
  deleteTab: (breadcrumbs: number[]) => void;
  moveTabOntoTab: (breadcrumbsFrom: number[], breadcrumbsTo: number[]) => void;
  moveTabOntoView: (
    breadcrumbsFrom: number[],
    breadcrumbsTo: number[],
    direction: "top" | "bottom" | "left" | "right" | "center"
  ) => void;
};

export const useEditorStore2 = create<EditorStore2>()((set) => ({
  editorState: { type: "tabGroup", id: "001" },

  setEditorState: (newState: EditorTreeNode) =>
    set((baseStore) =>
      produce(baseStore, (draftStore) => {
        draftStore.editorState = newState;
      })
    ),

  setTabActive: (breadcrumbs) =>
    set((baseStore) =>
      produce(baseStore, (draftStore) => {
        const parentBreadcrumbs: number[] = breadcrumbs.slice(0, -1);
        const tabBreadcrumb: number = breadcrumbs[breadcrumbs.length - 1];
        // get parent node
        const parent = getItemAtBreadcrumbs2(
          draftStore.editorState,
          parentBreadcrumbs
        );

        // make sure parent is a tabGroup
        if (parent.type != "tabGroup") throw "Parent must be a tab group";

        // change activeTabIndex to tab index
        parent.activeTabIndex = tabBreadcrumb;
      })
    ),

  deleteTab: (breadcrumbs) =>
    set((baseStore) => produce(baseStore, (draftStore) => {})),

  moveTabOntoTab: (breadcrumbsFrom, breadcrumbsTo) =>
    set((baseStore) => produce(baseStore, (draftStore) => {})),

  moveTabOntoView: (breadcrumbsFrom, breadcrumbsTo, viewDropArea) =>
    set((baseStore) => produce(baseStore, (draftStore) => {})),
}));

function getItemAtBreadcrumbs2(
  tree: EditorTreeNode,
  breadcrumbs: number[]
): EditorTreeNode {
  let pointer: EditorTreeNode = tree;
  breadcrumbs.forEach((breadcrumb) => {
    if (pointer.children) pointer = pointer.children[breadcrumb];
  });
  if (!pointer) throw "invalid breadcrumbs/tree combination";
  return pointer;
}

export function validateTree(tree: EditorTreeNode): boolean {
  if (tree.type == "tab") {
    if (tree.children != undefined) throw "a tab can't have children";
    // add additional checks for tab here
    return true;
  } else {
    if (!Array.isArray(tree.children)) throw "a group must have children";

    if (tree.type == "tabGroup") {
      if (tree.children.length < 1)
        throw "a tab group must have at least 1 child";
      // add additional checks for tabGroup here
    } else {
      if (tree.children.length < 2)
        throw "a split group (rowGroup or colGroup) must have at least 1 child";
      for (const child of tree.children) {
        if (tree.type == child.type)
          throw "a split group (rowGroup or colGroup) can't have the same split group as its child";
      }
      // add additional checks for splitGroup here
    }
    // recursive call to validateTree for each child
    return tree.children.every((child) => validateTree(child));
  }
}
