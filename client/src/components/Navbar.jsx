import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

export default function Navbar(props) {
  return (
    <AppBar sx={{ bgcolor: "white" }} position="relative">
      <Toolbar>
        {props.children}
        <Typography marginRight="auto" variant="h6" color="black" noWrap>
          FireLibrary
        </Typography>
      </Toolbar>
    </AppBar>
  );
};