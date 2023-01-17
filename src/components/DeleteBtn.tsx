import {
    useDisclosure,
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    Button,
    useToast,
} from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { deleteBooking } from "../api";

interface IProps {
    bookingPk: number;
}

export default function DeleteBtn({ bookingPk }: IProps) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const cancelRef = React.useRef(null);
    const queryClient = useQueryClient();
    const toast = useToast();
    const deleteBookingMutation = useMutation(deleteBooking, {
        onSuccess() {
            queryClient.refetchQueries(["bookings"]);
            onClose();
            toast({
                status: "success",
                title: "Cancel booking complete",
            });
        },
        onError() {
            onClose();
            toast({
                status: "error",
                title: "Error occured",
                description: "Please try later",
            });
        },
    });
    const onDeleteBooking = () => {
        deleteBookingMutation.mutate(bookingPk);
    };

    return (
        <>
            <Button
                onClick={onOpen}
                colorScheme={"red"}
                size="sm"
                w={"70%"}
                mt={1}
                variant="link"
            >
                Cancel Booking
            </Button>

            <AlertDialog
                isOpen={isOpen}
                leastDestructiveRef={cancelRef}
                onClose={onClose}
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize="lg" fontWeight="bold">
                            Delete Booking
                        </AlertDialogHeader>

                        <AlertDialogBody>
                            Are you sure? You can't undo this action afterwards.
                        </AlertDialogBody>

                        <AlertDialogFooter>
                            <Button ref={cancelRef} onClick={onClose}>
                                Cancel
                            </Button>
                            <Button
                                colorScheme="red"
                                onClick={onDeleteBooking}
                                ml={3}
                                isLoading={deleteBookingMutation.isLoading}
                            >
                                Delete
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </>
    );
}
