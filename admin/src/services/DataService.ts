import ApiService from "./ApiService";

const DataService = {
  getData: async function(slug: string): Promise<any> {
    try {
      const response: any = await ApiService.get("/data/" + slug);
      const dataObjectData = response.data;
      return dataObjectData;
    } catch (error) {
      if (error.response) {
        throw new Error(error.response.data.message);
      } else {
        throw new Error(error);
      }
    }
  },

  removeObject: async function(slug: string, id: string): Promise<boolean> {
    try {
      const response: any = await ApiService.delete("/data/" + slug + "/" + id, {});
      const removeStatus = response.data;
      return removeStatus;
    } catch (error) {
      if (error.response) {
        throw new Error(error.response.data.message);
      } else {
        throw new Error(error);
      }
    }
  },

  createObject: async function(slug: string, data: any): Promise<boolean> {
    try {
      const response: any = await ApiService.post("/data/" + slug, data);
      const dataObjects = response.data;
      return dataObjects;
    } catch (error) {
      if (error.response) {
        throw new Error(error.response.data.message);
      } else {
        throw new Error(error);
      }
    }
  },
};

export default DataService;
