import { writable } from "svelte/store";
import { spinner } from "../stores/spinner";
import type { ServerInfo } from "../types/AggregatorTypes";

import {
  aggregatorAPI,
  fieldsAPI,
  bodiesAPI,
  searchAPI,
  formatsAPI,
  detailsAPI,
} from "../api/switchers";

export interface GlobalState {
  isLoading: boolean;
  root_server_url: string | null;
  aggregator: any[];
  isMatched: boolean;
  serverDetails: ServerInfo[] | null;
  formats: any | null;
  fields: any | null;
  search: any | null;
  serviceBodies: any | null;
}

const initialState: GlobalState = {
  isLoading: true,
  root_server_url: null,
  aggregator: [],
  isMatched: false,
  serverDetails: null,
  formats: null,
  fields: null,
  search: null,
  serviceBodies: null,
};

const { subscribe, update } = writable(initialState);

const updateRootServerURL = (payload: string) =>
  update((state) => ({ ...state, root_server_url: payload }));

const getStuff = async (payload: string) => {
  update((state) => ({ ...state, root_server_url: payload, isLoading: true }));

  try {
    spinner.show();
    const fieldsResponse = await fetch(payload + fieldsAPI);
    const fieldsData = await fieldsResponse.json();
    update((state) => ({ ...state, fields: fieldsData }));

    const searchResponse = await fetch(payload + searchAPI);
    const searchData = await searchResponse.json();
    update((state) => ({ ...state, search: searchData }));

    const detailsResponse = await fetch(payload + detailsAPI);
    const detailsData = await detailsResponse.json();
    update((state) => ({ ...state, serverDetails: detailsData }));

    const formatsResponse = await fetch(payload + formatsAPI);
    const formatsData = await formatsResponse.json();
    update((state) => ({ ...state, formats: formatsData }));

    const bodiesResponse = await fetch(payload + bodiesAPI);
    const bodiesData = await bodiesResponse.json();

    const renamed = bodiesData.map((item: any) => ({
      id: item.id,
      label: item.name,
      value: item.id,
      parent_id: item.parent_id,
      type: item.type,
    }));

    const root = renamed.filter((node: any) => node.parent_id === "0");
    renamed.forEach((node: any) => {
      if (node.parent_id !== "0") {
        const parentIndex = renamed.findIndex(
          (el: any) => el.id === node.parent_id,
        );
        if (!renamed[parentIndex].children) {
          renamed[parentIndex].children = [node];
        } else {
          renamed[parentIndex].children.push(node);
        }
      }
    });

    update((state) => ({ ...state, serviceBodies: root, isLoading: false }));
    spinner.hide();
  } catch (error) {
    console.error("Error fetching data:", error);
    update((state) => ({ ...state, isLoading: false }));
    spinner.hide();
  }
};

const setLoading = (payload: boolean) =>
  update((state) => ({ ...state, isLoading: payload }));

const setAggregator = async () => {
  update((state) => ({ ...state, isLoading: true }));
  const path = window.location.pathname.split("/");
  const strippedPath = path.slice(0, path.length - 2).join("/");

  try {
    spinner.show();
    const aggregatorResponse = await fetch(aggregatorAPI);
    const aggregatorData = await aggregatorResponse.json();
    aggregatorData.sort((a: any, b: any) => a.name.localeCompare(b.name));
    const matched = aggregatorData.some((i: any) => i.url === strippedPath);
    update((state) => {
      const newState = {
        ...state,
        aggregator: aggregatorData,
        isMatched: matched,
        root_server_url: matched ? strippedPath : state.root_server_url,
        isLoading: false,
      };
      return newState;
    });
    spinner.hide();
  } catch (error) {
    console.error("Error fetching aggregator data:", error);
    update((state) => ({ ...state, isLoading: false }));
    spinner.hide();
  }
};

export const GlobalContext = {
  subscribe,
  updateRootServerURL,
  getStuff,
  setLoading,
  setAggregator,
};
