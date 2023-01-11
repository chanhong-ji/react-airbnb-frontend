import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { getRoomBookingCheck, postBooking } from "../api";
import {
    Button,
    Grid,
    InputGroup,
    InputLeftAddon,
    NumberDecrementStepper,
    NumberIncrementStepper,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    useToast,
} from "@chakra-ui/react";
import { FaUser } from "react-icons/fa";
import { formatDate } from "../lib/utils";

export default function BookingCalendar() {
    const { roomPk } = useParams();
    const [dates, setDates] = useState<Date[]>();
    const [disableDates, setDisableDates] = useState<string[]>();
    const [guests, setGuests] = useState(1);
    const navigate = useNavigate();
    const toast = useToast();

    const { isLoading } = useQuery(["check", roomPk], getRoomBookingCheck, {
        onSuccess(data: string[]) {
            setDisableDates(
                data.map((date) => new Date(date).toLocaleDateString())
            );
        },
        cacheTime: 0,
    });

    const mutation = useMutation(postBooking, {
        onSuccess({ pk }) {
            toast({ status: "success", description: "Booking success" });
            // navigate booking detail page
        },
    });

    const onSubmit = () => {
        if (roomPk && dates && dates?.length >= 2) {
            mutation.mutate({
                roomPk,
                guests,
                check_in: formatDate(dates[0]),
                check_out: formatDate(dates[1]),
            });
        }
    };

    return (
        <div>
            {!isLoading && disableDates && (
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
                        allowPartialRange={true}
                    />
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
                            isDisabled={!!!dates || dates.length < 2}
                            onClick={onSubmit}
                            isLoading={mutation.isLoading}
                        >
                            Make booking
                        </Button>
                    </Grid>
                </>
            )}
        </div>
    );
}
