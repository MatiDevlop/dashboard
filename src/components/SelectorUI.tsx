import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select, { type SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

interface SelectorUIProps {
    ciudad: string;
    setCiudad: (ciudad: string) => void;
}

export default function SelectorUI({ ciudad, setCiudad }: SelectorUIProps) {
    const handleChange = (event: SelectChangeEvent<string>) => {
        setCiudad(event.target.value);
    };

    return (
        <FormControl fullWidth>
            <InputLabel id="city-select-label">Ciudad</InputLabel>
            <Select
                labelId="city-select-label"
                id="city-simple-select"
                label="Ciudad"
                onChange={handleChange}
                value={ciudad}
            >
                <MenuItem disabled value="">
                    <em>Seleccione una ciudad</em>
                </MenuItem>
                <MenuItem value={"guayaquil"}>Guayaquil</MenuItem>
                <MenuItem value={"quito"}>Quito</MenuItem>
                <MenuItem value={"manta"}>Manta</MenuItem>
                <MenuItem value={"cuenca"}>Cuenca</MenuItem>
            </Select>
            {ciudad && (
                <p>
                    Información del clima en <span style={{ textTransform: 'capitalize', fontWeight: 'bold' }}>{ciudad}</span>
                </p>
            )}
        </FormControl>
    );
}