interface EmptyMenuStateProps {
    onReset: () => void;
  }
  
  export default function EmptyMenuState({ onReset }: EmptyMenuStateProps) {
    return (
      <div className="text-center py-32 px-4">
        <svg
          className="mx-auto h-24 w-24 text-gray-400 dark:text-gray-600 mb-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
          />
        </svg>
        <h3 className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
          No items found
        </h3>
        <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-md mx-auto">
          We couldn&apos;t find any menu items matching your current filters.
          Try adjusting your search or filters to discover our delicious options.
        </p>
        <button
          className="px-6 py-3 text-base font-medium text-white bg-accent-primary hover:bg-accent-dark rounded-full transition-colors shadow-sm"
          onClick={onReset}
        >
          Reset All Filters
        </button>
      </div>
    );
  }