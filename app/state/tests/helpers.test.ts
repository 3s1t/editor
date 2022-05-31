import { getItemAtBreadcrumbs } from "../helpers";
import {
  complexNestedState,
  oneTabState,
  fourTabs0activeTabIndex,
  fourTabs1activeTabIndex,
  fourTabs2activeTabIndex,
  fourTabs3activeTabIndex,
  twoTabGroupsSplitVertically,
} from "./testData";

describe("State management helper functions", () => {
  describe("getItemAtBreadcrumbs", () => {
    describe("valid inputs", () => {
      describe("getting tab from simple state", () => {
        it("returns a reference to the tab state object", () => {
          // @ts-ignore
          const desiredReference = fourTabs0activeTabIndex.tabs[0];

          const result = getItemAtBreadcrumbs(fourTabs0activeTabIndex, [0]);

          expect(result).toBe(desiredReference);
        });
      });
      describe("getting tab from nested state", () => {
        it("returns a reference to the tab state object", () => {
          const desiredReference =
            // @ts-ignore
            twoTabGroupsSplitVertically.subGroups[1].tabs[0];

          const result = getItemAtBreadcrumbs(
            twoTabGroupsSplitVertically,
            [1, 0]
          );

          expect(result).toBe(desiredReference);
        });
      });
    });
    describe("invalid inputs", () => {
      describe("too many breadcrumbs", () => {
        it("throws an error", () => {
          expect(() => {
            getItemAtBreadcrumbs(oneTabState, [0, 0]);
          }).toThrow("Invalid state/breadcrumb combination");
        });
      });
      describe("tab breadcrumb invalid", () => {
        it("throws an error", () => {
          expect(() => {
            getItemAtBreadcrumbs(oneTabState, [1]);
          }).toThrow("Breadcrumb for tab invalid");
        });
      });
      describe("subgroup breadcrumb invalid", () => {
        it("throws an error", () => {
          expect(() => {
            getItemAtBreadcrumbs(twoTabGroupsSplitVertically, [2, 0]);
          }).toThrow("Breadcrumb for subgroup invalid");
        });
      });
    });
  });
});
