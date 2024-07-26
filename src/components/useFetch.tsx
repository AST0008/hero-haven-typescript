import { useEffect, useState, useCallback } from "react";

interface FetchResult<T> {
  data: T | null;
  pending: boolean;
  error: string | null;
  refetch: () => void;
}

const useFetch = <T,>(url: string): FetchResult<T> => {
  const [data, setData] = useState<T | null>(null);
  const [pending, setPending] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(() => {
    setPending(true);
    fetch(url)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Unexpected Error");
        }
        return res.json();
      })
      .then((data: T) => {
        setData(data);
        setPending(false);
        setError(null);
      })
      .catch((err: Error) => {
        setPending(false);
        setError(err.message);
      });
  }, [url]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, pending, error, refetch: fetchData };
};

export default useFetch;
