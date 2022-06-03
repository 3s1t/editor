/**
 * @jest-environment jsdom
 */

import { useEditorStore } from "../index";
import { renderHook, act } from "@testing-library/react-hooks";
import { defaultInitialEditorState } from "../defaultState";
import {
  complexNestedState,
  oneTabState,
  fourTabs0activeTabIndex,
  fourTabs1activeTabIndex,
  fourTabs2activeTabIndex,
  fourTabs3activeTabIndex,
  twoTabGroupsSplitVertically,
  fourTabs0activeTabIndexSplitUp,
  twoTabGroupsSplitVerticallySplitUp,
} from "./testData";

describe("State management", () => {
  describe("useEditorStore", () => {
    describe("initialization", () => {
      it("should initialize with defaultState", () => {
        const { result } = renderHook(() => useEditorStore());
        expect(result.current.editorState).toBe(defaultInitialEditorState);
      });
    });

    describe("setEditorState", () => {
      it("can set state", () => {
        const { result } = renderHook(() => useEditorStore());

        act(() => {
          result.current.setEditorState(oneTabState);
        });

        expect(result.current.editorState).toBe(oneTabState);
      });
    });

    describe("setTabActive", () => {
      describe("basic state", () => {
        it("can set tab active", () => {
          const { result } = renderHook(() => useEditorStore());

          act(() => {
            result.current.setEditorState(fourTabs0activeTabIndex);
          });

          // @ts-ignore
          expect(result.current.editorState.activeTabIndex).toBe(0);

          act(() => {
            result.current.setTabActive([1]);
          });

          // @ts-ignore
          expect(result.current.editorState.activeTabIndex).toBe(1);
        });
      });

      describe("complex nested state", () => {
        it("can set tab active", () => {
          const { result } = renderHook(() => useEditorStore());

          act(() => {
            result.current.setEditorState(complexNestedState);
          });

          expect(
            // @ts-ignore
            result.current.editorState.subGroups[1].subGroups[1].subGroups[1]
              .activeTabIndex
          ).toBe(1);

          act(() => {
            result.current.setTabActive([1, 1, 1, 0]);
          });

          expect(
            // @ts-ignore
            result.current.editorState.subGroups[1].subGroups[1].subGroups[1]
              .activeTabIndex
          ).toBe(0);
        });
      });
    });

    describe("deleteTab", () => {
      describe("basic state", () => {
        describe("deleting first tab in list", () => {
          describe("inactive tab", () => {
            it("deletes tab and decrements active index", () => {
              const { result } = renderHook(() => useEditorStore());

              act(() => {
                result.current.setEditorState(fourTabs1activeTabIndex);
              });

              // @ts-ignore
              expect(result.current.editorState.activeTabIndex).toBe(1);
              // @ts-ignore
              expect(result.current.editorState.tabs.length).toBe(4);

              act(() => {
                result.current.deleteTab([0]);
              });

              // @ts-ignore
              expect(result.current.editorState.activeTabIndex).toBe(0);
              // @ts-ignore
              expect(result.current.editorState.tabs.length).toBe(3);
            });
          });

          describe("active tab", () => {
            it("deletes tab and leaves active index at 0", () => {
              const { result } = renderHook(() => useEditorStore());

              act(() => {
                result.current.setEditorState(fourTabs0activeTabIndex);
              });

              // @ts-ignore
              expect(result.current.editorState.activeTabIndex).toBe(0);
              // @ts-ignore
              expect(result.current.editorState.tabs.length).toBe(4);

              act(() => {
                result.current.deleteTab([0]);
              });

              // @ts-ignore
              expect(result.current.editorState.activeTabIndex).toBe(0);

              // @ts-ignore
              expect(result.current.editorState.tabs.length).toBe(3);
            });
          });
        });

        describe("deleting middle tab in list", () => {
          describe("inactive tab", () => {
            describe("and to the left of the active tab", () => {
              it("deletes tab and decrements active index", () => {
                const { result } = renderHook(() => useEditorStore());

                act(() => {
                  result.current.setEditorState(fourTabs2activeTabIndex);
                });

                // @ts-ignore
                expect(result.current.editorState.activeTabIndex).toBe(2);
                // @ts-ignore
                expect(result.current.editorState.tabs.length).toBe(4);

                act(() => {
                  result.current.deleteTab([1]);
                });

                // @ts-ignore
                expect(result.current.editorState.activeTabIndex).toBe(1);
                // @ts-ignore
                expect(result.current.editorState.tabs.length).toBe(3);
              });
            });

            describe("and to the right of the active tab", () => {
              it("deletes tab and leaves active index unchanged", () => {
                const { result } = renderHook(() => useEditorStore());

                act(() => {
                  result.current.setEditorState(fourTabs2activeTabIndex);
                });

                // @ts-ignore
                expect(result.current.editorState.activeTabIndex).toBe(2);
                // @ts-ignore
                expect(result.current.editorState.tabs.length).toBe(4);

                act(() => {
                  result.current.deleteTab([3]);
                });

                // @ts-ignore
                expect(result.current.editorState.activeTabIndex).toBe(2);
                // @ts-ignore
                expect(result.current.editorState.tabs.length).toBe(3);
              });
            });
          });

          describe("active tab", () => {
            it("deletes tab and leaves active index unchanged", () => {
              const { result } = renderHook(() => useEditorStore());

              act(() => {
                result.current.setEditorState(fourTabs2activeTabIndex);
              });

              // @ts-ignore
              expect(result.current.editorState.activeTabIndex).toBe(2);
              // @ts-ignore
              expect(result.current.editorState.tabs.length).toBe(4);

              act(() => {
                result.current.deleteTab([2]);
              });

              // @ts-ignore
              expect(result.current.editorState.activeTabIndex).toBe(2);
              // @ts-ignore
              expect(result.current.editorState.tabs.length).toBe(3);
            });
          });
        });

        describe("deleting last tab in list", () => {
          describe("inactive tab", () => {
            it("deletes tab and leaves active index unchanged", () => {
              const { result } = renderHook(() => useEditorStore());

              act(() => {
                result.current.setEditorState(fourTabs1activeTabIndex);
              });

              // @ts-ignore
              expect(result.current.editorState.activeTabIndex).toBe(1);
              // @ts-ignore
              expect(result.current.editorState.tabs.length).toBe(4);

              act(() => {
                result.current.deleteTab([3]);
              });

              // @ts-ignore
              expect(result.current.editorState.activeTabIndex).toBe(1);
              // @ts-ignore
              expect(result.current.editorState.tabs.length).toBe(3);
            });
          });

          describe("active tab", () => {
            it("deletes tab and decrements active index", () => {
              const { result } = renderHook(() => useEditorStore());

              act(() => {
                result.current.setEditorState(fourTabs3activeTabIndex);
              });

              // @ts-ignore
              expect(result.current.editorState.activeTabIndex).toBe(3);
              // @ts-ignore
              expect(result.current.editorState.tabs.length).toBe(4);

              act(() => {
                result.current.deleteTab([3]);
              });

              // @ts-ignore
              expect(result.current.editorState.activeTabIndex).toBe(2);
              // @ts-ignore
              expect(result.current.editorState.tabs.length).toBe(3);
            });
          });
        });
      });
    });

    describe("moveTabOntoTab", () => {
      describe("within the same 4-tab group", () => {
        describe("originIndex: 0, destinationIndex: 2", () => {
          it("rearranges tabs", () => {
            const { result } = renderHook(() => useEditorStore());

            act(() => {
              result.current.setEditorState(fourTabs1activeTabIndex);
              result.current.moveTabOntoTab([0], [2]);
            });

            // @ts-ignore
            expect(result.current.editorState.tabs[0].name).toBe("Tab B");
            // @ts-ignore
            expect(result.current.editorState.tabs[1].name).toBe("Tab C");
            // @ts-ignore
            expect(result.current.editorState.tabs[2].name).toBe("Tab A");
            // @ts-ignore
            expect(result.current.editorState.tabs[3].name).toBe("Tab D");
          });
        });
        describe.skip("origin tab: first, destination tab: last", () => {});
        describe.skip("origin tab: middle, destination tab: first", () => {});
        describe.skip("origin tab: middle, destination tab: last", () => {});
        describe.skip("origin tab: last, destination tab: first", () => {});
        describe.skip("origin tab: last, destination tab: middle", () => {});
      });
      describe.skip("to a different group", () => {
        describe.skip("origin tab: first, destination tab: middle", () => {});
        describe.skip("origin tab: first, destination tab: last", () => {});
        describe.skip("origin tab: middle, destination tab: first", () => {});
        describe.skip("origin tab: middle, destination tab: last", () => {});
        describe.skip("origin tab: last, destination tab: first", () => {});
        describe.skip("origin tab: last, destination tab: middle", () => {});
      });
    });

    describe.skip("moveTabOntoTabGroupBlankArea", () => {
      describe.skip("within the same group", () => {});
      describe.skip("in a different group", () => {});
    });

    describe("moveTabOntoView", () => {
      describe("within the same group", () => {
        describe("center", () => {
          describe("simple", () => {
            it("doesn't change editorState", () => {
              const { result } = renderHook(() => useEditorStore());

              act(() => {
                result.current.setEditorState(fourTabs0activeTabIndex);
                result.current.moveTabOntoView([1], [], "center");
              });

              expect(result.current.editorState).toBe(fourTabs0activeTabIndex);
            });
          });
          describe("nested", () => {
            it("doesn't change editorState", () => {
              const { result } = renderHook(() => useEditorStore());

              act(() => {
                result.current.setEditorState(twoTabGroupsSplitVertically);
                result.current.moveTabOntoView([1, 0], [1], "center");
              });

              expect(result.current.editorState).toBe(
                twoTabGroupsSplitVertically
              );
            });
          });
        });
        describe("top", () => {
          describe("simple", () => {
            it("splits the group into 2 groups vertically, moves dragged tab to top group", () => {
              const { result } = renderHook(() => useEditorStore());

              act(() => {
                result.current.setEditorState(fourTabs0activeTabIndex);
                result.current.moveTabOntoView([0], [], "top");
              });
              expect(result.current.editorState).toEqual(
                fourTabs0activeTabIndexSplitUp
              );
            });
          });
          describe.skip("nested", () => {
            describe("current tab group is a column", () => {
              it.only("adds a sibling to the group with the new group above the current", () => {
                const { result } = renderHook(() => useEditorStore());

                act(() => {
                  result.current.setEditorState(twoTabGroupsSplitVertically);
                  result.current.moveTabOntoView([1, 0], [1], "top");
                });
                expect(result.current.editorState).toEqual(
                  twoTabGroupsSplitVerticallySplitUp
                );
              });
            });
          });
        });
        describe.skip("bottom", () => {
          it.skip("splits the group into 2 groups vertically, moves dragged tab to bottom group", () => {});
        });
        describe.skip("left", () => {
          it.skip("splits the group into 2 groups horizontally, moves dragged tab to left group", () => {});
        });
        describe.skip("right", () => {
          it.skip("splits the group into 2 groups horizontally, moves dragged tab to right group", () => {});
        });
      });
      describe.skip("to a different group", () => {
        describe.skip("center", () => {
          it.skip("moves tab from origin group to end of destination group", () => {});
        });
        describe.skip("top", () => {
          it.skip("splits the destination group into 2 groups vertically, moves dragged tab from origin group to new group top", () => {});
        });
        describe.skip("bottom", () => {
          it.skip("splits the destination group into 2 groups vertically, moves dragged tab from origin group to new group bottom", () => {});
        });
        describe.skip("left", () => {
          it.skip("splits the destination group into 2 groups horizontally, moves dragged tab from origin group to new group left", () => {});
        });
        describe.skip("right", () => {
          it.skip("splits the destination group into 2 groups horizontally, moves dragged tab from origin group to new group right", () => {});
        });
      });
    });
  });
});
