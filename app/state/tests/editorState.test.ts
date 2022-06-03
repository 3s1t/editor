import { validateTree, EditorTreeNode } from "../editorState";

describe("validateTree", () => {
  describe("valid trees", () => {
    describe("no split", () => {
      it("validates", () => {
        const tree: EditorTreeNode = {
          type: "tabGroup",
          activeTabIndex: 0,
          id: "001",
          children: [
            {
              type: "tab",
              id: "002",
              component: "box",
            },
            {
              type: "tab",
              id: "003",
              component: "box",
            },
          ],
        };
        expect(validateTree(tree)).toBe(true);
      });
    });
    describe("1 split", () => {
      it("validates", () => {
        const tree: EditorTreeNode = {
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
              type: "tabGroup",
              id: "005",
              activeTabIndex: 0,
              children: [
                {
                  type: "tab",
                  id: "006",
                  component: "sphere",
                },
              ],
            },
          ],
        };
        expect(validateTree(tree)).toBe(true);
      });
    });
  });
});
