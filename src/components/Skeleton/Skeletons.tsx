import { Divider, Flex, Skeleton, Stack, Text } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

export const SkeletonTable = () => {
  return (
    <Stack width="100%" margin="20px 0px" data-testid="skeleton-table">
      <Skeleton height="50px" borderRadius="10px" />
      <Skeleton height="50px" borderRadius="10px" />
      <Skeleton height="50px" borderRadius="10px" />
      <Skeleton height="50px" borderRadius="10px" />
      <Skeleton height="50px" borderRadius="10px" />
    </Stack>
  );
};

const SkeletonInputLabel = ({ label }: { label: string }) => (
  <Flex alignItems="center" w="100%">
    <Text flex={1} ms="4px" fontSize="sm" fontWeight="bold">
      {label}
    </Text>
    <Skeleton
      flex={2}
      my="1px"
      height="50px"
      borderRadius="10px"
      data-testid="skeleton-instance"
    />
  </Flex>
);

const skeletonInput = (
  <Skeleton
    w="100%"
    my="1px"
    height="50px"
    borderRadius="10px"
    data-testid="skeleton"
  />
);

export const CustomerAccountSkeletonForm = () => {
  const { t } = useTranslation();

  return (
    <form>
      <Flex direction="column" p="2">
        <SkeletonInputLabel label={t("common.name")} />
        <SkeletonInputLabel label={t("common.compteParent")} />
        <SkeletonInputLabel label={t("common.creator")} />
        <SkeletonInputLabel label={t("common.droits")} />

        <Divider my={4} />

        <SkeletonInputLabel label={t("userInformation.userNameLabel")} />
        <SkeletonInputLabel label={t("userInformation.emailLabel")} />
        <SkeletonInputLabel label={t("userInformation.firstNameLabel")} />
        <SkeletonInputLabel label={t("userInformation.lastNameLabel")} />
        <SkeletonInputLabel label={t("userInformation.phoneLabel")} />
      </Flex>
      <Divider my={4} />
      <SkeletonInputLabel label={t("customerAccountModal.paymentMethods")} />
    </form>
  );
};

export const UserSkeletonForm = () => {
  const { t } = useTranslation();
  return (
    <form>
      <Flex direction="column" p="2">
        <Flex alignItems="center">
          <Text w="50%">{t("userInformation.userNameLabel")}</Text>
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

        <Flex alignItems="center">
          <Text w="50%">{t("userInformation.emailLabel")}</Text>
          {skeletonInput}
        </Flex>

        <Flex alignItems="center">
          <Text w="50%">{t("common.creatorAccount")}</Text>
          {skeletonInput}
        </Flex>

        <Flex alignItems="center">
          <Text w="50%">{t("common.compteParent")}</Text>
          {skeletonInput}
        </Flex>

        <Flex alignItems="center">
          <Text w="50%">{t("userInformation.mask")}</Text>
          {skeletonInput}
        </Flex>

        <Flex alignItems="center">
          <Text w="50%">{t("userInformation.phoneLabel")}</Text>
          {skeletonInput}
        </Flex>
      </Flex>

      <Divider my={4} />

      <Flex width="50%" flexDirection="column" gap="10%">
        <Flex justifyContent="space-between" alignItems="center">
          <Text fontSize="sm" fontWeight="bold">
            {t("common.canChangePassword")}
          </Text>
          {skeletonInput}
        </Flex>

        <Flex justifyContent="space-between" alignItems="center">
          <Text fontSize="sm" fontWeight="bold">
            {t("common.canSendSMS")}
          </Text>
          {skeletonInput}
        </Flex>

        <Flex justifyContent="space-between" alignItems="center">
          <Text fontSize="sm" fontWeight="bold">
            {t("common.isActive")}
          </Text>
          {skeletonInput}
        </Flex>
      </Flex>
    </form>
  );
};
