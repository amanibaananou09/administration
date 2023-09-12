// Chakra imports
import {
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
import { useHistory, Link, useParams } from "react-router-dom";
import { getControllerVersion } from "common/api.js";
import { findControllerByStation } from "common/api";
import CustomCard from "components/Card/CustomCard";
function Controller() {
  const { colorMode } = useColorMode();

  // Chakra color mode
  const textColor = useColorModeValue("gray.700", "white");

  const [controllers, setControllers] = useState(null);
  const { stationName } = useParams("stationName");
  const history = useHistory();

  const UserRole = localStorage.getItem("role");
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchControllers = async () => {
      try {
        const retrievedControllers = await findControllerByStation(
          stationName,
          token,
        );

        const resultVersion = await getControllerVersion(token);

        const version = Array.isArray(resultVersion)
          ? resultVersion
          : [resultVersion];

        const controllers = [];

        retrievedControllers.forEach((controller) => {
          const controllerVersion = version.find(
            (v) => v.ptsId === controller.ptsId,
          );

          let isVersionCompatible = false;
          let compatibleVersion = null;

          if (
            (controllerVersion != undefined) &
            controllerVersion.versionState
          ) {
            isVersionCompatible = true;
            compatibleVersion = controllerVersion.dateTime;
          }

          controllers.push({
            ...controller,
            isVersionCompatible,
            compatibleVersion,
          });
        });

        setControllers(controllers);
      } catch (error) {
        console.error("error dans :", error);
      }
    };
    fetchControllers();
  }, [token]);

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
        controllers &&
        controllers.map((controller) => (
          <div key={controller.id}>
            <Flex>
              <Text fontSize="lg" color={textColor} fontWeight="bold">
                Controllers list for station:
              </Text>
            </Flex>
            <CustomCard
              title={`PtsId: ${controller.ptsId}`}
              description={
                controller.isVersionCompatible
                  ? `Firmware version supported: ${controller.compatibleVersion}`
                  : "Firmware version not supported Please contact the administrator."
              }
              onClick={() => {
                localStorage.setItem("PtsId", controller.ptsId);
                history.push("admin/dashboard/" + controller.id);
              }}
            />
          </div>
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
