import { Input } from "@chakra-ui/input";
import {
  Alert,
  AlertIcon,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  Flex,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { ExitConfiguratorProps } from "common/react-props";
import { useDebounce } from "hooks/use-debounce";
import { useRef, useState } from "react";
import Scrollbars from "react-custom-scrollbars";
import { useTranslation } from "react-i18next";
import { useUsersByName } from "../../hooks/use-user";
import { useAuth } from "../../store/AuthContext";
import { impersonateUser } from "../../common/api/auth-api";
import { decodeToken } from "../../utils/utils";

const ExitConfigurator = (props: ExitConfiguratorProps) => {
  const { t } = useTranslation();
  const { signIn } = useAuth();
  const settingsRef = useRef<HTMLDivElement>(null);
  const { user, impersonate } = useAuth();
  const [searchValue, setSearchValue] = useState<string>("");
  const debouncedSearchValue = useDebounce(searchValue);
  const { listUser, isLoading, error } = useUsersByName(debouncedSearchValue);
  const handleImpersonate = async (userId: number) => {
    try {
      const { access_token, impersonation_mode, original_user_id } =
        await impersonateUser(userId);
      const user = decodeToken(access_token);

      if (user) {
        user.impersonationMode = impersonation_mode; // Set impersonation mode
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
    } catch (err) {
      console.error("Failed :", err);
    }
  };

  return (
    <Drawer
      isOpen={props.isOpen}
      onClose={props.onClose}
      placement={"right"}
      finalFocusRef={settingsRef}
      blockScrollOnMount={true}
    >
      <DrawerContent bg="white">
        <DrawerCloseButton />
        <DrawerHeader pt="24px" px="24px">
          <Text fontSize="md" fontWeight="bold" my="16px">
            {t("exitConfigurator.title")}
          </Text>
          <Input
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder={t("exitConfigurator.placeholder")}
            type="text"
            my="4px"
          />
        </DrawerHeader>
        <DrawerBody overflowY="hidden">
          {isLoading && (
            <Flex justifyContent="center" py="10px">
              <Spinner size="md" color="blue.500" />
            </Flex>
          )}

          {!isLoading && listUser?.length === 0 && (
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

          <Scrollbars autoHide style={{ height: "calc(100vh - 185px)" }}>
            {!isLoading && (
              <div>
                {listUser?.map((userItem) => (
                  <Button
                    key={userItem.id}
                    w="100%"
                    bg={
                      userItem.username === user?.username
                        ? "linear-gradient(81.62deg, #313860 2.25%, #151928 79.87%)"
                        : "white"
                    }
                    color={
                      userItem.username === user?.username
                        ? "white"
                        : "gray.700"
                    }
                    border={
                      userItem.username === user?.username
                        ? "none"
                        : "1px solid"
                    }
                    borderColor={
                      userItem.username === user?.username ? "" : "gray.700"
                    }
                    fontSize="sm"
                    mb="8px"
                    onClick={() => handleImpersonate(Number(userItem.id))}
                  >
                    {userItem.username}
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
