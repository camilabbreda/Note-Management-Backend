import {  Document } from 'mongoose';
export interface iNote extends Document {
  title: string;
  content: string;
  userId: string;
  createdAt: Date;
}