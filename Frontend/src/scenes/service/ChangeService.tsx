import { Box, Button,TextField } from "@mui/material";
import { Form, Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import {service } from "../../Type";
import { useEffect, useState } from "react";
import DataProvider from '../../providers/dataProviders';
import { useParams } from "react-router-dom";

const ChangeService = () => {
    const initialValues = {
        name: "",
        price: ""
    }
    const params = useParams();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [currentService, setCurrentService] = useState<service>();
    const userSchema = yup.object().shape({
        name: yup.string().required(),
        price: yup.string().required()
    });
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const handleForSumbit = (values: any) => {
        console.log(values)
    }
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await DataProvider.getOne<service>('service', params.id as string)
                if (data.data) {
                    setCurrentService(data.data);
                    initialValues.name = data.data?.name || "";
                    initialValues.price = data.data?.price || "";
                }
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
            setIsLoading(false);
        };

        fetchData();
    }, []);


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
                handleSubmit,
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
                        {
                            isLoading ? (
                                <div>Loading...</div>
                            ) : (

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
                                        label="Цена"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.price}
                                        name="price"
                                        sx={{ gridColumn: "span 2" }}
                                    />
                                </Box>
                            )}
                    </Box>
                    <Box display="flex" justifyContent="end" mt="20px">
                        <Button type="submit" color="secondary" variant="contained" onClick={() => {
                            let changedService = currentService;
                            if(changedService){
                                changedService.name = values.name
                                changedService.price = values.price
                                DataProvider.update<service>('service', params.id as string, changedService)
                                .then(result => alert('Запись обновлена' + result.data?.name))
                                .catch(() => alert('ошибка'));
                            }
                        }}>
                            Сохранение
                        </Button>
                    </Box>
                </Form>
            )}
        </Formik>
    </Box>
}



export default ChangeService;