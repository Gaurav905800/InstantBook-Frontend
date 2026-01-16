import type { AxiosInstance } from "axios";
import { useCallback, useState } from "react";

interface RequestParams {
  url: string;
  client: AxiosInstance;
  method?: string;
  body?: any;
  headers?: Record<string, string>;
}

const useFetch = () => {
  const [isLoading, isSetLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const request = useCallback(
    async <T = any,>({
      url,
      client,
      method = "GET",
      body,
      headers = {},
    }: RequestParams): Promise<T | null> => {
      try {
        isSetLoading(true);
        setError(null);
        const response = await client.request<T>({
          url,
          method,
          data: body,
          headers,
        });
        return response.data;
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "An error occurred";
        setError(errorMessage);
        return null;
      } finally {
        isSetLoading(false);
      }
    },
    []
  );

  return { isLoading, error, request };
};

export default useFetch;
