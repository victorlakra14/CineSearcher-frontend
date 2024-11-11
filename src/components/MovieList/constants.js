import { t } from "i18next";
import * as yup from "yup";

const currentYear = new Date().getFullYear();

export const YEAR_INPUT_VALIDATION_SCHEMA = yup.object().shape({
  releaseYear: yup
    .number()
    .typeError(t("validations.yearMustBeNumber"))
    .integer(t("validations.yearMustBeInteger"))
    .min(1888, t("validations.minYear"))
    .max(currentYear, t("validations.maxYear", { currentYear })),
});

export const DEFAULT_PAGE_INDEX = 1;
