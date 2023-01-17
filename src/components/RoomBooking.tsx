import { Box, Button, Grid, GridItem, Image, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { IBookingDetail } from "../types";
import DeleteBtn from "./DeleteBtn";

export default function RoomBooking(props: IBookingDetail) {
    return (
        <Grid
            templateColumns={"1fr 1fr"}
            borderRadius={"xl"}
            borderWidth={1}
            borderColor={"gray.300"}
            overflow={"hidden"}
        >
            <Grid templateColumns={"1fr 1.5fr"} padding={4}>
                <GridItem
                    colSpan={2}
                    borderBottomWidth={1}
                    borderColor="gray.300"
                    display={"flex"}
                    flexDir="column"
                    justifyContent={"center"}
                    alignItems="center"
                >
                    <Text fontSize={24}>{props.room?.name}</Text>
                    <Text color={"gray.600"}>
                        {props.room?.country}, {props.room?.city}
                    </Text>
                </GridItem>
                <GridItem
                    borderRightWidth={1}
                    borderColor={"gray.300"}
                    display="flex"
                    flexDir={"column"}
                    justifyContent="center"
                    alignItems={"center"}
                >
                    <Text color={"blue.600"} fontWeight="bold">
                        Check In
                    </Text>
                    <Text fontSize={"sm"} fontWeight="semibold">
                        {props.check_in}
                    </Text>
                    <Text color={"blue.600"} fontWeight="bold" mt={2}>
                        Check Out
                    </Text>
                    <Text fontSize={"sm"} fontWeight="semibold">
                        {props.check_out}
                    </Text>
                </GridItem>
                <GridItem
                    display={"flex"}
                    flexDir="column"
                    alignItems={"center"}
                    justifyContent="center"
                >
                    <Text fontWeight="semibold" fontSize={"lg"}>
                        Guest {props.guests}명
                    </Text>
                    <Link to={`/rooms/${props.room?.pk}`}>
                        <Button
                            colorScheme={"blue"}
                            size="sm"
                            mt={4}
                            variant={"link"}
                        >
                            check details
                        </Button>
                    </Link>
                    <DeleteBtn bookingPk={props.id} />
                </GridItem>
            </Grid>
            <Box overflow={"hidden"}>
                <Image
                    boxSize={"full"}
                    src={props.room?.thumb_photo}
                    objectFit="cover"
                />
            </Box>
        </Grid>
    );
}
