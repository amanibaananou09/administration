import {
  Box,
  Flex,
  Heading,
  Icon,
  Image,
  List,
  ListItem,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import { getLastTankDelivery } from "common/api/statistique-api";
import { LastTankDelivery } from "common/model";
import { LastTankRowProps } from "common/react-props";
import { useEffect, useState } from "react";
import { MdCheckCircle } from "react-icons/md";
import { useAuth } from "store/AuthContext";
import { useESSContext } from "store/ESSContext";
import { formatDate } from "utils/utils";
import tankImg from "../../assets/img/tank.png";
import { useTranslation } from "react-i18next";

export const LastTankDeliveryTooltip = ({ tankId }: LastTankRowProps) => {
  const [lastTankDelivery, setLastTankDelivery] = useState<LastTankDelivery>();
  const { user } = useAuth();
  const { selectedStation } = useESSContext();
  const { t } = useTranslation("dashboard");

  useEffect(() => {
    const fetchData = async () => {
      if (!selectedStation || !user) {
        return;
      }
      try {
        const result = await getLastTankDelivery(selectedStation, tankId);
        setLastTankDelivery(result);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [selectedStation]);

  const content = (
    <Box p={4} maxW="600px" mx="auto">
      <Heading fontSize="l" fontWeight="semibold" textAlign="center">
        {t("lastTankDeliveryTooltip.header")}
      </Heading>
      <Box borderBottom="1px solid #e5e5e5" my={4} />

      {lastTankDelivery && (
        <>
          <Flex mb={4} alignItems="center">
            <Heading fontSize="m" fontWeight="medium" mr={2}>
              -  {t("lastTankDeliveryTooltip.date")}:
            </Heading>
            <Text textAlign="center">
              {formatDate(lastTankDelivery.dateTime)}
            </Text>
          </Flex>

          <Heading fontSize="m" fontWeight="medium" mb={4}>
            -  {t("lastTankDeliveryTooltip.deliveryAbsoluteValues")}:
          </Heading>
          <List spacing={2}>
            <ListItem>
              <Flex alignItems="center">
                <Icon as={MdCheckCircle} color="green.500" mr={2} />
                <Text>{t("common.productHeight")}: {lastTankDelivery.productHeight} mm</Text>
              </Flex>
            </ListItem>
            <ListItem>
              <Flex alignItems="center">
                <Icon as={MdCheckCircle} color="green.500" mr={2} />
                <Text>{t("common.waterHeight")}: {lastTankDelivery.waterHeight} mm</Text>
              </Flex>
            </ListItem>
            <ListItem>
              <Flex alignItems="center">
                <Icon as={MdCheckCircle} color="green.500" mr={2} />
                <Text>{t("common.temperature")}: {lastTankDelivery.temperature} °C</Text>
              </Flex>
            </ListItem>
            <ListItem>
              <Flex alignItems="center">
                <Icon as={MdCheckCircle} color="green.500" mr={2} />
                <Text>{t("common.productVolume")}: {lastTankDelivery.productVolume} L</Text>
              </Flex>
            </ListItem>
            <ListItem>
              <Flex alignItems="center">
                <Icon as={MdCheckCircle} color="green.500" mr={2} />
                <Text>
                {t("lastTankDeliveryTooltip.productTcVolume")}: {lastTankDelivery.productTCVolume} L
                </Text>
              </Flex>
            </ListItem>
            <ListItem>
              <Flex alignItems="center">
                <Icon as={MdCheckCircle} color="green.500" mr={2} />
                <Text>
                  {" "}
                  {t("lastTankDeliveryTooltip.productDensity")}: {lastTankDelivery.productDensity} kg/m³
                </Text>
              </Flex>
            </ListItem>
            <ListItem>
              <Flex alignItems="center">
                <Icon as={MdCheckCircle} color="green.500" mr={2} />
                <Text>{t("lastTankDeliveryTooltip.productMass")}: {lastTankDelivery.productMass} kg</Text>
              </Flex>
            </ListItem>
            <ListItem>
              <Flex alignItems="center">
                <Icon as={MdCheckCircle} color="green.500" mr={2} />
                <Text>
                {t("lastTankDeliveryTooltip.pumpsDispensedVolume")}:{lastTankDelivery.pumpsDispensedVolume}{" "}
                  L
                </Text>
              </Flex>
            </ListItem>
          </List>
        </>
      )}
    </Box>
  );

  return (
    <Tooltip label={content} placement="auto" hasArrow>
      <Image src={tankImg} height="75%" width="15%" />
    </Tooltip>
  );
};

export default LastTankDeliveryTooltip;
