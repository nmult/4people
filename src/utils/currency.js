const MAX = 80;
const MIN = 20;

export function getUSD() {
  return Math.random() * (MAX - MIN) + MIN;
}