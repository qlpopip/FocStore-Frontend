// declare module "*.png" {
//   const value: any;
//   export = value;
// }
declare module "*.jpg" {
  const value: any;
  export = value;
}
declare module "*.jpeg" {
  const value: any;
  export = value;
}
// declare module "*.svg" {
//   const value: any;
//   export = value;
// }
declare module "*.gif" {
  const value: any;
  export = value;
}
declare module "*.mp4" {
  const value: any;
  export = value;
}
declare module "*.mp3" {
  const value: any;
  export = value;
}
declare module "react-scroll-trigger";

interface Ethereum {
  request: (args: any) => Promise<any>;
  on: (args: any, callback: any) => Promise<any>;

  removeListener: (args: any, callback: any) => Promise<any>;
  // Add any other methods or properties you access on the ethereum object here.
}

interface Window {
  ronin?: Ethereum;
}
