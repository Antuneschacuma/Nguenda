export abstract class Entity {
  private readonly id: string;

  protected constructor(id: string) {
    this.id = id;
  }

  public getId(): string {
    return this.id;
  }
}
