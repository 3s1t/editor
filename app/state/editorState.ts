import create from "zustand";
import produce from "immer";
import { defaultInitialEditorState } from "./defaultState";

export type ViewDropArea = "top" | "bottom" | "left" | "right" | "center";

export type TreeNode = {
  type: "rowGroup" | "colGroup" | "tabGroup" | "tab";
};

export interface TabTreeNode extends TreeNode {
  type: "tab";
  component: "box" | "sphere" | "cone" | "cylinder" | "engine";
  name: string;
}

export interface TabGroupTreeNode extends TreeNode {
  type: "tabGroup";
  activeTabIndex: number;
  children: TabTreeNode[];
}

export interface SplitGroupTreeNode extends TreeNode {
  type: "rowGroup" | "colGroup";
  children: (TabGroupTreeNode | SplitGroupTreeNode)[];
}

export type GroupTreeNode = TabGroupTreeNode | SplitGroupTreeNode;

export type EditorTreeNode = TabTreeNode | GroupTreeNode;

export type EditorStore = {
  editorState: GroupTreeNode;
  setEditorState: (state: GroupTreeNode) => void;
  setTabActive: (breadcrumbs: number[]) => void;
  deleteTab: (breadcrumbs: number[]) => void;
  moveTabOntoTab: (breadcrumbsFrom: number[], breadcrumbsTo: number[]) => void;
  moveTabOntoView: (
    breadcrumbsFrom: number[],
    breadcrumbsTo: number[],
    direction: "top" | "bottom" | "left" | "right" | "center"
  ) => void;
};

