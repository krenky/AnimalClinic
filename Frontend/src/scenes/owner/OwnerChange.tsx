import { Box, Button, Checkbox, CircularProgress, FormControlLabel, Modal, TextField, useTheme } from "@mui/material";
import { Field, Form, Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
//import { InventoryItem, RegisterModel, RepairOrder, RepairWork, SalesStages } from "../../Type"
//import React, { useEffect, useState } from "react";
//import CurrencyTextField from '@unicef/material-ui-currency-textfield'
//import { Option, SelecField } from "../../components/SelectField";
//import { optionCSS } from "react-select/lib/components/Option";
import { animal, doctor, owner } from "../../Type";
import { useEffect, useState } from "react";
import DataProvider from '../../providers/dataProviders';
import { useParams } from "react-router-dom";





const ChangeOwner = () => {
    const initialValues = {
        firstName: "",
        lastName: ""
    }
    const params = useParams();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [currentOwner, setCurrentOwner] = useState<owner>();
    const userSchema = yup.object().shape({
        firstName: yup.string().required(),
        lastName: yup.object().required()
    });
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const handleForSumbit = (values: any) => {
        console.log(values)
    }
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await DataProvider.getOne<owner>('owner', params.id as string)
                if (data.data) {
                    setCurrentOwner(data.data);
                    initialValues.firstName = data.data?.firstName || "";
                    initialValues.lastName = data.data?.lastName || "";
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
                                        label="Имя доктороа"
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
                                        label="Фаимилия доктора"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.lastName}
                                        name="lastName"
                                        sx={{ gridColumn: "span 2" }}
                                    />
                                </Box>
                            )}
                    </Box>
                    <Box display="flex" justifyContent="end" mt="20px">
                        <Button type="submit" color="secondary" variant="contained" onClick={() => {
                            let changedDoctor = currentOwner;
                            if(changedDoctor){
                                changedDoctor.firstName = values.firstName
                                changedDoctor.lastName = values.lastName
                                DataProvider.update<owner>('owner', params.id as string, changedDoctor)
                                .then(result => alert('Запись обновлена' + result.data?.firstName))
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



export default ChangeOwner;