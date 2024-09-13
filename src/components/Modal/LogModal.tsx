import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  useDisclosure,
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router";
import UITableModal from "../UI/Modal/UITableModal";
import UITable from "../UI/Table/UITable";
import { useLog } from "../../hooks/use-user";
import { UIColumnDefinitionType } from "../UI/Table/Types";
import { GeneralUser, Log } from "../../common/AdminModel";
import { formatDate } from "../../utils/utils";
import { useAuth } from "../../store/AuthContext";
import { useParams } from "react-router-dom";
import { LogCreteria } from "../../common/model";
import FilterLog from "../Filter/FilterLog";
import Scrollbars from "react-custom-scrollbars";
import { SkeletonTable } from "../Skeleton/Skeletons";
import ColumnSelectionDropdown from "../ColumnSelector/ColumnSelector";
import { FaEllipsisV } from "react-icons/fa";

const LogModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { t } = useTranslation();
  const history = useHistory();
  const { userId } = useParams<{ userId: string }>();
  const { user } = useAuth();
  const customerAccountId = user?.customerAccountId;
  const [isOpens, setIsOpen] = useState<boolean>(false);

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
      render: (log) =>
        log.impersonationMode === false
          ? log.userName
          : log.impersonatorUserName,
    },
    {
      header: t("logModal.action"),
      key: "action",
    },
    {
      header: t("logModal.typeOfAction"),
      key: "impersonationMode",
      render: (log) =>
        log.impersonationMode === false ? "Ressource" : "Impersonation",
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

  const [visibleColumns, setVisibleColumns] = useState<string[]>([]);
  const [displayedColumns, setDisplayedColumns] = useState<
    UIColumnDefinitionType<Log>[]
  >([]);

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
      <ColumnSelectionDropdown
        columns={columns}
        visibleColumns={visibleColumns}
        setVisibleColumns={setVisibleColumns}
        setDisplayedColumns={setDisplayedColumns}
        isOpen={isOpens}
        onClose={() => setIsOpen(false)}
      />
      <Flex direction="row-reverse">
        <Button size="sm" onClick={() => setIsOpen(!isOpens)} bg="white" mr={1}>
          <FaEllipsisV />
        </Button>

        {!isLoading ? (
          <Scrollbars style={{ height: "calc(70vh - 185px)" }}>
            <UITable
              data={log}
              columns={filteredColumns}
              emptyListMessage={
                creteria.startDate && creteria.endDate
                  ? t("Aucun log trouvé pour la période spécifiée.")
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
