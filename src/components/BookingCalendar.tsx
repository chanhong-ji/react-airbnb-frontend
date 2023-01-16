import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../css/calendar.css";
import { useState, useEffect } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { getCheckBooking, postBooking } from "../api";
import {
    Box,
    Button,
    Grid,
    InputGroup,
    InputLeftAddon,
    NumberDecrementStepper,
    NumberIncrementStepper,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    Text,
    useToast,
    VStack,
} from "@chakra-ui/react";
import { FaUser } from "react-icons/fa";
import { formatDate } from "../lib/utils";

interface BookingCalendarProps {
    booked: string[];
    checkInDisable: string[];
}

export default function BookingCalendar({
    booked,
    checkInDisable,
}: BookingCalendarProps) {
    const { roomPk } = useParams();
    const [dates, setDates] = useState<Date[]>();
    const [disableDates, setDisableDates] = useState<string[]>(
        booked.map((date) => new Date(date).toLocaleDateString())
    );
    const [checkInDisableDates, setCheckInDisableDates] = useState(
        checkInDisable.map((date) => new Date(date).toLocaleDateString())
    );
    const [guests, setGuests] = useState(1);
    const [message, setMessage] = useState("");
    const toast = useToast();
    const navigate = useNavigate();

    const { isLoading, data: isPossible } = useQuery(
        ["check", roomPk, dates],
        getCheckBooking,
        {
            cacheTime: 0,
            enabled:
                dates &&
                dates.length >= 2 &&
                dates[0].toLocaleDateString() !== dates[1].toLocaleDateString(),
            onSuccess(result) {
                if (result) {
                    setMessage("해당 날짜는 예약이 가능합니다");
                } else {
                    setMessage("해당 날짜는 예약이 불가능합니다");
                }
            },
        }
    );

    const postBookingMutation = useMutation(postBooking, {
        onSuccess(data) {
            console.log(data, ":post booking returned data");
            toast({ status: "success", description: "Booking success" });
            // navigate booking detail page
        },
    });

    const onSubmit = () => {
        if (roomPk && dates && isPossible) {
            postBookingMutation.mutate({
                roomPk,
                guests,
                check_in: formatDate(dates[0]),
                check_out: formatDate(dates[1]),
            });
        }
    };

    useEffect(() => {
        if (dates) {
            setMessage("");
            const checkInDate = dates[0].toLocaleDateString();
            if (checkInDisableDates.includes(checkInDate)) {
                setMessage("해당날짜는 체크인이 불가능합니다");
            }
        }
    }, [dates]);

    return (
        <div>
            {disableDates && (
                <>
                    <Calendar
                        onChange={setDates}
                        minDate={new Date()}
                        maxDate={
                            new Date(Date.now() + 1000 * 60 * 60 * 24 * 365)
                        }
                        minDetail={"month"}
                        selectRange={true}
                        prev2Label={null}
                        next2Label={null}
                        tileDisabled={({ activeStartDate, date }) => {
                            return disableDates.includes(
                                date.toLocaleDateString()
                            );
                        }}
                        returnValue={"range"}
                        allowPartialRange={true}
                    />
                    <Box height={6} mt={2}>
                        <Text
                            color={"red.400"}
                            textAlign={"center"}
                            fontSize={"sm"}
                            fontWeight="semibold"
                        >
                            {message}
                        </Text>
                    </Box>
                    <Grid
                        mt={1}
                        p={2}
                        templateColumns={"1fr 1fr"}
                        bg="whitesmoke"
                        borderRadius={10}
                        fontSize="sm"
                    >
                        <VStack>
                            <Text color={"gray"} fontWeight={"bold"}>
                                Check In Date
                            </Text>
                            {dates && (
                                <Text>{dates[0].toLocaleDateString()}</Text>
                            )}
                        </VStack>
                        <VStack>
                            <Text color={"gray"} fontWeight={"bold"}>
                                Check Out Date
                            </Text>
                            {dates &&
                                dates.length >= 2 &&
                                dates[0].toLocaleDateString() !==
                                    dates[1].toLocaleDateString() && (
                                    <Text>{dates[1].toLocaleDateString()}</Text>
                                )}
                        </VStack>
                    </Grid>

                    <Grid mt={"4"} templateColumns={"1fr 2fr"} gap={4}>
                        <InputGroup>
                            <InputLeftAddon children={<FaUser />} />
                            <NumberInput
                                defaultValue={1}
                                min={1}
                                max={9}
                                value={guests}
                                onChange={(_, value) => setGuests(value)}
                            >
                                <NumberInputField borderLeftRadius={0} />
                                <NumberInputStepper>
                                    <NumberIncrementStepper />
                                    <NumberDecrementStepper />
                                </NumberInputStepper>
                            </NumberInput>
                        </InputGroup>
                        <Button
                            colorScheme="red"
                            isDisabled={isLoading || !isPossible}
                            onClick={onSubmit}
                            isLoading={postBookingMutation.isLoading}
                        >
                            Make booking
                        </Button>
                    </Grid>
                </>
            )}
        </div>
    );
}
