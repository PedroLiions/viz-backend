export interface Row {
  title: string;
  style: Style;
}

export interface Style {
  backgroundColor: string;
  color: string;
  fontSize: string | null;
  fontFamily: string | null;
  textAlign: 'left' | 'center' | 'right' | 'fill' | 'justify' | 'centerContinuous' | 'distributed';
}
