import React, { useEffect, useState } from "react";
import { Flex, useDisclosure } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router";
import UITableModal from "../UI/Modal/UITableModal";
import UITable from "../UI/Table/UITable";
import { UIColumnDefinitionType } from "../UI/Table/Types";
import { useAuth } from "../../store/AuthContext";
import { useParams } from "react-router-dom";
import { uploadInformation } from "../../common/model";
import Scrollbars from "react-custom-scrollbars";
import { SkeletonTable } from "../Skeleton/Skeletons";
import ColumnSelector from "../ColumnSelector/ColumnSelector";
import { useUploadedInformation } from "../../hooks/use-station";

const UploadInformationModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { t } = useTranslation();
  const history = useHistory();
  const { ptsId } = useParams<{ ptsId: string }>();
  const { user } = useAuth();
  const customerAccountId = user?.customerAccountId;

  const { information, isLoading } = useUploadedInformation(
    customerAccountId!!,
    ptsId,
  );

  useEffect(() => {
    onOpen();
  }, [onOpen]);

  const closeModalHandler = () => {
    onClose();
    history.replace("/administration/stations");
  };

  let modalTitle = t("uploadlnformation.title");

  const dataMapping = [
    {
      type: t("uploadInformation.pumpTransactions"),
      totalKey: "pumpTransactionsTotal",
      uploadedKey: "pumpTransactionsUploaded",
    },
    {
      type: t("uploadInformation.tankMeasurements"),
      totalKey: "tankMeasurementsTotal",
      uploadedKey: "tankMeasurementsUploaded",
    },
    {
      type: t("uploadInformation.inTankDeliveries"),
      totalKey: "inTankDeliveriesTotal",
      uploadedKey: "inTankDeliveriesUploaded",
    },
    {
      type: t("uploadInformation.gpsRecords"),
      totalKey: "gpsRecordsTotal",
      uploadedKey: "gpsRecordsUploaded",
    },
    {
      type: t("uploadInformation.alertRecords"),
      totalKey: "alertRecordsTotal",
      uploadedKey: "alertRecordsUploaded",
    },
  ];

  const tableData = dataMapping.map((mapItem, index) => ({
    index: index + 1,
    type: mapItem.type,
    totally: information?.[mapItem.totalKey] ?? 0,
    uploaded: information?.[mapItem.uploadedKey] ?? 0,
  }));

  const columns: UIColumnDefinitionType<uploadInformation>[] = [
    {
      header: "#",
      key: "#",
      render: (item) => <div>{item.index}</div>,
    },
    {
      header: t("uploadInformation.type"),
      key: "type",
    },
    {
      header: t("uploadInformation.totally"),
      key: "totally",
    },
    {
      header: t("uploadInformation.uploaded"),
      key: "uploaded",
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
      logData={information}
    >
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
              data={information}
              columns={filteredColumns}
              emptyListMessage={t("uploadlnformation.noLogs")}
            />
          </Scrollbars>
        ) : (
          <SkeletonTable />
        )}
      </Flex>
    </UITableModal>
  );
};

export default UploadInformationModal;
