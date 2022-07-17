import {HealthCheckEntry} from '../types';
import BaseEntry from './BaseEntry';
import FavoriteIcon from '@mui/icons-material/Favorite';

const HealthCheckEntryComponent= ({entry}:{entry:HealthCheckEntry})=>{
    return (
    <BaseEntry entry={entry}> 
    <>
        {entry.healthCheckRating===0 && <FavoriteIcon sx={{ color: "#66bb6a" }}/>}
        {entry.healthCheckRating===1 && <FavoriteIcon sx={{ color: "#ffeb3b"}}/>}
        {entry.healthCheckRating===2 && <FavoriteIcon sx={{ color: "#fb8c00"  }}/>}
        {entry.healthCheckRating===3 && <FavoriteIcon sx={{ color: "#d32f2f" }}/>}
    </>
    </BaseEntry>
        
        );
};

export default HealthCheckEntryComponent;