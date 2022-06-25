import { useCallback, useMemo } from "react";
import { useLocation } from "react-router";

export const useQuery = () => {
  const { search } = useLocation();

  const query = useMemo(() => new URLSearchParams(search), [search]);

  return { query };
};
