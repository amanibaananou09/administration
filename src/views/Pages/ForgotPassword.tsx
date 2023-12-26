import * as React from "react";
import {
  Box,
  Grid,
  Input,
  Button,
  Heading,
  VStack,
  Text,
  Alert,
  AlertIcon,
  Flex,
  FormControl,
  AlertDescription,
} from "@chakra-ui/react";
import { useState } from "react";
import { forgotPassword } from "common/api/forgot-password-api";
import BgSignUp from "../../assets/img/BgSignUp.png";
import LanguageSelector from "components/LanguageSelector";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [resetSuccess, setResetSuccess] = useState<boolean>(false);
  const { t } = useTranslation("dashboard");
  const history = useHistory();

  const handleMail = async (e: any) => {
    e.preventDefault();

    if (!email.trim()) {
      setError(t("ForgotPassword.errorVide"));
      return;
    }

    setIsLoading(true);
    try {
      await forgotPassword(email);
      setResetSuccess(true);
      setError("");
    } catch (error) {
      setError(t("ForgotPassword.errorInvalid"));
      setResetSuccess(false);
    } finally {
      setIsLoading(false);
    }
  };
  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleMail((event as unknown) as React.MouseEvent<HTMLButtonElement>);
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
            {t("ForgotPassword.text")}
          </Text>
          <Text textAlign="center" mb={6}>
            {t("ForgotPassword.description")}
          </Text>
          <FormControl>
            <Input
              type="email"
              placeholder={t("ForgotPassword.placeholderEmail")}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fontSize="sm"
              ms="4px"
              mb="24px"
              size="lg"
              onKeyPress={handleKeyPress}
            />
            <Flex columnGap={4}>
              <Button
                onClick={() => {
                  history.push("/auth/SignIn");
                }}
                color="gray.600"
                bgColor="gray.300"
                size="sm"
                width="100%"
                fontWeight="bold"
                height="45px"
                mb="12px"
              >
                {t("ForgotPassword.ignore")}
              </Button>
              <Button
                fontSize="15px"
                type="submit"
                colorScheme="blue"
                fontWeight="bold"
                w="100%"
                h="45"
                mb="24px"
                isLoading={isLoading}
                onClick={handleMail}
              >
                {t("ForgotPassword.search")}
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
                  {t("ForgotPassword.AlertDescription")}
                </AlertDescription>
              </Alert>
            )}
          </FormControl>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default ForgotPassword;
