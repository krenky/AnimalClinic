import { DataGrid, GridColDef, GridRowParams, GridToolbar, GridValueFormatterParams } from '@mui/x-data-grid';
import { animal, doctor, owner } from '../../Type';
import { useEffect, useState } from 'react';
import { Box, IconButton } from '@mui/material';
import DataProvider from '../../providers/dataProviders';
import AddIcon from '@mui/icons-material/Add';

const AnimalList = () =>{
    const [animals, setAnimals] = useState<animal[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const columns: GridColDef<animal>[] = [
        { field:"id", headerName: "ID", flex: 1},
        { field: "name", headerName: "Кличка", flex: 3},
        { field: "doctor", headerName: "Ветеринар", flex: 3, valueFormatter: doctorValueFormatter},
        { field: "owner", headerName: "Хозяин", flex: 3, valueFormatter: ownerValueFormatter},
        
    ]
    const handleRowDoubleClick = (params: GridRowParams) => {
        const rowData: animal = params.row as animal;
        console.log('Selected Row Data:', rowData);;
        document.location = 'http://localhost:5173/animals/' + rowData.id;
    };

    

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await DataProvider.getList<animal>('animalList');
                setAnimals(data.data || []);
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
                    <DataGrid rows={animals} 
                        columns={columns} 
                        slots={{ toolbar: GridToolbar }} 
                        onRowDoubleClick={handleRowDoubleClick}/>
                </Box>
            )}
        </Box>
    );

}

export function doctorValueFormatter(params: GridValueFormatterParams<doctor>): string {
    if(params.value)
        return `${params.value.firstName} ${params.value.lastName}`;
    return '';
};
export function ownerValueFormatter(params: GridValueFormatterParams<owner>): string {
    if(params.value)
        return `${params.value.firstName} ${params.value.lastName}`;
    return '';
};

function handleAddClick () {
    console.log('Add Row Data:');;
    document.location = 'http://localhost:5173/animals/add';
};

export default AnimalList;