import { Text } from "@chakra-ui/react";
import { StyleProps } from "@chakra-ui/styled-system";

type StatusProps = {
  value: boolean;
  styles?: StyleProps;
};

const Status = ({ value, styles }: StatusProps) => {
  return (
    <Text
      fontSize="md"
      fontWeight="bold"
      textAlign="center"
      color={value ? "green.400" : "red.400"}
      {...styles}
    >
      {value ? "✓" : "x"}
    </Text>
  );
};

export default Status;
