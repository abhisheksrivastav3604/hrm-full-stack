import { useState } from 'react';
import { Trash2, CalendarDays, Pencil } from 'lucide-react';
import { StatusBadge } from '../ui/StatusBadge.jsx';
import { ConfirmDialog } from '../ui/ConfirmDialog.jsx';
import { Modal } from '../ui/Modal.jsx';
import { attendanceApi } from '../../api/attendance.js';
import { EmptyState } from '../ui/EmptyState.jsx';
import toast from 'react-hot-toast';
import { format } from 'date-fns';

const STATUS_OPTIONS = ['Present', 'Absent', 'Late', 'Half Day'];

export function AttendanceTable({ records, onRefresh }) {
  const [deletingId, setDeletingId]   = useState(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const [editRecord, setEditRecord]   = useState(null);
  const [editStatus, setEditStatus]   = useState('Present');
  const [editNote,   setEditNote]     = useState('');
  const [editLoading, setEditLoading] = useState(false);

  const handleDeleteClick = (id) => {
    setDeletingId(id);
    setConfirmOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!deletingId) return;
    setDeleteLoading(true);
    try {
      await attendanceApi.delete(deletingId);
      toast.success('Record deleted');
      onRefresh();
    } catch (err) {
      toast.error(err.message);
    } finally {
      setDeleteLoading(false);
      setConfirmOpen(false);
    }
  };

  const openEdit = (r) => {
    setEditRecord(r);
    setEditStatus(r.status);
    setEditNote(r.note ?? '');
  };

  const handleEdit = async () => {
    if (!editRecord) return;
    setEditLoading(true);
    try {
      await attendanceApi.update(editRecord.id, { status: editStatus, note: editNote || undefined });
      toast.success('Record updated');
      onRefresh();
      setEditRecord(null);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setEditLoading(false);
    }
  };

  if (records.length === 0) {
    return (
      <EmptyState
        icon={CalendarDays}
        title="No attendance records"
        description="Mark attendance for employees to see records here."
      />
    );
  }

  return (
    <>
     
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              <th className="table-th">Employee</th>
              <th className="table-th">Date</th>
              <th className="table-th">Status</th>
              <th className="table-th">Note</th>
              <th className="table-th text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {records.map((rec) => (
              <tr key={rec.id} className="table-tr">
                <td className="table-td">
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">{rec.employee_name}</p>
                    <p className="text-xs text-gray-400">{rec.employee_code}</p>
                  </div>
                </td>
                <td className="table-td text-gray-600">
                  {format(new Date(rec.date + 'T00:00:00'), 'EEE, MMM d yyyy')}
                </td>
                <td className="table-td">
                  <StatusBadge status={rec.status} />
                </td>
                <td className="table-td text-xs text-gray-500 max-w-[200px] truncate">
                  {rec.note || <span className="text-gray-300">—</span>}
                </td>
                <td className="table-td text-right">
                  <div className="flex items-center justify-end gap-1">
                    <button
                      onClick={() => openEdit(rec)}
                      className="btn btn-sm text-gray-500 hover:text-primary-600 hover:bg-primary-50 border border-transparent hover:border-primary-200"
                    >
                      <Pencil size={13} /> Edit
                    </button>
                    <button
                      onClick={() => handleDeleteClick(rec.id)}
                      className="btn btn-sm text-gray-500 hover:text-red-600 hover:bg-red-50 border border-transparent hover:border-red-200"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="md:hidden space-y-3">
        {records.map((rec) => (
          <div key={rec.id} className="border border-gray-100 rounded-xl p-4">
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="font-semibold text-gray-900 text-sm">{rec.employee_name}</p>
                <p className="text-xs text-gray-400 mt-0.5">{format(new Date(rec.date + 'T00:00:00'), 'EEE, MMM d yyyy')}</p>
              </div>
              <StatusBadge status={rec.status} />
            </div>
            {rec.note && <p className="text-xs text-gray-500 mt-2 italic">"{rec.note}"</p>}
            <div className="flex gap-2 mt-3">
              <button onClick={() => openEdit(rec)} className="btn-secondary btn-sm">
                <Pencil size={12} /> Edit
              </button>
              <button onClick={() => handleDeleteClick(rec.id)} className="btn btn-sm text-red-500 hover:bg-red-50 border border-red-200">
                <Trash2 size={12} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      <Modal
        open={editRecord !== null}
        onClose={() => setEditRecord(null)}
        title="Edit Attendance"
        size="sm"
      >
        <div className="space-y-4">
          <div>
            <label className="form-label">Status</label>
            <div className="grid grid-cols-2 gap-2">
              {STATUS_OPTIONS.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setEditStatus(s)}
                  className={`px-3 py-2 text-sm font-medium rounded-lg border-2 transition-all
                    ${editStatus === s ? 'border-primary-400 bg-primary-50 text-primary-700' : 'border-gray-200 text-gray-600'}`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="form-label">Note</label>
            <textarea
              value={editNote}
              onChange={(e) => setEditNote(e.target.value)}
              placeholder="Add any notes…"
              rows={2}
              className="form-input resize-none"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button onClick={() => setEditRecord(null)} disabled={editLoading} className="btn-secondary">
              Cancel
            </button>
            <button onClick={handleEdit} disabled={editLoading} className="btn-primary">
              Save Changes
            </button>
          </div>
        </div>
      </Modal>

      <ConfirmDialog
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={handleConfirmDelete}
        loading={deleteLoading}
        title="Delete Record"
        message="Are you sure you want to delete this attendance record? This action cannot be undone."
        confirmLabel="Delete"
      />
    </>
  );
}
