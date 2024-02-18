import { Box, Button, ButtonGroup, Select } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

interface PaginationProps {
  onChange: (page: number, size: number) => void;
  totalPages: number;
  totalElements: number;
  defaultPage: number;
  defaultsize: number;
}

const Pagination = ({
  onChange,
  totalPages,
  totalElements,
  defaultPage = 0,
  defaultsize = 25,
}: PaginationProps) => {
  const { t } = useTranslation();

  const [currentPage, setCurrentPage] = useState<number>(defaultPage);
  const [pageSize, setPageSize] = useState<number>(defaultsize);

  useEffect(() => {
    onChange(currentPage, pageSize);
  }, [currentPage, pageSize]);

  return (
    <Box display={{ base: "none", md: "flex" }} justifyContent="flex-end" p="4">
      <ButtonGroup size="sm" spacing={4}>
        <Button
          isDisabled={currentPage === 0 || totalPages === 0}
          onClick={() => setCurrentPage(0)}
        >
          {"<<"}
        </Button>
        <Button
          isDisabled={currentPage === 0 || totalPages === 0}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          {"<"}
        </Button>
        <Button isDisabled={currentPage === 0 || totalPages === 0}>
          {t("common.page")} {currentPage + 1} {t("common.of")} {totalPages}
        </Button>
        <Button
          isDisabled={currentPage === totalPages - 1 || totalPages === 0}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          {">"}
        </Button>
        <Button
          isDisabled={currentPage === totalPages - 1 || totalPages === 0}
          onClick={() => setCurrentPage(totalPages - 1)}
        >
          {">>"}
        </Button>
        <Button isDisabled={currentPage === 0 || totalPages === 0}>
          {totalElements} {t("common.report")}
        </Button>
      </ButtonGroup>
      <Select
        size="sm"
        value={pageSize}
        onChange={(e) => setPageSize(+e.target.value)}
        w="fit-content"
        ml="4"
        rounded="md"
      >
        <option value="25">25</option>
        <option value="50">50</option>
        <option value="100">100</option>
        <option value="200">200</option>
        <option value="500">500</option>
      </Select>
    </Box>
  );
};

export default Pagination;
