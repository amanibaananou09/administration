import { Badge, Td, Text, Tr } from "@chakra-ui/react";
import { GeneralStations } from "common/AdminModel";
import {
  activateStation,
  deactivateStation,
  getCustomerAccountInformation,
} from "common/api/station-api";
import { useEffect, useState } from "react";

export interface stationTableRowProps {
  index: number;
  station: GeneralStations;
  isLastRow: boolean;
}

const StationTableRow = ({
  index,
  station,
  isLastRow,
}: stationTableRowProps & { index: number }) => {
  const textColor = "gray.500";
  const [actif, setActif] = useState(station.actif);
  const [customerAccountName, setCustomerAccountName] = useState("");
  const [creatorAccountName, setCreatorAccountName] = useState("");
  const handleClick = async () => {
    try {
      if (station.actif) {
        // If currently active, deactivate
        await deactivateStation(station.customerAccountId,station.id);
        setActif(false);
      } else {
        // If currently inactive, activate
        await activateStation(station.customerAccountId,station.id);
        setActif(true); 
      }
      setActif(!actif);
      console.log("Clicked!");
    } catch (error) {
      console.error("Error:", error);
    }
  };
  useEffect(() => {
    const fetchCustomerAccountName = async () => {
      try {
        if (station.customerAccountId) {
          const customerAccountInfo = await getCustomerAccountInformation(
            station.customerAccountId,
          );
          setCustomerAccountName(customerAccountInfo.name);
        } else {
          console.error("user.customerAccountId is undefined");
        }
      } catch (error) {
        console.error("Error fetching customer account information:", error);
      }
    };

    const fetchCreatorAccountName = async () => {
      try {
        if (station.creatorAccountId) {
          const creatorAccountInfo = await getCustomerAccountInformation(
            station.creatorAccountId,
          );
          setCreatorAccountName(creatorAccountInfo.name);
        } else {
          console.error("user.creatorAccountId is undefined");
        }
      } catch (error) {
        console.error("Error fetching creator account information:", error);
      }
    };

    fetchCustomerAccountName();
    fetchCreatorAccountName();
  }, [station.creatorAccountId, station.customerAccountId]);
  const columnWidth = "50px";
  const borderColor = "gray.200";
  return (
    <Tr>
      <Td
        width={columnWidth}
        borderColor={borderColor}
        borderBottom={isLastRow ? "none" : undefined}
        textAlign="center"
      >
        {index + 1}
      </Td>
      <Td
        width={columnWidth}
        borderColor={borderColor}
        borderBottom={isLastRow ? "none" : undefined}
        textAlign="center"
      >
        {station.name}
      </Td>
      <Td
        width={columnWidth}
        borderColor={borderColor}
        borderBottom={isLastRow ? "none" : undefined}
        textAlign="center"
      >
        {creatorAccountName}
      </Td>

      <Td
        width={columnWidth}
        borderColor={borderColor}
        borderBottom={isLastRow ? "none" : undefined}
        textAlign="center"
      >
        {customerAccountName}
      </Td>
      <Td
        width={columnWidth}
        borderColor={borderColor}
        borderBottom={isLastRow ? "none" : undefined}
        textAlign="center"
      >
        {station.controllerType}
      </Td>
      <Td
        width={columnWidth}
        borderColor={borderColor}
        borderBottom={isLastRow ? "none" : undefined}
        textAlign="center"
      >
        <div onClick={handleClick} style={{ cursor: "pointer" }}>
          {actif ? (
            <Text fontSize="md" color="green.400" fontWeight="bold">
              ✓
            </Text>
          ) : (
            <Text fontSize="md" color="red.400" fontWeight="bold">
              X
            </Text>
          )}
        </div>
      </Td>
      <Td
        width={columnWidth}
        borderColor={borderColor}
        borderBottom={isLastRow ? "none" : undefined}
        textAlign="center"
      >
        {station.controllerPts.ptsId}
      </Td>
      <Td
        width={columnWidth}
        borderColor={borderColor}
        borderBottom={isLastRow ? "none" : undefined}
        textAlign="center"
      >
        {station.phone}
      </Td>
      <Td
        width={columnWidth}
        borderColor={borderColor}
        borderBottom={isLastRow ? "none" : undefined}
        textAlign="center"
      >
        {station.connection}
      </Td>
      <Td
        width={columnWidth}
        borderColor={borderColor}
        borderBottom={isLastRow ? "none" : undefined}
        textAlign="center"
      >
        {new Date(station.dateStatusChange).toLocaleString()}{" "}
      </Td>
    </Tr>
  );
};

export default StationTableRow;
