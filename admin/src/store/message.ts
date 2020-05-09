interface Message {
    type: string;
    message: string;
    time?: number;
}

class State {
    public message: Message;

  constructor() {
    this.message = {} as Message;
  }
}

export default {
  namespaced: true,
  getters: {},
  mutations: {},
  actions: {},
  state: new State(),
};
