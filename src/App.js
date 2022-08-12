import {useState,useEffect} from 'react';
import { ThemeProvider,CssBaseline, Grid} from "@mui/material";
import theme from "./theme";
import {BrowserRouter as Router, Route} from "react-router-dom";
import Home from "./components/Home";
import Bookmarks from "./components/Bookmarks";
import Definition from "./components/Definition";

const App = () => {

  const [bookmarks, setBookmarks] = useState(JSON.parse(localStorage.getItem("bookmarks"))||{});

  useEffect(() => {
    localStorage.setItem("bookmarks",JSON.stringify(bookmarks));
  },[bookmarks])

  const addBookmark = (word, definitions) => setBookmarks(oldBookmarks => ({...oldBookmarks,
    [word]: definitions
  }))

  const removeBookmark = word => setBookmarks(oldBookmarks => {
    const temp = {...oldBookmarks};
    delete temp[word];
    return temp;
  })
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Grid container sx={{p: 2, mt: {xs:0, sm :2}}} justifyContent="center">
        <Grid item xs={12} sm={8} md={5} lg={3}>
          <Router>
            <Route exact  path="/">
              <Home />
            </Route>
            <Route path="/Bookmarks">
              <Bookmarks bookmarks= {bookmarks}/>
            </Route>
            <Route path="/Search/:word">
              <Definition bookmarks= {bookmarks} addBookmark={addBookmark} removeBookmark={removeBookmark}/>
            </Route>
          </Router>
        </Grid>
      </Grid>
    </ThemeProvider>
  )
}

export default App;