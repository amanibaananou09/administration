import React from "react";
import {
  Avatar,
  Flex,
  Grid,
  Image,
  Text,
  useColorModeValue
} from "@chakra-ui/react";
import Card from "components/Card/Card";
import CardBody from "components/Card/CardBody";
import CardHeader from "components/Card/CardHeader";
import avatar5 from "assets/img/avatars/avatar5.png";
import { useAuth } from "store/AuthContext";

const Profile = () => {
  const { user } = useAuth();

  const username = user?.username || " ";
  const userEmail = user?.email || " ";
  const userFirstName = user?.given_name || " ";
  const userLastName = user?.family_name || " ";
  const userName = user?.name || " ";
  const userAddress = user?.Address || " ";
  const userPhone = user?.Phone || " ";

  const textColor = useColorModeValue("gray.700", "white");
  const bgProfile = useColorModeValue("hsla(0,0%,100%,.8)", "navy.800");
  const borderProfileColor = useColorModeValue("white", "transparent");
  const emailColor = useColorModeValue("gray.400", "gray.300");

  return (
    <Flex direction="column" pt={{ base: "120px", md: "75px", lg: "100px" }}>
      <Flex
        direction={{ sm: "column", md: "row" }}
        mb="24px"
        maxH="330px"
        align="center"
        backdropFilter="blur(21px)"
        boxShadow="0px 2px 5.5px rgba(0, 0, 0, 0.02)"
        border="1.5px solid"
        borderColor={borderProfileColor}
        bg={bgProfile}
        p="24px"
        borderRadius="20px"
      >
        <Flex align="center" direction="row">
          <Avatar
            me={{ md: "22px" }}
            src={avatar5}
            w="80px"
            h="80px"
            borderRadius="15px"
          />
          <Flex direction="column" maxWidth="100%" my={{ sm: "14px" }}>
            <Text
              fontSize={{ sm: "xl", lg: "2xl" }}
              color={textColor}
              fontWeight="bold"
              ms={{ sm: "8px", md: "0px" }}
            >
              {username}
            </Text>
            <Text
              fontSize={{ sm: "md", md: "lg" }}
              color={emailColor}
              fontWeight="semibold"
            >
              {userEmail}
            </Text>
          </Flex>
        </Flex>
      </Flex>

      <Grid
        pt={{ base: "10px", md: "75px", lg: "30px" }}
        gap="22px"
        justifyContent="center"
        alignItems="center"
      >
        <Card p="16px" my={{ sm: "24px", xl: "0px" }} width="150%">
          <CardHeader p="12px 5px" mb="12px">
            <Text fontSize="3xl" textAlign="center" color={textColor} fontWeight="bold">
              Profile Information
            </Text>
          </CardHeader>
          <CardBody px="5px">
            <Flex align="center" mb="18px">
              <Text
                fontSize="lg"
                color={textColor}
                fontWeight="bold"
                me="10px"
                textAlign="center"
              >
                Name:{" "}
              </Text>
              <Text fontSize="lg" textAlign="center" color="gray.400" fontWeight="400">
                {userName}
              </Text>
            </Flex>

            <Flex align="center" mb="18px">
              <Text
                fontSize="lg"
                color={textColor}
                fontWeight="bold"
                me="10px"
              >
                FirstName:{" "}
              </Text>
              <Text fontSize="lg" textAlign="center" color="gray.400" fontWeight="400">
                {userFirstName}
              </Text>
            </Flex>

            <Flex align="center" mb="18px">
              <Text
                fontSize="lg"
                color={textColor}
                fontWeight="bold"
                me="10px"
              >
                LastName:{" "}
              </Text>
              <Text fontSize="lg" textAlign="center" color="gray.400" fontWeight="400">
                {userLastName}
              </Text>
            </Flex>

            <Flex align="center" mb="18px">
              <Text
                fontSize="lg"
                color={textColor}
                fontWeight="bold"
                me="10px"
              >
                Address:{" "}
              </Text>
              <Text fontSize="lg" textAlign="center" color="gray.400" fontWeight="400">
                {userAddress}
              </Text>
            </Flex>

            <Flex align="center" mb="18px">
              <Text
                fontSize="lg"
                color={textColor}
                fontWeight="bold"
                me="10px"
              >
                Phone:{" "}
              </Text>
              <Text fontSize="lg" textAlign="center" color="gray.400" fontWeight="400">
                {userPhone}
              </Text>
            </Flex>

            <Flex align="center" mb="18px">
              <Text
                fontSize="lg"
                color={textColor}
                fontWeight="bold"
                me="10px"
              >
                Email:{" "}
              </Text>
              <Text fontSize="lg" textAlign="center" color="gray.400" fontWeight="400">
                {userEmail}
              </Text>
            </Flex>
          </CardBody>
        </Card>
      </Grid>
    </Flex>
  );
};

export default Profile;
