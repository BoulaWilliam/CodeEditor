import { useFormik } from 'formik';
import { object, ref, string } from 'yup';
import axios from 'axios';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate, NavLink } from 'react-router-dom';
import { Box, Input, Button, Text, VStack, FormControl, FormErrorMessage } from '@chakra-ui/react';
// import { name } from './../../../node_modules/tailwindcss/node_modules/jiti/dist/babel';

export default function Login() {
    const navigate = useNavigate();
    // const [existAccountError, setExistAccountError] = useState(null);
    // const passRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

    const validationSchema = object({
        name: string().required('Name is Required').min(3, 'Name Must Be At Least 3 Chars!').max(25, "Name Can't Be More Than 25 Chars!"),
        password: string().required('Password is Required!')
            // .matches(passRegex, 'Password must have at least 8 characters, one uppercase, one lowercase, one number, and one special character'),
    });

    async function sendDataToLogin(values) {
        const loadingToastId = toast.loading('Waiting...');
        try {
            const { data } = await axios.post('https://17u1pvbqegpi.share.zrok.io/login', values);
            if (data.message === 'success') {
                toast.success('User Created Successfully!');
                setTimeout(() => {
                    navigate("/code");
                }, 2000);
            }
        } catch (error) {
            toast.error(error.response?.data?.message);
            // setExistAccountError(error.response?.data?.message);
        } finally {
            toast.dismiss(loadingToastId);
        }
    }

    const formik = useFormik({
        initialValues: {
            name: '',
            password: '',
        },
        validationSchema,
        onSubmit: sendDataToLogin,
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
                <Text fontSize="2xl" fontWeight="bold" textAlign="center" mb={6} color="gray.100">
                    <i className="fa-regular fa-circle-user"></i> Login Now
                </Text>

                <form onSubmit={formik.handleSubmit}>
                    <VStack spacing={4}>
                        {/* Name */}
                        <FormControl isInvalid={formik.touched.name && formik.errors.name}>
                            <Input
                                type="text"
                                placeholder="Full Name"
                                {...formik.getFieldProps('name')}
                                className="bg-gray-800 text-white placeholder-gray-400"
                            />
                            <FormErrorMessage>{formik.errors.name}</FormErrorMessage>
                        </FormControl>
                        {/* Password */}
                        <FormControl isInvalid={formik.touched.password && formik.errors.password}>
                            <Input
                                type="password"
                                placeholder="Password"
                                {...formik.getFieldProps('password')}
                                className="bg-gray-800 text-white placeholder-gray-400"
                            />
                            <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
                        </FormControl>


                        {/* Sign Up Button */}
                        <Button
                            type="submit"
                            colorScheme="purple"
                            width="full"
                            className="transition-transform transform hover:scale-105"
                            isLoading={formik.isSubmitting}
                        >
                            Login
                        </Button>

                        {/* Don'y Have an Account */}
                        <NavLink to={'/register'} className="w-full text-center text-gray-300 hover:text-gray-100">
                            Don'y Have an Account ?
                        </NavLink>
                    </VStack>
                </form>
            </Box>
        </Box>
    );
}
