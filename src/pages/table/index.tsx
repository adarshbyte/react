import React, { useMemo } from "react";
import Table from "../../components/Table";

type InventoryRow = {
  name: string;
  category: string;
  stock: number;
  price: string;
};

const TablePage = () => {
  const data = useMemo<InventoryRow[]>(
    () =>
      Array.from({ length: 6 }, (_, index) => ({
        name: 'Product' ,
        category: ["Home", "Garden", "Kitchen", "Outdoor"][index % 4],
        stock: Math.floor(Math.random() * 50) + 1,
        price: '',
      })),
    []
  );

  const config = useMemo(
    () => [
      { name: "Name", key: "name" as const },
      { name: "Category", key: "category" as const },
      { name: "In Stock", key: "stock" as const },
      { name: "Price", key: "price" as const },
    ],
    []
  );

  return (
    <section>
      <h2>Product Inventory</h2>
      <Table data={data} config={config} />
    </section>
  );
};

export default TablePage;
