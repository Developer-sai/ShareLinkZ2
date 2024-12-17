import mongoose, { Schema, Document } from 'mongoose';

export interface ILink extends Document {
  id: string;
  url: string;
  description: string;
  deadline: string;
  visited: boolean;
  tags: string[];
  createdAt: number;
  priority: number;
}

export interface IBoard extends Document {
  id: string;
  name: string;
  description: string;
  links: ILink[];
  type: 'saved' | 'instant';
  createdAt: number;
  tags: string[];
  category: string;
  isArchived: boolean;
}

const LinkSchema: Schema = new Schema({
  id: { type: String, required: true },
  url: { type: String, required: true },
  description: String,
  deadline: String,
  visited: { type: Boolean, default: false },
  tags: [String],
  createdAt: { type: Number, default: Date.now },
  priority: { type: Number, default: 0 },
});

const BoardSchema: Schema = new Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  description: String,
  links: [LinkSchema],
  type: { type: String, enum: ['saved', 'instant'], required: true },
  createdAt: { type: Number, default: Date.now },
  tags: [String],
  category: String,
  isArchived: { type: Boolean, default: false },
});

export default mongoose.model<IBoard>('Board', BoardSchema);

