import {Entry} from '../types';
import EntryDetails from './EntryDetails';

const Entries = ({entries}:{entries:Entry[]})=>
{
    return(
    <div>
        {        
            entries.map(entry =>{
                return (
                    <EntryDetails key={entry.id} entry={entry}/>
                );
            })
        }
    </div>
    );

};

export default Entries;