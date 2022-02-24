const newInvoice = async (): Promise<any> => {
  return new Promise<{ data: number }>((resolve) =>
    setTimeout(() => resolve({ data: 5 }), 2000)
  );
};
export default newInvoice;
