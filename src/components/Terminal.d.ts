import { ComponentType, Ref } from 'preact';

declare module 'styled-components' {
  export interface DefaultTheme {
    // Add your theme types here if needed
  }
}

interface InputWrapperProps {
  hasValue: boolean;
}

interface TerminalProps {
  value: string;
  data: {
    error: boolean;
    data: string[];
  };
  onEnter: (event: KeyboardEvent) => void;
  keywords: string[];
  terminalRef?: Ref<HTMLInputElement>;
}

declare const Terminal: ComponentType<TerminalProps>;

export { InputWrapperProps };
export default Terminal;
