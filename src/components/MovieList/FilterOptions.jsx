import { useState } from "react";

import { Close, Filter } from "@bigbinary/neeto-icons";
import { Button, Checkbox, Input, Typography } from "@bigbinary/neetoui";
import { useTranslation } from "react-i18next";

export const FilterOptions = ({
  year,
  showMovies,
  showSeries,
  toggleIsMovie,
  toggleIsSeries,
  setYear,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { t } = useTranslation();

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleInputChange = e => {
    setYear(e.target.value);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="">
      <div>
        <Button
          icon={() => <Filter size={20} />}
          size="small"
          style="text"
          onClick={toggleModal}
        />
      </div>
      {isModalOpen && (
        <div className="absolute right-64 z-10 mr-48 mt-2 w-80 rounded-lg bg-white p-4 shadow-md">
          <div className="flex justify-end">
            <Button
              icon={() => <Close size={15} />}
              size="small"
              style="text"
              onClick={handleModalClose}
            />
          </div>
          <div className="flex flex-col space-y-4">
            <Input
              label={t("year")}
              placeholder="YYYY"
              size="small"
              value={year}
              onChange={handleInputChange}
            />
            <Typography style="body2" weight="semibold">
              {t("type")}
            </Typography>
            <div className="flex">
              <Checkbox
                checked={showMovies}
                id="checkbox_movie"
                label={t("movie")}
                onChange={toggleIsMovie}
              />
              <Checkbox
                checked={showSeries}
                id="checkbox_series"
                label={t("series")}
                onChange={toggleIsSeries}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};