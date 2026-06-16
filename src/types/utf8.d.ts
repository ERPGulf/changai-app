declare module "utf8" {
  const utf8: {
    encode(str: string): string;
    decode(str: string): string;
  };

  export default utf8;
}