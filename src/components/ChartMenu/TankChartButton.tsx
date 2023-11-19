import { Box, Button, Stack } from "@chakra-ui/react";
import { TankChartMenuProps } from "common/react-props";

const TankChartButton = ({
  tanks,
  selectedTank,
  onChange,
}: TankChartMenuProps) => {
  return (
    <Box p={4}>
      <Stack direction="row" spacing={4} align="center">
        {tanks.map((tankElement) => (
          <Box key={tankElement.idConf}>
            <Button
              colorScheme={
                selectedTank === tankElement.idConf ? "blue" : "gray"
              }
              onClick={() => {
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
