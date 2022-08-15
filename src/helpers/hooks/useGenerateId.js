import { useMemo } from "react";

let counter = 0;

const useGenerateId = () => {
  /* useMemo hook to return a value */
  const id = useMemo(() => ++counter, []);

  return (suffix) => `id${id}_${suffix}`
};

export default useGenerateId;
