// ─── Employee ─────────────────────────────────────────────────────────────────

/**
 * @typedef {Object} Employee
 * @property {number} id
 * @property {string} employee_id
 * @property {string} full_name
 * @property {string} email
 * @property {string} department
 * @property {string | null} position
 * @property {string | null} phone
 * @property {string} created_at
 * @property {number} total_present_days
 */

/**
 * @typedef {Object} EmployeeCreate
 * @property {string} employee_id
 * @property {string} full_name
 * @property {string} email
 * @property {string} department
 * @property {string} [position]
 * @property {string} [phone]
 */

/**
 * @typedef {Object} EmployeeUpdate
 * @property {string} [full_name]
 * @property {string} [email]
 * @property {string} [department]
 * @property {string} [position]
 * @property {string} [phone]
 */

// ─── Attendance ───────────────────────────────────────────────────────────────

/**
 * @typedef {'Present' | 'Absent' | 'Late' | 'Half Day'} AttendanceStatus
 */

/**
 * @typedef {Object} Attendance
 * @property {number} id
 * @property {number} employee_id
 * @property {string} date
 * @property {AttendanceStatus} status
 * @property {string | null} note
 * @property {string} created_at
 * @property {string} employee_name
 * @property {string} employee_code
 */

/**
 * @typedef {Object} AttendanceCreate
 * @property {number} employee_id
 * @property {string} date
 * @property {AttendanceStatus} status
 * @property {string} [note]
 */

/**
 * @typedef {Object} AttendanceUpdate
 * @property {AttendanceStatus} status
 * @property {string} [note]
 */

// ─── Dashboard ────────────────────────────────────────────────────────────────

/**
 * @typedef {Object} DashboardStats
 * @property {number} total_employees
 * @property {number} total_departments
 * @property {number} present_today
 * @property {number} absent_today
 * @property {number} late_today
 * @property {number} attendance_rate_today
 * @property {number} attendance_this_week
 * @property {Employee[]} recent_employees
 */

// ─── API Error ────────────────────────────────────────────────────────────────

/**
 * @typedef {Object} ApiError
 * @property {string | Array<{msg: string; loc: string[]}>} detail
 */

export {};
