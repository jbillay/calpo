
export class DataObjectsEntity {
  id: string;
  name: string;
  slug: string;
  fields: [];

  constructor(partial: Partial<DataObjectsEntity>) {
    Object.assign(this, partial);
  }
}