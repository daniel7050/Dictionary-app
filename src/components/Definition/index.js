import { Stack, Typography, Box, IconButton, Divider, CircularProgress, useTheme, Button } from "@mui/material";
import {ArrowBack as BackIcon, BookmarkBorder as BookmarkIcon, Bookmark as BookmarkedIcon, PlayArrow as PlayIcon} from "@mui/icons-material"
import { useParams,useHistory } from "react-router-dom";
import { useState, useEffect, Fragment } from "react";
import axios from "axios";

const Definition = ({bookmarks, addBookmark, removeBookmark}) => {
  const {word} = useParams();
  const history = useHistory();
  const [definitions, setDefinitions] = useState([]);
  const [exist, setExist] = useState(true);
  const [audio, setAudio] = useState(null);
  const theme = useTheme()

  const isBookmarked = Object.keys(bookmarks).includes(word)

  const updateState = data => {
    setDefinitions(data)
        const phonetics = data[0].phonetics
        if(!phonetics.length) return;
        const url = phonetics[0].audio.replace("//ssl", "https://ssl");
        setAudio(new Audio(url));
  }

  useEffect(() => {
    const fetchDefinition = async () => {
      try{
        const resp = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
        updateState(resp.data);
        
      } catch(err) {
        setExist(false);
      }
    }

    if (!isBookmarked)fetchDefinition()
    else updateState(bookmarks[word])
  },[])

  if (!exist) return <Box sx={{...theme.mixins.alignInTheCenter}}>
    <Typography>word not found</Typography>
    <Button variant="contained"sx={{textTransform:"capitalize", mt:2}} onClick={history.goBack}>Go Back</Button>
  </Box>

  if (!definitions.length) return <Box sx={{...theme.mixins.alignInTheCenter}}><CircularProgress/></Box>
    return (
      <>
        <Stack direction="row" justifyContent="space-between">
          <IconButton onClick={history.goBack}>
            <BackIcon sx={{color: 'Black'}} />
          </IconButton>
          <IconButton onClick={() => isBookmarked ? removeBookmark(word): addBookmark(word,definitions)}>
            {isBookmarked ? <BookmarkedIcon sx={{color: 'black'}}/> :<BookmarkIcon sx={{color: 'black'}}/>}
          </IconButton>
        </Stack>
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{
          mt:3,
          background: "linear-gradient(90.17deg, #191E5D 0.14%,#0f133A 98.58%)",
          boxShadow: "0px 10px 20px rgba(19, 25, 71, 0.25)",
          px: 4,
          py: 5,
          color: "white",
          borderRadius: 2,
        }}>
          <Typography sx={{ textTransform: "capitalize"}} variant="h5">{word}</Typography>
          {audio && <IconButton onClick={() => audio.play()} sx={{
          borderRadius: 2,
          p: 1,
          color: '#fff',
          background: theme => theme.palette.pink}}>
          <PlayIcon/></IconButton>}
        </Stack>

        {definitions.map((def,idx) =>
        <Fragment key={idx}>
          <Divider sx={{display: idx === 0 ? 'none' :'black', my: 3}}/>
          {def.meanings.map(meaning =>
            <Box key={Math.random()} sx={{
              boxShadow: "0px 10px 25px rgba(0,0,0,0.05)",
              backgroundColor: "#fff",
              p: 2,
              borderRadius: 2,
              mt:3
            }}>
            <Typography sx={{textTransform: 'capitalize'}} color="GrayText" variant="subTitle1">{meaning.partOfSpeech}</Typography>
            {meaning.definitions.map((definition,idx) => <Typography sx={{my:1 }} variant="body2" color="GrayText" key={definition.definition}>{meaning.definitions.length > 1 && `${idx + 1} .`} {definition.definition}</Typography>)}

            </Box>
           )}
        </Fragment>)}
      </>
    )
  }
  
  export default Definition