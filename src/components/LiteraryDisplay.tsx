import { useState } from 'react';
import { BookOpen, Sparkles, Book, X, BookmarkCheck } from 'lucide-react';
import { Book as BookType } from '../types';

interface LiteraryDisplayProps {
  books: BookType[];
}

export default function LiteraryDisplay({ books }: LiteraryDisplayProps) {
  const [selectedBook, setSelectedBook] = useState<BookType | null>(null);

  return (
    <div className="space-y-16">
      
      {/* 1. Immersive Quote Banner */}
      <div className="relative text-center border overflow-hidden p-8 sm:p-12 md:p-16 rounded-3xl bg-[#0d1b2a] border-[#00d4ff]/10 group">
        {/* Glow backdrop bubbles */}
        <div className="absolute top-0 left-1/4 w-40 h-40 bg-[#7c3aed]/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 w-40 h-40 bg-[#00d4ff]/10 rounded-full blur-[100px]" />
        
        <div className="relative z-10 max-w-3xl mx-auto space-y-6">
          <span className="inline-flex items-center gap-2 px-3 py-1 bg-[#7c3aed]/10 text-[#7c3aed] text-xs font-mono font-medium rounded-full uppercase tracking-widest border border-[#7c3aed]/15">
            <Sparkles className="w-3 h-3" /> Creative Philosophy
          </span>
          <p className="text-2xl sm:text-3xl md:text-4xl font-display font-medium text-white italic leading-relaxed text-transparent bg-clip-text bg-gradient-to-r from-white via-white/90 to-white/70">
            "কোড লিখি জীবিকার জন্য, কবিতা লিখি আত্মার জন্য।"
          </p>
          <div className="w-16 h-[2px] bg-[#00d4ff] mx-auto opacity-70" />
          <p className="text-sm sm:text-base font-sans tracking-wide text-[#8892b0]">
            "I code for a living, I write poetry for my soul."
          </p>
        </div>
      </div>

      {/* 2. Literary Books Grid with 3D Spin effects */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {books.map((book) => {
          return (
            <div
              key={book.id}
              className="flex flex-col h-full bg-[#112240]/40 rounded-2xl border border-white/5 p-6 hover:border-[#00d4ff]/20 transition-all duration-300 group"
            >
              {/* Cover Container */}
              <div className="flex justify-center mb-6 pt-4 perspective-1000">
                {/* 3D Floating Book Cover on Hover */}
                <div
                  className={`w-40 h-56 rounded-r-xl bg-gradient-to-b ${book.coverGradient} shadow-[5px_5px_15px_rgba(0,0,0,0.5),_inset_10px_0_10px_rgba(0,0,0,0.3)] border-r-2 border-white/10 flex flex-col justify-between p-4 relative group-hover:rotate-y-[-15deg] group-hover:scale-105 transition-all duration-500 ease-out preserve-3d cursor-pointer`}
                >
                  {/* Embossed gold/silver binding strip */}
                  <div className="absolute top-0 left-0 w-3 h-full bg-black/20 rounded-r-sm border-r border-white/5" />
                  
                  {/* Genre Tag inside cover */}
                  <div className="text-[9px] uppercase tracking-wider font-mono text-white/75 bg-black/20 px-2 py-0.5 rounded border border-white/5 self-start ml-2">
                    {book.genre}
                  </div>

                  {/* Covers Titles */}
                  <div className="text-center space-y-2 select-none self-center z-10 px-2">
                    {book.titleBengali && (
                      <div className="font-display font-bold text-xl sm:text-2xl text-white tracking-wide drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                        {book.titleBengali}
                      </div>
                    )}
                    <div className="text-[10px] font-sans font-medium text-white/80 tracking-widest uppercase truncate drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]">
                      {book.title}
                    </div>
                  </div>

                  {/* Initials footer */}
                  <div className="self-end text-xs font-mono font-bold text-white/50 tracking-wider">
                    {book.coverInitials}
                  </div>
                </div>
              </div>

              {/* Title & metadata */}
              <div className="flex-1 space-y-3 flex flex-col">
                <span className="text-[11px] font-mono uppercase tracking-widest text-[#00d4ff] font-semibold">
                  {book.genre}
                </span>
                
                <h4 className="text-lg font-display font-bold text-white group-hover:text-[#00d4ff] transition-colors">
                  {book.titleBengali ? `${book.titleBengali} (${book.title})` : book.title}
                </h4>

                <p className="text-sm text-[#8892b0] leading-relaxed flex-1">
                  {book.description}
                </p>

                <div className="pt-4">
                  <button
                    onClick={() => setSelectedBook(book)}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold font-mono tracking-wider border border-[#00d4ff]/20 text-[#00d4ff] hover:bg-[#00d4ff]/10 hover:border-[#00d4ff]/40 transition-all active:scale-95 cursor-pointer"
                  >
                    <BookOpen className="w-4 h-4" /> Outline & Excerpt
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* 3. Immersive Overlay Modal detailing full excerpt */}
      {selectedBook && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0a0f1e]/85 backdrop-blur-md transition-opacity duration-300">
          <div className="relative w-full max-w-2xl bg-[#0d1b2a] rounded-2xl border border-[#00d4ff]/25 shadow-2xl p-6 sm:p-8 overflow-hidden">
            {/* Visual background splash */}
            <div className="absolute -top-12 -right-12 h-36 w-36 rounded-full bg-[#00d4ff]/10 blur-3xl pointer-events-none" />

            {/* Close Button */}
            <button
              onClick={() => setSelectedBook(null)}
              className="absolute top-4 right-4 p-2 text-[#8892b0] hover:text-white hover:bg-white/5 rounded-full transition-colors cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="flex flex-col sm:flex-row gap-6 items-start">
              {/* Flat book preview representation inside modal */}
              <div className={`w-32 h-44 shrink-0 rounded-r-lg bg-gradient-to-b ${selectedBook.coverGradient} p-3 flex flex-col justify-between border-r-2 border-white/10 shadow-lg relative`}>
                <div className="absolute top-0 left-0 w-2 h-full bg-black/25" />
                <span className="text-[8px] uppercase tracking-wider font-mono text-white/70">{selectedBook.genre}</span>
                <div className="text-center font-display font-bold text-lg text-white drop-shadow">
                  {selectedBook.titleBengali || selectedBook.title}
                </div>
                <span className="self-end text-[10px] text-white/40">{selectedBook.coverInitials}</span>
              </div>

              <div className="space-y-4">
                <div>
                  <span className="text-xs font-semibold font-mono text-[#00d4ff] uppercase tracking-wider">
                    {selectedBook.genre}
                  </span>
                  <h3 className="text-2xl font-display font-extrabold text-white">
                    {selectedBook.titleBengali ? `${selectedBook.titleBengali} — ${selectedBook.title}` : selectedBook.title}
                  </h3>
                </div>

                <p className="text-sm sm:text-base text-[#8892b0] leading-relaxed">
                  {selectedBook.description}
                </p>

                <div className="space-y-2 border-t border-white/5 pt-4">
                  <h5 className="text-xs font-bold font-mono tracking-widest text-[#7c3aed] uppercase flex items-center gap-1.5">
                    <BookmarkCheck className="w-4 h-4" /> Key Literary Features:
                  </h5>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-sans text-white/95">
                    {selectedBook.highlights.map((h, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#00d4ff]" />
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 flex flex-wrap gap-3">
                  <a
                    href="#contact"
                    onClick={() => setSelectedBook(null)}
                    className="flex-1 text-center bg-[#00d4ff] hover:bg-[#00d4ff]/80 text-[#0a0f1e] text-xs font-bold font-mono py-3 rounded-xl transition-colors tracking-wide uppercase active:scale-95"
                  >
                    Collaborate / Translate
                  </a>
                  <button
                    onClick={() => setSelectedBook(null)}
                    className="px-6 border border-white/10 hover:border-white/20 text-[#8892b0] hover:text-white text-xs font-bold font-mono py-3 rounded-xl transition-colors uppercase cursor-pointer"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
