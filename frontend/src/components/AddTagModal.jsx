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
  FormErrorMessage,
  Container,
} from '@chakra-ui/react';
import { Button } from '@chakra-ui/react';
import { useDisclosure } from '@chakra-ui/react';
import { CreatableSelect } from 'chakra-react-select';
import { useForm, useController } from 'react-hook-form';

const tags = [];

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

export default function AddTagModal({ setSelectedTags }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { control, handleSubmit, reset } = useForm({ defaultValues });
  const [isLoading, setLoading] = useBoolean(false);

  const submit = async data => {
    setLoading.on();
    setSelectedTags(data.tag);
    console.log(data.tag);
    setLoading.off();
  };

  const getTags = async () => {
    try {
      await fetch('http://localhost:5000/tag', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      })
        .then(response => response.json())
        .then(data => {
          for (let i = 0; i < Object.keys(data).length; i++) {
            const tag = {
              label: data[i].name,
              value: data[i].tag_id,
            };
            tags.push(tag);
          }
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
      <Button
        size={'xs'}
        onClick={onOpen}
        variant="solid"
        colorScheme="blue"
        rounded="full"
      >
        +
      </Button>

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
                name="tag"
                id="tag"
                options={tags}
                placeholder="Tags"
                label="Tags"
                rules={{ required: 'Please enter at least one tag.' }}
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
