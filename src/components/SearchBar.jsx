import { useEffect, useState } from "react";

import { Search } from "@bigbinary/neeto-icons";
import { Input } from "@bigbinary/neetoui";
import moviesApi from "apis/movies";
import useDebounce from "hooks/useDebounce";

export const SearchBar = () => {
  const [searchInput, setSearchInput] = useState("");
  const debouncedSearchKey = useDebounce(searchInput);

  const fetchMovies = async () => {
    const response = await moviesApi.show(debouncedSearchKey);
    console.log(response);
  };

  useEffect(() => {
    fetchMovies();
  }, [debouncedSearchKey]);

  return (
    <div className="pr-20">
      <Input
        placeholder="Search"
        prefix={<Search />}
        type="search"
        value={searchInput}
        onChange={e => setSearchInput(e.target.value)}
      />
    </div>
  );
};
