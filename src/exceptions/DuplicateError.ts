export class DuplicateEntryError extends Error {
  fields: any;

  constructor(fields: string[]) {
    super(`${fields} ja em uso` );
  }
}
