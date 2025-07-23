import { LineChart } from '@mui/x-charts/LineChart';
import Typography from '@mui/material/Typography';

interface ChartUIProps {
    data: any;
    ciudad: string;
}

export default function ChartUI({ data, ciudad }: ChartUIProps) {
    if (!data) return <p>No hay datos para mostrar.</p>;

    // Título personalizado
    const titulo = `Temperatura horaria en ${ciudad.charAt(0).toUpperCase() + ciudad.slice(1)}`;

    // Datos para el gráfico
    const labels = data.hourly.time;
    const valores = data.hourly.temperature_2m;
    const unidad = data.current_units.temperature_2m || "°C";

    return (
        <div>
            <Typography variant="h5" component="div" align="center" gutterBottom>
                {titulo}
            </Typography>
            <LineChart
                height={300}
                series={[
                    { 
                        data: valores, 
                        label: `Temperatura (${unidad})`, 
                        color: "#1976d2" // color azul MUI
                    },
                ]}
                xAxis={[{ 
                    scaleType: 'point', 
                    data: labels,
                    label: "Hora"
                }]}
            />
        </div>
    );
}