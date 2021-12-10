// import original module declarations
import 'styled-components';

// and extend them!
declare module 'styled-components' {
  export interface DefaultTheme {
    textColor: string;
    cardbgColor: string;
    bgColor: string;
    descColor: string;
    accentColor: string;
  }
}
