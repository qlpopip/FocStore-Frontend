export const shortenAddress = (address: string): string => {
  const start = address.substring(0, 5);
  const end = address.substring(address.length - 5);
  return `${start}...${end}`;
};
