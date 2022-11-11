import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  income: {
    borderBottom: '10px solid rgba(0, 255, 0, 0.5)',
    
  },
  expense: {
    borderBottom: '10px solid rgba(255, 0, 0, 0.5)',
  },
  header:{
    fontFamily:'Source Sans 3',
    marginBottom:0,
    fontSize:'500px',
  },
  title:{
    fontFamily:'Handlee',
    fontSize:'100px',
  },
}));
