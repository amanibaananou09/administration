// Chakra imports
import {
  Avatar,
  AvatarGroup,
  Box,
  Button,
  Flex,
  Grid,
  Icon,
  Image,
  Link,
  Switch,
  Text,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
// Assets
import avatar2 from "assets/img/avatars/avatar2.png";
import avatar3 from "assets/img/avatars/avatar3.png";
import avatar4 from "assets/img/avatars/avatar4.png";
import avatar5 from "assets/img/avatars/avatar5.png";
import avatar6 from "assets/img/avatars/avatar6.png";
import ImageArchitect1 from "assets/img/ImageArchitect1.png";
import ImageArchitect2 from "assets/img/ImageArchitect2.png";
import ImageArchitect3 from "assets/img/ImageArchitect3.png";
// Custom components
import Card from "components/Card/Card";
import CardBody from "components/Card/CardBody";
import CardHeader from "components/Card/CardHeader";
import React from "react";
import {
  FaCube,
  FaFacebook,
  FaInstagram,
  FaPenFancy,
  FaPlus,
  FaTwitter,
} from "react-icons/fa";
import { IoDocumentsSharp } from "react-icons/io5";

function Profile() {
  const { colorMode } = useColorMode();

  // Chakra color mode
  const textColor = useColorModeValue("gray.700", "white");
  const iconColor = useColorModeValue("blue.500", "white");
  const bgProfile = useColorModeValue("hsla(0,0%,100%,.8)", "navy.800");
  const borderProfileColor = useColorModeValue("white", "transparent");
  const emailColor = useColorModeValue("gray.400", "gray.300");

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
              Alec Thompson
            </Text>
            <Text
              fontSize={{ sm: "sm", md: "md" }}
              color={emailColor}
              fontWeight="semibold"
            >
              alec@simmmple.com
            </Text>
          </Flex>
        </Flex>
        <Flex
          direction={{ sm: "column", lg: "row" }}
          w={{ sm: "100%", md: "50%", lg: "auto" }}
        >
          <Button p="0px" bg="transparent" variant="no-effects">
            <Flex
              align="center"
              w={{ sm: "100%", lg: "135px" }}
              bg={colorMode === "dark" ? "navy.900" : "#fff"}
              borderRadius="8px"
              justifyContent="center"
              py="10px"
              boxShadow="0px 2px 5.5px rgba(0, 0, 0, 0.06)"
              cursor="pointer"
            >
              <Icon color={textColor} as={FaCube} me="6px" />
              <Text fontSize="xs" color={textColor} fontWeight="bold">
                OVERVIEW
              </Text>
            </Flex>
          </Button>
        </Flex>
      </Flex>

      <Grid templateColumns={{ sm: "1fr", xl: "repeat(3, 1fr)" }} gap="22px" >
        <Card p="16px" my={{ sm: "24px", xl: "0px" }}>
          <CardHeader p="12px 5px" mb="12px">
            <Text fontSize="lg" color={textColor} fontWeight="bold">
              Profile Information
            </Text>
          </CardHeader>
          <CardBody px="5px">
            <Flex direction="column">
              <Text fontSize="md" color="gray.400" fontWeight="400" mb="30px">
                Hi, I’m Esthera Jackson, Decisions: If you can’t decide, the
                answer is no. If two equally difficult paths, choose the one
                more painful in the short term (pain avoidance is creating an
                illusion of equality).
              </Text>
              <Flex align="center" mb="18px">
                <Text
                  fontSize="md"
                  color={textColor}
                  fontWeight="bold"
                  me="10px"
                >
                  Full Name:{" "}
                </Text>
                <Text fontSize="md" color="gray.400" fontWeight="400">
                  Esthera Jackson
                </Text>
              </Flex>
              <Flex align="center" mb="18px">
                <Text
                  fontSize="md"
                  color={textColor}
                  fontWeight="bold"
                  me="10px"
                >
                  Mobile:{" "}
                </Text>
                <Text fontSize="md" color="gray.400" fontWeight="400">
                  (44) 123 1234 123
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
                  esthera@simmmple.com
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
                  United States
                </Text>
              </Flex>
              <Flex align="center" mb="18px">
                <Text
                  fontSize="md"
                  color={textColor}
                  fontWeight="bold"
                  me="10px"
                >
                  Social Media:{" "}
                </Text>
                <Flex>
                  <Link
                    href="#"
                    color={iconColor}
                    fontSize="lg"
                    me="10px"
                    _hover={{ color: "blue.500" }}
                  >
                    <Icon as={FaFacebook} />
                  </Link>
                  <Link
                    href="#"
                    color={iconColor}
                    fontSize="lg"
                    me="10px"
                    _hover={{ color: "blue.500" }}
                  >
                    <Icon as={FaInstagram} />
                  </Link>
                  <Link
                    href="#"
                    color={iconColor}
                    fontSize="lg"
                    me="10px"
                    _hover={{ color: "blue.500" }}
                  >
                    <Icon as={FaTwitter} />
                  </Link>
                </Flex>
              </Flex>
            </Flex>
          </CardBody>
        </Card>
      </Grid>
    </Flex>
  );
}

export default Profile;
