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
import { User } from "../../common/model";

interface UserInformationPopupProps {
  user: User;
  onClose: () => void;
}

const UserInformation = ({ user, onClose }: UserInformationPopupProps) => {
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
          User Information
        </ModalHeader>
        <ModalCloseButton color="gray.900" />
        <ModalBody color="gray.900">
          <Flex width="100%" gap="10%">
            <Box>
              <Text fontSize="md" color="gray.900" fontWeight="bold">
                Username:
              </Text>
              <Text fontSize="md" color="gray.900" fontWeight="bold">
                First Name:
              </Text>
              <Text fontSize="md" color="gray.900" fontWeight="bold">
                Last Name:
              </Text>
              <Text fontSize="md" color="gray.900" fontWeight="bold">
                Phone:
              </Text>
              <Text fontSize="md" color="gray.900" fontWeight="bold">
                Email:
              </Text>
            </Box>
            <Box>
              <Text fontSize="md" fontWeight="medium" color="white">
                {user.username}
              </Text>

              <Text fontSize="md" fontWeight="medium" color="white">
                {user.firstName}
              </Text>

              <Text fontSize="md" fontWeight="medium" color="white">
                {user.lastName}
              </Text>

              <Text fontSize="md" fontWeight="medium" color="white">
                {user.phone}
              </Text>
              <Text fontSize="md" fontWeight="medium" color="white">
                {user.email}
              </Text>
            </Box>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default UserInformation;
