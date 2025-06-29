import { useQuery } from "@tanstack/react-query";
import { getAuthUser } from "../lib/api";
const useAuthUser = () => {
  const authUser = useQuery({
    queryKey: ["authUser"],
    queryFn: getAuthUser,
    retry: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
  });

  return {
    isLoading: authUser.isLoading,
    authUser: authUser.data?.user,
    error: authUser.error,
    isError: authUser.isError,
  };
};
export default useAuthUser;
