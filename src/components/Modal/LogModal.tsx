import React, { useEffect, useState } from "react";
import { Box, Flex, useDisclosure } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router";
import UITableModal from "../UI/Modal/UITableModal";
import UITable from "../UI/Table/UITable";
import { useLog } from "../../hooks/use-user";
import { UIColumnDefinitionType } from "../UI/Table/Types";
import { Log } from "../../common/AdminModel";
import { formatDate } from "../../utils/utils";
import { useAuth } from "../../store/AuthContext";
import { useParams } from "react-router-dom";
import { LogCreteria } from "../../common/model";
import FilterLog from "../Filter/FilterLog";
import Scrollbars from "react-custom-scrollbars";
import { SkeletonTable } from "../Skeleton/Skeletons";
import ColumnSelector from "../ColumnSelector/ColumnSelector";

const LogModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { t } = useTranslation();
  const history = useHistory();
  const { userId } = useParams<{ userId: string }>();
  const { user } = useAuth();
  const customerAccountId = user?.customerAccountId;

  const [creteria, setCreteria] = useState<LogCreteria>({
    startDate: "",
    endDate: "",
  });

  const { log, isLoading } = useLog(customerAccountId, userId, creteria);

  const [notes, setNotes] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    onOpen();
  }, [onOpen]);

  const closeModalHandler = () => {
    onClose();
    history.replace("/administration/users");
  };

  const handleSearchFilters = (creteria: LogCreteria) => {
    setCreteria((prev) => ({
      ...prev,
      ...creteria,
    }));
  };

  const clearFilters = () => {
    setCreteria({ startDate: "", endDate: "" });
  };

  const handleNoteChange = (logId: string, value: string) => {
    setNotes((prevNotes) => ({
      ...prevNotes,
      [logId]: value,
    }));
  };

  let modalTitle = t("logModal.title");

  const columns: UIColumnDefinitionType<Log>[] = [
    {
      header: "#",
      key: "#",
      render: (item) => <div>{item.index}</div>,
    },
    {
      header: t("logModal.dateAndTime"),
      key: "activityDate",
      render: (log) => formatDate(log.activityDate),
    },
    {
      header: t("logModal.user"),
      render: (log) => log.userName,
    },
    {
      header: t("logModal.action"),
      key: "action",
    },
    {
      header: t("logModal.typeOfAction"),
      key: "impersonationMode",
      render: (log) =>
        log.impersonationMode === false
          ? t("logModal.resource")
          : t("logModal.impersonation"),
    },
    {
      header: t("logModal.host"),
      key: "ipAddress",
    },
    {
      header: t("logModal.notes"),
      key: "notes",
      render: (log) => (
        <input
          style={{
            fontSize: "12px",
            width: "150px",
          }}
          type="text"
          value={notes[log.id] || ""}
          onChange={(e) => handleNoteChange(log.id, e.target.value)}
          placeholder={t("logModal.text")}
        />
      ),
    },
  ];

  const [visibleColumns, setVisibleColumns] = useState<string[]>(
    columns
      .map((column) => column.key)
      .filter((key): key is string => key !== undefined),
  );

  const filteredColumns =
    visibleColumns.length > 0
      ? columns.filter((col) => visibleColumns.includes(col.key as string))
      : columns;

  return (
    <UITableModal
      title={modalTitle}
      isOpen={isOpen}
      onClose={closeModalHandler}
      logData={log}
    >
      <Box my="20px">
        <FilterLog onSearch={handleSearchFilters} onClear={clearFilters} />
      </Box>

      <Flex direction="row-reverse">
        <ColumnSelector
          allColumns={columns.map((column) => ({
            ...column,
            key: column.key ?? "defaultKey",
          }))}
          visibleColumns={visibleColumns}
          setVisibleColumns={setVisibleColumns}
        />

        {!isLoading ? (
          <Scrollbars style={{ height: "calc(70vh - 185px)" }}>
            <UITable
              data={log}
              columns={filteredColumns}
              emptyListMessage={
                creteria.startDate && creteria.endDate
                  ? t("logModal.noLogs")
                  : t("userManagement.globalUsers.listEmpty")
              }
            />
          </Scrollbars>
        ) : (
          <SkeletonTable />
        )}
      </Flex>
    </UITableModal>
  );
};

export default LogModal;
