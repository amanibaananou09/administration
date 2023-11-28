import { Box, Button, Stack, useBreakpointValue } from "@chakra-ui/react";
import { TankChartMenuProps } from "common/react-props";
import { useTranslation } from "react-i18next";

const TankChartButton = ({
  tanks,
  selectedTank,
  onChange,
}: TankChartMenuProps) => {
  const { t } = useTranslation("dashboard");
  const buttonSize = useBreakpointValue({ base: "sm", md: "md" });

  return (
    <Box p={2}>
      <Stack
        direction={{ base: "column", md: "row" }}
        spacing={2}
        align="center"
      >
        {tanks.map((tankElement) => (
          <Box key={tankElement.idConf}>
            <Button
              size={buttonSize}
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
