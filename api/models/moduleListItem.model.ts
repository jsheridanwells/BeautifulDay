import { Schema, model, Model, Document } from 'mongoose';

const ModuleListItemSchema = new Schema({
  name: String,
  endpoint: String,
  link: String,
  order: Number,
  active: { type: Boolean, default: true }
});

export interface ModuleListItem {
  names: string;
  endpoint: string;
  links: string;
  order: number;
  active: boolean;
}

interface ModuleListItemBaseDocument extends ModuleListItem, Document {  }
export interface ModuleListItemDocument extends ModuleListItemBaseDocument {  }
export interface ModuleListItemPopulatedDocument extends ModuleListItemBaseDocument {  }
export interface ModuleListItemModel extends Model<ModuleListItemDocument> {  }
export default model<ModuleListItemDocument, ModuleListItemModel>('ModuleListItem', ModuleListItemSchema);
