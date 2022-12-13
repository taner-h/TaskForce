import {
    Avatar,
    Badge,
    Button,
    Card, CardBody,
    CardHeader,
    Center, Divider,
    Heading, IconButton, ModalFooter, Stack,
    Text,
    Tooltip,
    useColorModeValue, useToast
} from "@chakra-ui/react";

import {USER_BADGE_COLORS} from "../data/options";
import React from 'react';
import {CheckIcon , CloseIcon} from "@chakra-ui/icons";

export default function ApplicantCard({
                                       applicant,
                                       user,
                                       project,
                                       setApplicants,
                                       applicants,
                                   }){
    const projectId = project.project_id;
    const userId=user.user_id;
    const toast = useToast();

    const handleApplicantRemove = async (id)=>{
        try{
            await fetch(
                `http://localhost:5000/application/project/${applicant.project_id}/user/${applicant.user_id}`,
                {method: 'DELETE'
                },
            ).then(()=>setApplicants(applicants.filter((app)=>app.id!==id)));
        } catch (err){
            console.error(err.message);
        }
    }
    
    const handleApplicantAccept = async (id)=>{
        const body={
            userId: applicant.user_id,
            projectId: applicant.project_id,
            
        }
    try{
        const response= await fetch(`http://localhost:5000/member`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        });
        const res=await response.json();
        if (res) {
            setApplicants(applicants.filter((app)=>app.id!==id))
            toast({
                title: 'Successful.',
                description: 'Applicant accepted successfully',
                status: 'success',
                duration: 2000,
                isClosable: true,
            });
        }else {
            toast({
                title: 'Error.',
                description: 'Error occured.',
                status: 'error',
                duration: 2000,
                isClosable: true,
            });
        }
    }   catch (err){
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
                        name={applicant ? `${applicant.name} ${applicant.surname}` : null}
                        size={'md'}
                    />
                </Center>
            </CardHeader>
            <CardBody >
                <Stack spacing='2'>
                    <Stack direction='row' align='center'>

                        <Heading size='md' color={useColorModeValue('gray.800', 'gray.300')}>
                            {`${applicant.name} ${applicant.surname}`}{' '}
                        </Heading>
                    </Stack>
                    <Text fontSize='xs' color={"gray"} paddingLeft='5px' >
                        application time
                        {' '}
                        {new Date(applicant.application_time).toLocaleDateString('en-uk', {
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
                    <Stack direction='horizontal'>
                        
                        <Tooltip  hasArrow
                                  label="You can accept applicants to your project by clicking add button.">

                            <IconButton colorScheme='green'  alignSelf='flex-end' onClick={()=>handleApplicantAccept(applicant.id)}>
                                <CheckIcon/>
                            </IconButton>
                            
                        </Tooltip>
                        <Tooltip hasArrow
                                 label="You can reject applicants by clicking cross button.">
                            
                        <IconButton colorScheme='red'  alignSelf='flex-end' marginLeft='5px' onClick={()=>handleApplicantRemove(applicant.id)} >
                            <CloseIcon />
                        </IconButton>
                        </Tooltip>
                    </Stack>
                    </ModalFooter>
                    
                </>
            }
           
        </Card>
    );
}