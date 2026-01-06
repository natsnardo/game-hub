import {
  ButtonGroup,
  IconButton,
  Pagination,
  Text,
  Flex,
} from "@chakra-ui/react";
import {
  FiChevronsLeft,
  FiChevronLeft,
  FiChevronRight,
  FiChevronsRight,
} from "react-icons/fi";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  isLoading?: boolean;
}

interface PageChangeDetails {
  page: number;
}

type PaginationItemProps = {
  value: number;
  disabled?: boolean;
  current?: boolean;
  type: "page";
};

const GamePagination = ({
  currentPage,
  totalPages,
  totalItems,
  pageSize,
  onPageChange,
  isLoading = false,
}: PaginationProps) => {
  const startItem = (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems);

  if (totalPages <= 1 && totalItems <= pageSize) {
    return null;
  }

  return (
    <Flex
      direction="column"
      gap={4}
      padding={6}
      borderTop="1px solid"
      borderColor="border.subtle"
      marginTop={8}
      align="center"
    >
      {/* Items count */}
      <Text fontSize="sm" color="fg.muted">
        Showing {startItem}-{endItem} of {totalItems} items
      </Text>

      {/* Simple pagination */}
      <Pagination.Root
        count={totalItems}
        pageSize={pageSize}
        page={currentPage}
        onPageChange={(details: PageChangeDetails) =>
          onPageChange(details.page)
        }
      >
        <ButtonGroup variant="ghost" size="sm">
          {/* First page */}
          <IconButton
            disabled={isLoading || currentPage === 1}
            onClick={() => onPageChange(1)}
            aria-label="Go to first page"
          >
            <FiChevronsLeft />
          </IconButton>

          <Pagination.PrevTrigger asChild>
            <IconButton disabled={isLoading}>
              <FiChevronLeft />
            </IconButton>
          </Pagination.PrevTrigger>

          <Pagination.Items
            render={(page: PaginationItemProps) => (
              <IconButton
                variant={{ base: "ghost", _selected: "outline" }}
                disabled={isLoading}
                onClick={() => onPageChange(page.value)}
                minW="40px"
                minH="40px"
                padding="8px"
              >
                {page.value}
              </IconButton>
            )}
          />

          <Pagination.NextTrigger asChild>
            <IconButton disabled={isLoading}>
              <FiChevronRight />
            </IconButton>
          </Pagination.NextTrigger>

          {/* Last page */}
          <IconButton
            disabled={isLoading || currentPage === totalPages}
            onClick={() => onPageChange(totalPages)}
            aria-label="Go to last page"
          >
            <FiChevronsRight />
          </IconButton>
        </ButtonGroup>
      </Pagination.Root>
    </Flex>
  );
};

export default GamePagination;
