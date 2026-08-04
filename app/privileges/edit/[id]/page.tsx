"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import privilegeService from "@/lib/privilegeService";
import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";
import PageHeader from "@/components/PageHeader";
import { ThemeBackground } from "@/components/ThemeBackground";
import { InputField } from "@/components/InputField";
import { useFormValidation } from "@/lib/useFormValidation";
import { organizationValidationSchema } from "@/lib/validationSchema";
import { handleApiError } from "@/lib/errorUtils";
import { ShieldCheck, Key, ArrowLeft, Save } from "lucide-react";

export default function EditPrivilege() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const { form, setForm, errors, handleChange, validateAll } = useFormValidation({
    privilegeName: "",
    privilegeType: "",
  }, {
    privilegeName: organizationValidationSchema.privilegeName,
    privilegeType: organizationValidationSchema.privilegeType,
  });

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [privilege, setPrivilege] = useState<any>(null);

  useEffect(() => {
    const loadPrivilege = async () => {
      try {
        setLoading(true);
        console.log(`Loading privilege ${id} from list (GET /privileges)`);
        // The backend does not expose GET /privileges/{id}.
        // Load the supported list endpoint and resolve the privilege by ID.
        const privileges = await privilegeService.getPrivileges();
        const privilegeData = privileges.find((p: any) => String(p.id) === String(id));

        console.log("Privilege found:", privilegeData);

        if (!privilegeData || !privilegeData.id) {
          setError("Invalid privilege record");
          return;
        }

        setPrivilege(privilegeData);
        setForm({
          privilegeName: privilegeData.privilege ?? "",
          privilegeType: privilegeData.privilegeType ?? "",
        });
      } catch (err: any) {
        console.error("Error loading privilege:", err);
        if (err.response) {
          console.error("Error response data:", err.response.data);
          console.error("Error response status:", err.response.status);
        }
        const errorMessage = err.response?.data?.message || err.message || "Failed to load privilege details";
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };
    loadPrivilege();
  }, [id, setForm]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (privilege?.systemManaged) {
      setError("System-managed privileges cannot be modified.");
      return;
    }

    if (!validateAll()) return;
    
    setError("");
    setSaving(true);
    
    try {
      // Build the full payload matching Swagger schema.
      // privilegeType is editable and the selected form value is sent to the backend.
      const payload = {
        id: privilege.id,
        privilege: form.privilegeName,
        privilegeCode: privilege.privilegeCode,
        privilegeType: form.privilegeType,
        domain: privilege.domain || "DEFAULT",
        fieldKey: privilege.fieldKey || form.privilegeName.toUpperCase().replace(/[^A-Z0-9\s]/g, '').replace(/\s+/g, '_'),
        accessMode: privilege.accessMode || "READ",
        parentId: privilege.parentId ?? null,
        sortOrder: privilege.sortOrder ?? 1,
        platformOnly: privilege.platformOnly ?? false,
        systemManaged: privilege.systemManaged ?? false,
        active: privilege.active ?? true,
      };

      console.log("Updating privilege:", id, payload);
      console.log("Sending PUT request to:", `/privileges/${id}`);
      console.log("Request body:", JSON.stringify(payload, null, 2));
      
      await privilegeService.updatePrivilege(id, payload);
      
      console.log("Privilege updated successfully");
      alert("Privilege Updated Successfully");
      router.push("/privileges");
    } catch (error: any) {
      console.error("Error updating privilege:", {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data,
        stack: error.stack,
      });

      const status = error.response?.status;

      // Handle 409 Conflict - show backend conflict message
      if (status === 409) {
        const conflictMessage = error.response?.data?.message
          || error.response?.data?.businessErrorDescription
          || "Privilege conflict detected. The record may have been modified by another user.";
        setError(conflictMessage);
        setSaving(false);
        return;
      }

      // Handle 405 Method Not Allowed - log and prevent fallback to POST
      if (status === 405) {
        console.error("METHOD NOT ALLOWED (405): The API does not support PUT on /privileges/{id}. Check backend endpoint configuration.");
        setError("Update failed: The server does not support this update method. Please contact the administrator.");
        setSaving(false);
        return;
      }

      const handledError = handleApiError(error);
      setError(handledError.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <ThemeBackground type="forms" className="min-h-screen w-full">
      <Sidebar />
      <div className="lg:pl-64 flex flex-col w-full">
        <Topbar />
        <main className="p-4 lg:p-6 w-full space-y-6">
          {/* Header Section */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-700 p-8 shadow-xl">
            <div className="absolute -right-12 -top-12 h-64 w-64 rounded-full bg-white/10 blur-2xl" />
            <div className="absolute -left-12 -bottom-12 h-64 w-64 rounded-full bg-black/10 blur-2xl" />
            <div className="relative z-10 flex items-start gap-4">
              <button onClick={() => router.back()} className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition-all">
                <ArrowLeft size={20} />
              </button>
              <div className="flex items-start gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-inner">
                  <ShieldCheck className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-white tracking-tight">Edit Privilege</h1>
                  <p className="text-white/70 text-sm mt-1">Modify the access control privilege settings</p>
                </div>
              </div>
            </div>
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center p-16 text-center rounded-3xl bg-white/50 dark:bg-slate-900/50 backdrop-blur-md border border-slate-200/60 dark:border-slate-800/60 shadow-lg">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 mb-4 shadow-inner">
                <ShieldCheck size={32} className="animate-pulse" />
              </div>
              <p className="text-slate-500 dark:text-slate-400 font-medium">Loading privilege data...</p>
            </div>
          ) : (
            <>
              {error && (
                <div className="p-4 bg-rose-50 dark:bg-rose-950/50 text-rose-600 dark:text-rose-400 rounded-2xl border border-rose-100 dark:border-rose-900/50 shadow-sm">
                  <p className="font-semibold">{error}</p>
                </div>
              )}

              {/* Form Card */}
              <form
                id="edit-privilege-form"
                onSubmit={handleSubmit}
                className="rounded-3xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none p-8 transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100 dark:border-slate-800">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-md">
                    <Key size={20} />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-slate-900 dark:text-white">Privilege Details</h2>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Update the name and type for this privilege</p>
                  </div>
                </div>
                {privilege?.systemManaged && (
                  <div className="mb-6 p-4 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/50 rounded-2xl text-amber-800 dark:text-amber-300 text-sm font-medium">
                    System-managed privileges cannot be modified. All fields are disabled.
                  </div>
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <InputField
                    label="Privilege Name"
                    name="privilegeName"
                    value={form.privilegeName}
                    onChange={handleChange}
                    placeholder="Enter privilege name"
                    error={errors.privilegeName}
                    disabled={privilege?.systemManaged}
                  />
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Privilege Type</label>
                    <select
                      name="privilegeType"
                      value={form.privilegeType}
                      onChange={(e) => handleChange(e as any)}
                      disabled={privilege?.systemManaged}
                      className="w-full p-3 border border-slate-300 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-white dark:bg-slate-800 text-slate-900 dark:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <option value="">Select Type</option>
                      <option value="MENU">MENU</option>
                      <option value="FIELD">FIELD</option>
                    </select>
                    {errors.privilegeType && <p className="text-sm text-rose-600 dark:text-rose-400">{errors.privilegeType}</p>}
                  </div>
                </div>
              </form>

              {/* Submit */}
              <div className="flex justify-end gap-4">
                <button
                  onClick={() => router.back()}
                  className="px-6 py-3 rounded-xl font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all border border-slate-200 dark:border-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  form="edit-privilege-form"
                  disabled={saving || privilege?.systemManaged}
                  className="flex items-center gap-2 bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-700 text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg hover:shadow-indigo-500/25 transition-all disabled:opacity-50 active:scale-[0.99] disabled:cursor-not-allowed"
                >
                  <Save size={18} />
                  {saving ? "Updating..." : "Update Privilege"}
                </button>
              </div>
            </>
          )}
        </main>
      </div>
    </ThemeBackground>
  );
}
