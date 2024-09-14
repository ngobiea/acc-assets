import { customAlphabet } from 'nanoid';

// Define the alphabet as numbers (0-9) and capital letters (A-Z)
const alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';

// Create a nanoid function with the custom alphabet and length of 8
const nanoid = customAlphabet(alphabet, 10);

export { nanoid };

