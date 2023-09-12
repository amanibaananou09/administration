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
import { useHistory, Link } from "react-router-dom";
import { getAllStations, getStationByUser } from "common/api.js";
import CustomCard from "components/Card/CustomCard";

//Assets
import stationImg from "assets/img/total.png";

function Station() {
  const { colorMode } = useColorMode();

  // Chakra color mode
  const textColor = useColorModeValue("gray.700", "white");

  const [stations, setStations] = useState([""]);
  const history = useHistory();
  const token = localStorage.getItem("token");
  const userLogin = localStorage.getItem("userName");
  const UserRole = localStorage.getItem("role");

  useEffect(() => {
    const fetchStations = async () => {
      try {
        if (UserRole === "SUPERADMIN") {
          const data = await getAllStations(token);
          setStations(data);
        } else {
          const data = await getStationByUser(userLogin, token);
          setStations(data);
        }
      } catch (error) {
        console.error("Error fetching stations:", error);
      }
    };
    fetchStations();
  }, [UserRole, token, userLogin]);

  const handleStationClick = async (stationName) => {
    history.push(`/controller/${stationName}`);
  };

  if (!token) {
    history.push("/");
    return null;
  }
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
        <Flex direction="column" align="center" mt="120px">
          <Text
            fontSize="lg"
            color="black"
            fontWeight="bold"
            textAlign="center"
          >
            You don't have any stations.
          </Text>
          <Text fontSize="md" color="black" textAlign="center" mt="10px">
            Please contact the administrator to assign a station to your
            account.
          </Text>
        </Flex>
      ) : (
        stations.map((station) => (
          <CustomCard
            key={station}
            title={station.name}
            avatar={stationImg}
            onClick={handleStationClick}
          />
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
            <Link to="/auth/signin"> Add Station </Link>
          </Text>
        </Flex>
      </Button>
    </Flex>
  );
}

export default Station;
