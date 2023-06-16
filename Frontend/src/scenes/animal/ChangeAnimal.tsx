import { Box, Button, TextField } from "@mui/material";
import { Form, Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import { animal, doctor, owner } from "../../Type";
import { useEffect, useState } from "react";
import DataProvider from '../../providers/dataProviders';
import { useParams } from "react-router-dom";





const ChangeAnimal = () => {
    const initialValues = {
        name: "",
        doctor: "",
        owner: ""
    }
    const params = useParams();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [currentAnimal, setCurrentAnimal] = useState<animal>();
    const userSchema = yup.object().shape({
        name: yup.string().required(),
        doctor: yup.object().required(),
        owner: yup.object().required()
    });
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const handleForSumbit = (values: any) => {
        console.log(values)
    }
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await DataProvider.getOne<animal>('animalList', params.id as string)
                if (data.data) {
                    setCurrentAnimal(data.data);
                    initialValues.name = data.data?.name || "";
                    initialValues.owner = data.data?.owner.firstName || "";
                    initialValues.doctor = data.data?.doctor.firstName || "";
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
                                        label="Имя животного"
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
                                        label="Имя доктора"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.doctor}
                                        name="doctor"
                                        disabled={true}
                                        sx={{ gridColumn: "span 2" }}
                                    />
                                    <TextField
                                        fullWidth
                                        variant="filled"
                                        type="text"
                                        label="Имя хозяина"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.owner}
                                        name="owner"
                                        disabled={true}
                                        sx={{ gridColumn: "span 2" }}
                                    />
                                </Box>
                            )}
                    </Box>
                    <Box display="flex" justifyContent="end" mt="20px">
                        <Button type="submit" color="secondary" variant="contained" onClick={() => {
                            let changedAnimal = currentAnimal;
                            if(changedAnimal){
                                changedAnimal.name = values.name
                                DataProvider.update<animal>('animal', params.id as string, changedAnimal)
                                .then(result => {
                                    alert('Запись обновлена' + result.data?.name)
                                    document.location = 'http://localhost:5173/animals';
                                })
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



export default ChangeAnimal;