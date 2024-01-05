import { Divider, Flex, Text, useDisclosure } from "@chakra-ui/react";
import UIDetailModal from "components/UI/Modal/UIDetailModal";
import { Ref, forwardRef, useImperativeHandle, useState } from "react";
import { useTranslation } from "react-i18next";
import { GeneralStations } from "../../common/AdminModel";

interface StationDetailsModalProps {}

export interface StationDetailsModalRefType {
  open: (user: GeneralStations) => void;
}

const StationDetailsModal = (
  {}: StationDetailsModalProps,
  ref: Ref<StationDetailsModalRefType>,
) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [stationDetails, setStationDetails] = useState<GeneralStations>();
  const { t } = useTranslation();

  useImperativeHandle(ref, () => ({
    open(station) {
      setStationDetails(station);
      onOpen();
    },
  }));

  return (
    <UIDetailModal
      title={t("stationDetailsModel.header")}
      isOpen={isOpen}
      onClose={onClose}
    >
      {stationDetails && (
        <Flex justifyContent="space-between" flexWrap="wrap" p="4">
          <div style={{ marginBottom: "10px" }}>
            <Text fontWeight="bold" marginBottom="5px">
              {t("stationDetailsModel.name")}
            </Text>
            <Text fontWeight="bold" marginBottom="5px">
              {t("stationDetailsModel.creatorAccount")}
            </Text>
            <Text fontWeight="bold" marginBottom="5px">
              {t("stationDetailsModel.customerAccount")}
            </Text>
            <Text fontWeight="bold" marginBottom="5px">
              {t("stationDetailsModel.phone")}
            </Text>
            <Text fontWeight="bold" marginBottom="5px">
              {t("stationDetailsModel.address")}
            </Text>
            <Text fontWeight="bold" marginBottom="5px">
              {t("stationDetailsModel.country")}
            </Text>
            <Text fontWeight="bold" marginBottom="5px">
              {t("stationDetailsModel.gps")}
            </Text>
            <Divider my={4} />

            <Text fontWeight="bold" marginBottom="5px">
              {t("stationDetailsModel.controllerPts")}
            </Text>
            <Text fontWeight="bold" marginBottom="5px">
              {t("stationDetailsModel.controllerType")}
            </Text>
            <Text fontWeight="bold" marginBottom="5px">
              {t("stationDetailsModel.controllerUser")}
            </Text>
          </div>
          <div>
            <Text fontWeight="normal" marginBottom="5px">
              {stationDetails.name ?? "-"}
            </Text>
            <Text fontWeight="normal" marginBottom="5px">
              {stationDetails.creatorCustomerAccountName ?? "-"}
            </Text>
            <Text fontWeight="normal" marginBottom="5px">
              {stationDetails.customerAccountName ?? "-"}
            </Text>
            <Text fontWeight="normal" marginBottom="5px">
              {stationDetails.controllerPts.phone ?? "-"}
            </Text>
            <Text fontWeight="normal" marginBottom="5px">
              {stationDetails.address ?? "-"}
            </Text>
            <Text fontWeight="normal" marginBottom="5px">
              {stationDetails.country.name ?? "-"}
            </Text>
            <Text fontWeight="normal" marginBottom="5px">
              {stationDetails.cordonneesGps ?? "-"}
            </Text>
            <Divider my={4} />
            <Text fontWeight="normal" marginBottom="5px">
              {stationDetails.controllerPts.ptsId ?? "-"}
            </Text>
            <Text fontWeight="normal" marginBottom="5px">
              {stationDetails.controllerPts.controllerType ?? "-"}
            </Text>
            <Text fontWeight="normal" marginBottom="5px">
              {stationDetails.controllerPts.userController.username ?? "-"}
            </Text>
          </div>
        </Flex>
      )}
    </UIDetailModal>
  );
};

export default forwardRef(StationDetailsModal);
