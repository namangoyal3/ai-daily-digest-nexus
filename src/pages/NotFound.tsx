
import { useLocation, Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  const isAdminRoute = location.pathname.startsWith("/admin");
  
  // Handle back button click for admin routes
  const handleAdminBackClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate("/admin");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        <div className="mb-6">
          <h1 className="text-4xl font-bold mb-2">404</h1>
          <p className="text-xl text-gray-600 mb-6">Oops! Page not found</p>
          <p className="text-gray-500 mb-6">
            The page you are looking for is currently under development.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          {isAdminRoute && (
            <Button 
              onClick={handleAdminBackClick} 
              className="w-full flex items-center justify-center"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Admin Dashboard
            </Button>
          )}
          <Link to="/">
            <Button variant="outline" className="w-full flex items-center justify-center">
              <Home className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
