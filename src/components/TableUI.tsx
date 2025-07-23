import { useMemo } from 'react';
import Box from '@mui/material/Box';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import type { OpenMeteoResponse } from '../types/DashboardTypes';

interface TableUIProps {
  data: OpenMeteoResponse | null;
  loading: boolean;
  error: string | null;
  ciudad: string;
}

const columns: GridColDef[] = [
  { field: 'label', headerName: 'Hora', width: 180 },
  { field: 'value1', headerName: 'Temperatura (2m)', width: 180 },
  {
    field: 'resumen',
    headerName: 'Resumen',
    description: 'No es posible ordenar u ocultar esta columna.',
    sortable: false,
    hideable: false,
    width: 260,
    valueGetter: (_, row) =>
      `${row.label || ''} - ${row.value1 ?? 'N/A'}°C`,
  },
];

export default function TableUI({ data, loading, error, ciudad }: TableUIProps) {
  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;
  if (!data) return <p>No hay datos para mostrar.</p>;

  const rows = useMemo(() => {
    const horas = data.hourly?.time ?? [];
    const temps = data.hourly?.temperature_2m ?? [];

    const count = Math.min(horas.length, temps.length, 24); // máximo 24 registros

    return Array.from({ length: count }, (_, i) => ({
      id: i,
      label: horas[i],
      value1: temps[i],
    }));
  }, [data]);

  return (
    <div>
      <h3 style={{ textAlign: 'center' }}>
        Tabla de datos para {ciudad.charAt(0).toUpperCase() + ciudad.slice(1)}
      </h3>
      <Box sx={{ height: 400, width: '100%' }}>
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