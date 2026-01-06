import { HStack, Text, Button, Input, VStack } from "@chakra-ui/react";
import {
  FiChevronLeft,
  FiChevronRight,
  FiChevronsLeft,
  FiChevronsRight,
} from "react-icons/fi";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
  isLoading?: boolean;
}

const PaginationComponent = ({
  currentPage,
  totalPages,
  totalItems,
  pageSize,
  onPageChange,
  onPageSizeChange,
  isLoading = false,
}: PaginationProps) => {
  const startItem = (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems);

  const getVisiblePages = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];

    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, "...");
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push("...", totalPages);
    } else if (totalPages > 1) {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots.filter(
      (item, index, arr) => arr.indexOf(item) === index
    );
  };

  if (totalPages <= 1 && totalItems <= pageSize) {
    return null;
  }

  return (
    <VStack
      gap={4}
      padding={4}
      borderTop="1px solid"
      borderColor="border.subtle"
      marginTop={8}
    >
      {/* Items count and page size controls */}
      <HStack justify="space-between" width="100%">
        <Text fontSize="sm" color="fg.muted">
          Showing {startItem}-{endItem} of {totalItems} items
        </Text>

        <HStack gap={2} align="center">
          <Text fontSize="sm" color="fg.muted">
            Items per page:
          </Text>
          <select
            value={pageSize}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              onPageSizeChange(Number(e.target.value))
            }
            disabled={isLoading}
            style={{
              padding: "4px 8px",
              fontSize: "14px",
              border: "1px solid #e2e8f0",
              borderRadius: "4px",
              backgroundColor: isLoading ? "#f7fafc" : "white",
            }}
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={40}>40</option>
            <option value={60}>60</option>
          </select>
        </HStack>
      </HStack>

      {/* Page navigation */}
      <HStack justify="center" wrap="wrap" gap={2}>
        {/* First page */}
        <Button
          aria-label="First page"
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1 || isLoading}
          variant="outline"
          size="sm"
        >
          <FiChevronsLeft />
        </Button>

        {/* Previous page */}
        <Button
          aria-label="Previous page"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1 || isLoading}
          variant="outline"
          size="sm"
        >
          <FiChevronLeft />
        </Button>

        {/* Page numbers */}
        {getVisiblePages().map((page, index) => (
          <Text key={index}>
            {page === "..." ? (
              <Text px={2} color="fg.muted">
                ...
              </Text>
            ) : (
              <Button
                variant={currentPage === page ? "solid" : "outline"}
                onClick={() => onPageChange(page as number)}
                disabled={isLoading}
                size="sm"
                minW="40px"
              >
                {page}
              </Button>
            )}
          </Text>
        ))}

        {/* Next page */}
        <Button
          aria-label="Next page"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages || isLoading}
          variant="outline"
          size="sm"
        >
          <FiChevronRight />
        </Button>

        {/* Last page */}
        <Button
          aria-label="Last page"
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages || isLoading}
          variant="outline"
          size="sm"
        >
          <FiChevronsRight />
        </Button>
      </HStack>

      {/* Jump to page */}
      <HStack justify="center" gap={2}>
        <Text fontSize="sm" color="fg.muted">
          Go to page:
        </Text>
        <Input
          value={currentPage}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            const page = parseInt(e.target.value);
            if (!isNaN(page) && page >= 1 && page <= totalPages) {
              onPageChange(page);
            }
          }}
          width="80px"
          size="sm"
          disabled={isLoading}
          type="number"
          min={1}
          max={totalPages}
        />
        <Text fontSize="sm" color="fg.muted">
          of {totalPages}
        </Text>
      </HStack>
    </VStack>
  );
};

export default PaginationComponent;
