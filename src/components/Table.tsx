import React from "react";

type TableRow = Record<string, React.ReactNode>;

type TableConfig<T extends TableRow> = {
  name: string;
  key: keyof T;
  value?: (row: T) => React.ReactNode;
};

type TableProps<T extends TableRow> = {
  data: T[];
  config: Array<TableConfig<T>>;
};

const Table = <T extends TableRow>({ data, config }: TableProps<T>) => {
  if (!data.length) {
    return <p>No data available.</p>;
  }

  return (
    <table>
      <thead>
        <tr>
          {config.map((column) => (
            <th key={String(column.key)}>{column.name}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {config.map((column) => (
              <td key={String(column.key)}>
                {column.value ? column.value(row) : row[column.key] ?? "-"}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
