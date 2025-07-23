import { useEffect, useState } from 'react';
import type { OpenMeteoResponse } from '../types/DashboardTypes';

interface DataFetcherOutput {
    data: OpenMeteoResponse | null;
    loading: boolean;
    error: string | null;
}

// Mapeo de ciudades a coordenadas
const coordenadasCiudades: Record<string, { lat: number, lon: number }> = {
    guayaquil: { lat: -2.1962, lon: -79.8862 },
    quito: { lat: -0.1807, lon: -78.4678 },
    manta: { lat: -0.9677, lon: -80.7089 },
    cuenca: { lat: -2.9006, lon: -79.0045 }
};

export default function DataFetcher(ciudad: string): DataFetcherOutput {
    const [data, setData] = useState<OpenMeteoResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setLoading(true);
        setError(null);

        const coords = coordenadasCiudades[ciudad];
        if (!coords) {
            setError("Ciudad no soportada");
            setLoading(false);
            return;
        }

        const url = `https://api.open-meteo.com/v1/forecast?latitude=${coords.lat}&longitude=${coords.lon}&hourly=temperature_2m&current=temperature_2m,relative_humidity_2m,apparent_temperature,wind_speed_10m&timezone=America%2FChicago`;

        const fetchData = async () => {
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error(`Error HTTP: ${response.status} - ${response.statusText}`);
                }
                const result: OpenMeteoResponse = await response.json();
                setData(result);
            } catch (err: any) {
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError("Ocurrió un error desconocido al obtener los datos.");
                }
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [ciudad]); // Se ejecuta cada vez que cambia la ciudad

    return { data, loading, error };
}