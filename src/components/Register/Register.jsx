import { useFormik } from "formik";
import { object, string } from "yup";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, NavLink } from "react-router-dom";
import {
    Box,
    Input,
    Button,
    Text,
    VStack,
    FormControl,
    FormErrorMessage,
} from "@chakra-ui/react";

export default function Register() {
    const navigate = useNavigate();

    const validationSchema = object({
        username: string()
            .required("Username is Required")
            .min(3, "Username Must Be At Least 3 Chars!")
            .max(25, "Username Can't Be More Than 25 Chars!"),
        password: string().required("Password is Required!"),
    });

    async function sendDataToRegister(values) {
        const loadingToastId = toast.loading("Waiting...");

        try {
            const { data } = await axios.post(
                `https://colleagues-break-army-judge.trycloudflare.com/register`,
                values
            );

            if (data.statusCode === 200) {
                toast.success("User Created Successfully!");
                setTimeout(() => navigate("/login"), 2000);
            } else {
                toast.error(data.errorMessage || "Registration failed.");
            }
        } catch (error) {
            console.error(error);
            toast.error("Network error. Please try again.");
        } finally {
            toast.dismiss(loadingToastId);
        }
    }

    const formik = useFormik({
        initialValues: {
            username: "",
            password: "",
        },
        validationSchema,
        onSubmit: sendDataToRegister,
    });

    return (
        <Box
            minH="75vh"
            className=" flex items-center justify-center px-4"
            color="gray.200"
        >
            <Box
                bg="rgba(255, 255, 255, 0.1)"
                backdropFilter="blur(10px)"
                borderRadius="lg"
                boxShadow="lg"
                p={8}
                maxW="400px"
                w="full"
            >
                <Text
                    fontSize="2xl"
                    fontWeight="bold"
                    textAlign="center"
                    mb={6}
                    color="gray.100"
                >
                    <i className="fa-regular fa-circle-user"></i> Register Now
                </Text>

                <form onSubmit={formik.handleSubmit}>
                    <VStack spacing={4}>
                        {/* Name */}
                        <FormControl
                            isInvalid={
                                formik.touched.name && formik.errors.username
                            }
                        >
                            <Input
                                type="text"
                                placeholder="Username"
                                {...formik.getFieldProps("username")}
                                className="bg-gray-800 text-white placeholder-gray-400"
                            />
                            <FormErrorMessage>
                                {formik.errors.username}
                            </FormErrorMessage>
                        </FormControl>

                        {/* Password */}
                        <FormControl
                            isInvalid={
                                formik.touched.password &&
                                formik.errors.password
                            }
                        >
                            <Input
                                type="password"
                                placeholder="Password"
                                {...formik.getFieldProps("password")}
                                className="bg-gray-800 text-white placeholder-gray-400"
                            />
                            <FormErrorMessage>
                                {formik.errors.password}
                            </FormErrorMessage>
                        </FormControl>

                        {/* Sign Up Button */}
                        <Button
                            type="submit"
                            colorScheme="purple"
                            width="full"
                            className="transition-transform transform hover:scale-105"
                            isLoading={formik.isSubmitting}
                        >
                            Sign Up
                        </Button>

                        {/* Already Have an Account */}
                        <NavLink
                            to={"/login"}
                            className="w-full text-center text-gray-300 hover:text-gray-100"
                        >
                            Already Have An Account?
                        </NavLink>
                    </VStack>
                </form>
            </Box>
        </Box>
    );
}
