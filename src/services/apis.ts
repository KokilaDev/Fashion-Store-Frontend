import { type Product, MOCK_PRODUCTS } from '../types/types';

/**
 * Simulates a high-fidelity server-side API call to retrieve new arrival products.
 * Includes adjustable network delay and support for triggering simulated failures
 * to verify correct e-commerce error handling.
 */
export async function getLatestProducts(simulateError = false): Promise<Product[]> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (simulateError) {
        reject(new Error("Network connection lost. Failed to fetch latest arrivals. Please retry."));
      } else {
        const latestProducts = MOCK_PRODUCTS.filter(product => product.isNew);
        resolve(latestProducts);
      }
    }, 1200); // 1.2-second network latency simulation
  });
}
