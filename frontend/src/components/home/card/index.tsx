import { Card, CardBody, Stack, Text, useBreakpointValue } from "@chakra-ui/react";
import { BsFolder2 } from "react-icons/bs";
export default function CardAbout(){
    return <Card
        width={useBreakpointValue({ base: 280, xsm : 200 , md: 350, lg: 400 })}
        margin={10} >
        <CardBody padding={0} paddingBottom={8} >

            <Stack bg={'pink.300'} h={'80px'} borderTopRadius={10} ></Stack>
            <Card pos="absolute" top={65} left={5} >
                <CardBody padding={2} >
                    <BsFolder2 size={32} color="pink" />
                </CardBody>
            </Card>
            <Text marginLeft={5} marginTop={10} fontSize={26} fontWeight={'bold'} >Project management</Text>
            <Text marginLeft={5} fontSize={20} color={'gray.600'} >Keep tasks in order, deadlines on tracks,
                and team members aligned with atmowork.</Text>
        </CardBody>
    </Card>
}