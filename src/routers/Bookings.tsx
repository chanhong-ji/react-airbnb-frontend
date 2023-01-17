import { Grid, Heading, Text, VStack } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { getBookings } from "../api";
import RoomBooking from "../components/RoomBooking";
import useProtectedPage from "../lib/useProtectedPage";
import { IBookingDetail } from "../types";

export default function Bookings() {
    useProtectedPage();

    const { data: bookings } = useQuery<IBookingDetail[]>(
        ["bookings"],
        getBookings
    );

    return (
        <VStack w={"full"} px={"80"} pb={"20"} align={"start"}>
            <Heading>Bookings</Heading>

            {/* Rooms */}
            <Text fontSize={28}>Room</Text>
            <Grid w={"full"} templateColumns={"1fr"} autoRows={"250px"} gap={8}>
                {bookings
                    ?.filter((booking) => booking.kind === "room")
                    .map((booking) => (
                        <RoomBooking key={booking.id} {...booking} />
                    ))}
            </Grid>

            {/* Experience */}
        </VStack>
    );
}
