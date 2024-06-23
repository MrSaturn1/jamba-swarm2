import { FC, ReactNode } from "react";

export const Table: FC<{ children: ReactNode }> = ({ children }) => (
  <table className="min-w-full bg-white">{children}</table>
);

export const TableHeader: FC<{ children: ReactNode }> = ({ children }) => (
  <thead className="bg-gray-50">
    {children}
  </thead>
);

export const TableRow: FC<{ children: ReactNode }> = ({ children }) => (
  <tr>{children}</tr>
);

export const TableHead: FC<{ children: ReactNode }> = ({ children }) => (
  <th className="py-2 px-4 border-b border-gray-200 bg-gray-100 text-black">{children}</th>
);

export const TableBody: FC<{ children: ReactNode }> = ({ children }) => (
  <tbody>
    {children}
  </tbody>
);

export const TableCell: FC<{ children: ReactNode }> = ({ children }) => (
  <td className="py-2 px-4 border-b border-gray-200 text-black">{children}</td>
);
