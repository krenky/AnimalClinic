import { DataGrid, GridColDef, GridRowParams, GridToolbar, GridValueFormatterParams } from '@mui/x-data-grid';
import { animal, owner } from '../../Type';
import { useEffect, useState } from 'react';
import { Box, IconButton } from '@mui/material';
import DataProvider from '../../providers/dataProviders';
import AddIcon from '@mui/icons-material/Add';

const OwnerList = () =>{
    const [owners, setOwners] = useState<owner[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const columns: GridColDef<owner>[] = [
        { field:"id", headerName: "ID", flex: 1},
        { field: "firstName", headerName: "Имя", flex: 3},
        { field: "lastName", headerName: "Фамилия", flex: 3},
        { field: "animals", headerName: "Кол-во животных", flex: 3, valueFormatter: ArrayAnimalValueFormatter}
    ]

    const handleRowDoubleClick = (params: GridRowParams) => {
        const rowData: owner = params.row as owner;
        console.log('Selected Row Data:', rowData);;
        document.location = 'http://localhost:5173/owners/' + rowData.id;
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await DataProvider.getList<owner>('owner');
                setOwners(data.data || []);
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
                    <DataGrid rows={owners} 
                        columns={columns} 
                        slots={{ toolbar: GridToolbar }} 
                        onRowDoubleClick={handleRowDoubleClick}/>
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
    document.location = 'http://localhost:5173/owners/add';
};

export default OwnerList;