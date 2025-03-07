import React, { useEffect, useState } from "react";
import { Flex, useDisclosure, useToast } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router";
import UITableModal from "../UI/Modal/UITableModal";
import UITable from "../UI/Table/UITable";
import { UIColumnDefinitionType } from "../UI/Table/Types";
import { useAuth } from "../../store/AuthContext";
import { useParams } from "react-router-dom";
import Scrollbars from "react-custom-scrollbars";
import { SkeletonTable } from "../Skeleton/Skeletons";
import ColumnSelector from "../ColumnSelector/ColumnSelector";
import {
  useStationById,
  useUploadedInformation,
} from "../../hooks/use-station";
import { useFirmwareVersion } from "../../hooks/use-configuration";
import { useDateByController } from "../../hooks/use-controller";
import moment from "moment";

const UploadInformationModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { t } = useTranslation();
  const history = useHistory();
  const { ptsId } = useParams<{ ptsId: string }>();
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const toast = useToast();
  const customerAccountId = user?.customerAccountId;

  const { firmwareVersion, isLoadingg } = useFirmwareVersion(ptsId);
  const { station } = useStationById(+id);
  const { information, isLoading } = useUploadedInformation(
    customerAccountId!!,
    ptsId,
  );
  const { DateTime, isLoadings, refetchDateTime, error } = useDateByController(
    station,
    user?.customerAccountId,
  );

  const [currentDateTime, setCurrentDateTime] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen && DateTime?.DateTime) {
      refetchDateTime();
      const initialDate = moment(DateTime.DateTime).format(
        "YYYY-MM-DDTHH:mm:ss",
      );
      setCurrentDateTime(initialDate);

      const interval = setInterval(() => {
        setCurrentDateTime((prevDate) => {
          return moment(prevDate)
            .add(1, "second")
            .format("YYYY-MM-DDTHH:mm:ss");
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [isOpen, DateTime]);

  useEffect(() => {
    onOpen();
    refetchDateTime();
  }, [onOpen, refetchDateTime]);

  const closeModalHandler = () => {
    onClose();
    history.replace("/administration/stations");
  };
  let modalTitle = (
    <>
      {t("UploadInformationModal.title.firstLine")}
      <br />
      {t("UploadInformationModal.title.secondLine", {
        firmwareVersion:
          firmwareVersion &&
          !isNaN(
            new Date(
              firmwareVersion.dateTime.replace(
                /^(\d{2})-(\d{2})-(\d{2})T/,
                "20$1-$2-$3T",
              ),
            ).getTime(),
          )
            ? new Date(
                firmwareVersion.dateTime.replace(
                  /^(\d{2})-(\d{2})-(\d{2})T/,
                  "20$1-$2-$3T",
                ),
              ).toLocaleString("fr-FR", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                hour12: false,
              })
            : "--",
        dateTime: currentDateTime
          ? moment(currentDateTime).format("DD/MM/YYYY HH:mm:ss")
          : "--",
      })}
    </>
  );

  const dataMapping = [
    {
      type: t("UploadInformationModal.pumpTransactions"),
      totalKey: "pumpTransactionsTotal",
      uploadedKey: "pumpTransactionsUploaded",
    },
    {
      type: t("UploadInformationModal.tankMeasurements"),
      totalKey: "tankMeasurementsTotal",
      uploadedKey: "tankMeasurementsUploaded",
    },
    {
      type: t("UploadInformationModal.inTankDeliveries"),
      totalKey: "inTankDeliveriesTotal",
      uploadedKey: "inTankDeliveriesUploaded",
    },
    {
      type: t("UploadInformationModal.gpsRecords"),
      totalKey: "gpsRecordsTotal",
      uploadedKey: "gpsRecordsUploaded",
    },
    {
      type: t("UploadInformationModal.alertRecords"),
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

  useEffect(() => {
    if (!information || !DateTime?.DateTime || error) {
      const timer = setTimeout(() => {
        toast({
          title: t("UploadInformationModal.toast.title"),
          description: t("UploadInformationModal.toast.description"),
          status: "warning",
          position: "top",
          duration: 3000,
          isClosable: true,
        });

        closeModalHandler();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isLoading, toast, t, error, DateTime?.DateTime, information]);

  const columns: UIColumnDefinitionType<any>[] = [
    {
      header: "#",
      key: "#",
      render: (item) => <div>{item.index}</div>,
    },
    {
      header: t("UploadInformationModal.type"),
      key: "type",
    },
    {
      header: t("UploadInformationModal.totally"),
      key: "totally",
    },
    {
      header: t("UploadInformationModal.uploaded"),
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

        {!isLoading && information ? (
          <Scrollbars style={{ height: "calc(70vh - 185px)" }}>
            <UITable
              data={tableData}
              columns={filteredColumns}
              emptyListMessage={t("UploadInformationModal.noinfo")}
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
