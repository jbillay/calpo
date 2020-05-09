import DataObjectsService from '@/services/DataObjectsService';
import { ActionContext } from "vuex";

interface CalpoDataField {
  name: string;
  type: string;
  length?: number;
  mandatory: boolean;
  unique: boolean;
}
interface CalpoDataObject {
  name: string;
  slug: string;
  fields: CalpoDataField[];
}

class State {
  public dataObjects: CalpoDataObject[];

  constructor() {
    this.dataObjects = [];
  }
}

const createDataObjectsAction = async function(
  { commit }: ActionContext<State, State>,
  objectInfo: any
) {
  const newDataObject = await DataObjectsService.createObject(objectInfo);
  commit("addObject", newDataObject);
};

const getDataObjectsAction = async function({ commit }: ActionContext<State, State>) {
  const allDataObject = await DataObjectsService.getAllObjects();
  commit("setObjects", allDataObject);
};

const removeDataObjectsAction = async function(
  { commit }: ActionContext<State, State>,
  objectSlug: string
) {
  const removeStatus = await DataObjectsService.removeObject(objectSlug);
  if (removeStatus) {
    commit("removeObject", objectSlug);
  } else {
    // TODO: Replace console by a user message in the UI using message store
    console.error("Object Not Removed !")
  }
};

const addObjectMutation = function(
  state: State,
  newDataObject: CalpoDataObject
) {
  state.dataObjects.push(newDataObject);
};

const setObjectsMutation = function(
  state: State,
  dataObjects: CalpoDataObject[]
) {
  state.dataObjects = dataObjects;
};

const removeObjectMutation = function(
  state: State,
  dataObjectSlug: string
) {
  state.dataObjects.splice(
    state.dataObjects.findIndex((item) => item.slug === dataObjectSlug),
    1
  );
};

const allDataObjectsGetter = function(state: State) {
  return state.dataObjects;
};

export default {
  namespaced: true,
  getters: {
    all: allDataObjectsGetter,
  },
  mutations: {
    addObject: addObjectMutation,
    setObjects: setObjectsMutation,
    removeObject: removeObjectMutation
  },
  actions: {
    getDataObjects: getDataObjectsAction,
    createDataObject: createDataObjectsAction,
    removeDataObject: removeDataObjectsAction,
  },
  state: new State(),
};
