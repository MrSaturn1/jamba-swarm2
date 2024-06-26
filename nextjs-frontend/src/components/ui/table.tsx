// Table.tsx
import { FC, ReactNode } from "react";

interface TableProps {
  children: ReactNode;
  className?: string;
}

interface TableElementProps {
  children: ReactNode;
  className?: string;
}

export const Table: FC<TableProps> = ({ children, className }) => (
  <table className={`min-w-full bg-white ${className}`}>{children}</table>
);

export const TableHeader: FC<TableElementProps> = ({ children, className }) => (
  <thead className={`bg-gray-50 ${className}`}>
    {children}
  </thead>
);

export const TableRow: FC<TableElementProps> = ({ children, className }) => (
  <tr className={className}>{children}</tr>
);

export const TableHead: FC<TableElementProps> = ({ children, className }) => (
  <th className={`py-2 px-4 border-b border-gray-200 bg-gray-100 text-black ${className}`}>{children}</th>
);

export const TableBody: FC<TableElementProps> = ({ children, className }) => (
  <tbody className={className}>
    {children}
  </tbody>
);

export const TableCell: FC<TableElementProps> = ({ children, className }) => (
  <td className={`py-2 px-4 border-b border-gray-200 ${className}`}>{children}</td>
);
