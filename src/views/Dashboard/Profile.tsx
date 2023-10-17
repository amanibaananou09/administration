import React, { FC } from 'react';
import {
  Avatar,
  Button,
  Flex,
  Grid,
  Icon,
  Text,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { useESSContext } from "src/store/ESSContext";
import avatar5 from "../../assets/img/avatars/avatar5.png";
import Card from "src/components/Card/Card";
import CardBody from "src/components/Card/CardBody";
import CardHeader from "src/components/Card/CardHeader";

interface ProfileProps {}

const Profile: FC<ProfileProps> = () => {
  const { selectedStation } = useESSContext();

  const textColor: string = useColorModeValue("gray.700", "white");
  const bgProfile: string = useColorModeValue("hsla(0,0%,100%,.8)", "navy.800");
  const borderProfileColor: string = useColorModeValue("white", "transparent");
  const emailColor: string = useColorModeValue("gray.400", "gray.300");

  return (
    <Flex direction="column" pt={{ base: "120px", md: "75px", lg: "100px" }}>
      <Flex
        direction={{ sm: "column", md: "row" }}
        mb="24px"
        maxH="330px"
        justifyContent={{ sm: "center", md: "space-between" }}
        align="center"
        backdropFilter="blur(21px)"
        boxShadow="0px 2px 5.5px rgba(0, 0, 0, 0.02)"
        border="1.5px solid"
        borderColor={borderProfileColor}
        bg={bgProfile}
        p="24px"
        borderRadius="20px"
      >
        <Flex
          align="center"
          mb={{ sm: "10px", md: "0px" }}
          direction={{ sm: "column", md: "row" }}
          w={{ sm: "100%" }}
          textAlign={{ sm: "center", md: "start" }}
        >
          <Avatar
            me={{ md: "22px" }}
            src={avatar5}
            w="80px"
            h="80px"
            borderRadius="15px"
          />
          <Flex direction="column" maxWidth="100%" my={{ sm: "14px" }}>
            <Text
              fontSize={{ sm: "lg", lg: "xl" }}
              color={textColor}
              fontWeight="bold"
              ms={{ sm: "8px", md: "0px" }}
            >
              {selectedStation.userLogin}
            </Text>
            <Text
              fontSize={{ sm: "sm", md: "md" }}
              color={emailColor}
              fontWeight="semibold"
            >
              {selectedStation.user.email}
            </Text>
          </Flex>
        </Flex>
        <Flex
          direction={{ sm: "column", lg: "row" }}
          w={{ sm: "100%", md: "50%", lg: "auto" }}
        ></Flex>
      </Flex>

      <Grid
        pt={{ base: "10px", md: "75px", lg: "30px" }}
        gap="22px"
        justifyContent="center"
        alignItems="center"
      >
        <Card p="16px" my={{ sm: "24px", xl: "0px" }}>
          <CardHeader p="12px 5px" mb="12px">
            <Text fontSize="lg" color={textColor} fontWeight="bold">
              Profile Information
            </Text>
          </CardHeader>
          <CardBody px="5px">
            <Flex direction="column">
              <Flex align="center" mb="18px">
                <Text
                  fontSize="md"
                  color={textColor}
                  fontWeight="bold"
                  me="10px"
                >
                  first Name:{" "}
                </Text>
                <Text fontSize="md" color="gray.400" fontWeight="400">
                  {selectedStation.user.firstName}
                </Text>
              </Flex>
              <Flex align="center" mb="18px">
                <Text
                  fontSize="md"
                  color={textColor}
                  fontWeight="bold"
                  me="10px"
                >
                  last Name:{" "}
                </Text>
                <Text fontSize="md" color="gray.400" fontWeight="400">
                  {selectedStation.user.lastName}
                </Text>
              </Flex>
              <Flex align="center" mb="18px">
                <Text
                  fontSize="md"
                  color={textColor}
                  fontWeight="bold"
                  me="10px"
                >
                  Email:{" "}
                </Text>
                <Text fontSize="md" color="gray.400" fontWeight="400">
                  {selectedStation.user.email}
                </Text>
              </Flex>
              <Flex align="center" mb="18px">
                <Text
                  fontSize="md"
                  color={textColor}
                  fontWeight="bold"
                  me="10px"
                >
                  Location:{" "}
                </Text>
                <Text fontSize="md" color="gray.400" fontWeight="400">
                  {selectedStation.address}
                </Text>
              </Flex>
            </Flex>
          </CardBody>
        </Card>
      </Grid>
    </Flex>
  );
}

export default Profile;