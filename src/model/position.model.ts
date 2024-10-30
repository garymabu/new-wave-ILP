// this class got butchered during automatic conversion. Ill just live with it for now
export interface IncompletePosition {
  ID: string;
  Title: string;
  field_1: string;
  field_4: string;
  Teto: string;
}

export interface CompletePosition extends IncompletePosition {
  field_3: string;
}