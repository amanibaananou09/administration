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
// Assets
import imgstation from "assets/img/total.png";
// Custom components
import React, { useState, useEffect } from "react";
import { FaCube } from "react-icons/fa";
import bgAdmin from "assets/img/admin-background.png";
import { useHistory, Link } from "react-router-dom";
import {
  getAllStations,
  getStationByUser,
  findControllerByStation,
} from "common/api.js";
function Station() {
  const { colorMode } = useColorMode();

  // Chakra color mode
  const textColor = useColorModeValue("gray.700", "white");
  const bgProfile = useColorModeValue("hsla(0,0%,100%,.8)", "navy.800");

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
    try {
      const response = await findControllerByStation(stationName, token);
      history.push({
        pathname: "/controller",
        state: { stationName: stationName, data: response },
      });
    } catch (error) {
      console.error("Error fetching controller data:", error);
    }
  };

  if (!token) {
    history.push("/");
    return null;
  }
  return (
    <Flex direction='column' pt={{ base: "120px", md: "175px", lg: "150px" }}>
      <Box
        minH='100vh'
        w='100%'
        position='absolute'
        bgImage={colorMode === "light" ? bgAdmin : "none"}
        bg={colorMode === "light" ? bgAdmin : "navy.900"}
        bgSize='cover'
        top='0'
        left='0'
      />
      {UserRole === "user" && stations.length === 0 ? (
        <Flex direction='column' align='center' mt='120px'>
          <Text
            fontSize='lg'
            color='black'
            fontWeight='bold'
            textAlign='center'
          >
            You don't have any stations.
          </Text>
          <Text fontSize='md' color='black' textAlign='center' mt='10px'>
            Please contact the administrator to assign a station to your
            account.
          </Text>
        </Flex>
      ) : (
        stations.map((station) => (
          <Flex
            key={station.id}
            direction={{ sm: "column", md: "row" }}
            mb='30px'
            justifyContent='center'
            align='center'
            backdropFilter='blur(21px)'
            boxShadow='0px 2px 5.5px rgba(0, 0, 0, 0.02)'
            border='1.5px solid'
            bg={bgProfile}
            p='24px'
            ml='380px'
            borderRadius='20px'
            w={{ sm: "50%" }}
            onClick={() => handleStationClick(station.name)}
          >
            <Flex
              key={station.id}
              align='center'
              mb={{ sm: "10px", md: "0px" }}
              direction={{ sm: "column", md: "row" }}
              w={{ sm: "100%" }}
              textAlign={{ sm: "center", md: "start" }}
            >
              <Avatar
                key={station.id}
                me={{ md: "24px" }}
                src={imgstation}
                w='70px'
                h='70px'
                borderRadius='15px'
              />
              <Flex
                key={station.id}
                direction='column'
                maxWidth='100%'
                my={{ sm: "14px" }}
              >
                <Text
                  key={station.id}
                  fontSize={{ sm: "lg", lg: "xl" }}
                  color={textColor}
                  fontWeight='bold'
                  ms={{ sm: "8px", md: "0px" }}
                >
                  {station.name}
                </Text>
              </Flex>
            </Flex>
          </Flex>
        ))
      )}
      <Button p='0px' bg='transparent' variant='no-effects'>
        <Flex
          align='center'
          w={{ sm: "100%", lg: "135px" }}
          bg={colorMode === "dark" ? "navy.900" : "#fff"}
          borderRadius='8px'
          justifyContent='center'
          py='20px'
          boxShadow='0px 2px 5.5px rgba(0, 0, 0, 0.06)'
          cursor='pointer'
        >
          <Icon color={textColor} as={FaCube} me='6px' />
          <Text fontSize='xs' color={textColor} fontWeight='bold'>
            <Link to='/auth/signin'> Add Station </Link>
          </Text>
        </Flex>
      </Button>
    </Flex>
  );
}

export default Station;
