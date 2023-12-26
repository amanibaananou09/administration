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
  InputGroup,
  InputRightElement,
  Text,
  Link as ChakraLink,
} from "@chakra-ui/react";
import { login } from "common/api/auth-api";
import LanguageSelector from "components/LanguageSelector";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { FaEye, FaEyeSlash, FaSpinner } from "react-icons/fa";
import { useAuth } from "store/AuthContext";
import { decodeToken } from "utils/utils";
import BgSignUp from "../../assets/img/BgSignUp.png";
import { useHistory } from "react-router-dom";

const SignIn = () => {
  const { signIn } = useAuth();
  const { t } = useTranslation();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();
  const handleForgotPasswordClick = () => {
    history.push("/auth/Forgot-Password");
  };

  const handleSubmit: React.MouseEventHandler<HTMLButtonElement> = async (
    event,
  ) => {
    event.preventDefault();
    if (!username || !password) {
      setErrorMessage(t("signIn.messageError"));
      return;
    }
    setIsLoading(true);
    try {
      const { access_token } = await login(username, password);
      setIsLoading(true);
      const user = decodeToken(access_token);
      signIn(user!!);
    } catch (error) {
      console.error(error);
      setErrorMessage(t("signIn.messageInvalid"));
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSubmit((event as unknown) as React.MouseEvent<HTMLButtonElement>);
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
        top="6"
        bgImage={BgSignUp}
        bgSize="cover"
        mx={{ md: "auto" }}
        mt={{ md: "14px" }}
        borderRadius={{ base: "0px", md: "20px" }}
      >
        <Box w="100vw" h="100vh" bg="blue.500" opacity="0.8"></Box>
      </Box>
      <Flex
        justifyContent="flex-end"
        alignItems="flex"
        marginTop="15px"
        marginRight="10"
      >
        <LanguageSelector />
      </Flex>
      <Flex
        direction="column"
        textAlign="center"
        justifyContent="center"
        align="center"
        mt="125px"
        mb="30px"
      >
        <Text fontSize="4xl" color="white" fontWeight="bold">
          {t("signIn.header")}
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
          bg="white"
          boxShadow="0px 5px 14px rgba(0, 0, 0, 0.05)"
        >
          <Text
            fontSize="xl"
            color="gray.700"
            fontWeight="bold"
            textAlign="center"
            mb="22px"
          >
            {t("signIn.text")}
          </Text>
          <FormControl>
            <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
              {t("signIn.useName")}
            </FormLabel>
            <Input
              id="username"
              variant="auth"
              fontSize="sm"
              ms="4px"
              type="text"
              placeholder={t("signIn.placeholderUsername")}
              mb="24px"
              size="lg"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
              {t("signIn.password")}
            </FormLabel>
            <InputGroup>
              <Input
                id="password"
                variant="auth"
                fontSize="sm"
                ms="4px"
                type={showPassword ? "text" : "password"}
                placeholder={t("signIn.placeholderPassword")}
                mb="24px"
                size="lg"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyPress={handleKeyPress}
              />
              <InputRightElement width="3.2rem">
                <Button
                  h="115%"
                  variant="ghost"
                  onClick={() => setShowPassword(!showPassword)}
                  color="gray.500"
                  marginTop="15%"
                >
                  {showPassword ? <FaEye /> : <FaEyeSlash />}
                </Button>
              </InputRightElement>
            </InputGroup>
              <ChakraLink color="blue.400" fontSize="sm" onClick={handleForgotPasswordClick}>
               {t("signIn.forgotPassword")}
              </ChakraLink>
            <Flex p={5}>
              <Button
                fontSize="10px"
                variant="dark"
                fontWeight="bold"
                w="100%"
                h="45"
                mb="24px"
                onClick={handleSubmit}
                disabled={isLoading}
              >
                {isLoading ? <FaSpinner /> : t("signIn.login")}
              </Button>{" "}
            </Flex>

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
