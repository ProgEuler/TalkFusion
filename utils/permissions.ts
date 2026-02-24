// Permission mapping based on backend PERMISSIONS_MATRIX
// Maps backend permission keys to frontend feature names

export type UserRole = 'owner' | 'finance' | 'support' | 'analyst' | 'read_only';

// Backend permission matrix structure
export const PERMISSIONS_MATRIX = {
  owner: {
    view_dashboard: true,
    manage_users: true,
    financial_data: true,
    customer_support: false,
    billing_invoices: true,
    analytics_reports: false,
    system_settings: true,
    api_management: true,
  },
  finance: {
    view_dashboard: true,
    manage_users: false,
    financial_data: true,
    customer_support: false,
    billing_invoices: true,
    analytics_reports: false,
    system_settings: true,
    api_management: false,
  },
  support: {
    view_dashboard: true,
    manage_users: false,
    financial_data: false,
    customer_support: true,
    billing_invoices: true,
    analytics_reports: false,
    system_settings: true,
    api_management: true,
  },
  analyst: {
    view_dashboard: true,
    manage_users: false,
    financial_data: true,
    customer_support: false,
    billing_invoices: false,
    analytics_reports: true,
    system_settings: true,
    api_management: false,
  },
  read_only: {
    view_dashboard: true,
    manage_users: false,
    financial_data: true,
    customer_support: false,
    billing_invoices: true,
    analytics_reports: true,
    system_settings: true,
    api_management: false,
  },
};

/**
 * Get allowed permissions for a user based on their role/permissions array
 * Returns array of permission keys that the user has access to
 */
export function getUserPermissions(user: any): string[] {
  // If user has explicit permissions array from backend, use that
  if (Array.isArray(user?.permissions) && user.permissions.length > 0) {
    // Backend sends role names like ['finance'], ['support'], etc.
    const role = user.permissions[0]?.toLowerCase();

    if (role && PERMISSIONS_MATRIX[role as UserRole]) {
      const matrix = PERMISSIONS_MATRIX[role as UserRole];
      // Return all permission keys where value is true
      return Object.keys(matrix).filter(key => matrix[key as keyof typeof matrix]);
    }
  }

  // Default: return empty array (will show all items for backward compatibility)
  return [];
}
