import { Box, Button, TextField } from "@mui/material";
import { Form, Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import { service } from "../../Type";
import DataProvider from '../../providers/dataProviders';

const AddService = () => {
    const initialValues = {
        name: "",
        price: ""
    }
    const userSchema = yup.object().shape({
        name: yup.string().required(),
        price: yup.string().required(),
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
                                label="Наименование"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.name}
                                name="name"
                                sx={{ gridColumn: "span 2" }}
                            />
                            <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                label="Стоимость"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.price}
                                name="price"
                                sx={{ gridColumn: "span 2" }}
                            />
                        </Box>
                    </Box>
                    <Box display="flex" justifyContent="end" mt="20px">
                        <Button type="submit" color="secondary" variant="contained" onClick={() => {
                            let newOwner: service = {
                                name: values.name,
                                price: values.price
                            }

                            AddNewService(newOwner);
                        }}>
                            Сохранение
                        </Button>
                    </Box>
                </Form>
            )}
        </Formik>
    </Box>
}

function AddNewService(newService: service) {
    DataProvider.create<service>('service', newService)
        .then(() => {
            alert('сохранение успешно')
            document.location = 'http://localhost/services';
        })
        .catch(() => {
            alert('сохранение не успешно')
        });
}

export default AddService;