import React from "react";
import { useState, useEffect } from "react";
import { AxiosResponse } from "axios";
import { getCatByBreed, getBreeds } from "../service/cat.service";
import FormControl from '@mui/material/FormControl';
import { Button, Container, IconButton, ImageListItemBar, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import OpenInFullRoundedIcon from '@mui/icons-material/OpenInFullRounded';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import { Breed, Cat } from '../models/cat';

export default function CatListComponent() {
  const ITEMS_TO_LOAD = 10;

  const [breeds, setBreed] = useState([] as Breed[]);
  const [cats, setCats] = useState([] as Cat[]);
  const [selBreed, setSelectedBreed] = useState('');
  const [canLoadMore, setCanLoadMore] = useState(true);
  const [currPage, setCurrPage] = useState(0);
  const [error, setError] = useState("");
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    async function fetchBreeds() {
      getBreeds().then((response: AxiosResponse<any>) => {
        setHasError(false);
        setBreed(response.data);
        setSelectedBreed(response.data[0].id);
      }).catch((e: Error) => {
        setHasError(true);
        setError("Apologies but we could not load new cats for you at this time! Miau!");
      });
    }

    fetchBreeds();
  }, []);

  useEffect(() => {
    if (selBreed) {
      loadCats();
    }
  }, [selBreed]);

  const renderOption = (opt: Breed) => {
    return (
    <MenuItem 
      key = {opt.id} 
      value={opt.id}>
        {opt.name}
    </MenuItem>);
  }

  const handleChange = (e: SelectChangeEvent<string>) => {
    setCats([]);
    setSelectedBreed(e.target.value);
    setCurrPage(0);
    loadCats();
  }

  const loadCats = () => {
    setCanLoadMore(false);

    getCatByBreed(currPage, ITEMS_TO_LOAD, selBreed).then((response: AxiosResponse<any>) => {
      setHasError(false);

      setCurrPage(currPage + 1);

      const pageLimit = parseInt(response.headers["pagination-count"]);
      const newCats = response.data.filter((cat: Cat) => cats.map(i => i.id).indexOf(cat.id) < 0); // remove duplicates.

      setCats(
        [
          ...cats,
          ...newCats
        ]);

      if(newCats.length > 0 && pageLimit > ITEMS_TO_LOAD) {
        setCanLoadMore(true);
      }

    }).catch((e: Error) => {
      setHasError(true);
      setError("Apologies but we could not load new cats for you at this time! Miau!");
    });
  }

  const renderCatList = () => {
    return (
      <Container fixed sx = {{margin: "20px 0px"}}>
        <ImageList cols={3}>
          {cats.map((cat: Cat) => (
            <ImageListItem key={cat.url}>
              <img
                src={`${cat.url}?w=248&h=164&fit=crop&auto=format`}
                srcSet={`${cat.url}?w=248&h=164&fit=crop&auto=format&dpr=2 2x`}
                alt={cat.url}
                loading="lazy"
              />

              <ImageListItemBar
                sx={{
                  background:
                    'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
                    'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
                }}
                position="top"
                actionIcon={
                  <IconButton
                    sx={{ color: 'white' }}
                    aria-label={`view`}
                    href={`/cats:${cat.id}`}
                  >
                    <OpenInFullRoundedIcon />
                  </IconButton>
                }
                actionPosition="right"
              />

            </ImageListItem>
          ))}
        </ImageList>

        {(canLoadMore ? 
          <Button 
            variant="outlined"
            onClick={loadCats} 
          >
            Load More
          </Button> 
          : ''
          )}
      </Container>
    );
  }

  const renderSearch = () => {
    return (
      <Container fixed sx = {{margin: "30px 0px"}}>
          <FormControl variant="standard" fullWidth><InputLabel id="select-input-label">
            Select a cat breed below!
          </InputLabel>
            <Select
              labelId="select-input-label"
              id="simple-select"
              defaultValue={breeds[0].id}
              onChange={(e: SelectChangeEvent<string>) => handleChange(e)} 
            >
              {breeds.map(breed => renderOption(breed))}
            </Select>
          </FormControl>
      </Container>
    );
  }

  const renderLoading = () => {
    return (
      <div style={{display: 'flex', justifyContent: 'center'}}>
        <CircularProgress disableShrink />
      </div>
    );
  }

  return (<React.Fragment>
    <Container fixed>
      {hasError ? <Alert sx={{ margin: "10px 0px" }} severity="error">{error}</Alert> : null}
      {breeds.length > 0 ? renderSearch() : renderLoading()}
      {cats.length > 0 ? renderCatList() : renderLoading()}
    </Container>
  </React.Fragment>);
}