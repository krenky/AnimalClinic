import { Box, Button, TextField } from "@mui/material";
import { Form, Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import { owner } from "../../Type";
import DataProvider from '../../providers/dataProviders';

const AddOwner = () => {
    const initialValues = {
        firstName: "",
        lastName: ""
    }
    const userSchema = yup.object().shape({
        firstName: yup.string().required(),
        lastName: yup.string().required(),
    });
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const handleForSumbit = (values: any) => {
        console.log(values)
    }


    return <Box m={"20px"}>
        <Formik
            onSubmit={handleForSumbit}
            initialValues={initialValues}
            validationSchema={userSchema}
        >
            {({
                values,
                handleBlur,
                handleChange,
                handleSubmit
            }) => (
                <Form onSubmit={handleSubmit}>
                    <Box
                        display="grid"
                        gap="30px"
                        gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                        sx={{
                            "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },

                        }}
                    >
                        <Box>
                            <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                label="Имя хозяина"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.firstName}
                                name="firstName"
                                sx={{ gridColumn: "span 2" }}
                            />
                            <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                label="Фамилия хозяина"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.lastName}
                                name="lastName"
                                sx={{ gridColumn: "span 2" }}
                            />
                        </Box>
                    </Box>
                    <Box display="flex" justifyContent="end" mt="20px">
                        <Button type="submit" color="secondary" variant="contained" onClick={() => {
                            let newOwner: owner = {
                                firstName: values.firstName,
                                lastName: values.lastName
                            }

                            AddNewOwner(newOwner);
                        }}>
                            Сохранение
                        </Button>
                    </Box>
                </Form>
            )}
        </Formik>
    </Box>
}

function AddNewOwner(newOwner: owner) {
    DataProvider.create<owner>('owner', newOwner)
        .then(result => {
            alert('сохранение успешно')
            document.location = 'http://localhost:5173/owners';
        })
        .catch(() => {
            alert('сохранение не успешно')
        });
}

export default AddOwner;