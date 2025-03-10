/*import { QtySelector } from "@/components/product/qty-selector/qty-selector";
import { CartItem } from "@/interfaces/types";

describe("QtySelector Component", () => {
  beforeEach(() => {
    // Mock the useCartStore hook
    cy.window().then((win: any) => {
      win.mockCartStore = {
        items: [{ id: "test-item-1", quantity: 2 } as CartItem],
        updateItemQuantity: cy.stub().as("updateItemQuantity"),
      };

      // Create a test component that renders QtySelector
      win.document.body.innerHTML = `<div id="root"></div>`;
      const React = win.React;
      const createRoot = win.createRoot;

      // Mount component with mocked store
      createRoot(
        React.createElement(() => {
          // Use the mocked store
          const { items, updateItemQuantity } = win.mockCartStore;
          return React.createElement(
            "div",
            { "data-cy": "qty-selector-test" },
            React.createElement(win.QtySelector, {
              id: "test-item-1",
              updateCart: true,
            })
          );
        }),
        win.document.getElementById("root")
      );
    });

    cy.visit("/cypress/components/qty-selector");
  });

  it("should display the initial quantity from cart store", () => {
    cy.get("span.bg-gray-200").should("contain", "2");
  });

  it("should increase quantity when plus button is clicked", () => {
    cy.get("button").contains("+").click();
    cy.get("span.bg-gray-200").should("contain", "3");
    cy.get("@updateItemQuantity").should(
      "have.been.calledWith",
      "test-item-1",
      3
    );
  });

  it("should decrease quantity when minus button is clicked", () => {
    cy.get("button").first().click();
    cy.get("span.bg-gray-200").should("contain", "1");
    cy.get("@updateItemQuantity").should(
      "have.been.calledWith",
      "test-item-1",
      1
    );
  });

  it("should not decrease quantity below 1", () => {
    // First click to get to 1
    cy.get("button").first().click();
    cy.get("span.bg-gray-200").should("contain", "1");

    // Second click should not decrease further
    cy.get("button").first().click();
    cy.get("span.bg-gray-200").should("contain", "1");
  });

  it("should not increase quantity above 10", () => {
    // Create a test with initial quantity of 10
    cy.window().then((win: any) => {
      win.mockCartStore.items = [
        { id: "test-item-1", quantity: 10 } as CartItem,
      ];
      cy.mount(<QtySelector id="test-item-1" />);
    });

    // Try to increase above 10
    cy.get("button").eq(1).click();
    cy.get("span.bg-gray-200").should("contain", "10");
  });

  it("should call onQuantityChange callback when quantity changes", () => {
    cy.window().then((win: any) => {
      const onQuantityChange = cy.stub().as("onQuantityChangeCallback");

      // Mount with callback
      cy.mount(
        <QtySelector id="test-item-1" onQuantityChange={onQuantityChange} />
      );
    });

    cy.get("button").eq(1).click(); // Click increase button
    cy.get("@onQuantityChangeCallback").should("have.been.calledWith", 3);
  });

  it("should not update cart when updateCart is false", () => {
    cy.window().then((win: any) => {
      // Mount with updateCart=false
      cy.mount(<QtySelector id="test-item-1" updateCart={false} />);
    });

    cy.get("button").eq(1).click(); // Click increase button
    cy.get("@updateItemQuantity").should("not.have.been.called");
    cy.get("span.bg-gray-200").should("contain", "3"); // Still updates UI
  });
});
*/
