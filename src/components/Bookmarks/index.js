import { Stack, IconButton, Typography, Box} from "@mui/material";
import {ArrowBack as BackIcon } from "@mui/icons-material";
import {Link } from "react-router-dom"

const Bookmarks = ({bookmarks}) => {
    return (
      <>
        <Stack sx={{mb:2}} direction="row" alignItems="center" >
          <IconButton to="/" component= {Link} sx={{color: "black", mr:1}}>
            <BackIcon/>
          </IconButton>
          <Typography variant="h6">
            Bookmarks
          </Typography>
        </Stack>
        {
          Object.keys(bookmarks).map(b => 
             <Box key={b} to={`/Search/${b}`} component={Link} sx={{
              p :2,
              cursor: "pointer",
              backgroundColor: "white",
              borderRadius: 1,
              textTransform: "capitalize",
              mb: 2,
              fontWeight: 800,
              display: "block",
              color: "black",
              textDecoration: "none"
             }}>
              {b}
             </Box>
          )
        }
      </>
    )
  }
  
  export default Bookmarks