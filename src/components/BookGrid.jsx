import React, { useState, useRef } from 'react';
import books from '../data/books.json';

const TABS_PER_ROW = 5;
const PANEL_WIDTH = 700;
const ANIMATION_DURATION = 500; // ms

function chunkArray(array, size) {
  const result = [];
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }
  return result;
}

function AccordionContent({ book, expanded }) {
  return (
    <div
      className={`flex h-full items-center transition-[width] duration-500 ease-in-out overflow-hidden bg-black ${expanded ? 'w-[700px]' : 'w-0 pointer-events-none'}`}
      style={{ minWidth: expanded ? PANEL_WIDTH : 0, width: expanded ? PANEL_WIDTH : 0 }}
    >
      {expanded && (
        <>
          <img
            src={book.coverImage}
            alt={book.title}
            className="w-[220px] h-[350px] object-cover rounded-xl shadow-2xl mr-8 ml-8 bg-black"
          />
          <div className="flex-1 flex flex-col justify-center pr-8 bg-black">
            <h3 className="text-xl font-semibold mb-2">Synopsis</h3>
            <p className="text-gray-300 mb-6">{book.synopsis}</p>
            <h3 className="text-xl font-semibold mb-2">My Notes</h3>
            <textarea
              defaultValue={book.notes}
              className="w-full bg-black text-white p-3 rounded-lg border border-gray-700 focus:outline-none min-h-[80px] resize-none shadow-md"
              rows={4}
              readOnly
            />
          </div>
        </>
      )}
    </div>
  );
}

export default function BookGrid() {
  const bookRows = chunkArray(books, TABS_PER_ROW);
  const [openIndexes, setOpenIndexes] = useState(bookRows.map(() => 0));
  const [animating, setAnimating] = useState(false);
  const animationTimeout = useRef(null);

  const handleTabClick = (rowIdx, tabIdx) => {
    if (animating || openIndexes[rowIdx] === tabIdx) return;
    setAnimating(true);
    setOpenIndexes((prev) => prev.map((open, i) => (i === rowIdx ? tabIdx : open)));
    if (animationTimeout.current) clearTimeout(animationTimeout.current);
    animationTimeout.current = setTimeout(() => {
      setAnimating(false);
    }, ANIMATION_DURATION);
  };

  return (
    <main className="min-h-screen px-4 sm:px-12 py-12 text-white">
      <div className="flex flex-col space-y-12 items-center">
        {bookRows.map((row, rowIdx) => {
          const expandedIdx = openIndexes[rowIdx];
          const leftTabs = row.slice(0, expandedIdx + 1);
          const rightTabs = row.slice(expandedIdx + 1);
          return (
            <div key={rowIdx} className="flex items-center justify-center w-full max-w-6xl rounded-xl shadow-lg overflow-visible h-[400px]">
              {/* Left Tabs */}
              <div className="flex flex-row h-full">
                {leftTabs.map((book, tabIdx) => {
                  const realIdx = tabIdx;
                  return (
                    <button
                      key={book.id}
                      onClick={() => handleTabClick(rowIdx, realIdx)}
                      className={`flex items-end justify-center h-full w-16 border-r border-gray-800 bg-black transition-all duration-200 focus:outline-none ${
                        expandedIdx === realIdx
                          ? 'bg-[#232323] text-white font-bold' : 'text-gray-400 hover:text-white'
                      }`}
                      style={{ writingMode: 'vertical-rl', textOrientation: 'mixed', fontSize: '1.1rem', letterSpacing: '0.05em' }}
                      disabled={animating}
                    >
                      {book.title}
                    </button>
                  );
                })}
              </div>
              {/* Animated Expanded Content */}
              <AccordionContent book={row[expandedIdx]} expanded={true} />
              {/* Right Tabs - animate marginLeft to shift right */}
              <div
                className="flex flex-row h-full transition-[margin] duration-500 ease-in-out"
                style={{ marginLeft: expandedIdx === row.length - 1 ? 0 : 0 }}
              >
                {rightTabs.map((book, tabIdx) => {
                  const realIdx = expandedIdx + 1 + tabIdx;
                  return (
                    <button
                      key={book.id}
                      onClick={() => handleTabClick(rowIdx, realIdx)}
                      className={`flex items-end justify-center h-full w-16 border-r border-gray-800 bg-black transition-all duration-200 focus:outline-none text-gray-400 hover:text-white`}
                      style={{ writingMode: 'vertical-rl', textOrientation: 'mixed', fontSize: '1.1rem', letterSpacing: '0.05em' }}
                      disabled={animating}
                    >
                      {book.title}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}