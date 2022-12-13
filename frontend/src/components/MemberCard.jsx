﻿import {
    Avatar,
    Badge,
    Button,
    Card, CardBody,
    CardHeader,
    Center, Divider,
    Heading, IconButton, ModalFooter, Stack,
    Text,
    Tooltip,
    useColorModeValue
} from "@chakra-ui/react";
import {USER_BADGE_COLORS} from "../data/options";
import React from 'react';
import {AddIcon, DeleteIcon} from "@chakra-ui/icons";


export default function MemberCard({
    member,
    user, 
    project,
    setMembers, 
    members,
    }){
    const projectId = project.project_id;
    const userId=user.user_id;

    const handleMemberRemove = async (id)=>{
        try{
        const response = await fetch(
                `http://localhost:5000/member/project/${member.project_id}/user/${member.user_id}`,
            {method: 'DELETE'
            },
            ).then(()=>setMembers(members.filter((mem)=>mem.id!==id)));
        } catch (err){
            console.error(err.message);
        }
    }
    return(
        <Card align="center" variant="elevated" direction={'row'} maxW="6xl" marginBottom='15px' bgColor={useColorModeValue('gray.200', 'gray.800')}>
            <CardHeader>
              
                    <Center
                        w="30px"
                        h="30px"
                        borderRadius="md"
                        paddingLeft='25px'
                        bg={useColorModeValue('gray.200', 'gray.800')}
                    >
                        <Avatar
                            color={'white'}
                            colorScheme="blue"
                            bgGradient="linear(to-r, blue.300, blue.600)"
                            _hover={{ bgGradient: 'linear(to-r, blue.200, blue.500)' }}
                            name={member ? `${member.name} ${member.surname}` : null}
                            size={'md'}
                        />
                    </Center>
            </CardHeader>
            <CardBody >
            <Stack spacing='2'>
                <Stack direction='row' align='center'>
                    
                <Heading size='md' color={useColorModeValue('gray.800', 'gray.300')}>
                    {`${member.name} ${member.surname}`}{' '}
                </Heading>
                </Stack>
                <Text fontSize='xs' color={"gray"} paddingLeft='5px' >
                    member since
                    {' '}
                    {new Date(member.member_time).toLocaleDateString('en-uk', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                    })}{' '}
                </Text>
                
            </Stack>
            </CardBody>
            {user?.user_id === project?.creator_id &&
            <>
            <Center height="64px">
                <Divider orientation="vertical" />
            </Center>
            <ModalFooter >
                
                <Tooltip  hasArrow
                          label="You can remove your project's member by clicking delete button.">

                    <IconButton colorScheme='red'  alignSelf='flex-end' onClick={()=>handleMemberRemove(member.id)}>
                        <DeleteIcon/>
                    </IconButton>
                </Tooltip>
            </ModalFooter>
            </>    
            }
        </Card>
        );
}