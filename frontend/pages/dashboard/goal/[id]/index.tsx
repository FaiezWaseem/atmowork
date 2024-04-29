import SideBar from "@/components/dashboard/sidebar";
import PageLayout from "@/components/page-layout";
import { Box, Button, HStack, Stack, Text } from "@chakra-ui/react";
import { MdOutlineStarPurple500 } from "react-icons/md";
import { FaPlus } from "react-icons/fa";
import { useParams } from "next/navigation";
import { useEffect } from "react";


export default function Goal() {

    const params = useParams();
    const { id } = params;

    useEffect(()=>{
        console.log(id) 
    },[])

    return (
        <PageLayout
            title={`Goals | Workspace`}
            description='Atmowork Goals'
            logo='../../logo_transparent.png'
            fav='../favicon.png'
        >
            <Stack width={'98.5vw'} gap={0}>
                <SideBar>
                    <HStack p={4} justify={'space-between'} >
                        <HStack>
                            <Box boxShadow={'sm'} rounded={'md'} >
                                <MdOutlineStarPurple500 size={48} color="orange" />
                            </Box>
                            <Text fontSize={'3xl'} fontWeight={'bold'} color={'gray.600'} >Goal</Text>
                        </HStack>

                        <Button leftIcon={<FaPlus />} colorScheme='purple' variant='solid'  >
                            Add Goal
                        </Button>
                    </HStack>
                </SideBar>
            </Stack>
        </PageLayout>
    )
}