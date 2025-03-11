// __mocks__/cart-store.ts
export const useCartStore = jest.fn(() => ({
  items: [{ id: "1", quantity: 1 }],
  updateItemQuantity: jest.fn(),
}));
