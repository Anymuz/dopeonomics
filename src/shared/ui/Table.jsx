
// Table - Just eliminates CSS repetition
import React from 'react';

const Table = ({ children, className = "", ...props }) => {
  return (
    <table className={`strain-table ${className}`} {...props}>
      {children}
    </table>
  );
};

const TableHead = ({ children, className = "", ...props }) => {
  return (
    <thead className={`bg-gray-50 ${className}`} {...props}>
      {children}
    </thead>
  );
};

const TableBody = ({ children, className = "", ...props }) => {
  return (
    <tbody className={`bg-white divide-y divide-gray-200 ${className}`} {...props}>
      {children}
    </tbody>
  );
};

const TableHeader = ({ children, sortable = false, onClick, className = "", ...props }) => {
  return (
    <th 
      className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${sortable ? 'cursor-pointer' : ''} ${className}`}
      onClick={sortable ? onClick : undefined}
      {...props}
    >
      {children}
    </th>
  );
};

const TableRow = ({ children, className = "", ...props }) => {
  return (
    <tr className={`hover:bg-gray-50 transition-colors ${className}`} {...props}>
      {children}
    </tr>
  );
};

const TableCell = ({ children, className = "", ...props }) => {
  return (
    <td className={`px-6 py-4 whitespace-nowrap text-gray-800 ${className}`} {...props}>
      {children}
    </td>
  );
};

Table.Head = TableHead;
Table.Body = TableBody;
Table.Header = TableHeader;
Table.Row = TableRow;
Table.Cell = TableCell;

export default Table;
