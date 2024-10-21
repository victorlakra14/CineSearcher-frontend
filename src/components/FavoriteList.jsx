import { Typography } from "@bigbinary/neetoui";

export const FavoriteList = () => (
  <div className="mt-10 flex flex-col items-center px-80">
    <div className="border-1 flex w-full items-center justify-between rounded-lg border-2 border-gray-200 p-4 shadow-md">
      <Typography style="h4" weight="bold">
        Oppenhieer
      </Typography>
      <Typography className="text-gray-500" weight="semibold">
        Rating: <span className="text-gray-400">8.3/10</span>
      </Typography>
    </div>
  </div>
);
