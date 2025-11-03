import React, { useEffect, useMemo, useState } from 'react';
import Hero from './components/Hero.jsx';
import Header from './components/Header.jsx';
import Filters from './components/Filters.jsx';
import ResultsTable from './components/ResultsTable.jsx';
import Message from './components/Message.jsx';
import * as XLSX from 'xlsx';

const COLLEGES = ['IMI', 'FORE', 'IIT', 'IIFT'];

function App() {
  const [rawData, setRawData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState({ college: '', rent: '' });

  // Load Excel from public/data.xlsx
  useEffect(() => {
    let isMounted = true;
    async function loadExcel() {
      setLoading(true);
      setError('');
      try {
        const res = await fetch('/data.xlsx');
        if (!res.ok) {
          throw new Error(`Unable to load data.xlsx (status ${res.status})`);
        }
        // Try parsing as ArrayBuffer first
        const ab = await res.arrayBuffer();
        let wb;
        try {
          wb = XLSX.read(ab, { type: 'array' });
        } catch (e1) {
          // Fallback: if file served as base64 text content
          const asText = new TextDecoder().decode(new Uint8Array(ab));
          const binary = atob(asText.trim());
          wb = XLSX.read(binary, { type: 'binary' });
        }
        const firstSheetName = wb.SheetNames[0];
        const sheet = wb.Sheets[firstSheetName];
        const json = XLSX.utils.sheet_to_json(sheet, { defval: '' });
        const normalized = json.map(normalizeRow).filter((r) => r.College && r.Stay);
        if (isMounted) setRawData(normalized);
      } catch (err) {
        console.error(err);
        if (isMounted) setError('Could not load data.xlsx. You can still interact with the filters, but no results will be shown until data is available.');
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    loadExcel();
    return () => {
      isMounted = false;
    };
  }, []);

  const filtered = useMemo(() => applyFilters(rawData, filters), [rawData, filters]);

  const handleReset = () => setFilters({ college: '', rent: '' });

  return (
    <div className="min-h-screen bg-slate-50">
      <Hero />

      <div className="-mt-12 md:-mt-16" />

      <div className="relative">
        {/* Decorative gradient stripe */}
        <div aria-hidden className="pointer-events-none absolute inset-x-0 -top-8 h-16 bg-gradient-to-b from-black/20 to-transparent" />

        <Header />

        <main className="max-w-5xl mx-auto px-4 pb-20 space-y-6">
          <Filters
            colleges={COLLEGES}
            values={filters}
            onChange={setFilters}
            onReset={handleReset}
            disabled={loading}
          />

          {error && (
            <Message
              variant="warning"
              title="Data file not found"
              description={error}
            />
          )}

          {!loading && filtered.length === 0 && (filters.college === '' && filters.rent === '') && (
            <Message
              variant="info"
              title="Please use filters to search for stays."
              description="Select a college and/or a rent range to see matching results."
            />
          )}

          {!loading && filtered.length === 0 && (filters.college !== '' || filters.rent !== '') && (
            <Message
              variant="error"
              title="No results found"
              description="Try adjusting your filters to find matching stays."
            />
          )}

          <ResultsTable rows={filtered} />
        </main>
      </div>
    </div>
  );
}

export default App;

// Helpers
function normalizeRow(row) {
  // Standardize keys and types we care about
  const College = row.College ?? row.college ?? '';
  const Stay = row.Stay ?? row.stay ?? '';
  const Rent = toNumber(row.Rent ?? row.rent);
  const Rating = row.Rating ?? row.rating ?? '';
  return { College, Stay, Rent, Rating };
}

function toNumber(v) {
  if (v == null || v === '') return null;
  if (typeof v === 'number') return v;
  if (typeof v === 'string') {
    const cleaned = v.toLowerCase().replace(/[\,\s]/g, '');
    if (cleaned.endsWith('k')) {
      const base = parseFloat(cleaned.replace('k', ''));
      return isNaN(base) ? null : base * 1000;
    }
    const n = parseFloat(cleaned);
    return isNaN(n) ? null : n;
  }
  return null;
}

function applyFilters(data, filters) {
  return data.filter((row) => {
    // College filter
    if (filters.college && row.College !== filters.college) return false;

    // Rent filter
    if (filters.rent) {
      const rent = row.Rent ?? null;
      if (rent == null) return false;
      switch (filters.rent) {
        case 'lt_10000':
          if (!(rent < 10000)) return false;
          break;
        case '10_15':
          if (!(rent >= 10000 && rent <= 15000)) return false;
          break;
        case '15_20':
          if (!(rent > 15000 && rent <= 20000)) return false;
          break;
        case 'gt_20000':
          if (!(rent > 20000)) return false;
          break;
        default:
          break;
      }
    }

    return true;
  });
}
