import { GroupTreeNode } from "../editorState";

export const oneTabState: GroupTreeNode = {
  type: "tabGroup",
  id: "001",
  activeTabIndex: 0,
  children: [{ type: "tab", id: "abc123", component: "box" }],
};

export const fourTabs0activeTabIndex: GroupTreeNode = {
  type: "tabGroup",
  id: "001",
  activeTabIndex: 0,
  children: [
    { type: "tab", id: "abc123", component: "box" },
    { type: "tab", id: "xyz789", component: "sphere" },
    { type: "tab", id: "a", component: "cone" },
    { type: "tab", id: "b", component: "cylinder" },
  ],
};

export const fourTabs1activeTabIndex: GroupTreeNode = {
  type: "tabGroup",
  id: "001",
  activeTabIndex: 1,
  children: [
    { type: "tab", id: "001", component: "box" },
    { type: "tab", id: "002", component: "sphere" },
    { type: "tab", id: "003", component: "cone" },
    { type: "tab", id: "004", component: "cylinder" },
  ],
};

export const fourTabs2activeTabIndex: GroupTreeNode = {
  type: "tabGroup",
  id: "001",
  activeTabIndex: 2,
  children: [
    { type: "tab", id: "abc123", component: "box" },
    { type: "tab", id: "xyz789", component: "sphere" },
    { type: "tab", id: "a", component: "cone" },
    { type: "tab", id: "b", component: "cylinder" },
  ],
};

export const fourTabs3activeTabIndex: GroupTreeNode = {
  type: "tabGroup",
  id: "001",
  activeTabIndex: 3,
  children: [
    { type: "tab", id: "abc123", component: "box" },
    { type: "tab", id: "xyz789", component: "sphere" },
    { type: "tab", id: "a", component: "cone" },
    { type: "tab", id: "b", component: "cylinder" },
  ],
};

export const twoTabGroupsSplitVertically: GroupTreeNode = {
  type: "colGroup",
  id: "001",
  children: [
    {
      type: "tabGroup",
      id: "001",
      activeTabIndex: 0,
      children: [
        { type: "tab", id: "abc123", component: "box" },
        { type: "tab", id: "abc123", component: "box" },
      ],
    },
    {
      type: "tabGroup",
      id: "001",
      activeTabIndex: 0,
      children: [
        { type: "tab", id: "abc123", component: "box" },
        { type: "tab", id: "abc123", component: "box" },
      ],
    },
  ],
};

export const complexNestedState: GroupTreeNode = {
  type: "rowGroup",
  id: "001",
  children: [
    {
      type: "tabGroup",
      id: "001",
      activeTabIndex: 1,
      children: [
        { type: "tab", id: "abc123", component: "box" },
        { type: "tab", id: "xyz789", component: "sphere" },
        { type: "tab", id: "xyz789", component: "cone" },
      ],
    },
    {
      type: "colGroup",
      id: "001",
      children: [
        {
          type: "tabGroup",
          id: "001",
          activeTabIndex: 1,
          children: [
            { type: "tab", id: "abc123", component: "cylinder" },
            { type: "tab", id: "xyz789", component: "cone" },
          ],
        },
        {
          type: "rowGroup",
          id: "002",
          children: [
            {
              type: "tabGroup",
              id: "001",
              activeTabIndex: 0,
              children: [
                { type: "tab", id: "abc123", component: "sphere" },
                { type: "tab", id: "xyz789", component: "cone" },
              ],
            },
            {
              type: "tabGroup",
              id: "001",
              activeTabIndex: 1,
              children: [
                { type: "tab", id: "abc123", component: "cone" },
                { type: "tab", id: "xyz789", component: "cylinder" },
              ],
            },
          ],
        },
      ],
    },
  ],
};

export const fourTabs0activeTabIndexSplitUp: GroupTreeNode = {
  type: "colGroup",
  id: "001",
  children: [
    {
      type: "tabGroup",
      id: "002",
      activeTabIndex: 0,
      children: [{ type: "tab", id: "abc123", component: "box" }],
    },
    {
      type: "tabGroup",
      id: "002",
      activeTabIndex: 0,
      children: [
        { type: "tab", id: "xyz789", component: "sphere" },
        { type: "tab", id: "a", component: "cone" },
        { type: "tab", id: "b", component: "cylinder" },
      ],
    },
  ],
};

export const twoTabGroupsSplitVerticallySplitUp: GroupTreeNode = {
  type: "colGroup",
  id: "001",
  children: [
    {
      type: "tabGroup",
      id: "001",
      activeTabIndex: 0,
      children: [
        { type: "tab", id: "abc123", component: "box" },
        { type: "tab", id: "abc123", component: "box" },
      ],
    },
    {
      type: "tabGroup",
      id: "001",
      activeTabIndex: 0,
      children: [{ type: "tab", id: "abc123", component: "box" }],
    },
    {
      type: "tabGroup",
      id: "001",
      activeTabIndex: 0,
      children: [{ type: "tab", id: "abc123", component: "box" }],
    },
  ],
};
