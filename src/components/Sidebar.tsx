"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Squares2X2Icon, QueueListIcon, PlusCircleIcon } from '@heroicons/react/24/outline';
const Sidebar = () => {
  const pathname = usePathname();

  const menuItems = [
    { label: 'Dashboard', path: '/dashboard', icon: Squares2X2Icon },
    { label: 'Habits', path: '/habits', icon: QueueListIcon },
    { label: 'Add Habits', path: '/addform', icon: PlusCircleIcon },
  ];

  return (
    <div className="w-64 h-screen bg-gray-50 shadow-lg flex flex-col p-4">
      <div className="flex items-center justify-center mb-8">
        <div className="h-16 w-16 rounded-full bg-gray-300"></div>
      </div>
      <ul className="flex-1 space-y-4">
        {menuItems.map((item) => (
          <li key={item.label}>
            <Link href={item.path} passHref>
              <div
                className={`flex items-center space-x-4 p-2 rounded-lg ${
                  pathname === item.path ? 'bg-gray-200 text-blue-600 font-semibold' : 'text-gray-500'
                } hover:bg-gray-200 cursor-pointer`}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.label}</span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
