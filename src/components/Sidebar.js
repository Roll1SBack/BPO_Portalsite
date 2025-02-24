import { Home, Settings, User } from "lucide-react"; // Import icons
import { Button } from "@/components/ui/button";

const Sidebar = () => {
  return (
    <div className="w-64 bg-gray-800 text-white p-4">
      <nav className="flex flex-col space-y-2">
        <div className="flex items-center space-x-2">
          <Home size={20} />
          <Button className="w-full justify-start">Home</Button>
        </div>
        <div className="flex items-center space-x-2">
          <User size={20} />
          <Button className="w-full justify-start">Profile</Button>
        </div>
        <div className="flex items-center space-x-2">
          <Settings size={20} />
          <Button className="w-full justify-start">Settings</Button>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;