import { EditorState } from "..";

export const oneTabState: EditorState = {
  activeTabIndex: 0,
  tabs: [{ name: "Tab A", id: "abc123", component: "box" }],
};

export const fourTabs0activeTabIndex: EditorState = {
  activeTabIndex: 0,
  tabs: [
    { name: "Tab A", id: "abc123", component: "box" },
    { name: "Tab B", id: "xyz789", component: "sphere" },
    { name: "Tab C", id: "a", component: "cone" },
    { name: "Tab D", id: "b", component: "cylinder" },
  ],
};

export const fourTabs1activeTabIndex: EditorState = {
  activeTabIndex: 1,
  tabs: [
    { name: "Tab A", id: "abc123", component: "box" },
    { name: "Tab B", id: "xyz789", component: "sphere" },
    { name: "Tab C", id: "a", component: "cone" },
    { name: "Tab D", id: "b", component: "cylinder" },
  ],
};

export const fourTabs2activeTabIndex: EditorState = {
  activeTabIndex: 2,
  tabs: [
    { name: "Tab A", id: "abc123", component: "box" },
    { name: "Tab B", id: "xyz789", component: "sphere" },
    { name: "Tab C", id: "a", component: "cone" },
    { name: "Tab D", id: "b", component: "cylinder" },
  ],
};

export const fourTabs3activeTabIndex: EditorState = {
  activeTabIndex: 3,
  tabs: [
    { name: "Tab A", id: "abc123", component: "box" },
    { name: "Tab B", id: "xyz789", component: "sphere" },
    { name: "Tab C", id: "a", component: "cone" },
    { name: "Tab D", id: "b", component: "cylinder" },
  ],
};

export const twoTabGroupsSplitVertically: EditorState = {
  direction: "col",
  subGroups: [
    {
      activeTabIndex: 0,
      tabs: [
        { name: "Tab A", id: "abc123", component: "box" },
        { name: "Tab B", id: "abc123", component: "box" },
      ],
    },
    {
      activeTabIndex: 0,
      tabs: [
        { name: "Tab C", id: "abc123", component: "box" },
        { name: "Tab D", id: "abc123", component: "box" },
      ],
    },
  ],
};

export const complexNestedState: EditorState = {
  direction: "row",
  subGroups: [
    {
      activeTabIndex: 1,
      tabs: [
        { name: "Tab A", id: "abc123", component: "box" },
        { name: "Tab B", id: "xyz789", component: "sphere" },
        { name: "Tab C", id: "xyz789", component: "cone" },
      ],
    },
    {
      direction: "col",
      subGroups: [
        {
          activeTabIndex: 1,
          tabs: [
            { name: "Tab D", id: "abc123", component: "cylinder" },
            { name: "Tab E", id: "xyz789", component: "cone" },
          ],
        },
        {
          direction: "row",
          subGroups: [
            {
              activeTabIndex: 0,
              tabs: [
                { name: "Tab F", id: "abc123", component: "sphere" },
                { name: "Tab G", id: "xyz789", component: "cone" },
              ],
            },
            {
              activeTabIndex: 1,
              tabs: [
                { name: "Tab H", id: "abc123", component: "cone" },
                {
                  name: "Tab I",
                  id: "xyz789",
                  component: "cylinder",
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};

export const fourTabs0activeTabIndexSplitUp: EditorState = {
  direction: "col",
  subGroups: [
    {
      activeTabIndex: 0,
      tabs: [{ name: "Tab A", id: "abc123", component: "box" }],
    },
    {
      activeTabIndex: 0,
      tabs: [
        { name: "Tab B", id: "xyz789", component: "sphere" },
        { name: "Tab C", id: "a", component: "cone" },
        { name: "Tab D", id: "b", component: "cylinder" },
      ],
    },
  ],
};

export const twoTabGroupsSplitVerticallySplitUp: EditorState = {
  direction: "col",
  subGroups: [
    {
      activeTabIndex: 0,
      tabs: [
        { name: "Tab A", id: "abc123", component: "box" },
        { name: "Tab B", id: "abc123", component: "box" },
      ],
    },
    {
      activeTabIndex: 0,
      tabs: [{ name: "Tab C", id: "abc123", component: "box" }],
    },
    {
      activeTabIndex: 0,
      tabs: [{ name: "Tab D", id: "abc123", component: "box" }],
    },
  ],
};
