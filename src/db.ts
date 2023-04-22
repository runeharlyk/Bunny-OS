import Dexie, { type Table } from 'dexie';

export interface FileModel {
  id?: number;
  name: string;
  path: string;
  content?: ArrayBuffer;
  mime?:string;
  size:number;
  createdAt?:Date;
  modifiedAt?:Date;
}

export class FileSystem extends Dexie {
  files!: Table<FileModel>; 

  constructor() {
    super('fileSystem');
    this.version(1).stores({
      files: '++id, name, path, content, mime, size, createdAt, modifiedAt' // Primary key and indexed props
    });
  }
}

export const db = new FileSystem();