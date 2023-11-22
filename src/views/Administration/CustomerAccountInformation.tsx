import { Box, Button, Flex, Text, useColorModeValue } from "@chakra-ui/react";
import { Account, RouteParams } from "common/AdminModel";
import {
  AddStationModalRefType,
  AddUserModalRefType,
} from "common/react-props";
import Card from "components/Card/Card";
import CardBody from "components/Card/CardBody";
import CardHeader from "components/Card/CardHeader";
import AddStationModal from "components/Modal/AdministrationModal/AddStationModal";
import AddUserModal from "components/Modal/AdministrationModal/AddUserModal";
import { Fragment, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { formatDate } from "utils/utils";
import {
  allStationByCustomerAccount,
  allUserByCustomerAccount,
  getCustomerAccountInformation,
} from "../../common/api/station-api";
import { Station, User } from "../../common/model";
import { useTranslation } from "react-i18next";

const CustomerAccountInformation = () => {
  const { id } = useParams<RouteParams>();
  const addUserModalRef = useRef<AddUserModalRefType>(null);
  const addStationModalRef = useRef<AddStationModalRefType>(null);
  const { t } = useTranslation('administration');

  const [account, setAccount] = useState<Account>();
  const [stationAccounts, setStationAccounts] = useState<Station[]>([]);
  const [userAccounts, setUserAccounts] = useState<User[]>([]);

  const textColor = useColorModeValue("gray.700", "white");

  const openUserModal = () => {
    addUserModalRef.current?.open();
  };

  const openStationModal = () => {
    addStationModalRef.current?.open();
  };

  useEffect(() => {
    const allStationByAccount = async () => {
      try {
        const result = await allStationByCustomerAccount(id);
        setStationAccounts(result);
      } catch (error) {
        console.error(error);
      }
    };
    allStationByAccount();
  }, [id]);

  useEffect(() => {
    const allUserByAccount = async () => {
      try {
        const result = await allUserByCustomerAccount(id);
        setUserAccounts(result);
      } catch (error) {
        console.error(error);
      }
    };
    allUserByAccount();
  }, [id]);

  useEffect(() => {
    const allAccounts = async () => {
      try {
        const customerAccount = await getCustomerAccountInformation(id);

        setAccount(customerAccount);
      } catch (error) {
        console.error(error);
      }
    };

    allAccounts();
  }, [id]);

  const submitAddUserModalHandler = async () => {
    try {
      const result = await allUserByCustomerAccount(id);
      setUserAccounts(result);
    } catch (error) {
      console.error(error);
    }
  };

  const submitAddStationModalHandler = async () => {
    try {
      const result = await allStationByCustomerAccount(id);
      setStationAccounts(result);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <Flex direction="column" pt={{ base: "120px", md: "75px" }}>
        <Card overflowX={{ sm: "scroll", xl: "hidden" }}>
          <CardHeader p="6px 0px 22px 0px">
            <Text fontSize="xl" color={textColor} fontWeight="bold">
            {t("customerAccountInformation.header")}
            </Text>
          </CardHeader>
          <CardBody>
            <Box backgroundColor="gray.200" p={6} borderRadius="16px" mb="50px">
              {account ? (
                <Flex width="100%" gap="10%">
                  <Box>
                    <Text fontSize="md" color="gray.900" fontWeight="bold">
                    {t("common.name")} :
                    </Text>
                    <Text fontSize="md" color="gray.900" fontWeight="bold">
                    {t("common.status")} :
                    </Text>
                    <Text fontSize="md" color="gray.900" fontWeight="bold">
                      {t("customerAccountInformation.dateStatusLabel")} :
                    </Text>
                    <Text fontSize="md" color="gray.900" fontWeight="bold">
                    {t("common.description")} :
                    </Text>
                  </Box>
                  <Box>
                    <Text fontSize="md" fontWeight="medium" color="gray.500">
                      {account.name}
                    </Text>

                    <Text fontSize="md" fontWeight="medium" color="gray.500">
                      {account.status}
                    </Text>

                    <Text fontSize="md" fontWeight="medium" color="gray.500">
                      {formatDate(account.dateStatusChange)}
                    </Text>

                    <Text fontSize="md" fontWeight="medium" color="gray.500">
                      {account.description}
                    </Text>
                  </Box>
                </Flex>
              ) : (
                <Text color="gray.500">{t("customerAccountInformation.noAccountsAvailable")}.</Text>
              )}
            </Box>
            <Flex gap={4}>
              <Flex direction="column" flex={1}>
                <Text
                  fontSize="xl"
                  color="gray.700"
                  textAlign="center"
                  fontWeight="bold"
                >
                 {t("customerAccountInformation.attachedUsersTitle")} 
                </Text>
                <Box
                  backgroundColor="gray.200"
                  borderRadius="16px"
                  p={6}
                  marginBottom="20px"
                  width="100%"
                >
                  {userAccounts.map((user, index) => (
                    <Fragment key={index}>
                      <Text fontSize="md" color="gray.700">
                        {user.username}
                      </Text>
                    </Fragment>
                  ))}
                  {userAccounts.length == 0 && (
                    <Text fontSize="md" color="gray.700">
                       {t("customerAccountInformation.noUserAttached")}
                    </Text>
                  )}
                </Box>
                <Button
                  colorScheme="teal"
                  size="md"
                  width="100%"
                  onClick={() => openUserModal()}
                >
                  {t("customerAccountInformation.addUserButton")}
                </Button>
              </Flex>
              <Flex direction="column" flex={1}>
                <Text
                  fontSize="xl"
                  color="gray.700"
                  textAlign="center"
                  fontWeight="bold"
                >
                  {t("customerAccountInformation.attachedStationsTitle")} 
                </Text>
                <Box
                  backgroundColor="gray.200"
                  borderRadius="16px"
                  p={6}
                  marginBottom="20px"
                  width="100%"
                >
                  {stationAccounts.length > 0 &&
                    stationAccounts.map((station, index) => (
                      <Fragment key={index}>
                        <Text fontSize="md" color="gray.700">
                          {station.name}
                        </Text>
                      </Fragment>
                    ))}

                  {stationAccounts.length == 0 && (
                    <Text fontSize="md" color="gray.700">
                      {t("customerAccountInformation.noStationAttached")}
                    </Text>
                  )}
                </Box>
                <Button
                  colorScheme="teal"
                  size="md"
                  width="100%"
                  onClick={() => openStationModal()}
                >
                  {t("customerAccountInformation.addStationButton")}
                </Button>
              </Flex>
            </Flex>
          </CardBody>
        </Card>
      </Flex>
      <AddUserModal
        ref={addUserModalRef}
        onSubmit={submitAddUserModalHandler}
      />
      <AddStationModal
        ref={addStationModalRef}
        onSubmit={submitAddStationModalHandler}
      />
    </>
  );
};

export default CustomerAccountInformation;
