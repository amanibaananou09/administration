import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  Spinner,
  Text,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import { ExitConfiguratorProps } from "common/react-props";
import { ProfileIcon } from "components/Icons/Icons";
import { useDebounce } from "hooks/use-debounce";
import React, { useEffect, useRef, useState } from "react";
import Scrollbars from "react-custom-scrollbars";
import { useTranslation } from "react-i18next";
import { useImpersonateUser, useUsersByName } from "../../hooks/use-user";
import { useAuth } from "../../store/AuthContext";
import { decodeToken } from "../../utils/utils";
import { FaSearch, FaTimes } from "react-icons/fa";

const ExitConfigurator = (props: ExitConfiguratorProps) => {
  const { t } = useTranslation();
  const { signIn } = useAuth();
  const settingsRef = useRef<HTMLDivElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();
  const [searchValue, setSearchValue] = useState<string>("");
  const [searchType, setSearchType] = useState<"account" | "user">("account");
  const debouncedSearchValue = useDebounce(searchValue);
  const [searchText, setSearchText] = useState<string>("");
  const { customerAccounts, isLoading, error } = useUsersByName();
  const { impersonateUser } = useImpersonateUser();
  const [isResizing, setIsResizing] = useState(false);
  const [drawerWidth, setDrawerWidth] = useState(350); // Initial width

  useEffect(() => {
    setSearchText(debouncedSearchValue);
  }, [debouncedSearchValue]);

  const filteredAccounts = customerAccounts?.filter((account) =>
    searchType === "account"
      ? account.name?.toLowerCase().includes(searchText.toLowerCase()) ||
        account.parentName?.toLowerCase().includes(searchText.toLowerCase())
      : account.masterUser?.firstName
          ?.toLowerCase()
          .includes(searchText.toLowerCase()) ||
        account.masterUser?.lastName
          ?.toLowerCase()
          .includes(searchText.toLowerCase()),
  );

  const handleImpersonate = async (userId: number) => {
    try {
      const {
        access_token,
        impersonation_mode,
        original_user_id,
      } = await impersonateUser(userId);
      const user = decodeToken(access_token);

      if (user) {
        user.impersonationMode = impersonation_mode;
        user.originalUserId = original_user_id;
        localStorage.setItem(
          "impersonationMode",
          impersonation_mode.toString(),
        );
        localStorage.setItem(
          "originalUserId",
          original_user_id?.toString() || "",
        );
      }

      signIn(user!!);
      props.onClose();
    } catch (err) {
      console.error("Failed :", err);
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsResizing(true);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isResizing && drawerRef.current) {
      const newWidth = window.innerWidth - e.clientX; // Adjust width based on mouse position from the left
      setDrawerWidth(newWidth > 200 ? newWidth : 200); // Minimum width of 200px
    }
  };

  const handleMouseUp = () => {
    setIsResizing(false);
  };

  useEffect(() => {
    if (isResizing) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    } else {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isResizing]);

  return (
    <Drawer
      isOpen={props.isOpen}
      onClose={props.onClose}
      placement={"right"}
      finalFocusRef={settingsRef}
      blockScrollOnMount={true}
      size="sm"
    >
      <DrawerContent
        bg="white"
        ref={drawerRef}
        style={{
          width: `${drawerWidth}px`,
          minWidth: "300px",
          maxWidth: "500px",
          position: "fixed", // Fixed positioning to anchor the Drawer on the right
          right: "0", // Keep the drawer on the right
          top: "0",
          bottom: "0",
        }}
      >
        {/* Resizer Bar */}
        <Box
          position="absolute"
          left="-5px" // Resizer bar on the left edge
          top="0"
          height="100%"
          width="10px"
          cursor="ew-resize"
          backgroundColor="gray.300" // Make the resizer bar visible
          onMouseDown={handleMouseDown}
          zIndex="1000"
          _hover={{ backgroundColor: "gray.500" }} // Hover effect for better visibility
        />

        <DrawerCloseButton />
        <DrawerHeader pt="24px" px="24px">
          <Text fontSize="md" fontWeight="bold" my="16px">
            {t("exitConfigurator.title")}
          </Text>
          <Flex>
            <Select
              size="sm"
              width="150px"
              value={searchType}
              onChange={(e) =>
                setSearchType(e.target.value as "account" | "user")
              }
            >
              <option value="account">{t("exitConfigurator.account")}</option>
              <option value="user">{t("exitConfigurator.user")}</option>
            </Select>
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                children={<FaSearch color="gray.500" />}
              />
              <Input
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder={t("exitConfigurator.placeholder")}
                type="text"
                variant="filled"
                size="sm"
              />
              {searchValue && (
                <Button
                  size="sm"
                  position="absolute"
                  right="0"
                  top="0"
                  bg="transparent"
                  onClick={() => setSearchValue("")}
                >
                  <FaTimes />
                </Button>
              )}
            </InputGroup>
          </Flex>
        </DrawerHeader>
        <DrawerBody overflowY="hidden">
          {isLoading && (
            <Flex justifyContent="center" py="10px">
              <Spinner size="md" color="blue.500" />
            </Flex>
          )}

          {!isLoading && filteredAccounts?.length === 0 && (
            <Text fontSize="md" fontWeight="bold" my="16px">
              {t("exitConfigurator.empty")}
            </Text>
          )}

          {error && (
            <Alert status="error" mt="10px">
              <AlertIcon />
              {error.message}
            </Alert>
          )}

          <Scrollbars autoHide style={{ height: "100%" }}>
            {!isLoading && (
              <div>
                {filteredAccounts?.map((account) => (
                  <Button
                    key={account.id}
                    w="100%"
                    bg={
                      account.masterUser?.username === user?.username
                        ? "linear-gradient(90deg, #2c5282, #2a4365)"
                        : account.resaleRight
                        ? "blue.50"
                        : "gray.50"
                    }
                    color={
                      account.masterUser?.username === user?.username
                        ? "white"
                        : "gray.800"
                    }
                    borderRadius="sm"
                    border={
                      account.masterUser?.username === user?.username
                        ? "none"
                        : "2px solid"
                    }
                    borderColor={
                      account.masterUser?.username === user?.username
                        ? ""
                        : "gray.300"
                    }
                    boxShadow={
                      account.masterUser?.username === user?.username
                        ? "0 4px 6px rgba(0, 0, 0, 0.1)"
                        : "0 1px 3px rgba(0, 0, 0, 0.1)"
                    }
                    fontSize="sm"
                    mb="12px"
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                    px="5px"
                    py="12px"
                    transition="all 0.3s ease"
                    onClick={() =>
                      handleImpersonate(Number(account.masterUser.id))
                    }
                  >
                    <Box display="flex" alignItems="center">
                      <Flex>
                        {account.resaleRight && (
                          <ProfileIcon
                            color={"gray.700"}
                            w="33px"
                            h="33px"
                            mr="12px"
                          />
                        )}
                      </Flex>
                      <Flex>
                        {account.resaleRight
                          ? `${account.masterUser.firstName} ${account.masterUser.lastName} - ${account.name} (${account.parentName})`
                          : `${account.masterUser.firstName} ${account.masterUser.lastName} - ${account.name}`}
                      </Flex>
                    </Box>
                  </Button>
                ))}
              </div>
            )}
          </Scrollbars>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default ExitConfigurator;
