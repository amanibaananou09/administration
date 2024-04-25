import {
  Alert,
  AlertDescription,
  AlertIcon,
  Box,
  Button,
  Flex,
  FormControl,
  Input,
  InputGroup,
  InputRightElement,
  Text,
} from "@chakra-ui/react";
import { resetPassword } from "common/api/forgot-password-api";
import LanguageSelector from "components/LanguageSelector";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useHistory } from "react-router-dom";
import BgSignUp from "../../assets/img/BgSignUp.png";
import Logo from "../../assets/img/Stationnex.png";

const ResetPassword = () => {
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const history = useHistory();
  const [resetSuccess, setResetSuccess] = useState<boolean>(false);
  const { t } = useTranslation();

  const urlParams = new URLSearchParams(window.location.search);
  const resetToken = urlParams.get("resetToken");

  const handleResetPassword = async (e: any) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError(t("resetPassword.error"));
      return;
    }
    if (!password || !confirmPassword) {
      setError(t("resetPassword.errorInvalid"));
      return;
    }
    setIsLoading(true);

    try {
      await resetPassword(password, resetToken);
      setError("");
      setResetSuccess(true);
      setTimeout(() => {
        history.push("/auth/SignIn");
        window.history.replaceState(null, "", window.location.pathname);
      }, 5000);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };
  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleResetPassword(
        (event as unknown) as React.MouseEvent<HTMLButtonElement>,
      );
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
        <Box w="100vw" h="100vh" bg="gray.300" opacity="0.8"></Box>
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
        <img
          src={Logo}
          alt="Stationnex Logo"
          style={{ height: "150px", width: "15%" }}
        />
        <Text
          fontSize="lg"
          color="black"
          fontWeight="bold"
          mt="10px"
          w={{ base: "90%", sm: "60%", lg: "40%", xl: "333px" }}
        >
          {t("signIn.title")}
        </Text>{" "}
        <Text
          fontSize="md"
          color="white"
          fontWeight="normal"
          mt="10px"
          mb="26px"
          w={{ base: "90%", sm: "60%", lg: "40%", xl: "333px" }}
        ></Text>
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
            {t("resetPassword.text")}
          </Text>
          <FormControl>
            <InputGroup>
              <Input
                id="password"
                variant="auth"
                fontSize="sm"
                ms="4px"
                type={showPassword ? "text" : "password"}
                placeholder={t("resetPassword.placeholderPassword")}
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
                  onClick={handleTogglePassword}
                  color="gray.500"
                  marginTop="15%"
                >
                  {showPassword ? <FaEye /> : <FaEyeSlash />}
                </Button>
              </InputRightElement>
            </InputGroup>
            <Input
              id="password"
              variant="auth"
              fontSize="sm"
              ms="4px"
              type="password"
              placeholder={t("resetPassword.placeholderConfirmPassword")}
              mb="24px"
              size="lg"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <Flex p={5}>
              <Button
                fontSize="15px"
                fontWeight="bold"
                width="100%"
                height="45px"
                colorScheme="blue"
                isLoading={isLoading}
                onClick={handleResetPassword}
              >
                {t("resetPassword.continue")}
              </Button>
            </Flex>
            {error && (
              <Alert status="error" mb={4}>
                <AlertIcon />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            {resetSuccess && (
              <Alert status="success" mb={4}>
                <AlertIcon />
                <AlertDescription>
                  {t("resetPassword.alertSuccess")}
                </AlertDescription>
              </Alert>
            )}
          </FormControl>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default ResetPassword;
