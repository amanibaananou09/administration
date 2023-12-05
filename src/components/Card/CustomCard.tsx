import { Avatar, Flex, Text } from "@chakra-ui/react";
import { CustomCardProps } from "common/react-props";

const CustomCard = ({
  title,
  avatar,
  description,
  onClick,
}: CustomCardProps) => {
  return (
    <Flex
      direction={{ sm: "column", md: "row" }}
      mb="30px"
      justifyContent="center"
      align="center"
      backdropFilter="blur(21px)"
      boxShadow="0px 2px 5.5px rgba(0, 0, 0, 0.02)"
      border="1.5px solid"
      bg="hsla(0,0%,100%,.8)"
      p="24px"
      ml="380px"
      borderRadius="20px"
      w={{ sm: "50%" }}
      onClick={() => onClick(title)}
    >
      <Flex
        align="center"
        mb={{ sm: "10px", md: "0px" }}
        direction={{ sm: "column", md: "row" }}
        w={{ sm: "100%" }}
        textAlign={{ sm: "center", md: "start" }}
      >
        {avatar && (
          <Avatar
            me={{ md: "24px" }}
            src={avatar}
            w="70px"
            h="70px"
            borderRadius="15px"
          />
        )}
        <Flex direction="column" maxWidth="100%" my={{ sm: "14px" }}>
          <Text
            fontSize={{ sm: "lg", lg: "xl" }}
            color="gray.700"
            fontWeight="bold"
            ms={{ sm: "8px", md: "0px" }}
          >
            {title}
          </Text>
          {description && (
            <Text
              fontSize={{ sm: "lg", lg: "xl" }}
              color="gray.400"
              fontWeight="semibold"
              ms={{ sm: "8px", md: "0px" }}
            >
              {description}
            </Text>
          )}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default CustomCard;
