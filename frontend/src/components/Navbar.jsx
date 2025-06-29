import { Link, useLocation } from "react-router"; // ✅ FIXED import
import { useMutation, useQueryClient } from "@tanstack/react-query"; // ✅ ADDED useMutation
import { BellIcon, LogOutIcon, ShipWheelIcon } from "lucide-react";

import useAuthUser from "../hooks/useAuthUser";
import { logout } from "../lib/api"; // ✅ Ensure correct path to logout function
import ThemeSelector from "./ThemeSelector";

const Navbar = () => {
  const { authUser } = useAuthUser();
  const location = useLocation();
  const isChatPage = location.pathname?.startsWith("/chat");

  const queryClient = useQueryClient();

  const { mutate: logoutMutation } = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },
  });

  return (
    <nav className="bg-base-200 border-b border-base-300 sticky top-0 z-30 h-16 flex items-center">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between w-full">
          {/* LOGO - Only on chat page */}
          {isChatPage && (
            <div className="pl-5">
              <Link to="/" className="flex items-center gap-2.5">
                <ShipWheelIcon className="size-9 text-primary" />
                <span className="text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wider">
                  TokNext
                </span>
              </Link>
            </div>
          )}

          <div className="flex items-center gap-3 sm:gap-4 ml-auto">
            {/* Notification Button */}
            <Link to="/notifications">
              <button className="btn btn-ghost btn-circle">
                <BellIcon className="h-6 w-6 text-base-content opacity-70" />
              </button>
            </Link>
          </div>
          <ThemeSelector />
          {/* Avatar */}
          <div className="avatar">
            <div className="w-9 rounded-full">
              <img
                src={authUser?.profilePic || "/default-avatar.png"}
                alt="User Avatar"
              />
            </div>
          </div>

          {/* Logout Button */}
          <button
            className="btn btn-ghost btn-circle"
            onClick={() => logoutMutation()}
            title="Logout"
          >
            <LogOutIcon className="h-6 w-6 text-base-content opacity-70" />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
