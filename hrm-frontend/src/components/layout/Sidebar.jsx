import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  CalendarCheck,
  Building2,
  X,
} from 'lucide-react';

const navItems = [
  { to: '/dashboard',  label: 'Dashboard',   icon: LayoutDashboard },
  { to: '/employees',  label: 'Employees',   icon: Users },
  { to: '/attendance', label: 'Attendance',  icon: CalendarCheck },
];

export default function Sidebar({ open, onClose }) {
  return (
    <>
      {/* Mobile backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-20 bg-black/40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar panel */}
      <aside
        className={`
          fixed top-0 left-0 z-30 h-full w-64 bg-white border-r border-gray-200
          flex flex-col transition-transform duration-300 ease-in-out
          ${open ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0 lg:static lg:z-auto
        `}
      >
        {/* Brand */}
        <div className="flex items-center justify-between h-16 px-5 border-b border-gray-100">
          <div className="flex items-center gap-2.5">
            {/* <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
              <Building2 className="w-4.5 h-4.5 text-white" size={18} />
            </div> */}
            <div className="leading-tight">
              <p className="text-sm font-bold text-gray-900">HR Management</p>
              <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wider"></p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="lg:hidden p-1.5 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100"
          >
            <X size={16} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
          {/* <p className="px-3 mb-2 text-[10px] font-semibold text-gray-400 uppercase tracking-widest">
            Main Menu
          </p> */}
          {navItems.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150
                 ${isActive
                   ? 'bg-primary-50 text-primary-700 font-semibold'
                   : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                 }`
              }
            >
              {({ isActive }) => (
                <>
                  {/* <span
                    className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors
                      ${isActive ? 'bg-primary-100' : 'bg-gray-100 group-hover:bg-gray-200'}`}
                  >
                    <Icon size={16} className={isActive ? 'text-primary-600' : 'text-gray-500'} />
                  </span> */}
                  {label}
                  {isActive && (
                    <span className="ml-auto w-1.5 h-1.5 rounded-full bg-primary-600" />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        
      </aside>
    </>
  );
}
