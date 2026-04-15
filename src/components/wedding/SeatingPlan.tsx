import { useState, useRef } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { Search, X } from 'lucide-react';

interface Guest {
  name: string;
  seat: number;
}

interface Table {
  id: string;
  name: string;
  x: number;
  y: number;
  guests: Guest[];
}

const tables: Table[] = [
  { id: '1', name: 'Table Amstel', x: 20, y: 25, guests: [
    { name: 'Marco R.', seat: 0 }, { name: 'Sofia L.', seat: 1 }, { name: 'Luca M.', seat: 2 },
    { name: 'Elena B.', seat: 3 }, { name: 'Thomas K.', seat: 4 }, { name: 'Anna V.', seat: 5 },
  ]},
  { id: '2', name: 'Table Venice', x: 50, y: 20, guests: [
    { name: 'James W.', seat: 0 }, { name: 'Olivia S.', seat: 1 }, { name: 'Noah P.', seat: 2 },
    { name: 'Emma D.', seat: 3 }, { name: 'Leo F.', seat: 4 }, { name: 'Mia C.', seat: 5 },
  ]},
  { id: '3', name: 'Table Prinsengracht', x: 80, y: 25, guests: [
    { name: 'David H.', seat: 0 }, { name: 'Lisa T.', seat: 1 }, { name: 'Max J.', seat: 2 },
    { name: 'Clara N.', seat: 3 }, { name: 'Felix G.', seat: 4 }, { name: 'Julia R.', seat: 5 },
  ]},
  { id: '4', name: 'Table Jordaan', x: 20, y: 60, guests: [
    { name: 'Pierre L.', seat: 0 }, { name: 'Marie C.', seat: 1 }, { name: 'Hans B.', seat: 2 },
    { name: 'Greta W.', seat: 3 }, { name: 'Carlos M.', seat: 4 }, { name: 'Isabella F.', seat: 5 },
  ]},
  { id: '5', name: 'Table Herengracht', x: 50, y: 65, guests: [
    { name: 'Alex K.', seat: 0 }, { name: 'Sara P.', seat: 1 }, { name: 'Ryan O.', seat: 2 },
    { name: 'Nina S.', seat: 3 }, { name: 'Oscar T.', seat: 4 }, { name: 'Freya H.', seat: 5 },
  ]},
  { id: '6', name: 'Table Keizersgracht', x: 80, y: 60, guests: [
    { name: 'Stefan M.', seat: 0 }, { name: 'Lucia B.', seat: 1 }, { name: 'Yuki T.', seat: 2 },
    { name: 'Amir R.', seat: 3 }, { name: 'Zara K.', seat: 4 }, { name: 'Ben W.', seat: 5 },
  ]},
];

