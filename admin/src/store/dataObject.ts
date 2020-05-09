import DataObjectsService from "@/services/DataObjectsService";
import DataService from "@/services/DataService";
import { ActionContext } from "vuex";

interface DataObjectSchema {
  name: string;
  type: string;
  length?: number;
  mandatory: boolean;
  unique: boolean;
}
interface DataObject {
  name: string;
  slug: string;
  fields: DataObjectSchema[];
}

class State {
  public dataObject: DataObject | null;
  public dataObjectData: any[];

  constructor() {
    this.dataObject = null;
    this.dataObjectData = [];
  }
}

const getDataObjectAction = async function(
  { commit }: ActionContext<State, State>,
  objectSlug: string
) {
  const dataObject = await DataObjectsService.getObject(objectSlug);
  commit("setObject", dataObject);
};

const getDataObjectDataAction = async function(
  { commit }: ActionContext<State, State>,
  objectSlug: string
) {
  const dataObjectData = await DataService.getData(objectSlug);
  commit("setObjectData", dataObjectData);
};

const removeDataObjectAction = async function(
  { commit }: ActionContext<State, State>,
  params: any
) {
  await DataService.removeObject(params.slug, params.id);
  commit("removeObjectData", params.id);
};

const createDataObjectAction = async function(
  { commit }: ActionContext<State, State>,
  params: any
) {
  const newItem = await DataService.createObject(params.slug, params.data);
  commit("addObjectData", newItem);
};

const setObjectMutation = function(state: State, dataObject: DataObject) {
  state.dataObject = dataObject;
};

const setObjectDataMutation = function(state: State, dataObjectData: any) {
  state.dataObjectData = dataObjectData;
};

const removeObjectDataMutation = function(state: State, id: string) {
  state.dataObjectData.splice(
    state.dataObjectData.findIndex((item: any) => item._id === id),
    1
  );
};

const addObjectDataMutation = function(state: State, newItem: any) {
  state.dataObjectData.push(newItem);
};

const getDataObjectGetter = function(state: State) {
  return state.dataObject;
};

const getDataObjectDataGetter = function(state: State) {
  return state.dataObjectData;
};

export default {
  namespaced: true,
  getters: {
    getObject: getDataObjectGetter,
    getObjectData: getDataObjectDataGetter,
  },
  mutations: {
    setObject: setObjectMutation,
    setObjectData: setObjectDataMutation,
    removeObjectData: removeObjectDataMutation,
    addObjectData: addObjectDataMutation
  },
  actions: {
    getDataObject: getDataObjectAction,
    getDataObjectData: getDataObjectDataAction,
    removeObjectData: removeDataObjectAction,
    createDataObject: createDataObjectAction
  },
  state: new State(),
};
