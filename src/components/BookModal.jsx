import React from 'react';
import books from '../data/books.json';

export default function BookModal({ id, onBack }) {
  const book = books.find(b => b.id === id);
  if (!book) return null;

  return (
    <main className="min-h-screen px-8 py-12 flex flex-col items-center bg-black text-white">
      <div className="w-full max-w-4xl mb-8">
        <div className="mb-6 text-gray-400 text-base flex items-center space-x-2">
          <button onClick={onBack} className="hover:underline text-white font-medium">My BookShelf</button>
          <span className="mx-1">/</span>
          <span className="text-white">Book Details</span>
        </div>
        <h1 className="text-4xl font-bold mb-2 text-white">{book.title}</h1>
        <h2 className="text-xl text-gray-300 mb-8 font-medium">By {book.author}</h2>
      </div>
      <div className="w-full flex flex-col items-center mb-12">
        <img
          src={book.coverImage}
          alt={book.title}
          className="w-[350px] h-[550px] object-cover rounded-xl shadow-2xl mb-8"
        />
      </div>
      <div className="w-full max-w-2xl">
        <h3 className="text-2xl font-semibold mb-3 text-white">Synopsis</h3>
        <p className="text-gray-300 mb-10 text-lg leading-relaxed">{book.synopsis}</p>
        <h3 className="text-2xl font-semibold mb-3 text-white">My Notes</h3>
        <textarea
          defaultValue={book.notes}
          className="w-full bg-[#18181b] text-white p-4 rounded-xl border border-gray-700 focus:outline-none text-lg min-h-[150px] resize-none shadow-md"
          rows={6}
        />
      </div>
    </main>
  );
}
