import { GroupTreeNode } from "../editorState";

export const oneTabState: GroupTreeNode = {
  type: "tabGroup",
  activeTabIndex: 0,
  children: [{ type: "tab", component: "box" }],
};

export const fourTabs0activeTabIndex: GroupTreeNode = {
  type: "tabGroup",
  activeTabIndex: 0,
  children: [
    { type: "tab", component: "box" },
    { type: "tab", component: "sphere" },
    { type: "tab", component: "cone" },
    { type: "tab", component: "cylinder" },
  ],
};

export const fourTabs1activeTabIndex: GroupTreeNode = {
  type: "tabGroup",
  activeTabIndex: 1,
  children: [
    { type: "tab", component: "box" },
    { type: "tab", component: "sphere" },
    { type: "tab", component: "cone" },
    { type: "tab", component: "cylinder" },
  ],
};

export const fourTabs2activeTabIndex: GroupTreeNode = {
  type: "tabGroup",
  activeTabIndex: 2,
  children: [
    { type: "tab", component: "box" },
    { type: "tab", component: "sphere" },
    { type: "tab", component: "cone" },
    { type: "tab", component: "cylinder" },
  ],
};

export const fourTabs3activeTabIndex: GroupTreeNode = {
  type: "tabGroup",
  activeTabIndex: 3,
  children: [
    { type: "tab", component: "box" },
    { type: "tab", component: "sphere" },
    { type: "tab", component: "cone" },
    { type: "tab", component: "cylinder" },
  ],
};

export const twoTabGroupsSplitVertically: GroupTreeNode = {
  type: "colGroup",
  children: [
    {
      type: "tabGroup",

      activeTabIndex: 0,
      children: [
        { type: "tab", component: "box" },
        { type: "tab", component: "sphere" },
      ],
    },
    {
      type: "tabGroup",
      activeTabIndex: 0,
      children: [
        { type: "tab", component: "cone" },
        { type: "tab", component: "cylinder" },
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
        { type: "tab", component: "box" },
        { type: "tab", component: "sphere" },
      ],
    },
    {
      type: "tabGroup",
      activeTabIndex: 0,
      children: [{ type: "tab", component: "cone" }],
    },
    {
      type: "tabGroup",
      activeTabIndex: 0,
      children: [{ type: "tab", component: "cylinder" }],
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
        { type: "tab", component: "box" },
        { type: "tab", component: "sphere" },
        { type: "tab", component: "cone" },
      ],
    },
    {
      type: "colGroup",
      children: [
        {
          type: "tabGroup",
          activeTabIndex: 1,
          children: [
            { type: "tab", component: "cylinder" },
            { type: "tab", component: "cone" },
          ],
        },
        {
          type: "rowGroup",
          children: [
            {
              type: "tabGroup",

              activeTabIndex: 0,
              children: [
                { type: "tab", component: "sphere" },
                { type: "tab", component: "cone" },
              ],
            },
            {
              type: "tabGroup",
              activeTabIndex: 1,
              children: [
                { type: "tab", component: "cone" },
                { type: "tab", component: "cylinder" },
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
      children: [{ type: "tab", component: "box" }],
    },
    {
      type: "tabGroup",
      activeTabIndex: 0,
      children: [
        { type: "tab", component: "sphere" },
        { type: "tab", component: "cone" },
        { type: "tab", component: "cylinder" },
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
        { type: "tab", component: "box" },
        { type: "tab", component: "box" },
      ],
    },
    {
      type: "tabGroup",
      activeTabIndex: 0,
      children: [{ type: "tab", component: "box" }],
    },
    {
      type: "tabGroup",
      activeTabIndex: 0,
      children: [{ type: "tab", component: "box" }],
    },
  ],
};
