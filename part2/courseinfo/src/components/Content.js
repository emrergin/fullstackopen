import Part from './Part';

const Content = ({ parts }) => {
    return ( 
      <>
        {parts.map((part)=>
            <Part part={part} key={part.id} />
        )}   
      </> );
}
 
export default Content;