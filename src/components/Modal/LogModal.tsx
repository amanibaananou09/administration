import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router";
import UITableModal from "../UI/Modal/UITableModal";
import UITable from "../UI/Table/UITable";
import { useLog } from "../../hooks/use-user";
import { UIColumnDefinitionType } from "../UI/Table/Types";
import { Log } from "../../common/AdminModel";
import { formatDate } from "../../utils/utils";
import { useAuth } from "../../store/AuthContext";
import moment, { Moment } from "moment";
import { useParams } from "react-router-dom";

const LogModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { t } = useTranslation();
  const history = useHistory();
  const { userId } = useParams<{ userId: string }>();
  const { user } = useAuth();
  const customerAccountId = user?.customerAccountId;
  const { log, isLoading } = useLog(customerAccountId, userId);
  const [notes, setNotes] = useState<{ [key: string]: string }>({});
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [filteredLogData, setFilteredLogData] = useState<Log[] | undefined>();
  const [dateError, setDateError] = useState<string | null>(null);

  useEffect(() => {
    onOpen();
  }, [onOpen]);

  useEffect(() => {
    if (log) {
      setFilteredLogData(
        Array.isArray(log)
          ? log
          : [log].filter((l): l is Log => l !== undefined),
      );
    }
  }, [log]);

  const closeModalHandler = () => {
    onClose();
    history.replace("/administration/users");
  };

  const handleNoteChange = (logId: string, value: string) => {
    setNotes((prevNotes) => ({
      ...prevNotes,
      [logId]: value,
    }));
  };

  const filterLogsByDate = () => {
    const logData = Array.isArray(filteredLogData) ? filteredLogData : [];

    if (!startDate || !endDate) {
      setFilteredLogData(logData);
      setDateError(null);
      return;
    }

    const start = moment(startDate).valueOf();
    const end = moment(endDate).valueOf();

    if (end < start) {
      setDateError(
        t("La date de fin doit être supérieure ou égale à la date de début."),
      );
      return;
    }

    const filtered = logData.filter((log) => {
      const logDate = moment(log.activityDate).valueOf();
      return logDate >= start && logDate <= end;
    });

    setFilteredLogData(filtered);
    setDateError(null);
  };

  const clearFilters = () => {
    setStartDate("");
    setEndDate("");
    setFilteredLogData(
      log
        ? Array.isArray(log)
          ? log
          : [log].filter((l): l is Log => l !== undefined)
        : [],
    );
    setDateError(null);
  };

  let modalTitle = t("Journal de l'utilisateur");

  const columns: UIColumnDefinitionType<Log>[] = [
    {
      header: "#",
      key: "#",
      render: (item) => <div>{item.index}</div>,
    },
    {
      header: t("Date et heure"),
      key: "activityDate",
      render: (log) => formatDate(log.activityDate),
    },
    {
      header: t("Utilisateur "),
      key: "userName",
    },
    {
      header: t("Action"),
      key: "action",
    },
    {
      header: t("Type d'action"),
      key: "impersonationMode",
      render: (log) =>
        log.impersonationMode === false ? "Ressource" : "Impersonation",
    },
    {
      header: t("Hôte"),
      key: "ipAddress",
    },
    {
      header: t("Notes"),
      key: "notes",
      render: (log) => (
        <input
          type="text"
          value={notes[log.id] || ""}
          onChange={(e) => handleNoteChange(log.id, e.target.value)}
          placeholder={t("Ajoutez des remarques ici")}
        />
      ),
    },
  ];

  const [visibleColumns, setVisibleColumns] = useState<string[]>([]);
  const filteredColumns =
    visibleColumns.length > 0
      ? columns.filter((col) => visibleColumns.includes(col.key as string))
      : columns;

  return (
    <UITableModal
      title={modalTitle}
      isOpen={isOpen}
      onClose={closeModalHandler}
    >
      <Box my="20px">
        <Flex direction="row" gap={3} alignItems="center">
          <p>{t("Intervalle")}:</p>
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
            onClick={filterLogsByDate}
          >
            {t("Afficher")}
          </Button>
          <Button flex={1} colorScheme="gray" size="md" onClick={clearFilters}>
            {t("Clear")}
          </Button>
        </Flex>
        {dateError && (
          <Box color="red.500" mt="4">
            <Text>{dateError}</Text>
          </Box>
        )}
      </Box>
      {!isLoading && (
        <UITable
          data={filteredLogData}
          columns={filteredColumns}
          emptyListMessage={t("userManagement.globalUsers.listEmpty")}
        />
      )}
    </UITableModal>
  );
};

export default LogModal;
