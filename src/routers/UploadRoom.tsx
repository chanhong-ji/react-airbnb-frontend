import {
    Heading,
    VStack,
    FormControl,
    FormLabel,
    FormHelperText,
    Input,
    Button,
    NumberInputStepper,
    NumberInputField,
    NumberInput,
    NumberIncrementStepper,
    NumberDecrementStepper,
    Checkbox,
    Select,
    Grid,
    GridItem,
    Text,
    useToast,
} from "@chakra-ui/react";
import { useState } from "react";

import { useMutation, useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import {
    getAmenities,
    getCategoriesRoom,
    postRooms,
    postGetUrls,
    uploadPhotos,
    postPhotos,
} from "../api";
import useHostOnlyPage from "../lib/useHostOnlyPage";
import useProtectedPage from "../lib/useProtectedPage";
import { IAmenity, ICategory, ICreateRoom, IRoom } from "../types";

export default function UploadRoom() {
    useProtectedPage();
    useHostOnlyPage();

    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const toast = useToast();
    const { isLoading: isCategoriesLoading, data: CategoriesData } = useQuery<
        ICategory[]
    >(["categories"], getCategoriesRoom);
    const { isLoading: isAmenitiesLoading, data: AmenitiesData } = useQuery<
        IAmenity[]
    >(["amenities"], getAmenities);

    const { register, handleSubmit, reset, setValue, getValues } =
        useForm<ICreateRoom>({
            defaultValues: {
                photos: Array.from({ length: 5 }),
                amenities: [],
            },
        });

    const getUrlsMutation = useMutation(postGetUrls, {
        async onSuccess(urls) {
            const ids = await uploadPhotos(getValues("photos"), urls);
            const newUrls = ids.map(
                (id: string) =>
                    `https://imagedelivery.net/BuNeQXhX7ZNc6sNj-Tdknw/${id}/public`
            );
            photoMutation.mutate(newUrls);
        },
        onError() {
            toast({
                status: "error",
                title: "Fail to upload Image",
                description: "server error occured, please try again",
            });
            setLoading(false);
        },
    });

    const photoMutation = useMutation(postPhotos, {
        onSuccess(pks: number[]) {
            const form = getValues();
            roomMutation.mutate({ form, pks });
        },
        onError() {
            toast({
                status: "error",
                title: "Fail to upload Image",
                description: "server error occured, please try again",
            });
            setLoading(false);
        },
    });

    const roomMutation = useMutation(postRooms, {
        async onSuccess(data: IRoom) {
            setLoading(false);
            reset();
            navigate("/");
        },
        onError() {
            toast({
                status: "error",
                title: "Fail to create room",
            });
            setLoading(false);
        },
    });

    const onSubmit = async (data: ICreateRoom) => {
        setLoading(true);
        getUrlsMutation.mutate();
    };

    const setFileValue = (file: File, now: number) => {
        setValue(
            "photos",
            getValues("photos").map((value, index) =>
                index === now ? file : value
            )
        );
    };

    return (
        <>
            <VStack w={"600px"} pb={10}>
                <Heading>Upload Room</Heading>
                <VStack
                    w={"full"}
                    pb={5}
                    as="form"
                    spacing={10}
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <FormControl>
                        <FormLabel>Title</FormLabel>
                        <Input
                            required
                            {...register("name", { required: true })}
                        />
                    </FormControl>
                    <FormControl>
                        <FormLabel>Country</FormLabel>
                        <Input required />
                    </FormControl>
                    <FormControl>
                        <FormLabel>City</FormLabel>
                        <Input
                            required
                            {...register("city", {
                                required: true,
                            })}
                        />
                    </FormControl>
                    <FormControl>
                        <FormLabel>Price</FormLabel>
                        <NumberInput min={0}>
                            <NumberInputField
                                {...register("price", { required: true })}
                            />
                        </NumberInput>
                    </FormControl>
                    <FormControl>
                        <FormLabel>Rooms</FormLabel>
                        <NumberInput min={0}>
                            <NumberInputField
                                {...register("rooms", { required: true })}
                            />
                            <NumberInputStepper>
                                <NumberIncrementStepper />
                                <NumberDecrementStepper />
                            </NumberInputStepper>
                        </NumberInput>
                    </FormControl>
                    <FormControl>
                        <FormLabel>Toilets</FormLabel>
                        <NumberInput min={0}>
                            <NumberInputField
                                {...register("toilets", { required: true })}
                            />
                            <NumberInputStepper>
                                <NumberIncrementStepper />
                                <NumberDecrementStepper />
                            </NumberInputStepper>
                        </NumberInput>
                    </FormControl>
                    <FormControl>
                        <FormLabel>Description</FormLabel>
                        <Input
                            required
                            {...register("descriptions", {
                                required: true,
                            })}
                        />
                        <FormHelperText>
                            Description about your room
                        </FormHelperText>
                    </FormControl>
                    <FormControl>
                        <FormLabel>Address</FormLabel>
                        <Input
                            required
                            {...register("address", { required: true })}
                        />
                    </FormControl>
                    <FormControl>
                        <Checkbox {...register("pet_friendly")}>
                            Pet Friendly
                        </Checkbox>
                    </FormControl>
                    <FormControl>
                        <FormLabel>Kind</FormLabel>
                        <Select
                            placeholder="Select kind of room"
                            {...register("kind", { required: true })}
                        >
                            <option value="entire_place">Entire Place</option>
                            <option value="private_room">Private Room</option>
                            <option value="shared_room">Shared Room</option>
                        </Select>
                        <FormHelperText>
                            What kind of room are you renting?
                        </FormHelperText>
                    </FormControl>
                    <FormControl>
                        <FormLabel>Category</FormLabel>
                        <Select
                            placeholder="Select Category"
                            {...register("category", { required: true })}
                        >
                            {!isCategoriesLoading &&
                                CategoriesData &&
                                CategoriesData.map((category) => (
                                    <option
                                        value={category.pk}
                                        key={category.pk}
                                    >
                                        {category.name}
                                    </option>
                                ))}
                        </Select>
                        <FormHelperText>
                            what category describes you room?
                        </FormHelperText>
                    </FormControl>
                    <FormControl>
                        <FormLabel>Amenities</FormLabel>
                        <Grid templateColumns={"1fr 1fr"}>
                            {!isAmenitiesLoading &&
                                AmenitiesData?.map((amenity) => (
                                    <GridItem key={amenity.pk}>
                                        <Checkbox
                                            {...register("amenities")}
                                            value={amenity.pk}
                                        >
                                            {amenity.name}
                                        </Checkbox>
                                        <FormHelperText>
                                            {amenity.description}
                                        </FormHelperText>
                                    </GridItem>
                                ))}
                        </Grid>
                        <FormHelperText>
                            Please check all amenities your room has?
                        </FormHelperText>
                    </FormControl>
                    <FormControl>
                        <FormLabel>Check in Time</FormLabel>
                        <Input
                            required
                            type={"time"}
                            {...register("check_in_time", {
                                required: true,
                            })}
                        />
                    </FormControl>
                    <FormControl>
                        <FormLabel>Check out Time</FormLabel>
                        <Input
                            required
                            type={"time"}
                            {...register("check_out_time", {
                                required: true,
                            })}
                        />
                    </FormControl>

                    {/* <UploadPhotos /> */}
                    <FormControl alignItems={"start"}>
                        <FormLabel>Upload Photos</FormLabel>
                        <FormHelperText>
                            You need to upload 5 photos to create room
                        </FormHelperText>
                        <Text
                            mt={4}
                            fontWeight="semibold"
                            color={"gray"}
                            fontSize="sm"
                        >
                            Thumb nail
                        </Text>
                        <Input
                            type={"file"}
                            isRequired
                            onChange={(event) => {
                                if (
                                    event.target.files &&
                                    event.target.files[0]
                                ) {
                                    setFileValue(event.target.files[0], 0);
                                }
                            }}
                        />

                        <VStack mt={3} alignItems="start">
                            <Text
                                fontWeight="semibold"
                                color={"gray"}
                                fontSize="sm"
                            >
                                Select 4 photos
                            </Text>
                            <Input
                                type={"file"}
                                isRequired
                                onChange={(event) => {
                                    if (
                                        event.target.files &&
                                        event.target.files[0]
                                    ) {
                                        setFileValue(event.target.files[0], 1);
                                    }
                                }}
                            />
                            <Input
                                type={"file"}
                                isRequired
                                onChange={(event) => {
                                    if (
                                        event.target.files &&
                                        event.target.files[0]
                                    ) {
                                        setFileValue(event.target.files[0], 2);
                                    }
                                }}
                            />
                            <Input
                                type={"file"}
                                isRequired
                                onChange={(event) => {
                                    if (
                                        event.target.files &&
                                        event.target.files[0]
                                    ) {
                                        setFileValue(event.target.files[0], 3);
                                    }
                                }}
                            />
                            <Input
                                type={"file"}
                                isRequired
                                onChange={(event) => {
                                    if (
                                        event.target.files &&
                                        event.target.files[0]
                                    ) {
                                        setFileValue(event.target.files[0], 4);
                                    }
                                }}
                            />
                        </VStack>
                    </FormControl>
                    <Button
                        type="submit"
                        colorScheme={"red"}
                        isLoading={loading}
                    >
                        Upload Room
                    </Button>
                </VStack>
            </VStack>
        </>
    );
}
