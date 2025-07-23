import React, {useMemo} from 'react';
import Box from '@mui/material/Box';
import { type OpenMeteoResponse } from '../types/DashboardTypes';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';

function combineArrays(arrLabels: string[], arrValues1: number[], arrValues2: number[]) {
   return arrLabels.map((label, index) => ({
      id: index,
      label,
      value1: arrValues1[index],
      value2: arrValues2[index]
   }));
}

const columns: GridColDef[] = [
   { field: 'id', headerName: 'ID', width: 90 },
   { field: 'label', headerName: 'Hora', width: 150 },
   { field: 'value1', headerName: 'Temperatura (2m)', width: 180 },
   { field: 'value2', headerName: 'Humedad relativa (%)', width: 200 },
   {
      field: 'resumen',
      headerName: 'Resumen',
      description: 'No es posible ordenar u ocultar esta columna.',
      sortable: false,
      hideable: false,
      width: 260,
      valueGetter: (_, row) => `${row.label || ''} - ${row.value1 || ''}°C / ${row.value2 || ''}%`,
   },
];

const arrValues1 = [4000, 3000, 2000, 2780, 1890, 2390, 3490];
const arrValues2 = [2400, 1398, 9800, 3908, 4800, 3800, 4300];
const arrLabels = ['A','B','C','D','E','F','G'];

interface TableUIProps {
    data: OpenMeteoResponse | null;
    ciudad: string;
}

export default function TableUI({ data, ciudad }: TableUIProps) {
    if (!data) return <p>No hay datos para mostrar.</p>;

    const rows = combineArrays(arrLabels, arrValues1, arrValues2);

    return (
        <div>
            <h3 style={{ textAlign: 'center' }}>Tabla de datos para {ciudad.charAt(0).toUpperCase() + ciudad.slice(1)}</h3>
            <Box sx={{ height: 350, width: '100%' }}>
               <DataGrid
                  rows={rows}
                  columns={columns}
                  initialState={{
                     pagination: {
                        paginationModel: {
                           pageSize: 5,
                        },
                     },
                  }}
                  pageSizeOptions={[5]}
                  disableRowSelectionOnClick
               />
            </Box>
         </div>
    );
}