export const useEditorStore = create<EditorStore>()((set) => ({
  editorState: defaultInitialEditorState,

  setEditorState: (newState: GroupTreeNode) =>
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
        const parent = getItemAtBreadcrumbs(
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
    set((baseStore) =>
      produce(baseStore, (draftStore) => {
        const parentBreadcrumbs: number[] = breadcrumbs.slice(0, -1);
        const tabBreadcrumb: number = breadcrumbs[breadcrumbs.length - 1];

        // get parent node
        const parent = getItemAtBreadcrumbs(
          draftStore.editorState,
          parentBreadcrumbs
        );

        // make sure parent is a tabGroup
        if (parent.type != "tabGroup") throw "Parent must be a tab group";

        // update activeTabIndex
        if (parent.activeTabIndex == tabBreadcrumb) {
          // tab to be deleted is active
          if (tabBreadcrumb == parent.children.length - 1)
            parent.activeTabIndex--;
        } else {
          // tab to be deleted is not active
          if (tabBreadcrumb < parent.activeTabIndex) parent.activeTabIndex--;
        }
        // remove tab from children
        parent.children?.splice(tabBreadcrumb, 1);
      })
    ),

  moveTabOntoTab: (breadcrumbsFrom, breadcrumbsTo) =>
    set((baseStore) =>
      produce(baseStore, (draftStore) => {
        const originParentBreadcrumbs: number[] = breadcrumbsFrom.slice(0, -1);
        const originTabBreadcrumb: number =
          breadcrumbsFrom[breadcrumbsFrom.length - 1];
        const destinationParentBreadcrumbs: number[] = breadcrumbsTo.slice(
          0,
          -1
        );
        const destinationTabBreadcrumb: number =
          breadcrumbsTo[breadcrumbsTo.length - 1];

        // get both parent nodes
        const originParent = getItemAtBreadcrumbs(
          draftStore.editorState,
          originParentBreadcrumbs
        );
        const destinationParent = getItemAtBreadcrumbs(
          draftStore.editorState,
          destinationParentBreadcrumbs
        );

        // make sure both parents are tabGroups
        if (originParent.type != "tabGroup")
          throw "Origin parent must be a tab group";
        if (destinationParent.type != "tabGroup")
          throw "Destination parent must be a tab group";

        const tab =
          originParent.children && originParent.children[originTabBreadcrumb];

        if (!tab) throw "Unable to find tab ";

        // remove tab from origin parent
        originParent.children?.splice(originTabBreadcrumb, 1);

        // add it into the destination parent
        destinationParent?.children?.splice(destinationTabBreadcrumb, 0, tab);
      })
    ),

  moveTabOntoView: (breadcrumbsFrom, breadcrumbsTo, viewDropArea) =>
    set((baseStore) =>
      produce(baseStore, (draftStore) => {
        // get items
        const tab = getItemAtBreadcrumbs(
          draftStore.editorState,
          breadcrumbsFrom
        );
        const originTabGroup = getItemAtBreadcrumbs(
          draftStore.editorState,
          breadcrumbsFrom.slice(0, -1)
        );
        const destinationTabGroup = getItemAtBreadcrumbs(
          draftStore.editorState,
          breadcrumbsTo
        );

        // checks
        if (
          tab.type != "tab" ||
          originTabGroup.type != "tabGroup" ||
          destinationTabGroup.type != "tabGroup"
        )
          throw "Invalid breadcrumbs";

        // get useful indices
        const originTabIndex: number =
          breadcrumbsFrom[breadcrumbsFrom.length - 1];
        const destinationTabGroupIndex: number =
          breadcrumbsTo[breadcrumbsTo.length - 1];

        // special case - when a tab is dropped in center of same tab group, don't do anything
        if (viewDropArea == "center" && originTabGroup == destinationTabGroup)
          return;

        // manipulate state
        originTabGroup.children.splice(originTabIndex, 1); // remove tab from originTabGroup
        switch (viewDropArea) {
          case "center": {
            destinationTabGroup.children.push(tab); // push tab to end of destinationTabGroup
            break;
          }
          case "top": {
            // turn destinationTabGroup into a colGroup w/ new tab on top and destinationTabGroup on bottom
            const destinationTabGroupChildren = destinationTabGroup.children;
            const colGroup: SplitGroupTreeNode = {
              type: "colGroup",
              children: [
                {
                  type: "tabGroup",
                  activeTabIndex: 0,
                  children: [tab],
                },
                {
                  type: "tabGroup",
                  activeTabIndex: destinationTabGroup.activeTabIndex,
                  children: [...destinationTabGroupChildren],
                },
              ],
            };

            if (destinationTabGroup == draftStore.editorState) {
              draftStore.editorState = colGroup;
            } else {
              const parentOfDestinationTabGroup = getItemAtBreadcrumbs(
                draftStore.editorState,
                breadcrumbsTo.slice(0, -1)
              );
              if (parentOfDestinationTabGroup.type == "colGroup") {
                parentOfDestinationTabGroup.children.splice(
                  destinationTabGroupIndex,
                  1,
                  ...colGroup.children
                );
              } else if (parentOfDestinationTabGroup.type == "rowGroup") {
                parentOfDestinationTabGroup.children.splice(
                  destinationTabGroupIndex,
                  1,
                  colGroup
                );
              } else {
                return;
              }
            }
            break;
          }
          case "bottom": {
            // turn destinationTabGroup into a colGroup w/ new tab on bottom and destinationTabGroup on top
            const destinationTabGroupChildren = destinationTabGroup.children;
            const colGroup: SplitGroupTreeNode = {
              type: "colGroup",
              children: [
                {
                  type: "tabGroup",
                  activeTabIndex: destinationTabGroup.activeTabIndex,
                  children: [...destinationTabGroupChildren],
                },
                {
                  type: "tabGroup",
                  activeTabIndex: 0,
                  children: [tab],
                },
              ],
            };

            if (destinationTabGroup == draftStore.editorState) {
              draftStore.editorState = colGroup;
            } else {
              const parentOfDestinationTabGroup = getItemAtBreadcrumbs(
                draftStore.editorState,
                breadcrumbsTo.slice(0, -1)
              );
              if (parentOfDestinationTabGroup.type == "colGroup") {
                parentOfDestinationTabGroup.children.splice(
                  destinationTabGroupIndex,
                  1,
                  ...colGroup.children
                );
              } else if (parentOfDestinationTabGroup.type == "rowGroup") {
                parentOfDestinationTabGroup.children.splice(
                  destinationTabGroupIndex,
                  1,
                  colGroup
                );
              } else {
                return;
              }
            }
            break;
          }
          case "left": {
            // turn destinationTabGroup into a rowGroup w/ new tab on left and destinationTabGroup on right
            const destinationTabGroupChildren = destinationTabGroup.children;
            const rowGroup: SplitGroupTreeNode = {
              type: "rowGroup",
              children: [
                {
                  type: "tabGroup",
                  activeTabIndex: 0,
                  children: [tab],
                },
                {
                  type: "tabGroup",
                  activeTabIndex: destinationTabGroup.activeTabIndex,
                  children: [...destinationTabGroupChildren],
                },
              ],
            };

            if (destinationTabGroup == draftStore.editorState) {
              draftStore.editorState = rowGroup;
            } else {
              const parentOfDestinationTabGroup = getItemAtBreadcrumbs(
                draftStore.editorState,
                breadcrumbsTo.slice(0, -1)
              );
              if (parentOfDestinationTabGroup.type == "rowGroup") {
                parentOfDestinationTabGroup.children.splice(
                  destinationTabGroupIndex,
                  1,
                  ...rowGroup.children
                );
              } else if (parentOfDestinationTabGroup.type == "colGroup") {
                parentOfDestinationTabGroup.children.splice(
                  destinationTabGroupIndex,
                  1,
                  rowGroup
                );
              } else {
                return;
              }
            }
            break;
          }
          case "right": {
            // turn destinationTabGroup into a rowGroup w/ new tab on right and destinationTabGroup on left
            const destinationTabGroupChildren = destinationTabGroup.children;
            const rowGroup: SplitGroupTreeNode = {
              type: "rowGroup",
              children: [
                {
                  type: "tabGroup",
                  activeTabIndex: destinationTabGroup.activeTabIndex,
                  children: [...destinationTabGroupChildren],
                },
                {
                  type: "tabGroup",
                  activeTabIndex: 0,
                  children: [tab],
                },
              ],
            };

            if (destinationTabGroup == draftStore.editorState) {
              draftStore.editorState = rowGroup;
            } else {
              const parentOfDestinationTabGroup = getItemAtBreadcrumbs(
                draftStore.editorState,
                breadcrumbsTo.slice(0, -1)
              );
              if (parentOfDestinationTabGroup.type == "rowGroup") {
                parentOfDestinationTabGroup.children.splice(
                  destinationTabGroupIndex,
                  1,
                  ...rowGroup.children
                );
              } else if (parentOfDestinationTabGroup.type == "colGroup") {
                parentOfDestinationTabGroup.children.splice(
                  destinationTabGroupIndex,
                  1,
                  rowGroup
                );
              } else {
                return;
              }
            }
            break;
          }
        }
      })
    ),
}));

function getItemAtBreadcrumbs(
  tree: EditorTreeNode,
  breadcrumbs: number[]
): EditorTreeNode {
  let pointer: EditorTreeNode = tree;
  breadcrumbs.forEach((breadcrumb) => {
    if (!("children" in pointer)) throw "Pointer is not a group";
    const child = pointer.children[breadcrumb];
    if (!pointer) throw "invalid breadcrumbs/tree combination";
    pointer = child;
  });
  return pointer;
}
