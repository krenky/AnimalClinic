import { Box, Button, TextField } from "@mui/material";
import { Form, Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import { animal, animalService, animalVaccine, arrayVaccineAndService, option, service, vaccine } from "../../Type";
import { useLayoutEffect, useState } from "react";
import DataProvider from '../../providers/dataProviders';
import { useParams } from "react-router-dom";
import SelectField from 'react-select';





const ChangeAnimal = () => {
    const initialValues = {
        name: "",
        doctor: "",
        owner: "",
        service: [] as option<animalService>[],
        vaccine: [] as option<animalVaccine>[],
        animalService: [] as animalService[],
        animalVaccine: [] as animalVaccine[]
    }
    const params = useParams();
    const [currentAnimal, setCurrentAnimal] = useState<animal>();
    const [vaccineOption, setVaccineOption] = useState<option<animalVaccine>[]>();
    const [serviceOption, setServiceOption] = useState<option<animalService>[]>();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    
    const userSchema = yup.object().shape({
        name: yup.string().required(),
        doctor: yup.object().required(),
        owner: yup.object().required(),
        service: yup.object().required(),
        vaccine: yup.object().required()
    });
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const handleForSumbit = (values: any) => {
        console.log(values)
    }
    useLayoutEffect(() => {
        const fetchData = async () => {
            try {
                const data = await DataProvider.getOne<animal>('animalList', params.id as string)
                if (data.data) {
                    setCurrentAnimal(data.data);
                    initialValues.name = data.data?.name || "";
                    initialValues.owner = data.data?.owner?.firstName || "";
                    initialValues.doctor = data.data?.doctor?.firstName || "";
                    initialValues.animalService = data.data.animalServices || [],
                    initialValues.animalVaccine = data.data.animalVaccines || []

                    try {
                        const data = await DataProvider.getOneWithoutId<arrayVaccineAndService>('vaccineservice')
                        if (data.data) {
                            let serv = data.data.services.map(value => ConvertServiceToServiceOption(value, currentAnimal))
                            let vacc = data.data.vaccines.map(value => ConvertVaccineToVaccineOption(value, currentAnimal))
                            //initialValues.service = ConvertAnimalServiceToServiceOption(initialValues.animalService, serv)
                            initialValues.service = ConvertServiceAndAnimalServiceToOption(initialValues.animalService, data.data.services)
                            initialValues.vaccine = ConvertVaccineAndAnimalVaccineToOption(initialValues.animalVaccine, data.data.vaccines)
                            setServiceOption(serv)
                            setVaccineOption(vacc)

                        }
                    } catch (error) {
                        console.error(error);
                    } finally {
                        setIsLoading(false);
                    }
                    setIsLoading(false);
                }
            } catch (error) {
                console.error(error);
            } 
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
                                    <SelectField
                                        id={"service"}
                                        value={values.service}
                                        isMulti={true}
                                        onChange={option => setFieldValue("service", option)}
                                        options={serviceOption}
                                        onBlur={handleBlur}
                                    />
                                    <SelectField
                                        id={"vaccine"}
                                        value={values.vaccine}
                                        isMulti={true}
                                        onChange={option => setFieldValue("vaccine", option)}
                                        options={vaccineOption}
                                        onBlur={handleBlur}
                                    />
                                </Box>
                            )}
                    </Box>
                    <Box display="flex" justifyContent="end" mt="20px">
                        <Button type="submit" color="secondary" variant="contained" onClick={() => {
                            let changedAnimal = currentAnimal;
                            if (changedAnimal) {
                                changedAnimal.name = values.name
                                changedAnimal.animalServices = values.service.map((values) => {
                                    values.value.animalsId = currentAnimal?.id;
                                    return values.value;
                                })
                                changedAnimal.animalVaccines = values.vaccine.map((values) => {
                                    values.value.animalsId = currentAnimal?.id;
                                    return values.value;
                                })
                                DataProvider.update<animal>('animal', params.id as string, changedAnimal)
                                    .then(result => {
                                        alert('Запись обновлена' + result.data?.name)
                                        document.location = 'http://localhost/animals';
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

function ConvertServiceToServiceOption(_service: service, animal:animal|undefined): option<animalService> {
    let serviceOption = {
        value: {
            animalsId: animal?.id,
            servicesId: _service.id,
            date: new Date()
        },
        label: _service.name
    } as option<animalService>
    return serviceOption;
}

function ConvertVaccineToVaccineOption(_vaccine: vaccine, animal:animal|undefined): option<animalVaccine> {
    let vaccineOption = {
        value: {
            animalsId: animal?.id,
            vaccinesId: _vaccine.id,
            date: new Date()
        },
        label: _vaccine.name
    } as option<animalVaccine>
    return vaccineOption;
}

function ConvertServiceAndAnimalServiceToOption(animalServices:animalService[], services:service[]):option<animalService>[]{
    let result:option<animalService>[] = []
    animalServices.forEach(element => {
        let service = services.find(f => f.id == element.servicesId)
        if(service){
            let option:option<animalService> = {
                label: service.name,
                value: element
            }
            result.push(option);
        }
    });
    return result;
}

function ConvertVaccineAndAnimalVaccineToOption(animalServices:animalVaccine[], services:vaccine[]):option<animalVaccine>[]{
    let result:option<animalVaccine>[] = []
    animalServices.forEach(element => {
        let service = services.find(f => f.id == element.vaccinesId)
        if(service){
            let option:option<animalVaccine> = {
                label: service.name,
                value: element
            }
            result.push(option);
        }
    });
    return result;
}


export default ChangeAnimal;