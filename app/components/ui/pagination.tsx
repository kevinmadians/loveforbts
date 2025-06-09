import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export function Pagination({ currentPage, totalPages, onPageChange, className = '' }: PaginationProps) {
  // Don't render pagination if there's only one page
  if (totalPages <= 1) {
    return null;
  }

  // Generate page numbers to display
  const getPageNumbers = () => {
    // Always show first and last pages
    // Show 3 pages around current page if possible
    const pageNumbers: (number | string)[] = [];
    
    if (totalPages <= 7) {
      // If 7 or fewer pages, show all
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // Always add page 1
      pageNumbers.push(1);
      
      // Calculate start and end of the shown pages
      let start = Math.max(2, currentPage - 2);
      let end = Math.min(totalPages - 1, currentPage + 2);
      
      // Adjust in case we're close to the beginning or end
      if (currentPage <= 4) {
        end = 5;
      } else if (currentPage >= totalPages - 3) {
        start = totalPages - 4;
      }
      
      // Add ellipsis if needed after page 1
      if (start > 2) {
        pageNumbers.push('...');
      } else if (start === 2) {
        pageNumbers.push(2);
      }
      
      // Add pages in the middle
      for (let i = start; i <= end; i++) {
        if (i !== 1 && i !== totalPages) {
          pageNumbers.push(i);
        }
      }
      
      // Add ellipsis if needed before the last page
      if (end < totalPages - 1) {
        pageNumbers.push('...');
      } else if (end === totalPages - 1) {
        pageNumbers.push(totalPages - 1);
      }
      
      // Always add the last page
      pageNumbers.push(totalPages);
    }
    
    return pageNumbers;
  };

  return (
    <nav className={`flex justify-center items-center space-x-1 ${className}`} aria-label="Pagination">
      {/* Previous Page Button */}
      <button
        onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-2 py-2 rounded-md border-2 border-black transition-colors 
          ${currentPage === 1 
            ? 'bg-gray-200 text-gray-500 cursor-not-allowed' 
            : 'bg-white hover:bg-purple-100'}
        `}
        aria-label="Go to previous page"
      >
        <ChevronLeft size={18} />
      </button>
      
      {/* Page Numbers */}
      <div className="flex items-center space-x-1">
        {getPageNumbers().map((page, index) => (
          page === '...' ? (
            <span key={`ellipsis-${index}`} className="px-3 py-2">
              {page}
            </span>
          ) : (
            <button
              key={`page-${page}`}
              onClick={() => typeof page === 'number' && onPageChange(page)}
              className={`px-3 py-1 rounded-md border-2 transition-colors
                ${currentPage === page 
                  ? 'bg-black font-bold border-black' 
                                      : 'bg-white border-black hover:bg-purple-100 hover:text-purple-800'}
                `}
                style={currentPage === page ? { color: 'var(--bts-accent)' } : {}}
              aria-label={`Go to page ${page}`}
              aria-current={currentPage === page ? 'page' : undefined}
            >
              {page}
            </button>
          )
        ))}
      </div>
      
      {/* Next Page Button */}
      <button
        onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-2 py-2 rounded-md border-2 border-black transition-colors 
          ${currentPage === totalPages 
            ? 'bg-gray-200 text-gray-500 cursor-not-allowed' 
            : 'bg-white hover:bg-purple-100'}
        `}
        aria-label="Go to next page"
      >
        <ChevronRight size={18} />
      </button>
    </nav>
  );
}
