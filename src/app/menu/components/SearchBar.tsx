import { Input } from '@/components/ui/input';

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export default function SearchBar({ searchQuery, setSearchQuery }: SearchBarProps) {
  return (
    <div className="relative flex-1 max-w-lg">
      <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400 pointer-events-none">
        <svg
          className="h-5 w-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </span>
      <Input
        type="search"
        placeholder="Search dishes, ingredients..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="rounded-full pl-12 pr-10 h-12"
      />
      {searchQuery && (
        <button
          className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-400 hover:text-gray-600"
          onClick={() => setSearchQuery('')}
          title="Clear search"
        >
          <svg
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      )}
    </div>
  );
}