export interface CySelector {
  tag?: string;
  id?: string;
  class?: string;
  dataCy?: string;
}

export type CySelectorWithoutTag = Omit<CySelector, "tag">;

export class CySelectorTag implements CySelector {
  public readonly id?: string;
  public readonly class?: string;
  public readonly dataCy?: string;

  constructor(
    public readonly tag: string,
    selectorWithoutTag?: CySelectorWithoutTag,
  ) {
    this.id = selectorWithoutTag?.id;
    this.class = selectorWithoutTag?.class;
    this.dataCy = selectorWithoutTag?.dataCy;
  }
}
