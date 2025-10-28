export {}; // module

declare global {
  interface Window {
    pageTransition?: (link: string) => void;
  }
}
