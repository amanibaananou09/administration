import { Divider, Flex, Skeleton, Stack, Text } from "@chakra-ui/react";
import { Mode } from "common/enums";
import { useTranslation } from "react-i18next";

export const SkeletonTable = () => {
  return (
    <Stack width="100%" margin="20px 0px">
      <Skeleton height="50px" borderRadius="10px" />
      <Skeleton height="50px" borderRadius="10px" />
      <Skeleton height="50px" borderRadius="10px" />
      <Skeleton height="50px" borderRadius="10px" />
      <Skeleton height="50px" borderRadius="10px" />
    </Stack>
  );
};

type SkeletonFormProps = {
  mode: Mode;
};

export const SkeletonForm = ({ mode }: SkeletonFormProps) => {
  const { t } = useTranslation();

  const skeletonInput = (
    <Skeleton w="100%" my="1px" height="50px" borderRadius="10px" />
  );

  return (
    <form>
      <Flex direction="column" p="2">
        <Flex alignItems="center">
          <Text w="50%">{t("common.name")}</Text>
          {skeletonInput}
        </Flex>
        <Flex alignItems="center">
          <Text w="50%">{t("common.compteParent")}</Text>
          {skeletonInput}
        </Flex>
        <Flex alignItems="center">
          <Text w="50%">{t("common.creator")}</Text>
          {skeletonInput}
        </Flex>
        <Flex alignItems="center">
          <Text w="50%">{t("common.droits")}</Text>
          {skeletonInput}
        </Flex>
        <Divider my={4} />
        <Flex alignItems="center">
          <Text w="50%">{t("userInformation.userNameLabel")}</Text>
          {skeletonInput}
        </Flex>

        <Flex alignItems="center">
          <Text w="50%">{t("userInformation.emailLabel")}</Text>
          {skeletonInput}
        </Flex>

        <Flex alignItems="center">
          <Text w="50%">{t("userInformation.firstNameLabel")}</Text>
          {skeletonInput}
        </Flex>

        <Flex alignItems="center">
          <Text w="50%">{t("userInformation.lastNameLabel")}</Text>
          {skeletonInput}
        </Flex>

        {mode == Mode.CREATE && (
          <Flex alignItems="center">
            <Text w="50%">{t("common.password")}</Text>
            {skeletonInput}
          </Flex>
        )}

        {mode == Mode.CREATE && (
          <Flex alignItems="center">
            <Text w="50%">{t("common.confirmPassword")}</Text>
            {skeletonInput}
          </Flex>
        )}

        <Flex alignItems="center">
          <Text w="50%">{t("userInformation.phoneLabel")}</Text>
          {skeletonInput}
        </Flex>
      </Flex>
      <Divider my={4} />
      <Flex alignItems="center">
        <Text w="50%">{t("customerAccountModal.paymentMethods")}</Text>
        {skeletonInput}
      </Flex>
    </form>
  );
};
