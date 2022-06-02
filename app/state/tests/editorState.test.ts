import { validateTree, EditorTreeNode } from "../editorState";

describe("validateTree", () => {
  describe("valid trees", () => {
    describe("no split", () => {
      it("validates", () => {
        const tree: EditorTreeNode = {
          type: "tabGroup",
          id: "001",
          children: [
            {
              type: "tab",
              id: "002",
            },
            {
              type: "tab",
              id: "003",
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
              children: [
                {
                  type: "tab",
                  id: "003",
                },
                {
                  type: "tab",
                  id: "004",
                },
              ],
            },
            {
              type: "tabGroup",
              id: "005",
              children: [
                {
                  type: "tab",
                  id: "006",
                },
              ],
            },
          ],
        };
        expect(validateTree(tree)).toBe(true);
      });
    });
  });
  describe("invalid trees", () => {
    describe("tab with children", () => {
      it("should throw", () => {
        const tree: EditorTreeNode = {
          type: "tabGroup",
          id: "001",
          children: [
            {
              type: "tab",
              id: "002",
              children: [],
            },
          ],
        };
        expect(() => validateTree(tree)).toThrow();
      });
    });
    describe("groups without children", () => {
      it("should throw", () => {
        const tree1: EditorTreeNode = {
          type: "rowGroup",
          id: "001",
        };
        expect(() => validateTree(tree1)).toThrow();

        const tree2: EditorTreeNode = {
          type: "colGroup",
          id: "001",
        };
        expect(() => validateTree(tree2)).toThrow();
      });
    });
    describe("groups with not enough children", () => {
      it("should throw", () => {
        const tree1: EditorTreeNode = {
          type: "rowGroup",
          id: "001",
          children: [
            {
              type: "tabGroup",
              id: "002",
              children: [{ type: "tab", id: "003" }],
            },
          ],
        };
        expect(() => validateTree(tree1)).toThrow();

        const tree2: EditorTreeNode = {
          type: "tabGroup",
          id: "001",
          children: [],
        };
        expect(() => validateTree(tree2)).toThrow();
      });
    });
  });
});
