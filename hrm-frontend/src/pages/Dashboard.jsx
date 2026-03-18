import { useState, useEffect } from 'react';
import {
  Users, CheckCircle2, XCircle, Clock, Building2,
  RefreshCw, TrendingUp, CalendarDays, ArrowRight,
} from 'lucide-react';
import { dashboardApi } from '../api/dashboard.js';
import { LoadingPage } from '../components/ui/LoadingSpinner.jsx';
import { ErrorState } from '../components/ui/ErrorState.jsx';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';

function StatCard({ label, value, icon: Icon, iconBg, iconColor, trend }) {
  return (
    <div className="stat-card">
      <div className={`stat-icon ${iconBg}`}>
        <Icon size={22} className={iconColor} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-2xl font-extrabold text-gray-900 leading-tight">{value}</p>
        <p className="text-sm text-gray-500 truncate">{label}</p>
        {trend && <p className="text-xs text-emerald-600 font-medium mt-0.5">{trend}</p>}
      </div>
    </div>
  );
}

export default function Dashboard() {
  const [stats, setStats] = useState(null);
 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const load = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await dashboardApi.getStats();
      setStats(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  if (loading) return <LoadingPage />;
  if (error || !stats) return <ErrorState message={error || 'Failed to load dashboard'} onRetry={load} />;

  const today = format(new Date(), 'EEEE, MMMM d, yyyy');

  return (
    <div className="space-y-6">
      
      <div className="card p-6 bg-gradient-to-r from-primary-600 to-primary-800 text-white border-0">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold">Welcome Admin</h2>
            <p className="text-primary-100 text-sm mt-1">{today}</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="bg-white/10 rounded-xl px-4 py-3 text-center">
              <p className="text-2xl font-extrabold">{stats.attendance_rate_today}%</p>
              <p className="text-xs text-primary-100">Attendance Rate Today</p>
            </div>
            {/* <button
              onClick={load}
              className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 transition-colors"
              title="Refresh"
            >
              <RefreshCw size={16} />
            </button> */}
          </div>
        </div>
        
        <div className="mt-4">
          <div className="flex justify-between text-xs text-primary-100 mb-1">
            <span>Today's Attendance</span>
            <span>{stats.present_today} / {stats.total_employees}</span>
          </div>
          <div className="h-2 bg-white/20 rounded-full overflow-hidden">
            <div
              className="h-full bg-white rounded-full transition-all duration-700"
              style={{ width: `${stats.attendance_rate_today}%` }}
            />
          </div>
        </div>
      </div>

      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Total Employees"
          value={stats.total_employees}
          icon={Users}
          iconBg="bg-primary-100"
          iconColor="text-primary-600"
          trend={`${stats.total_departments} departments`}
        />
        <StatCard
          label="Present Today"
          value={stats.present_today}
          icon={CheckCircle2}
          iconBg="bg-emerald-100"
          iconColor="text-emerald-600"
        />
        <StatCard
          label="Absent Today"
          value={stats.absent_today}
          icon={XCircle}
          iconBg="bg-red-100"
          iconColor="text-red-600"
        />
        <StatCard
          label="Late Today"
          value={`${stats.late_today}`}
          icon={Clock}
          iconBg="bg-amber-100"
          iconColor="text-amber-600"
        />
      </div>

      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
       
        <div className="card p-5 lg:col-span-3">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-gray-900">Recent Employees</h3>
            <Link to="/employees" className="text-xs text-primary-600 font-medium flex items-center gap-1 hover:underline">
              View all <ArrowRight size={12} />
            </Link>
          </div>
          {stats.recent_employees.length === 0 ? (
            <p className="text-sm text-gray-400 text-center py-8">No employees yet</p>
          ) : (
            <div className="space-y-3">
              {stats.recent_employees.map((emp) => (
                <div key={emp.id} className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-gray-50">
                  <div className="w-9 h-9 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-bold text-primary-700">{emp.full_name.charAt(0)}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-900 truncate">{emp.full_name}</p>
                    <p className="text-xs text-gray-400">{emp.department} · {emp.employee_id}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-sm font-bold text-emerald-600">{emp.total_present_days}</p>
                    <p className="text-xs text-gray-400">days present</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
