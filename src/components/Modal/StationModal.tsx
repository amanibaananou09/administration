import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { Station } from "common/model";
import { StationModalProps, StationModalRefType } from "common/react-props";
import { Field, Form, Formik, FormikHelpers } from "formik";
import React, { forwardRef, Ref, useImperativeHandle, useState } from "react";
import { useTranslation } from "react-i18next";

const StationModal = (
  { onSubmit }: StationModalProps,
  ref: Ref<StationModalRefType>,
) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [station, setStation] = useState<Station>({
    id: 0,
    name: "",
    address: "",
    actif: false,
    controllerPts: {
      id: 0,
      ptsId: "",
      currentConfigurationId: 0,
      currentFirmwareInformation: {
        ptsId: "",
        dateTime: "",
        versionState: false,
        modificationDate: "",
      },
    },
    country: {
      id: 0,
      name: "",
      code: "",
      currency: {
        code: "",
        id: 0,
        locale: "",
        name: "",
      },
    },
  });

  useImperativeHandle(ref, () => ({
    open(station: Station) {
      if (station) {
        setStation(station);
      } else {
        setStation({
          id: 0,
          name: "",
          address: "",
          actif: false,
          controllerPts: {
            id: 0,
            ptsId: "",
            currentConfigurationId: 0,
            currentFirmwareInformation: {
              ptsId: "",
              dateTime: "",
              versionState: false,
              modificationDate: "",
            },
          },
          country: {
            id: 0,
            name: "",
            code: "",
            currency: {
              code: "",
              id: 0,
              locale: "",
              name: "",
            },
          },
        });
      }
      onOpen();
    },
    close() {
      onClose(); // Call the onClose callback to close the modal
    },
  }));
  const { t } = useTranslation("dashboard");
  const isNotNull = (value: string) => {
    let error: string | undefined;
    if (!value) {
      error = t("stationModal.isRequired");
    }
    return error;
  };

  const submitHandler = (
    values: Station,
    { setSubmitting }: FormikHelpers<Station>,
  ) => {
    onSubmit(values);
    setSubmitting(false);
  };


  return (
    <Modal
      motionPreset="slideInBottom"
      blockScrollOnMount={true}
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{t("stationModal.createStation")}</ModalHeader>
        <ModalCloseButton />
        <ModalBody mb="24px">
          <Formik initialValues={station} onSubmit={submitHandler}>
            {(props) => (
              <Form>
                <Field name="name" validate={isNotNull}>
                  {({
                    field,
                    form,
                  }: {
                    field: {
                      name: string;
                      value: string;
                      onChange: (e: React.ChangeEvent<any>) => void;
                      onBlur: () => void;
                    };
                    form: {
                      errors: { name: string };
                      touched: { name: boolean };
                    };
                  }) => (
                    <FormControl
                      isInvalid={!!form.errors.name && !!form.touched.name}
                      mb="24px"
                    >
                      <FormLabel htmlFor="name">{t("stationModal.nameLabel")}</FormLabel>
                      <Input {...field} id="name" placeholder={t("stationModal.nameLabel")} />
                      <FormErrorMessage>
                        {t("stationModal.nameLabel")} {form.errors.name}
                      </FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Field name="address" validate={isNotNull}>
                  {({
                    field,
                    form,
                  }: {
                    field: {
                      name: string;
                      value: string;
                      onChange: (e: React.ChangeEvent<any>) => void;
                      onBlur: () => void;
                    };
                    form: {
                      errors: { address: string };
                      touched: { address: boolean };
                    };
                  }) => (
                    <FormControl
                      isInvalid={
                        !!form.errors.address && !!form.touched.address
                      }
                      mb="24px"
                    >
                      <FormLabel htmlFor="address">{t("common.addressLabel")}</FormLabel>
                      <Input {...field} id="address" placeholder={t("common.addressLabel")} />
                      <FormErrorMessage>
                        {t("common.addressLabel")} {form.errors.address}
                      </FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Field name="controllerPtsId" validate={isNotNull}>
                  {({
                    field,
                    form,
                  }: {
                    field: {
                      name: string;
                      value: string;
                      onChange: (e: React.ChangeEvent<any>) => void;
                      onBlur: () => void;
                    };
                    form: {
                      errors: { controllerPtsId: string };
                      touched: { controllerPtsId: boolean };
                    };
                  }) => (
                    <FormControl
                      isInvalid={
                        !!form.errors.controllerPtsId &&
                        !!form.touched.controllerPtsId
                      }
                      mb="40px"
                    >
                      <FormLabel htmlFor="controllerPtsId">{t("stationModal.ptsIdLabel")}</FormLabel>
                      <Input
                        {...field}
                        type="text"
                        id="controllerPtsId"
                        placeholder={t("common.controllerPtsIdLabel")}
                      />
                      <FormErrorMessage>
                        {t("stationModal.ptsIdLabel")}{" "}
                        {form.errors.controllerPtsId}
                      </FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Button
                  fontSize="10px"
                  colorScheme="teal"
                  fontWeight="bold"
                  w="100%"
                  h="45"
                  isLoading={props.isSubmitting}
                  type="submit"
                >
                  {t("stationModal.submitButtonText")}
                </Button>
              </Form>
            )}
          </Formik>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default forwardRef(StationModal);
