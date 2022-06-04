import { GroupTreeNode } from "../editorState";

export const oneTabState: GroupTreeNode = {
  type: "tabGroup",
  activeTabIndex: 0,
  children: [{ type: "tab", name: "a", component: "box" }],
};

export const fourTabs0activeTabIndex: GroupTreeNode = {
  type: "tabGroup",
  activeTabIndex: 0,
  children: [
    { type: "tab", name: "a", component: "box" },
    { type: "tab", name: "b", component: "box" },
    { type: "tab", name: "c", component: "box" },
    { type: "tab", name: "d", component: "box" },
  ],
};

export const fourTabs1activeTabIndex: GroupTreeNode = {
  type: "tabGroup",
  activeTabIndex: 1,
  children: [
    { type: "tab", name: "a", component: "box" },
    { type: "tab", name: "b", component: "box" },
    { type: "tab", name: "c", component: "box" },
    { type: "tab", name: "d", component: "box" },
  ],
};

export const fourTabs2activeTabIndex: GroupTreeNode = {
  type: "tabGroup",
  activeTabIndex: 2,
  children: [
    { type: "tab", name: "a", component: "box" },
    { type: "tab", name: "b", component: "sphere" },
    { type: "tab", name: "c", component: "cone" },
    { type: "tab", name: "d", component: "cylinder" },
  ],
};

export const fourTabs3activeTabIndex: GroupTreeNode = {
  type: "tabGroup",
  activeTabIndex: 3,
  children: [
    { type: "tab", name: "a", component: "box" },
    { type: "tab", name: "b", component: "sphere" },
    { type: "tab", name: "c", component: "cone" },
    { type: "tab", name: "d", component: "cylinder" },
  ],
};

export const twoTabGroupsSplitVertically: GroupTreeNode = {
  type: "colGroup",
  children: [
    {
      type: "tabGroup",

      activeTabIndex: 0,
      children: [
        { type: "tab", name: "a", component: "box" },
        { type: "tab", name: "b", component: "box" },
      ],
    },
    {
      type: "tabGroup",
      activeTabIndex: 0,
      children: [
        { type: "tab", name: "c", component: "box" },
        { type: "tab", name: "d", component: "box" },
      ],
    },
  ],
};

export const threeTabGroupsSplitVertically: GroupTreeNode = {
  type: "colGroup",
  children: [
    {
      type: "tabGroup",

      activeTabIndex: 0,
      children: [
        { type: "tab", name: "a", component: "box" },
        { type: "tab", name: "b", component: "box" },
      ],
    },
    {
      type: "tabGroup",
      activeTabIndex: 0,
      children: [{ type: "tab", name: "c", component: "box" }],
    },
    {
      type: "tabGroup",
      activeTabIndex: 0,
      children: [{ type: "tab", name: "d", component: "box" }],
    },
  ],
};

export const complexNestedState: GroupTreeNode = {
  type: "rowGroup",
  children: [
    {
      type: "tabGroup",
      activeTabIndex: 1,
      children: [
        { type: "tab", name: "a", component: "box" },
        { type: "tab", name: "b", component: "sphere" },
        { type: "tab", name: "c", component: "cone" },
      ],
    },
    {
      type: "colGroup",
      children: [
        {
          type: "tabGroup",
          activeTabIndex: 1,
          children: [
            { type: "tab", name: "d", component: "cylinder" },
            { type: "tab", name: "e", component: "cone" },
          ],
        },
        {
          type: "rowGroup",
          children: [
            {
              type: "tabGroup",

              activeTabIndex: 0,
              children: [
                { type: "tab", name: "e", component: "sphere" },
                { type: "tab", name: "f", component: "cone" },
              ],
            },
            {
              type: "tabGroup",
              activeTabIndex: 1,
              children: [
                { type: "tab", name: "g", component: "cone" },
                { type: "tab", name: "h", component: "cylinder" },
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
  children: [
    {
      type: "tabGroup",
      activeTabIndex: 0,
      children: [{ type: "tab", name: "a", component: "box" }],
    },
    {
      type: "tabGroup",
      activeTabIndex: 0,
      children: [
        { type: "tab", name: "b", component: "box" },
        { type: "tab", name: "c", component: "box" },
        { type: "tab", name: "d", component: "box" },
      ],
    },
  ],
};

export const twoTabGroupsSplitVerticallySplitUp: GroupTreeNode = {
  type: "colGroup",
  children: [
    {
      type: "tabGroup",
      activeTabIndex: 0,
      children: [
        { type: "tab", name: "a", component: "box" },
        { type: "tab", name: "b", component: "box" },
      ],
    },
    {
      type: "tabGroup",
      activeTabIndex: 0,
      children: [{ type: "tab", name: "c", component: "box" }],
    },
    {
      type: "tabGroup",
      activeTabIndex: 0,
      children: [{ type: "tab", name: "d", component: "box" }],
    },
  ],
};
