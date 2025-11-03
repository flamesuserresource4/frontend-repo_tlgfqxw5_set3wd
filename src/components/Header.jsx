import React from 'react';
import { Rocket } from 'lucide-react';

export default function Header() {
  return (
    <header className="w-full">
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex items-center gap-3 pt-8">
          <div className="h-9 w-9 rounded-lg bg-gradient-to-tr from-violet-600 to-sky-500 text-white flex items-center justify-center shadow-lg shadow-sky-500/30">
            <Rocket className="h-5 w-5" />
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900">
            Stay Finder
          </h1>
        </div>
        <p className="mt-2 text-gray-600">
          Load an Excel file and instantly filter stays by college and rent range.
        </p>
      </div>
    </header>
  );
}
