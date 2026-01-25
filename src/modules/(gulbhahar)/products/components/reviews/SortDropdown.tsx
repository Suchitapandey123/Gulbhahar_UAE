"use client";

interface SortDropdownProps {
  sortOrder: string;
  onSortChange: (order: string) => void;
  variant?: "mobile" | "desktop";
}

export function SortDropdown({
  sortOrder,
  onSortChange,
  variant = "desktop",
}: SortDropdownProps) {
  const isMobile = variant === "mobile";

  return (
    <div className={`mb-${isMobile ? "4" : "6"}`}>
      <div className="relative inline-block">
        <select
          className={`appearance-none border border-gray-300 rounded-lg py-2 px-${isMobile ? "3" : "4"} pr-8 bg-white text-${isMobile ? "xs" : "sm"} focus:outline-none focus:ring-2 focus:ring-red-900 focus:border-transparent w-${isMobile ? "36" : "40"} font-medium`}
          value={sortOrder}
          onChange={(e) => onSortChange(e.target.value)}
        >
          <option value="Newest">Newest First</option>
          <option value="Oldest">Oldest First</option>
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
          <svg
            className={`h-${isMobile ? "3" : "4"} w-${isMobile ? "3" : "4"} text-gray-500`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
