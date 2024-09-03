import { Box, Button, Flex, Input, Heading } from "@chakra-ui/react";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { LogCreteria } from "../../common/model";

interface FilterLogProps {
  onSearch: (creteria: LogCreteria) => void;
  onClear: () => void;
}

const FilterLog = ({ onSearch, onClear }: FilterLogProps) => {
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const { t } = useTranslation();

  const handleFilterSubmit = () => {
    onSearch({
      startDate,
      endDate,
    });
  };

  const handleClearFilters = () => {
    setStartDate("");
    setEndDate("");
    onClear();
  };

  return (
    <Flex direction="row" gap={3} alignItems="center">
      <p>{t("logModal.interval")}:</p>
      <Input
        type="datetime-local"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
        flex={2}
      />

      <Heading>{t("-")}</Heading>
      <Input
        type="datetime-local"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
        flex={2}
      />
      <Button
        flex={1}
        colorScheme="telegram"
        size="md"
        onClick={handleFilterSubmit}
      >
        {t("logModal.display")}
      </Button>
      <Button
        flex={1}
        colorScheme="gray"
        size="md"
        onClick={handleClearFilters}
      >
        {t("Clear")}
      </Button>
    </Flex>
  );
};

export default React.memo(FilterLog);
