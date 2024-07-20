import { writable } from "svelte/store";

export interface QueryState {
  excludedFormats: string[];
  includedFormats: string[];
  includedDays: string[];
  excludedDays: string[];
  includedBodies: string[];
  excludedBodies: string[];
  dataFormat: string;
  dataQuery: string;
  formatComparison: string;
  htmlSimple: string;
  textSearch: string;
  searchType: string;
  searchRadius: string;
  startEndTime: string;
  meetingDuration: string;
  specificFields: string;
  sortResponse: string;
  includedVenueTypes: string[];
  excludedVenueTypes: string[];
  selectedResponse: number;
  specificText: string;
  checkedBoxesString: string;
  formatLanguage: string;
  getChangesQuery: string;
  valueList: string;
  nawsServiceBody: string;
  XMLCheckBoxes: string;
}

const initialState: QueryState = {
  excludedFormats: [],
  includedFormats: [],
  includedDays: [],
  excludedDays: [],
  includedBodies: [],
  excludedBodies: [],
  dataFormat: "csv",
  dataQuery: "?switcher=GetSearchResults",
  formatComparison: "",
  htmlSimple: "",
  textSearch: "",
  searchType: "",
  searchRadius: "",
  startEndTime: "",
  meetingDuration: "",
  specificFields: "",
  sortResponse: "",
  includedVenueTypes: [],
  excludedVenueTypes: [],
  selectedResponse: 0,
  specificText: "",
  checkedBoxesString: "",
  formatLanguage: "",
  getChangesQuery: "",
  valueList: "",
  nawsServiceBody: "",
  XMLCheckBoxes: "",
};

const { subscribe, set, update } = writable(initialState);

export const QueryContext = {
  subscribe,
  set,
  update,
  excludedFormatsFunction: (payload: string[]) =>
    update((state) => ({ ...state, excludedFormats: payload })),
  includedFormatsFunction: (payload: string[]) =>
    update((state) => ({ ...state, includedFormats: payload })),
  excludedDaysFunction: (payload: string[]) =>
    update((state) => ({ ...state, excludedDays: payload })),
  includedDaysFunction: (payload: string[]) =>
    update((state) => ({ ...state, includedDays: payload })),
  includedBodiesFunction: (payload: string[]) =>
    update((state) => ({ ...state, includedBodies: payload })),
  excludedBodiesFunction: (payload: string[]) =>
    update((state) => ({ ...state, excludedBodies: payload })),
  dataFormatFunction: (payload: string) =>
    update((state) => ({ ...state, dataFormat: payload })),
  htmlSimpleFunction: (payload: string) =>
    update((state) => ({ ...state, htmlSimple: payload })),
  dataQueryFunction: (payload: string) =>
    update((state) => ({ ...state, dataQuery: payload })),
  setFormatComparison: (payload: string) =>
    update((state) => ({ ...state, formatComparison: payload })),
  textSearchFunction: (payload: string) =>
    update((state) => ({ ...state, textSearch: payload })),
  searchTypeFunction: (payload: string) =>
    update((state) => ({ ...state, searchType: payload })),
  searchRadiusFunction: (payload: string) =>
    update((state) => ({ ...state, searchRadius: payload })),
  startEndTimeFunction: (payload: string) =>
    update((state) => ({ ...state, startEndTime: payload })),
  meetingDurationFunction: (payload: string) =>
    update((state) => ({ ...state, meetingDuration: payload })),
  specificFieldsFunction: (payload: string) =>
    update((state) => ({ ...state, specificFields: payload })),
  sortResponseFunction: (payload: string) =>
    update((state) => ({ ...state, sortResponse: payload })),
  includedVenueTypesFunction: (payload: string[]) =>
    update((state) => ({ ...state, includedVenueTypes: payload })),
  excludedVenueTypesFunction: (payload: string[]) =>
    update((state) => ({ ...state, excludedVenueTypes: payload })),
  selectedResponseFunction: (payload: number) =>
    update((state) => ({ ...state, selectedResponse: payload })),
  specificTextFunction: (payload: string) =>
    update((state) => ({ ...state, specificText: payload })),
  checkedBoxesStringFunction: (payload: string) =>
    update((state) => ({ ...state, checkedBoxesString: payload })),
  formatLanguageFunction: (payload: string) =>
    update((state) => ({ ...state, formatLanguage: payload })),
  getChangesQueryFunction: (payload: string) =>
    update((state) => ({ ...state, getChangesQuery: payload })),
  valueListFunction: (payload: string) =>
    update((state) => ({ ...state, valueList: payload })),
  nawsServiceBodyFunction: (payload: string) =>
    update((state) => ({ ...state, nawsServiceBody: payload })),
  XMLCheckBoxesFunction: (payload: string) =>
    update((state) => ({ ...state, XMLCheckBoxes: payload })),
};
