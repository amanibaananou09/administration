// Chakra imports
import {
  Avatar,
  Box,
  Button,
  Flex,
  Icon,
  Text,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
// Custom components
import React, { useState, useEffect } from "react";
import { FaCube } from "react-icons/fa";
import bgAdmin from "assets/img/admin-background.png";
import { useHistory, Link, useLocation } from "react-router-dom";
import { getControllerVersion } from "common/api.js";
function Controller() {
  const { colorMode } = useColorMode();

  // Chakra color mode
  const textColor = useColorModeValue("gray.700", "white");
  const bgProfile = useColorModeValue("hsla(0,0%,100%,.8)", "navy.800");
  const emailColor = useColorModeValue("gray.400", "gray.300");

  const [version, setVersion] = useState([]);
  const location = useLocation();
  const { stationName, data } = location.state;
  const history = useHistory();
  const UserRole = localStorage.getItem("role");
  const token = localStorage.getItem("token");
  console.log("la data de contrellor", data);
  console.log("stationName", stationName);

  useEffect(() => {
    const fetchVersion = async () => {
      try {
        const resultVersion = await getControllerVersion(token);
        console.log("la version est :", resultVersion);
        setVersion(resultVersion);
      } catch (error) {
        console.error("error dans :", error);
      }
    };
    fetchVersion();
  }, [token]);
  const versionArray = Array.isArray(version) ? version : [version];

  return (
    <Flex direction="column" pt={{ base: "120px", md: "175px", lg: "150px" }}>
      <Box
        minH="100vh"
        w="100%"
        position="absolute"
        bgImage={colorMode === "light" ? bgAdmin : "none"}
        bg={colorMode === "light" ? bgAdmin : "navy.900"}
        bgSize="cover"
        top="0"
        left="0"
      />
      {UserRole === "user" && stations.length === 0 ? (
        <Flex>
          <Text
            fontSize="lg"
            color="black"
            fontWeight="bold"
            textAlign="center"
            mt="120px"
          >
            You don't have any stations. Please contact the administrator to
            assign a station to your account.
          </Text>
        </Flex>
      ) : (
        data.map((controller) => (
          <>
            <Flex>
              <Text fontSize="lg" color={textColor} fontWeight="bold">
                Controllers list for station:
              </Text>
            </Flex>
            <Flex
              onClick={() => {
                localStorage.setItem("idCtr", controller.id);
                localStorage.setItem("PtsId", controller.ptsId);
                history.push("admin/dashboard/" + controller.id);
              }}
              key={controller.id}
              direction={{ sm: "column", md: "row" }}
              mb="30px"
              justifyContent="center"
              align="center"
              backdropFilter="blur(21px)"
              boxShadow="0px 2px 5.5px rgba(0, 0, 0, 0.02)"
              border="1.5px solid"
              bg={bgProfile}
              p="24px"
              ml="380px"
              borderRadius="20px"
              w={{ sm: "50%" }}
            >
              <Flex
                align="center"
                mb={{ sm: "10px", md: "0px" }}
                direction={{ sm: "column", md: "row" }}
                w={{ sm: "100%" }}
                textAlign={{ sm: "center", md: "start" }}
              >
                <Flex direction="column" maxWidth="100%" my={{ sm: "14px" }}>
                  <Text
                    fontSize={{ sm: "lg", lg: "xl" }}
                    color={textColor}
                    fontWeight="bold"
                    ms={{ sm: "8px", md: "0px" }}
                  >
                    PtsId: {controller.ptsId}
                  </Text>
                  {versionArray.map((v) =>
                    v.ptsId === controller.ptsId ? (
                      <Text
                        key={v.id}
                        fontSize={{ sm: "sm", md: "md" }}
                        color={emailColor}
                        fontWeight="semibold"
                      >
                        {v.versionState
                          ? " Firmware version supported   "
                          : "Firmware version not supported   "}
                        , Version : {v.dateTime}
                      </Text>
                    ) : (
                      <Text
                        fontSize={{ sm: "lg", lg: "xl" }}
                        color={textColor}
                        fontWeight="bold"
                        ms={{ sm: "8px", md: "0px" }}
                      >
                        Unreachable controller.Please contact the administrator
                        to assign firmware.
                      </Text>
                    ),
                  )}
                </Flex>
              </Flex>
            </Flex>
          </>
        ))
      )}
      <Button p="0px" bg="transparent" variant="no-effects">
        <Flex
          align="center"
          w={{ sm: "100%", lg: "135px" }}
          bg={colorMode === "dark" ? "navy.900" : "#fff"}
          borderRadius="8px"
          justifyContent="center"
          py="20px"
          boxShadow="0px 2px 5.5px rgba(0, 0, 0, 0.06)"
          cursor="pointer"
        >
          <Icon color={textColor} as={FaCube} me="6px" />
          <Text fontSize="xs" color={textColor} fontWeight="bold">
            <Link to="/auth/signin"> Add Controller </Link>
          </Text>
        </Flex>
      </Button>
    </Flex>
  );
}

export default Controller;
