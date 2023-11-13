import { Box, Stack, Button } from "@chakra-ui/react";
import { TankChartMenuProps } from "common/model";

const TankChartButton = ({
  tanks,
  selectedTank,
  onChange,
}: TankChartMenuProps) => {
  return (
    <Box p={4}>
      <Stack direction="row" spacing={4} align="center">
        {tanks.map((tankElement) => (
          <Box >
            <Button
              colorScheme={
                selectedTank === tankElement.idConf ? "blue" : "gray"
              }
              onClick={() => {
                console.log("tankElement.idConf:", tankElement.idConf);
                console.log("selectedTank:", selectedTank);
                onChange(tankElement.idConf);
              }}
            >
              Tank {tankElement.idConf}
            </Button>
          </Box>
        ))}
      </Stack>
    </Box>
  );
};

export default TankChartButton;
