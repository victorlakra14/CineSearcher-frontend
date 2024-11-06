import { Typography } from "@bigbinary/neetoui";

export const DetailRow = ({ label, value }) => (
  <Typography style="body2">
    <span className="font-bold">{label}: </span>
    {value}
  </Typography>
);
