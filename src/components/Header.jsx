import React from 'react';

export default function Header() {
  return (
    <header className="w-full py-8">
      <div className="max-w-5xl mx-auto px-4">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Stay Finder</h1>
        <p className="mt-2 text-gray-600">
          Load an Excel file and instantly filter stays by college and rent range.
        </p>
      </div>
    </header>
  );
}
