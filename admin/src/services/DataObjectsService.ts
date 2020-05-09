import ApiService from "./ApiService";

interface DataField {
  name: string;
  type: string;
  length?: number;
  mandatory: boolean;
  unique: boolean;
}
interface DataObject {
  name: string;
  slug: string;
  fields: DataField[];
}

const DataObjectsService = {
  getAllObjects: async function(): Promise<DataObject[]> {
    try {
      const response: any = await ApiService.get("/data-objects");
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
  getObject: async function(slug: string): Promise<DataObject> {
    try {
      const response: any = await ApiService.get("/data-objects/" + slug);
      const dataObject = response.data;
      return dataObject;
    } catch (error) {
      if (error.response) {
        throw new Error(error.response.data.message);
      } else {
        throw new Error(error);
      }
    }
  },
  createObject: async function(dataObject: DataObject): Promise<DataObject> {
    try {
      const response: any = await ApiService.post("/data-objects", dataObject);
      const dataObjects = response.data;
      return dataObjects;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  },
  removeObject: async function(slug: string) {
    try {
      const response: any = await ApiService.delete("/data-objects", {
        params: { slug: slug },
      });
      const dataObjects = response.data;
      return dataObjects;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  },
};

export default DataObjectsService;
