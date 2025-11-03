import React from 'react';

const RENT_OPTIONS = [
  { id: '', label: 'Any rent' },
  { id: 'lt_10000', label: 'Less than 10k' },
  { id: '10_15', label: '10k to 15k' },
  { id: '15_20', label: '15k to 20k' },
  { id: 'gt_20000', label: 'More than 20k' },
];

export default function Filters({ colleges, values, onChange, onReset, disabled }) {
  return (
    <section className="w-full bg-white/70 backdrop-blur rounded-xl border border-gray-200 shadow-sm">
      <div className="p-4 md:p-5 grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">College</label>
          <select
            className="h-10 rounded-md border border-gray-300 bg-white px-3 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-60"
            value={values.college}
            onChange={(e) => onChange({ ...values, college: e.target.value })}
            disabled={disabled}
          >
            <option value="">Any college</option>
            {colleges.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">Rent range</label>
          <select
            className="h-10 rounded-md border border-gray-300 bg-white px-3 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-60"
            value={values.rent}
            onChange={(e) => onChange({ ...values, rent: e.target.value })}
            disabled={disabled}
          >
            {RENT_OPTIONS.map((o) => (
              <option key={o.id} value={o.id}>{o.label}</option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-2 md:col-span-2">
          <label className="text-sm font-medium text-gray-700">Actions</label>
          <div className="flex items-center gap-3">
            <button
              className="h-10 px-4 rounded-md bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition disabled:opacity-60"
              onClick={onReset}
              disabled={disabled}
              type="button"
            >
              Reset Filters
            </button>
            {disabled && (
              <span className="text-sm text-gray-500">Loading data…</span>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export { RENT_OPTIONS };