function TableView({ table, isHighlighted, highlightedGuest, onClick, isSelected }: {
  table: Table; isHighlighted: boolean; highlightedGuest: string | null;
  onClick: () => void; isSelected: boolean;
}) {
  const seatCount = table.guests.length;
  const radius = isSelected ? 100 : 48;
  const seatRadius = isSelected ? 24 : 14;

  return (
    <div
      className={`absolute cursor-pointer transition-all duration-700 ${isHighlighted ? 'z-20 scale-110' : 'z-10'}`}
      style={{
        left: isSelected ? '50%' : `${table.x}%`,
        top: isSelected ? '50%' : `${table.y}%`,
        transform: isSelected ? 'translate(-50%, -50%) scale(1)' : `translate(-50%, -50%) ${isHighlighted ? 'scale(1.1)' : 'scale(1)'}`,
      }}
      onClick={onClick}
    >
      {/* Table circle */}
      <div className={`relative rounded-full flex items-center justify-center transition-all duration-500 ${
        isHighlighted ? 'bg-gold/20 border-gold shadow-lg shadow-gold/10' : 'bg-ivory/80 border-gold/20'
      } border-2`}
        style={{ width: radius * 2, height: radius * 2 }}
      >
        <div className="text-center">
          <p className={`font-serif ${isSelected ? 'text-lg' : 'text-[10px]'} text-foreground leading-tight`}>{table.name.replace('Table ', '')}</p>
        </div>

        {/* Seats */}
        {table.guests.map((guest, i) => {
          const angle = (i / seatCount) * Math.PI * 2 - Math.PI / 2;
          const seatX = Math.cos(angle) * (radius + seatRadius + 4);
          const seatY = Math.sin(angle) * (radius + seatRadius + 4);
          const isGuestHighlighted = highlightedGuest && guest.name.toLowerCase().includes(highlightedGuest.toLowerCase());

          return (
            <div
              key={i}
              className={`absolute rounded-full flex items-center justify-center transition-all duration-500 text-[8px] ${
                isGuestHighlighted
                  ? 'bg-gold text-primary-foreground shadow-md scale-125 ring-2 ring-gold/50'
                  : 'bg-warm-beige/80 text-foreground border border-gold/10'
              } ${isSelected ? 'text-xs' : 'text-[7px]'}`}
              style={{
                width: seatRadius * 2,
                height: seatRadius * 2,
                left: `calc(50% + ${seatX}px - ${seatRadius}px)`,
                top: `calc(50% + ${seatY}px - ${seatRadius}px)`,
              }}
              title={guest.name}
            >
              {isSelected ? guest.name.split(' ')[0] : guest.name.charAt(0)}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function SeatingPlan() {
  const ref = useScrollAnimation();
  const [search, setSearch] = useState('');
  const [selectedTable, setSelectedTable] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const matchingTable = search
    ? tables.find(t => t.guests.some(g => g.name.toLowerCase().includes(search.toLowerCase())))
    : null;

  return (
    <section id="seating" className="py-24 md:py-32" ref={ref}>
      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-12 scroll-animate">
          <p className="text-sm tracking-[0.3em] uppercase text-gold mb-4">Find Your Seat</p>
          <h2 className="font-serif text-4xl md:text-5xl font-light">Seating Plan</h2>
          <div className="w-16 h-px bg-gold mx-auto mt-6" />
        </div>

        {/* Search */}
        <div className="max-w-sm mx-auto mb-12 scroll-animate">
          <div className="relative">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search your name..."
              value={search}
              onChange={(e) => { setSearch(e.target.value); setSelectedTable(null); }}
              className="w-full pl-11 pr-10 py-3 rounded-full bg-ivory/80 border border-gold/20 text-sm focus:outline-none focus:border-gold/50 transition-colors placeholder:text-muted-foreground/60"
            />
            {search && (
              <button onClick={() => setSearch('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                <X size={14} />
              </button>
            )}
          </div>
          {search && matchingTable && (
            <p className="text-center text-sm text-gold mt-3 font-serif italic">
              Found at {matchingTable.name} ✨
            </p>
          )}
          {search && !matchingTable && (
            <p className="text-center text-sm text-muted-foreground mt-3">
              No guest found with that name
            </p>
          )}
        </div>

        {/* Seating map */}
        <div
          ref={containerRef}
          className="relative w-full bg-champagne/50 rounded-3xl border border-gold/10 overflow-hidden scroll-animate"
          style={{ height: '500px' }}
        >
          {selectedTable && (
            <button
              onClick={() => setSelectedTable(null)}
              className="absolute top-4 right-4 z-30 px-4 py-2 rounded-full bg-ivory border border-gold/20 text-sm text-foreground hover:bg-warm-beige transition-colors"
            >
              ← Back to all tables
            </button>
          )}

          {tables.map((table) => (
            (!selectedTable || selectedTable === table.id) && (
              <TableView
                key={table.id}
                table={table}
                isHighlighted={matchingTable?.id === table.id}
                highlightedGuest={search}
                onClick={() => setSelectedTable(selectedTable === table.id ? null : table.id)}
                isSelected={selectedTable === table.id}
              />
            )
          ))}
        </div>

        <p className="text-center text-xs text-muted-foreground mt-4">
          Click on a table to zoom in • Search your name to find your seat
        </p>
      </div>
    </section>
  );
}
