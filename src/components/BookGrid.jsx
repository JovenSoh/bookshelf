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

function getRandomIndexes(rows) {
  return rows.map(row => Math.floor(Math.random() * row.length));
}

function AccordionContent({ book, expanded, isMobile }) {
  return (
    <div
      className={`flex items-center transition-[width] duration-500 ease-in-out overflow-hidden bg-black ${
        isMobile
          ? `w-full max-w-full ${expanded ? 'h-auto py-6' : 'h-0 py-0'}`
          : `${expanded ? 'w-[700px]' : 'w-0'} h-full`
      }`}
      style={
        isMobile
          ? { minWidth: expanded ? '100%' : 0, width: expanded ? '100%' : 0, paddingLeft: expanded ? 0 : 0, paddingRight: expanded ? 0 : 0 }
          : { minWidth: expanded ? PANEL_WIDTH : 0, width: expanded ? PANEL_WIDTH : 0 }
      }
    >
      {expanded && (
        <div className={`flex ${isMobile ? 'flex-col items-center w-full' : 'flex-row items-center w-full h-full'}`}>
          <img
            src={book.coverImage}
            alt={book.title}
            className={`object-cover rounded-xl shadow-2xl ${isMobile ? 'w-40 h-56 mb-4' : 'w-[220px] h-[350px] mr-8 ml-8 bg-black'}`}
          />
          <div className={`flex-1 flex flex-col justify-center ${isMobile ? 'items-center px-2' : 'pr-8 bg-black'}`}>
            <h1 className={`font-bold mb-2 ${isMobile ? 'text-2xl text-center' : 'text-3xl'}`}>{book.title}</h1>
            <h2 className={`mb-4 font-medium text-gray-300 ${isMobile ? 'text-base text-center' : 'text-lg mb-6'}`}>By {book.author}</h2>
            <h3 className={`font-semibold mb-2 ${isMobile ? 'text-lg' : 'text-xl'}`}>Synopsis</h3>
            <p className={`mb-4 text-gray-300 ${isMobile ? 'text-sm text-center' : 'mb-6'}`}>{book.synopsis}</p>
            <h3 className={`font-semibold mb-2 ${isMobile ? 'text-lg' : 'text-xl'}`}>My Notes</h3>
            <textarea
              value={book.notes}
              className={`w-full bg-black text-white resize-none shadow-md ${isMobile ? 'rounded-lg focus:outline-none min-h-[60px] text-sm' : 'rounded-lg focus:outline-none '}`}
              rows={isMobile ? 3 : 4}
              readOnly
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default function BookGrid() {
  const bookRows = chunkArray(books, TABS_PER_ROW);
  const [openIndexes, setOpenIndexes] = useState(() => getRandomIndexes(bookRows));
  const [animating, setAnimating] = useState(false);
  const animationTimeout = useRef(null);

  // Responsive check
  const [isMobile, setIsMobile] = React.useState(false);
  React.useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth < 768);
    }
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
    <main className="min-h-screen px-2 sm:px-4 md:px-12 py-8 md:py-12 text-white">
      <div className="flex flex-col items-center">
        {bookRows.map((row, rowIdx) => {
          const expandedIdx = openIndexes[rowIdx];
          return (
            <div
              key={rowIdx}
              className={`flex items-center justify-center w-full max-w-6xl rounded-xl shadow-lg overflow-visible ${isMobile ? 'h-auto flex-col' : 'h-[350px] flex-row'}`}
            >
              {/* Tabs Row (scrollable on mobile) */}
              <div className={`flex ${isMobile ? 'flex-row w-full overflow-x-auto no-scrollbar mb-2' : 'flex-row h-full'}`} style={isMobile ? { WebkitOverflowScrolling: 'touch' } : {}}>
                {row.map((book, tabIdx) => {
                  const realIdx = tabIdx;
                  return (
                    <button
                      key={book.id}
                      onClick={() => handleTabClick(rowIdx, realIdx)}
                      className={`flex items-end justify-center ${isMobile ? 'w-36 h-32 min-w-[96px] max-w-[150px] border-b border-gray-800' : 'h-full w-16 border-r border-gray-800'} bg-black transition-all duration-200 focus:outline-none ${
                        expandedIdx === realIdx
                          ? 'bg-[#232323] text-white font-bold' : 'text-gray-400 hover:text-white'
                      }`}
                      style={isMobile ? { writingMode: 'horizontal-tb', textOrientation: 'mixed', fontSize: '1rem', letterSpacing: '0.05em' } : { writingMode: 'vertical-rl', textOrientation: 'mixed', fontSize: '1.1rem', letterSpacing: '0.05em' }}
                      disabled={animating}
                    >
                      {book.title}
                    </button>
                  );
                })}
              </div>
              {/* Expanded Content */}
              <AccordionContent book={row[expandedIdx]} expanded={true} isMobile={isMobile} />
            </div>
          );
        })}
      </div>
      <div className="flex flex-col items-center justify-center mt-20 mb-8 px-2">
        <p className="text-base md:text-lg text-gray-300 text-center max-w-xl">
          BookShelf is my personal space to collect, reflect, and share on the books that have shaped my journey. I hope it inspires you to read, think, and grow too.
        </p>
        <a
          href="https://jovensoh.github.io"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 px-6 py-2 rounded-lg text-gray-300 hover:text-white hover:underline transition-colors duration-200 text-base font-medium"
        >
          Say Hi
        </a>
      </div>
    </main>
  );
}