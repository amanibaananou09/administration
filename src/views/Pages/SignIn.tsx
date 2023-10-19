import {
  Alert,
  AlertDescription,
  AlertIcon,
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { getStations, login } from "common/api";
import React, { useState } from "react";
import { useAuth } from "store/AuthContext";
import { useESSContext } from "store/ESSContext";
import { decodeToken } from "utils/utils";
import BgSignUp from "../../assets/img/BgSignUp.png";

const SignIn = () => {
  const bgForm: string = useColorModeValue("white", "navy.800");
  const textColor: string = useColorModeValue("gray.700", "white");

  const { selectStation } = useESSContext();
  const { signIn } = useAuth();

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const getDefaultStation = async (user: any): Promise<any> => {
    const stations = await getStations(user);
    if (stations.length > 0) {
      return stations[0];
    }

    return null;
  };

  const handleSubmit: React.MouseEventHandler<HTMLButtonElement> = async (
    event,
  ) => {
    event.preventDefault();
    if (!username || !password) {
      setErrorMessage("Please fill in both username and password fields.");
      return;
    }
    try {
      const { access_token } = await login(username, password);

      const user = decodeToken(access_token);

      const defaultStation = await getDefaultStation(user);

      if (defaultStation) {
        selectStation(defaultStation);
      }

      if (user) {
        signIn(user);
      } else {
        setErrorMessage("User information is missing.");
      }
    } catch (error) {
      console.error(error);
      setErrorMessage("Invalid username or password.");
    }
  };

  return (
    <Flex
      direction="column"
      alignSelf="center"
      justifySelf="center"
      overflow="hidden"
    >
      <Box
        position="absolute"
        minH={{ base: "70vh", md: "50vh" }}
        maxH={{ base: "70vh", md: "50vh" }}
        w={{ md: "calc(100vw - 50px)" }}
        maxW={{ md: "calc(100vw - 50px)" }}
        left="0"
        right="0"
        bgRepeat="no-repeat"
        overflow="hidden"
        zIndex="-1"
        top="0"
        bgImage={BgSignUp}
        bgSize="cover"
        mx={{ md: "auto" }}
        mt={{ md: "14px" }}
        borderRadius={{ base: "0px", md: "20px" }}
      >
        <Box w="100vw" h="100vh" bg="blue.500" opacity="0.8"></Box>
      </Box>
      <Flex
        direction="column"
        textAlign="center"
        justifyContent="center"
        align="center"
        mt="125px"
        mb="30px"
      >
        <Text fontSize="4xl" color="white" fontWeight="bold">
          Fuel Stations Management
        </Text>
        <Text
          fontSize="md"
          color="white"
          fontWeight="normal"
          mt="10px"
          mb="26px"
          w={{ base: "90%", sm: "60%", lg: "40%", xl: "333px" }}
        >
          {/*  Use these awesome forms to login.*/}
        </Text>
      </Flex>
      <Flex alignItems="center" justifyContent="center" mb="60px" mt="20px">
        <Flex
          direction="column"
          w="445px"
          background="transparent"
          borderRadius="15px"
          p="40px"
          mx={{ base: "100px" }}
          bg={bgForm}
          boxShadow={useColorModeValue(
            "0px 5px 14px rgba(0, 0, 0, 0.05)",
            "unset",
          )}
        >
          <Text
            fontSize="xl"
            color={textColor}
            fontWeight="bold"
            textAlign="center"
            mb="22px"
          >
            Please login to connect
          </Text>
          <FormControl>
            <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
              Username
            </FormLabel>
            <Input
              id="username"
              variant="auth"
              fontSize="sm"
              ms="4px"
              type="text"
              placeholder="Type your username"
              mb="24px"
              size="lg"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
              Password
            </FormLabel>
            <Input
              id="password"
              variant="auth"
              fontSize="sm"
              ms="4px"
              type="password"
              placeholder="Type your password"
              mb="24px"
              size="lg"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              fontSize="10px"
              variant="dark"
              fontWeight="bold"
              w="100%"
              h="45"
              mb="24px"
              onClick={handleSubmit}
            >
              LOGIN
            </Button>
            {errorMessage && (
              <Alert status="error" mb={4}>
                <AlertIcon />
                <AlertDescription>{errorMessage}</AlertDescription>
              </Alert>
            )}
          </FormControl>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default SignIn;
