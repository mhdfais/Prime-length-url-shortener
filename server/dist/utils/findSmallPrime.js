"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.smallestPrimeNumberGreaterThanDocuments = smallestPrimeNumberGreaterThanDocuments;
function smallestPrimeNumberGreaterThanDocuments(count) {
    let newCount = count + 1;
    while (!prime(newCount)) {
        newCount++;
    }
    return newCount;
}
function prime(num) {
    if (num < 2)
        return false;
    if (num === 2)
        return true;
    if (num % 2 === 0)
        return false;
    for (let i = 3; i <= Math.sqrt(num); i += 2) {
        if (num % i === 0)
            return false;
    }
    return true;
}
