import React, { useState, useEffect } from 'react';
import { AddIcon } from '@chakra-ui/icons';
import {
  IconButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  HStack,
  useBoolean,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Container,
} from '@chakra-ui/react';
import { Button } from '@chakra-ui/react';
import { useDisclosure } from '@chakra-ui/react';
import { Select } from 'chakra-react-select';
import { useForm, useController } from 'react-hook-form';

const fields = [];

const ControlledSelect = ({ control, name, id, label, rules, ...props }) => {
  const {
    field: { onChange, onBlur, value, ref },
    fieldState: { error },
  } = useController({
    name,
    control,
    rules,
  });

  return (
    <FormControl py={4} isInvalid={!!error} id={id}>
      <FormLabel>{label}</FormLabel>

      <Select
        isMulti
        name={name}
        ref={ref}
        onChange={onChange}
        onBlur={onBlur}
        value={value}
        closeMenuOnSelect={false}
        {...props}
      />

      <FormErrorMessage>{error && error.message}</FormErrorMessage>
    </FormControl>
  );
};

const defaultValues = { field: [] };

export default function AddFieldModal({ setSelectedFields }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { control, handleSubmit, reset } = useForm({ defaultValues });
  const [isLoading, setLoading] = useBoolean(false);

  const submit = async data => {
    setLoading.on();
    setSelectedFields(data.field);
    setLoading.off();
  };

  const getFields = async () => {
    try {
      await fetch('http://localhost:5000/field', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      })
        .then(response => response.json())
        .then(data => {
          for (let i = 0; i < Object.keys(data).length; i++) {
            const field = {
              label: data[i].name,
              value: data[i].field_id,
            };
            fields.push(field);
          }
        });
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getFields();
  }, []);

  return (
    <>
      <IconButton
        size={'xs'}
        onClick={async () => {
          onOpen();
        }}
        variant="solid"
        colorScheme="blue"
        rounded="full"
      >
        <AddIcon boxSize={2.5} />
      </IconButton>

      <Modal onClose={onClose} size={'xl'} isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader></ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Container as="form" mb={12} onSubmit={handleSubmit(submit)}>
              <ControlledSelect
                control={control}
                isMulti
                name="field"
                id="field"
                options={fields}
                placeholder="Fields"
                label="Fields"
                rules={{ required: 'Please enter at least one field.' }}
              />

              <HStack spacing={4}>
                <Button
                  isLoading={isLoading}
                  type="button"
                  colorScheme="red"
                  w="full"
                  onClick={() => reset(defaultValues)}
                >
                  Reset
                </Button>

                <Button
                  isLoading={isLoading}
                  type="submit"
                  colorScheme="blue"
                  w="full"
                >
                  Submit
                </Button>
              </HStack>
            </Container>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
