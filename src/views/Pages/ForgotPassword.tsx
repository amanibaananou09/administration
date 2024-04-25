import {
  Alert,
  AlertDescription,
  AlertIcon,
  Box,
  Button,
  Flex,
  FormControl,
  Input,
  Text,
} from "@chakra-ui/react";
import { forgotPassword } from "common/api/forgot-password-api";
import LanguageSelector from "components/LanguageSelector";
import * as React from "react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import BgSignUp from "../../assets/img/BgSignUp.png";
import Logo from "../../assets/img/Stationnex.png";

const ForgotPassword = () => {
  const [email, setEmail] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [resetSuccess, setResetSuccess] = useState<boolean>(false);
  const { t } = useTranslation();
  const history = useHistory();
  const [success, setSuccess] = useState<boolean>(false);

  const handleMail = async (e: any) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email.trim()) {
      setError(t("ForgotPassword.errorVide"));
      return;
    }
    if (!emailRegex.test(email)) {
      setError(t("ForgotPassword.errorInvalid"));
      return;
    }
    setIsLoading(true);
    try {
      await forgotPassword(email);
      setResetSuccess(true);
      setError("");
    } catch (error) {
      setSuccess(true);
      setError("");
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
            {(resetSuccess || success) && (
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
