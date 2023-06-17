import { DataGrid, GridColDef, GridRowParams, GridToolbar, GridValueFormatterParams } from '@mui/x-data-grid';
import { animal, doctor } from '../../Type';
import { useEffect, useState } from 'react';
import { Box, IconButton } from '@mui/material';
import DataProvider from '../../providers/dataProviders';
import AddIcon from '@mui/icons-material/Add';

const DoctorList = () => {
    const [doctors, setDoctors] = useState<doctor[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const columns: GridColDef<doctor>[] = [
        { field: "id", headerName: "ID", flex: 1 },
        { field: "firstName", headerName: "Имя", flex: 3 },
        { field: "lastName", headerName: "Фамилия", flex: 3 },
        { field: "animals", headerName: "Кол-во животных", flex: 3, valueFormatter: ArrayAnimalValueFormatter }
    ]

    const handleRowDoubleClick = (params: GridRowParams) => {
        const rowData: doctor = params.row as doctor;
        console.log('Selected Row Data:', rowData);;
        document.location = 'http://localhost/doctors/' + rowData.id;
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await DataProvider.getList<doctor>('doctor');
                setDoctors(data.data || []);
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
            setIsLoading(false);
        };

        fetchData();
    }, []);

    return (
        <Box m={"20px"}>
            <Box display="flex" flex={1}>
                <IconButton onClick={handleAddClick}>
                    <AddIcon />
                </IconButton>
            </Box>
            {isLoading ? (
                <div>Loading...</div>
            ) : (
                <Box
                    m={"0 0 0 0"}
                    height="90vh"
                    width="100vh"
                    sx={{
                        "& .MuiDataGrid-root": {
                            border: "none",
                        },
                        "& .MuiDataGrid-cell": {
                            borderBottom: "none",
                        }
                    }}
                >
                    <DataGrid rows={doctors}
                        columns={columns}
                        slots={{ toolbar: GridToolbar }}
                        onRowDoubleClick={handleRowDoubleClick} />
                </Box>
            )}
        </Box>
    );

}

export const ArrayAnimalValueFormatter = (params: GridValueFormatterParams<animal[]>): string => {
    return `${params.value.length}`;
};

function handleAddClick () {
    console.log('Add Row Data:');;
    document.location = 'http://localhost/doctors/add';
};

export default DoctorList;