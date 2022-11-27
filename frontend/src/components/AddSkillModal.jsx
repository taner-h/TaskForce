import React, { useState, useEffect } from 'react';
import {
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

const skills = [];

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

const defaultValues = { skill: [] };

export default function AddSkillModal({ setSelectedSkills, selectedSkills }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { control } = useForm({ defaultValues });

  const getSkills = async () => {
    try {
      await fetch('http://localhost:5000/skill', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      })
        .then(response => response.json())
        .then(data => {
          for (let i = 0; i < Object.keys(data).length; i++) {
            const skill = {
              label: data[i].name,
              value: data[i].skill_id,
            };
            skills.push(skill);
          }
        });
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getSkills();
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
            <ControlledSelect
              onChange={setSelectedSkills}
              value={selectedSkills}
              control={control}
              isMulti
              name="skill"
              id="skill"
              options={skills}
              placeholder="Skills"
              label="Skills"
              rules={{ required: 'Please enter at least one skill.' }}
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
