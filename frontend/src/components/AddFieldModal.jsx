import React, { useState, useEffect } from 'react';
import { AddIcon, EditIcon } from '@chakra-ui/icons';
import {
  IconButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  FormErrorMessage,
} from '@chakra-ui/react';
import { Button } from '@chakra-ui/react';
import { useDisclosure } from '@chakra-ui/react';
import { Select } from 'chakra-react-select';
import { useForm, useController } from 'react-hook-form';
import baseUrl from '../data/baseUrl';

const ControlledSelect = ({
  control,
  name,
  id,
  label,
  rules,
  onChange,
  ...props
}) => {
  const {
    field: { onBlur, value, ref },
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

export default function AddFieldModal({
  setSelectedFields,
  selectedFields,
  pageName,
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { control } = useForm({ defaultValues });
  const [fields, setFields] = useState([]);

  const getFields = async () => {
    try {
      await fetch(baseUrl + '/field', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      })
        .then(response => response.json())
        .then(data => {
          let allFields = [];
          for (let i = 0; i < Object.keys(data).length; i++) {
            const field = {
              label: data[i].name,
              value: data[i].field_id,
            };
            allFields.push(field);
          }
          setFields(allFields);
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
        {pageName === 'profile' ? <EditIcon /> : <AddIcon boxSize={2.5} />}
      </IconButton>

      <Modal onClose={onClose} size={'xl'} isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader></ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <ControlledSelect
              onChange={setSelectedFields}
              value={selectedFields}
              control={control}
              isMulti
              name="field"
              id="field"
              options={fields}
              placeholder="Fields"
              label="Fields"
              rules={{ required: 'Please enter at least one field.' }}
            />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" w="30%" onClick={onClose}>
              Submit
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
