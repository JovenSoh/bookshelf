import React, { useState } from 'react';
import BookGrid from './components/BookGrid';
import BookModal from './components/BookModal';

export default function App() {
  const [selectedBookId, setSelectedBookId] = useState(null);

  return (
    <div className="min-h-screen text-white" style={{ fontFamily: 'Audrey, Times New Roman, Times, serif' }}>
      <header
        className="flex items-center justify-between px-8 py-5 shadow-md bg-black"
        style={{ fontFamily: 'Audrey, Times New Roman, Times, serif' }}
      >
        <button
          className="text-xl font-bold tracking-tight hover:opacity-80 transition-opacity"
          style={{ letterSpacing: '0.25em' }}
          onClick={() => setSelectedBookId(null)}
        >
          BookShelf
        </button>
      </header>

      {selectedBookId ? (
        <BookModal id={selectedBookId} onBack={() => setSelectedBookId(null)} />
      ) : (
        <BookGrid onSelect={setSelectedBookId} />
      )}
    </div>
  );
}