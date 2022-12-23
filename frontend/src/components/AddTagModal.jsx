import React, { useState, useEffect } from 'react';
import {
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
  IconButton,
  FormErrorMessage,
  Container,
} from '@chakra-ui/react';
import { Button } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import baseUrl from '../data/baseUrl';

import { useDisclosure } from '@chakra-ui/react';
import { CreatableSelect } from 'chakra-react-select';
import { useForm, useController } from 'react-hook-form';

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

      <CreatableSelect
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

const defaultValues = { tag: [] };

export default function AddTagModal({ setSelectedTags, selectedTags }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { control } = useForm({ defaultValues });
  const [tags, setTags] = useState([]);

  const getTags = async () => {
    try {
      await fetch(baseUrl + '/tag', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      })
        .then(response => response.json())
        .then(data => {
          let allTags = [];
          for (let i = 0; i < Object.keys(data).length; i++) {
            const tag = {
              label: data[i].name,
              value: data[i].tag_id,
            };
            allTags.push(tag);
          }
          setTags(allTags);
        });
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getTags();
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
            <ControlledSelect
              onChange={setSelectedTags}
              value={selectedTags}
              control={control}
              isMulti
              name="tag"
              id="tag"
              options={tags}
              placeholder="Tags"
              label="Tags"
              rules={{ required: 'Please enter at least one tag.' }}
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
