import {useState} from "react"
import {Box, Typography, FilledInput, IconButton, useTheme} from '@mui/material'
import {Search as SearchIcon, Bookmark as BookmarkIcon} from "@mui/icons-material"
import {useHistory, Link} from "react-router-dom"

const Home = () => {
  const [word, setWord] = useState("");
  const theme = useTheme()
  const history = useHistory()
  const handleSubmit = (event) => {
    event.preventDefault();
    const trimedWord = word.trim().toLowerCase();
    if (!trimedWord || trimedWord.split(" ").length > 1) return;
    history.push(`/Search/${trimedWord}`)

  }
  return (
    <Box sx = {{...theme.mixins.alignInTheCenter}} >
        <img src="/assets/book.png" alt="Book"/>
        <Typography
         color="primary"
         sx={{
          marginTop: 3,
          marginBottom: 1
        }} variant="h4">Dictionary</Typography>
        <Typography color="GrayText">Find meanings and save for quick references</Typography>
        <Box sx={{width: '360px'}}>
        <form onSubmit={handleSubmit}>
        <FilledInput 
        value={word}
        onChange={event =>setWord(event.target.value)}
        disableUnderline placeholder='Search word' 
          sx={{
            my: 4,
            backgroundColor: 'white',
            borderRadius: 2,
            boxShadow: '0px 10px 25px rgba (0, 0, 0, 0.05)',
            "& .MuiFilledInput-input": {
              p: 2
            }
          }}
          startAdornment={<SearchIcon color="disabled"/>}
          fullWidth
        />
        </form>
        </Box>
          <IconButton to="bookmarks" component={Link} sx={{
            borderRadius: 2,
            p: 2,
            color: '#fff',
            background: 'linear-gradient(138.72deg,#DC8295 0%, #DC687C 95.83%)',
            boxShadow: '0px 10px 10px rgba (221, 114, 133, 0.2)'
          }}>
            <BookmarkIcon />
          </IconButton>
    </Box>
  )
}

export default Home