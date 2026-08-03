import { api } from "./api";

export interface PrivilegePayload {
  id?: number;
  privilege: string;
  privilegeCode: string;
  privilegeType: string;
  domain: string;
  fieldKey: string;
  accessMode: string;
  parentId: number | null;
  sortOrder: number;
  platformOnly: boolean;
  systemManaged: boolean;
  active: boolean;
}

export interface PrivilegeResponse {
  id: number;
  privilege: string;
  privilegeCode: string;
  privilegeType: string;
  domain: string;
  fieldKey: string;
  accessMode: string;
  parentId: number | null;
  sortOrder: number;
  platformOnly: boolean;
  systemManaged: boolean;
  active: boolean;
}

const privilegeService = {
  /**
   * Fetch all privileges
   * GET /privileges
   */
  getPrivileges: async (): Promise<PrivilegeResponse[]> => {
    const res = await api.get("/privileges");
    return Array.isArray(res.data) ? res.data : res.data?.data || [];
  },

  /**
   * Fetch a single privilege by ID
   * GET /privileges/{id}
   */
  getPrivilegeById: async (id: number | string): Promise<PrivilegeResponse> => {
    const res = await api.get(`/privileges/${id}`);
    return res.data?.data || res.data;
  },

  /**
   * Create a new privilege
   * POST /privileges
   */
  createPrivilege: async (privilegeData: PrivilegePayload): Promise<PrivilegeResponse> => {
    const res = await api.post("/privileges", privilegeData);
    return res.data?.data || res.data;
  },

  /**
   * Update an existing privilege
   * PUT /privileges/{id}
   */
  updatePrivilege: async (id: number | string, privilegeData: Partial<PrivilegePayload>): Promise<PrivilegeResponse> => {
    const res = await api.put(`/privileges/${id}`, privilegeData);
    return res.data?.data || res.data;
  },

  /**
   * Delete a privilege
   * DELETE /privileges/{id}
   */
  deletePrivilege: async (id: number | string): Promise<void> => {
    await api.delete(`/privileges/${id}`);
  },
};

export default privilegeService;