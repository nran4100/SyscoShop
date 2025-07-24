import API_BASE_URL from '../config';

export const getAllProducts = async (page = 0, size = 10) => {
  const response = await fetch(
    `${API_BASE_URL}/api/v1/products?page=${page}&size=${size}`
  );
  if (!response.ok) throw new Error('Failed to fetch products');

  const data = await response.json();

  return {
    products: data.content || [],
    totalElements: data.totalElements,
    totalPages: data.totalPages,
    currentPage: data.number,
  };
};

// export const getAllProducts = async () => {
//   // Simulate network delay
//   await new Promise(resolve => setTimeout(resolve, 500));

//   return {
//     products: [
//       {
//         id: "prod-1",
//         name: "Orange Juice",
//         price: 3.5,
//         stockCount: 20,
//       },
//       {
//         id: "prod-2",
//         name: "Banana Smoothie",
//         price: 4.0,
//         stockCount: 15,
//       },
//       {
//         id: "prod-3",
//         name: "Carrot Cake",
//         price: 5.25,
//         stockCount: 8,
//       }
//     ]
//   };
// };
