import React from 'react';

export default function ResultsTable({ rows }) {
  if (!rows || rows.length === 0) return null;

  return (
    <div className="w-full overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <Th>College</Th>
            <Th>Stay</Th>
            <Th>Rent</Th>
            <Th>Rating</Th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {rows.map((r, idx) => (
            <tr key={idx} className="hover:bg-gray-50/70">
              <Td>{r.College ?? '-'}</Td>
              <Td>{r.Stay ?? '-'}</Td>
              <Td>{formatCurrency(r.Rent)}</Td>
              <Td>{r.Rating ?? '-'}</Td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Th({ children }) {
  return (
    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-600">
      {children}
    </th>
  );
}

function Td({ children }) {
  return <td className="px-4 py-3 text-sm text-gray-900">{children}</td>;
}

function formatCurrency(val) {
  const num = toNumber(val);
  if (num == null || isNaN(num)) return val ?? '-';
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(num);
}

function toNumber(v) {
  if (v == null) return null;
  if (typeof v === 'number') return v;
  if (typeof v === 'string') {
    const cleaned = v.toLowerCase().replace(/[,\s]/g, '');
    if (cleaned.endsWith('k')) {
      const base = parseFloat(cleaned.replace('k', ''));
      return isNaN(base) ? null : base * 1000;
    }
    const n = parseFloat(cleaned);
    return isNaN(n) ? null : n;
  }
  return null;
}
