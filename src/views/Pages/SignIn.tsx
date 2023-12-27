import {
  Alert,
  AlertDescription,
  AlertIcon,
  Box,
  Button,
  Link as ChakraLink,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Text,
} from "@chakra-ui/react";
import { login } from "common/api/auth-api";
import LanguageSelector from "components/LanguageSelector";
import { useFormik } from "formik";
import useFormValidation from "hooks/use-form-validation";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useHistory } from "react-router-dom";
import { useAuth } from "store/AuthContext";
import { decodeToken } from "utils/utils";
import BgSignUp from "../../assets/img/BgSignUp.png";

type SubmitFormValues = {
  username: string;
  password: string;
};

const SignIn = () => {
  const { signIn } = useAuth();
  const { t } = useTranslation();
  const { signInFormValidationSchema } = useFormValidation();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const history = useHistory();

  const form = useFormik<SubmitFormValues>({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: signInFormValidationSchema,
    onSubmit: async (values) => {
      const { username, password } = values;

      try {
        const { access_token } = await login(username, password);
        const user = decodeToken(access_token);
        signIn(user!!);
      } catch (error) {
        console.error(error);
        setErrorMessage(t("signIn.messageInvalid"));
      }
    },
  });

  const handleForgotPasswordClick = () => {
    history.push("/auth/Forgot-Password");
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
        <Text fontSize="5xl" color="white" fontWeight="bold">
          {t("signIn.header")}
        </Text>
        <Text
          fontSize="lg"
          color="white"
          fontWeight="normal"
          mt="10px"
          mb="26px"
          w={{ base: "90%", sm: "60%", lg: "40%", xl: "333px" }}
        >
          {t("signIn.title")}
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
          <form>
            <FormControl
              isInvalid={!!form.errors.username && !!form.touched.username}
              mb="24px"
            >
              <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                {t("signIn.useName")}
              </FormLabel>
              <Input
                id="username"
                name="username"
                fontSize="sm"
                ms="4px"
                type="text"
                placeholder={t("signIn.placeholderUsername")}
                size="lg"
                value={form.values.username}
                onChange={form.handleChange}
                onBlur={form.handleBlur}
              />
              <FormErrorMessage>{form.errors.username}</FormErrorMessage>
            </FormControl>
            <FormControl
              isInvalid={!!form.errors.password && !!form.touched.password}
              mb="24px"
            >
              <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                {t("signIn.password")}
              </FormLabel>
              <InputGroup>
                <Input
                  id="password"
                  name="password"
                  fontSize="sm"
                  ms="4px"
                  type={showPassword ? "text" : "password"}
                  placeholder={t("signIn.placeholderPassword")}
                  size="lg"
                  value={form.values.password}
                  onChange={form.handleChange}
                  onBlur={form.handleBlur}
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
              <FormErrorMessage>{form.errors.password}</FormErrorMessage>
            </FormControl>
            <ChakraLink
              color="blue.400"
              fontSize="sm"
              onClick={handleForgotPasswordClick}
            >
              {t("signIn.forgotPassword")}
            </ChakraLink>
            <Flex py={5}>
              <Button
                fontSize="10px"
                variant="dark"
                fontWeight="bold"
                w="100%"
                h="45"
                mb="24px"
                onClick={() => form.handleSubmit()}
                isLoading={form.isSubmitting}
              >
                {t("signIn.login")}
              </Button>
            </Flex>

            {errorMessage && (
              <Alert status="error" mb={4}>
                <AlertIcon />
                <AlertDescription>{errorMessage}</AlertDescription>
              </Alert>
            )}
          </form>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default SignIn;
