function getUniqueId() {
  return crypto.randomUUID();
}

export const createRows = (no: number) => {
  let rows: { id: string; text: string }[] = [];
  for (let i = 0; i < no; i += 1) {
    rows.push({
      id: getUniqueId(),
      text: "text",
    });
  }
  return rows;
};

export const fetchNetworkDelay = ({
  pageNumber,
  pageSize,
  noOfRows,
  delay,
}: any) => {
  return new Promise((res) => {
    setTimeout(() => {
      res(createRows(noOfRows!));
    }, delay || 100);
  });
};
