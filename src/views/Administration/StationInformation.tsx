import {
  Box,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { Station } from "../../common/model";

interface StationInformationPopupProps {
  station: Station;
  onClose: () => void;
}

const StationInformation = ({
  station,
  onClose,
}: StationInformationPopupProps) => {
  return (
    <Modal isOpen={true} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent
        bg="gray.400"
        color="white"
        borderRadius="md"
        boxShadow="md"
        p={4}
      >
        <ModalHeader
          fontSize="2xl"
          color="yellow.300"
          fontWeight="bold"
          textAlign="center"
        >
          Station Information
        </ModalHeader>
        <ModalCloseButton color="gray.900" />
        <ModalBody color="gray.900">
          <Flex width="100%" gap="10%">
            <Box>
              <Text fontSize="md" color="gray.900" fontWeight="bold">
                Name:
              </Text>
              <Text fontSize="md" color="gray.900" fontWeight="bold">
                Address :
              </Text>
              <Text fontSize="md" color="gray.900" fontWeight="bold">
                Country:
              </Text>
              <Text fontSize="md" color="gray.900" fontWeight="bold">
                Currency:
              </Text>
              <Text fontSize="md" color="gray.900" fontWeight="bold">
                ControllerPts:
              </Text>
            </Box>
            <Box>
              <Text fontSize="md" fontWeight="medium" color="white">
                {station.name}
              </Text>
              <Text fontSize="md" fontWeight="medium" color="white">
                {station.address}
              </Text>
              <Text fontSize="md" fontWeight="medium" color="white">
                {station.country.name}
              </Text>
              <Text fontSize="md" fontWeight="medium" color="white">
                {station.country.currency.name} [{" "}
                {station.country.currency.code} ]
              </Text>
              <Text fontSize="md" fontWeight="medium" color="white">
                {station.controllerPts.ptsId}
              </Text>
            </Box>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default StationInformation;
