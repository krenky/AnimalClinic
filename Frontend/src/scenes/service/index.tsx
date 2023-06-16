import { DataGrid, GridColDef, GridRowParams, GridToolbar } from '@mui/x-data-grid';
import { service } from '../../Type';
import { useEffect, useState } from 'react';
import { Box, IconButton } from '@mui/material';
import DataProvider from '../../providers/dataProviders';
import AddIcon from '@mui/icons-material/Add';

const ServiceList = () => {
    const [services, setServices] = useState<service[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const columns: GridColDef<service>[] = [
        { field: "id", headerName: "ID", flex: 1 },
        { field: "name", headerName: "Наименование", flex: 3 },
        { field: "price", headerName: "Стоимость", flex: 3 },
    ]

    const handleRowDoubleClick = (params: GridRowParams) => {
        const rowData: service = params.row as service;
        console.log('Selected Row Data:', rowData);;
        document.location = 'http://localhost:5173/services/' + rowData.id;
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await DataProvider.getList<service>('service');
                setServices(data.data || []);
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
                    <DataGrid rows={services} columns={columns} slots={{ toolbar: GridToolbar }} onRowDoubleClick={handleRowDoubleClick} />
                </Box>
            )}
        </Box>
    );

}

function handleAddClick() {
    console.log('Add Row Data:');;
    document.location = 'http://localhost:5173/services/add';
};

export default ServiceList;