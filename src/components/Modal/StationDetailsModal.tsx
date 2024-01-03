import React from "react";
import {
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import { GeneralStations } from "../../common/AdminModel";
import { ModalFooter } from "@chakra-ui/modal";
import { useTranslation } from "react-i18next";

interface StationDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  stationDetails: GeneralStations | null;
}

const StationDetailsModal = ({
  isOpen,
  onClose,
  stationDetails,
}: StationDetailsModalProps) => {
  const { t } = useTranslation();

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent
        style={{
          backgroundColor: "gray.100",
          borderRadius: "10px",
        }}
      >
        <ModalHeader
          style={{
            backgroundColor: "black",
            color: "white",
          }}
        >
          {t("stationDetailsModel.header")}
        </ModalHeader>
        <ModalCloseButton color="white" />
        <ModalBody>
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
                  {t("stationDetailsModel.controllerPts")}
                </Text>
                <Text fontWeight="bold" marginBottom="5px">
                  {t("stationDetailsModel.controllerType")}
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
                  {stationDetails.controllerPts.ptsId ?? "-"}
                </Text>
                <Text fontWeight="normal" marginBottom="5px">
                  {stationDetails.controllerPts.controllerType ?? "-"}
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
              </div>
            </Flex>
          )}
        </ModalBody>
        <ModalFooter>
          <Button> close </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default StationDetailsModal;
