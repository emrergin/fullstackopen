import {Entry} from '../types';
import { Box , ListItemText,Typography,List,ListItem} from "@material-ui/core";
import { useStateValue } from "../state";
import WorkIcon from '@mui/icons-material/Work';
import HealingIcon from '@mui/icons-material/Healing';
import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';

const BaseEntry = ({entry,children}:{entry:Entry,children?:React.ReactNode;})=>{

const [{ diagnoses }, ] = useStateValue();
return(
    <Box mt={2} px={2}
    sx={{ border: '3px solid',borderRadius: 3, borderColor: '#212121'}}>  
    <Typography>                                                    
        {entry.date} 
        {entry.type==="Hospital" && <HealingIcon />}
        {entry.type==="OccupationalHealthcare" && <WorkIcon  />}  
        {entry.type==="HealthCheck" && <MedicalInformationIcon />}     
    </Typography>   
    <Typography>
        <em>{entry.description}</em>
    </Typography>
    <List dense={true}>
    {
        entry.diagnosisCodes?.map((code,index) =>
            <ListItem key={index} >
                <ListItemText >{code} {diagnoses.find(a=>a.code===code)?.name}</ListItemText>  
            </ListItem>
        )
    }
    </List>   
    {children}
    <Typography>
        diagnose by {entry.specialist}
    </Typography>
    </Box>
);

};

export default BaseEntry;