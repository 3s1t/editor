import {
  EditorState,
  EditorStore,
  SplitGroupState,
  TabGroupState,
  TabState,
} from ".";

export function getItemAtBreadcrumbs(
  state: EditorState,
  breadcrumbs: number[]
): TabGroupState | SplitGroupState | TabState {
  let pointer: TabGroupState | SplitGroupState | TabState = state;
  breadcrumbs.forEach((breadcrumb) => {
    if ("subGroups" in pointer) {
      pointer = pointer.subGroups[breadcrumb];
      if (pointer == undefined) throw "Breadcrumb for subgroup invalid";
    } else if ("tabs" in pointer) {
      pointer = pointer.tabs[breadcrumb];
      if (pointer == undefined) throw "Breadcrumb for tab invalid";
    } else {
      throw "Invalid state/breadcrumb combination";
    }
  });

  return pointer;
}
