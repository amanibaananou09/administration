import { Box, Button, Stack } from "@chakra-ui/react";
import { TankChartMenuProps } from "common/react-props";
import { useTranslation } from "react-i18next";

const TankChartButton = ({
  tanks,
  selectedTank,
  onChange,
}: TankChartMenuProps) => {
  const { t } = useTranslation("dashboard");

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
              {t("common.tank")} {tankElement.idConf}
            </Button>
          </Box>
        ))}
      </Stack>
    </Box>
  );
};

export default TankChartButton;
