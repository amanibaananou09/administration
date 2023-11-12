import {
  Box,
  Button,
  Card,
  CardBody,
  Flex,
  Skeleton,
  Stack,
  Table,
  Tbody,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
} from "@chakra-ui/react";
import { getListOfCustomerAccount } from "common/api/custmorAccount-api";
import { CustomerAccountTableRowProps } from "common/model";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import CardHeader from "../../components/Card/CardHeader";
import CustomerAccountTableRow from "../../components/Tables/CustomerAccountTableRow";

const CustomerAccount = () => {
  const textColor = useColorModeValue("teal.800", "teal.200");
  const borderColor = useColorModeValue("teal.200", "teal.600");
  const bgColor = useColorModeValue("white", "gray.800");
  const skeletonColor = useColorModeValue("gray.200", "gray.600");

  const [customerAccounts, setCustomerAccounts] = useState<
    CustomerAccountTableRowProps[]
  >();

  useEffect(() => {
    const getListAccounts = async () => {
      const result = await getListOfCustomerAccount();
      setCustomerAccounts(result);
    };
    getListAccounts();
  }, []);

  return (
    <Flex direction="column" pt={{ base: "120px", md: "75px" }}>
      <Card
        overflowX={{ sm: "scroll", xl: "hidden" }}
        pb="0px"
        bgColor={bgColor}
        maxW="80vw"
      >
        <CardHeader p="6px 0px 22px 0px" bgColor={bgColor}>
          <br />
          <Text
            fontSize="3xl"
            color={textColor}
            textAlign="center"
            fontWeight="bold"
          >
            Customer Accounts
          </Text>
        </CardHeader>
        <CardBody bgColor={bgColor}>
          <Table
            variant="simple"
            color={textColor}
            size="lg"
            textAlign="center"
          >
            <Thead>
              <Tr bg="teal.200" color="white">
                <Th
                  borderColor={borderColor}
                  textAlign="center"
                  fontSize="lg"
                  fontWeight="bold"
                  p={4}
                >
                  Name
                </Th>
                <Th
                  borderColor={borderColor}
                  textAlign="center"
                  fontSize="lg"
                  fontWeight="bold"
                  p={4}
                >
                  Description
                </Th>
                <Th
                  borderColor={borderColor}
                  textAlign="center"
                  fontSize="lg"
                  fontWeight="bold"
                  p={4}
                >
                  Status
                </Th>
                <Th
                  borderColor={borderColor}
                  textAlign="center"
                  fontSize="lg"
                  fontWeight="bold"
                  p={4}
                >
                  Master User
                </Th>
              </Tr>
            </Thead>

            <Tbody>
              {customerAccounts &&
                customerAccounts.map((account, key) => (
                  <CustomerAccountTableRow
                    name={account.name}
                    description={account.description}
                    status={account.status}
                    masterUser={account.masterUser.username}
                    key={key}
                  />
                ))}
            </Tbody>
          </Table>
          {!customerAccounts && (
            <Stack width="100%" margin="20px 0px">
              <Skeleton
                height="50px"
                borderRadius="10px"
                bgColor={skeletonColor}
              />
              <Skeleton
                height="50px"
                borderRadius="10px"
                bgColor={skeletonColor}
              />
              <Skeleton
                height="50px"
                borderRadius="10px"
                bgColor={skeletonColor}
              />
              <Skeleton
                height="50px"
                borderRadius="10px"
                bgColor={skeletonColor}
              />
            </Stack>
          )}
        </CardBody>
        <br />
        <Flex justify="right" align="flex-end">
          <Box marginRight="4">
            <Link to="/add-customer-account">
              <Button colorScheme="teal" size="lg">
                Add Customer Account
              </Button>
            </Link>
          </Box>
        </Flex>
        <br />
      </Card>
    </Flex>
  );
};
export default CustomerAccount;
