export function smallestPrimeNumberGreaterThanDocuments(count: number) {
  let newCount = count + 1;
  while (!prime(newCount)) {
    newCount++;
  }
  return newCount;
}
function prime(num: number) {
  if (num < 2) return false;
  if (num === 2) return true;
  if (num % 2 === 0) return false;

  for (let i = 3; i <= Math.sqrt(num); i += 2) {
    if (num % i === 0) return false;
  }
  return true;
}
