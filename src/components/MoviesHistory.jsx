import { Typography } from "@bigbinary/neetoui";
import useViewHistoryStore from "stores/useViewHistoryStore";

export const MoviesHistory = () => {
  const { viewHistory = [] } = useViewHistoryStore();

  console.log(viewHistory);

  return (
    <div>
      <Typography style="h2" weight="bold">
        View History
      </Typography>
      {viewHistory.map(movie => (
        <div key={movie.id}>{movie.title}</div>
      ))}
    </div>
  );
};
