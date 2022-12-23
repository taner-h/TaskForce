import React, { useState, useEffect } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  IconButton,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  FormErrorMessage,
} from '@chakra-ui/react';
import { Button } from '@chakra-ui/react';
import { AddIcon, EditIcon } from '@chakra-ui/icons';
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

const defaultValues = { skill: [] };

export default function AddSkillModal({
  setSelectedSkills,
  selectedSkills,
  pageName,
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { control } = useForm({ defaultValues });
  const [skills, setSkills] = useState([]);

  const getSkills = async () => {
    try {
      await fetch(baseUrl + '/skill', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      })
        .then(response => response.json())
        .then(data => {
          let allSkills = [];
          for (let i = 0; i < Object.keys(data).length; i++) {
            const skill = {
              label: data[i].name,
              value: data[i].skill_id,
            };
            allSkills.push(skill);
          }
          setSkills(allSkills);
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
