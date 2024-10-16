import { Search } from "@bigbinary/neeto-icons";
import { Input } from "@bigbinary/neetoui";

export const SearchBar = () => (
  <div className="pr-20">
    <Input placeholder="Search" prefix={<Search />} type="search" />
  </div>
);
