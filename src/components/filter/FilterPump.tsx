import React, { useState, useEffect } from "react";
import {
  Select,
  FormControl,
  FormLabel,
  Flex, // Import Flex
} from "@chakra-ui/react";
import { getAllPump } from "common/api/configuration-api";
import { useESSContext } from "store/ESSContext";
import { useAuth } from "store/AuthContext";
import { pump } from "common/model";

interface FilterPumpProps {
  onFilterChange: (filter: string, value: string) => void;
}

function FilterPump(props: FilterPumpProps) {
  const { onFilterChange } = props;
  const [selectedPump, setSelectedPump] = useState<string>("");
  const { user } = useAuth(); 
  const { selectedStation } = useESSContext(); 

  const [liste, setListe] = useState<{ pumps: pump[] }>({
    pumps: [],
  });

  useEffect(() => {
    const fetchConfig = async () => {
      if (!selectedStation || !user) {
        return;
      }
      try {
        const pumps = await getAllPump(selectedStation);
        setListe({
          pumps,
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchConfig();
  }, [selectedStation]);

  const handlePumpChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setSelectedPump(value);
    onFilterChange("Pump", value);
  };

  return (
    <Flex alignItems="center" p="5">
      <FormLabel m="0" mr="2">Pump:</FormLabel> 
      <Select 
        value={selectedPump} 
        onChange={handlePumpChange}
        size="sm"
      >
        <option value="">All</option>
        {liste.pumps.map((pump: pump) => (
          <option value={pump.id} key={pump.id}>Pump {pump.id}</option>
        ))}
      </Select>
    </Flex>
  );
}

export default FilterPump;
