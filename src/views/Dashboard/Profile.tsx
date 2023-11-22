import React, { useState, useRef } from "react";
import {
  Avatar,
  Flex,
  Grid,
  Text,
  useColorModeValue,Box
} from "@chakra-ui/react";
import Card from "components/Card/Card";
import CardBody from "components/Card/CardBody";
import CardHeader from "components/Card/CardHeader";
import { useAuth } from "store/AuthContext";
import { useTranslation } from "react-i18next";
import { FaCamera } from 'react-icons/fa';

const Profile = () => {
  const { user } = useAuth();
  const { t } = useTranslation("dashboard");
  const [avatarImageUrl, setAvatarImageUrl] = useState<string>("");
  const [showCameraIcon, setShowCameraIcon] = useState<boolean>(false);

  const username = user?.username || " ";
  const userEmail = user?.email || " ";
  const userFirstName = user?.given_name || " ";
  const userLastName = user?.family_name || " ";
  const userName = user?.name || " ";
  const userPhone = user?.phone || " ";

  const textColor = useColorModeValue("gray.700", "white");
  const bgProfile = useColorModeValue("hsla(0,0%,100%,.8)", "navy.800");
  const borderProfileColor = useColorModeValue("white", "transparent");
  const emailColor = useColorModeValue("gray.400", "gray.300");

  const handleMouseEnter = () => {
    setShowCameraIcon(true);
  };

  const handleMouseLeave = () => {
    setShowCameraIcon(false);
  };

  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
  
      reader.onload = () => {
        const base64String = reader.result as string;
        resolve(base64String);
      };
  
      reader.onerror = (error) => {
        reject(error);
      };
    });
  };
 const handleFileInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const imageUrl = await convertToBase64(file); 
      setAvatarImageUrl(imageUrl);
    }
  };

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAvatarClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <Flex direction="column" pt={{ base: "120px", md: "75px", lg: "100px" }}>
      <Flex
        direction={{ sm: "column", md: "row" }}
        mb="24px"
        maxH="330px"
        align="center"
        backdropFilter="blur(21px)"
        boxShadow="0px 2px 5.5px rgba(0, 0, 0, 0.02)"
        border="1.5px solid"
        borderColor={borderProfileColor}
        bg={bgProfile}
        p="24px"
        borderRadius="20px"
        onClick={handleAvatarClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{ cursor: "pointer", position: "relative" }}
      >


        <Flex align="center" direction="row" position="relative">
          <Avatar
            me={{ md: "22px" }}
            w="85px"
            h="85px"
            borderRadius="15px"
            src={avatarImageUrl}
        />
        {showCameraIcon && (
          <Box
            as={FaCamera}
            color="white"
            position="absolute"
            top="50%"
            left="14%"
            transform="translate(-50%, -50%)"
            bg="black" 
            borderRadius="20%"
            fontSize="45px"
            p="6px" 
          />
        )}
          <Flex direction="column" maxWidth="100%" my={{ sm: "14px" }}>
            <Text
              fontSize={{ sm: "xl", lg: "2xl" }}
              color={textColor}
              fontWeight="bold"
              ms={{ sm: "8px", md: "0px" }}
            >
              {username}
            </Text>
            <Text
              fontSize={{ sm: "md", md: "lg" }}
              color={emailColor}
              fontWeight="semibold"
            >
              {userEmail}
            </Text>
          </Flex>
        </Flex>
      </Flex>

      <Grid
        pt={{ base: "10px", md: "75px", lg: "30px" }}
        gap="22px"
        justifyContent="center"
        alignItems="center"
      >
        <Card p="16px" my={{ sm: "24px", xl: "0px" }} width="150%">
          <CardHeader p="12px 5px" mb="12px">
            <Text
              fontSize="3xl"
              textAlign="center"
              color={textColor}
              fontWeight="bold"
            >
              {t("profile.header")}
            </Text>
          </CardHeader>
          <CardBody px="5px">
            <Flex align="center" mb="18px">
              <Text
                fontSize="lg"
                color={textColor}
                fontWeight="bold"
                me="10px"
                textAlign="center"
              >
                 {t("profile.name")}:{" "}
              </Text>
              <Text
                fontSize="lg"
                textAlign="center"
                color="gray.400"
                fontWeight="400"
              >
                {userName}
              </Text>
            </Flex>

            <Flex align="center" mb="18px">
              <Text fontSize="lg" color={textColor} fontWeight="bold" me="10px">
              {t("profile.firstName")}:{" "}
              </Text>
              <Text
                fontSize="lg"
                textAlign="center"
                color="gray.400"
                fontWeight="400"
              >
                {userFirstName}
              </Text>
            </Flex>

            <Flex align="center" mb="18px">
              <Text fontSize="lg" color={textColor} fontWeight="bold" me="10px">
              {t("profile.lastName")}:{" "}
              </Text>
              <Text
               fontSize="lg"
               textAlign="center"
               color="gray.400"
               fontWeight="400"
              >
                {userLastName}
              </Text>
            </Flex>

            <Flex align="center" mb="18px">
              <Text fontSize="lg" color={textColor} fontWeight="bold" me="10px">
              {t("profile.phone")}:{" "}
              </Text>
              <Text
                fontSize="lg"
                textAlign="center"
                color="gray.400"
                fontWeight="400"
              >
                {userPhone}
              </Text>
            </Flex>

            <Flex align="center" mb="18px">
              <Text fontSize="lg" color={textColor} fontWeight="bold" me="10px">
              {t("profile.email")}:{" "}
              </Text>
              <Text fontSize="lg" textAlign="center" color="gray.400" fontWeight="400">
                {userEmail}
              </Text>
            </Flex>
          </CardBody>
        </Card>
      </Grid>
      <input
        ref={fileInputRef}
        type="file"
        onChange={handleFileInputChange}
        style={{ display: "none" }}
      />
    </Flex>
  );
};

export default Profile;
