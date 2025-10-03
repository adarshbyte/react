import { ItemType } from ".";

const data: ItemType[] = [
  {
    title: "Fruits",
    content: [
      {
        title: "Citrus",
        content: [
          { title: "Orange", content: "A sweet citrus fruit" },
          { title: "Lemon", content: "A sour citrus fruit" },
        ],
      },
      {
        title: "Berries",
        content: [
          { title: "Strawberry", content: "A red, juicy berry" },
          { title: "Blueberry", content: "A small blue berry" },
        ],
      },
    ],
  },
  {
    title: "Vegetables",
    content: [
      {
        title: "Leafy Greens",
        content: [
          { title: "Spinach", content: "Rich in iron" },
          { title: "Lettuce", content: "Crunchy and fresh" },
        ],
      },
      {
        title: "Roots",
        content: [
          { title: "Carrot", content: "Orange root vegetable" },
          { title: "Beetroot", content: "Deep red root vegetable" },
        ],
      },
    ],
  },
  {
    title: "Dairy",
    content: [
      { title: "Milk", content: "Whole milk description" },
      { title: "Cheese", content: "Aged cheddar cheese description" },
    ],
  },
];

export default data;