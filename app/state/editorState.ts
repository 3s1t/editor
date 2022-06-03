import create from "zustand";
import produce from "immer";

export type ViewDropArea = "top" | "bottom" | "left" | "right" | "center";

export type TreeNode = {
  type: "rowGroup" | "colGroup" | "tabGroup" | "tab";
  id: string;
};

export interface TabTreeNode extends TreeNode {
  type: "tab";
  component: "box" | "sphere" | "cone" | "cylinder";
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
  editorState: {
    type: "tabGroup",
    id: "001",
    activeTabIndex: 0,
    children: [{ type: "tab", id: "002", component: "box" }],
  },

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
    set((baseStore) => produce(baseStore, (draftStore) => {})),
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

export function validateTree(tree: EditorTreeNode): boolean {
  if (!("children" in tree)) {
    if (tree.type == "tab") throw "a tab can't have children";
    // add additional checks for tab here
    return true;
  } else {
    if (!Array.isArray(tree.children)) throw "a group must have children";
    if (tree.type == "tabGroup") {
      if (tree.children.length < 1)
        throw "a tab group must have at least 1 child";
      // add additional checks for tabGroup here
      // recursive call to validateTree for each child
      return tree.children.every(validateTree);
    } else {
      if (tree.children.length < 2)
        throw "a split group (rowGroup or colGroup) must have at least 1 child";
      for (const child of tree.children) {
        if (tree.type == child.type)
          throw "a split group (rowGroup or colGroup) can't have the same split group as its child";
      }
      // add additional checks for splitGroup here
      // recursive call to validateTree for each child
      return tree.children.every(validateTree);
    }
  }
}
