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
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  useDisclosure,
} from "@chakra-ui/react";
import { AddStation, RouteParams, UserModalRefType } from "common/AdminModel";
import { addStation } from "common/api/customerAccount-api";
import { getListOfCountry } from "common/api/reference-data-api";
import { addStationFormValidationSchema } from "common/form-validation";
import { country } from "common/model";
import { useFormik } from "formik";
import {
  forwardRef,
  Ref,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import { useParams } from "react-router-dom";
interface PropsType {}

const AddStationModal = (props: PropsType, ref: Ref<UserModalRefType>) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { id } = useParams<RouteParams>();
  const [country, setCountry] = useState<country[]>([]);

  const form = useFormik<AddStation>({
    initialValues: {
      name: "",
      address: "",
      controllerPts: {
        ptsId: "",
      },
      country: 0,
      customerAccountId: 0,
    },
    validationSchema: addStationFormValidationSchema,
    onSubmit: async (values: AddStation) => {
      await addStation(values, id);
      form.setSubmitting(false);
      onClose();
    },
  });

  useEffect(() => {
    const getListCountry = async () => {
      try {
        const result = await getListOfCountry();
        setCountry(result);
      } catch (error) {
        console.error(error);
      }
    };
    getListCountry();
  }, []);

  useImperativeHandle(ref, () => ({
    open() {
      onOpen();
    },
  }));

  const closeModal = () => {
    form.resetForm();
    onClose();
  };

  return (
    <Modal
      motionPreset="slideInBottom"
      blockScrollOnMount={true}
      isOpen={isOpen}
      onClose={closeModal}
      size="2xl"
    >
      <ModalOverlay backdropFilter="blur(10px)" />
      <ModalContent>
        <ModalHeader>Create New Station</ModalHeader>
        <ModalCloseButton />
        <ModalBody mb="24px">
          <form onSubmit={form.handleSubmit}>
            <SimpleGrid columns={2} spacing={5}>
              <FormControl
                isInvalid={!!form.errors.name && !!form.touched.name}
                mb="20px"
              >
                <FormLabel ms="4px" fontSize="sm" fontWeight="bold">
                  Name
                </FormLabel>
                <Input
                  id="name"
                  name="name"
                  value={form.values.name}
                  onChange={form.handleChange}
                  type="text"
                  placeholder="Name"
                />
                <FormErrorMessage>{form.errors.name}</FormErrorMessage>
              </FormControl>
              <FormControl
                isInvalid={!!form.errors.address && !!form.touched.address}
                mb="20px"
              >
                <FormLabel ms="4px" fontSize="sm" fontWeight="bold">
                  Address
                </FormLabel>
                <Input
                  id="address"
                  name="address"
                  value={form.values.address}
                  onChange={form.handleChange}
                  type="text"
                  placeholder="Address"
                />
                <FormErrorMessage>{form.errors.address}</FormErrorMessage>
              </FormControl>
              <FormControl
                isInvalid={
                  !!form.errors.controllerPts?.ptsId &&
                  !!form.touched.controllerPts?.ptsId
                }
                mb="20px"
              >
                <FormLabel ms="4px" fontSize="sm" fontWeight="bold">
                  ptsId
                </FormLabel>
                <Input
                  id="ptsId"
                  name="controllerPts.ptsId"
                  value={form.values.controllerPts?.ptsId || ""}
                  onChange={form.handleChange}
                  type="text"
                  placeholder="ptsId"
                />
                <FormErrorMessage>
                  {form.errors.controllerPts?.ptsId}
                </FormErrorMessage>
              </FormControl>
              <FormControl
                isInvalid={!!form.errors.country && !!form.touched.country}
                mb="20px"
              >
                <FormLabel ms="4px" fontSize="sm" fontWeight="bold">
                  Country
                </FormLabel>
                <Input
                  id="country"
                  name="country"
                  value={form.values.country}
                  onChange={form.handleChange}
                  type="text"
                  placeholder="Country"
                />
                <FormErrorMessage>{form.errors.country}</FormErrorMessage>
              </FormControl>
            </SimpleGrid>
          </form>
        </ModalBody>
        <ModalFooter>
          <Button
            fontSize="md"
            colorScheme="teal"
            fontWeight="bold"
            w="100%"
            isLoading={form.isSubmitting}
            type="submit"
            mr={3}
          >
            Submit
          </Button>
          <Button
            fontSize="md"
            colorScheme="red"
            fontWeight="bold"
            w="100%"
            onClick={closeModal}
          >
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default forwardRef(AddStationModal);
