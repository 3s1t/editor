import { EditorState } from ".";

export const defaultInitialEditorState: EditorState = {
  type: "tabGroup",
  id: "001",
  activeTabIndex: 0,
  children: [{ type: "tab", id: "002", component: "box" }],
};
