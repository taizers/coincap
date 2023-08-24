import React, { FC } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField';
import { Box, InputAdornment } from '@mui/material';

interface ISearchBar {
  requestSearch: (data: string) => void;
  sx: object;
}

const SearchBar: FC<ISearchBar> = ({ requestSearch, sx }) => {
  return (
    <Box sx={sx}>
      <TextField
        id="search-bar"
        className="text"
        onInput={(e) => {
          const target = e.target as HTMLInputElement;
          requestSearch(target.value);
        }}
        label="Search"
        variant="outlined"
        placeholder="Search..."
        size="small"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <SearchIcon style={{ fill: 'blue' }} />
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
};

export default SearchBar;
