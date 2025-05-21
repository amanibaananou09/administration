import { Box, Button, Flex, Input, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { LogCreteria } from "../../common/model";
import moment, { Moment } from "moment";

interface FilterLogProps {
  onSearch: (creteria: LogCreteria) => void;
  onClear: () => void;
}

const FilterLog = ({ onSearch, onClear }: FilterLogProps) => {
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [startDateError, setStartDateError] = useState<string>("");
  const [endDateError, setEndDateError] = useState<string>("");
  const [generalError, setGeneralError] = useState<string>("");
  const { t } = useTranslation();

  const handleYearValidation = (
    value: string,
    setter: React.Dispatch<React.SetStateAction<string>>,
    setError: React.Dispatch<React.SetStateAction<string>>,
  ) => {
    const dateParts = value.split("-");
    const year = dateParts[0];

    if (year.length > 4) {
      setError(t("logModal.error"));
    } else {
      setError("");
    }

    setter(value);
  };

  const handleFilterSubmit = () => {
    let errorMessages = "";

    if (startDateError || endDateError) {
      errorMessages = startDateError || endDateError;
    }

    if (startDate && endDate && moment(startDate).isAfter(moment(endDate))) {
      errorMessages = t("logModal.errorDate");
    }

    if (errorMessages) {
      setGeneralError(errorMessages);
      return;
    }

    setGeneralError("");
    onSearch({
      startDate,
      endDate,
    });
  };

  const handleClearFilters = () => {
    setStartDate("");
    setEndDate("");
    setStartDateError("");
    setEndDateError("");
    setGeneralError("");
    onClear();
  };

  return (
    <Flex direction="column" gap={3} alignItems="flex-start">
      <Flex direction="row" gap={3} alignItems="center">
        <p>{t("logModal.interval")}:</p>
        <Flex>
          <Input
            id="startDate"
            type="datetime-local"
            value={startDate}
            onChange={(e) =>
              handleYearValidation(
                e.target.value,
                setStartDate,
                setStartDateError,
              )
            }
          />
        </Flex>
        <p>{t("-")}</p>
        <Flex>
          <Input
            id="endDate"
            type="datetime-local"
            value={endDate}
            onChange={(e) =>
              handleYearValidation(e.target.value, setEndDate, setEndDateError)
            }
          />
        </Flex>
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
          {t("common.clear")}
        </Button>
      </Flex>
      {(startDateError || endDateError || generalError) && (
        <Box color="red.500" fontSize="sm" mt={1}>
          <Text>{startDateError || endDateError || generalError}</Text>
        </Box>
      )}
    </Flex>
  );
};

export default React.memo(FilterLog);
