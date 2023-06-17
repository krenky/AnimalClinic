import { Box, Button, TextField } from "@mui/material";
import { Form, Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import { animal, arrayOwnerAndDoctor, doctor, option, owner } from "../../Type";
import { useEffect, useState } from "react";
import DataProvider from '../../providers/dataProviders';
import SelectField from 'react-select';

const AddAnimal = () => {
    const initialValues = {
        name: "",
        owner: { value: {}, label: 'Выберите хозяина'} as option<owner>,
        doctor: { value: {}, label: 'Выберите доктора'} as option<doctor>
    }
    const [ownerOption, setOwnerOption] = useState<option<owner>[]>();
    const [doctorOption, setDoctorOption] = useState<option<doctor>[]>();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const userSchema = yup.object().shape({
        name: yup.string().required(),
        doctor: yup.object().required(),
        owner: yup.object().required(),
        flavors: yup.object().required(),
    });
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const handleForSumbit = (values: any) => {
        console.log(values)
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await DataProvider.getOneWithoutId<arrayOwnerAndDoctor>('ownerdoctor')
                if (data.data) {
                    setDoctorOption(data.data.doctors.map(ConvertDoctorToDoctorOption))
                    setOwnerOption(data.data.owners.map(ConvertOwnerToOwnerOption))
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
                setFieldValue
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
                                        label="Имя животного"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.name}
                                        name="name"
                                        sx={{ gridColumn: "span 2" }}
                                    />
                                    <SelectField
                                        id={"owner"}
                                        value={values.owner}
                                        onChange={option => setFieldValue("owner", option)}
                                        options={ownerOption}
                                        onBlur={handleBlur}
                                    />
                                    <SelectField
                                        id={"doctor"}
                                        value={values.doctor}
                                        onChange={option => setFieldValue("doctor", option)}
                                        options={doctorOption}
                                        onBlur={handleBlur}
                                    />
                                </Box>
                            )}
                    </Box>
                    <Box display="flex" justifyContent="end" mt="20px">
                        <Button type="submit" color="secondary" variant="contained" onClick={() => {
                            let newAnimal:animal={
                                name: values.name,
                                ownerId:values.owner.value.id,
                                doctorId:values.doctor.value.id||'0'
                            }
                            DataProvider.create<animal>('animal', newAnimal)
                                .then(result => {
                                    alert('сохранение успешно')
                                    document.location = 'http://localhost:5173/animals';
                                })
                                .catch(() => {
                                    alert('сохранение не успешно')
                                });
                                // DataProvider.update<animal>('animal', params.id as string, changedAnimal)
                                // .then(result => alert('Запись обновлена' + result.data?.name))
                                // .catch(() => alert('ошибка'));
                        }}>
                            Сохранение
                        </Button>
                    </Box>
                </Form>
            )}
        </Formik>
    </Box>
}

function ConvertDoctorToDoctorOption(_doctor:doctor):option<doctor>{
    let doctorOption = {
        value: _doctor,
        label: _doctor.firstName + ' ' + _doctor.lastName
    } as option<doctor>
    return doctorOption;
}

function ConvertOwnerToOwnerOption(_owner:owner):option<owner>{
    let ownerOption = {
        value: _owner,
        label: _owner.firstName + ' ' + _owner.lastName
    } as option<owner>
    return ownerOption;
}

export default AddAnimal;