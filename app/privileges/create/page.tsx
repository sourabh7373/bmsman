"use client";

import { useState } from "react";
import { api } from "@/lib/api";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";
import PageHeader from "@/components/PageHeader";
import { ThemeBackground } from "@/components/ThemeBackground";
import { InputField } from "@/components/InputField";
import { useFormValidation } from "@/lib/useFormValidation";
import { organizationValidationSchema } from "@/lib/validationSchema";
import { handleApiError } from "@/lib/errorUtils";
import { ShieldCheck, Key, ArrowLeft, Save, Info } from "lucide-react";

export default function CreatePrivilege() {
  const router = useRouter();
  const { form, errors, handleChange, validateAll } = useFormValidation({
    privilegeName: "",
    privilegeType: "",
    domain: "",
    fieldName: "",
    accessMode: "READ",
  }, {
    privilegeName: organizationValidationSchema.privilegeName,
    privilegeType: organizationValidationSchema.privilegeType,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const createPrivilege = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const isValid = validateAll();
    if (!isValid) {
      return;
    }
    
    setError("");

    // Declare variables outside try so they're accessible in catch
    let privilegeCode = "";
    let domain = "DEFAULT";
    let fieldKey = "";
    let accessMode = "READ";

    try {
      setLoading(true);
      privilegeCode = form.privilegeName.toUpperCase().replace(/[^A-Z0-9\s]/g, '').replace(/\s+/g, '_');
      domain = "DEFAULT";
      fieldKey = privilegeCode;
      accessMode = "READ";
      
      if (form.privilegeType === "MENU") {
        if (!privilegeCode.startsWith("MENU_")) {
          privilegeCode = `MENU_${privilegeCode}`;
        }
        
        if (!/^MENU_[A-Z0-9]+(_[A-Z0-9]+)?$/.test(privilegeCode)) {
          setError("Invalid privilege code format for MENU type. Expected: MENU_DOMAIN or MENU_DOMAIN_ITEM");
          setLoading(false);
          return;
        }
      } else if (form.privilegeType === "FIELD") {
        domain = form.domain.trim().toUpperCase().replace(/[^A-Z0-9]/g, '');
        fieldKey = form.fieldName.trim().toUpperCase().replace(/[^A-Z0-9]/g, '');
        accessMode = form.accessMode.toUpperCase();
        
        if (!domain) {
          setError("Domain is required for FIELD privileges. Example: USER, CUSTOMER, ORDER");
          setLoading(false);
          return;
        }
        if (!fieldKey) {
          setError("Field name is required for FIELD privileges. Example: EMAIL, PHONE, ADDRESS");
          setLoading(false);
          return;
        }
        if (accessMode !== "READ" && accessMode !== "WRITE") {
          setError("Access mode for FIELD privileges must be READ or WRITE");
          setLoading(false);
          return;
        }
        
        privilegeCode = `FIELD_${domain}_${fieldKey}_${accessMode}_${Math.floor(Math.random() * 900 + 100)}`;
        
        // Validate the generated FIELD privilege code matches the backend-required pattern
        if (!/^FIELD_[A-Z0-9]+_[A-Z0-9]+_(READ|WRITE)_\d+$/.test(privilegeCode)) {
          setError("Generated privilege code does not match required format: FIELD_{DOMAIN}_{FIELD}_{READ|WRITE}_{RANDOM}. Example: FIELD_USER_EMAIL_READ_123");
          setLoading(false);
          return;
        }
      }

      const payload = {
        privilege: form.privilegeName,
        privilegeCode: privilegeCode,
        privilegeType: form.privilegeType,
        domain: domain,
        fieldKey: fieldKey,
        accessMode: accessMode,
        parentId: null,
        sortOrder: 1,
        platformOnly: false,
        systemManaged: false,
        active: true
      };
      console.log("Sending payload:", JSON.stringify(payload, null, 2));
      await api.post("/privileges", payload);
      
      router.push("/privileges");
    } catch (error: any) {
      console.error("Create privilege error:", {
        message: error.message,
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data,
        config: {
          url: error.config?.url,
          method: error.config?.method,
          data: error.config?.data,
        },
      });
      const handledError = handleApiError(error);
      const resData = error.response?.data;
      
      // Handle duplicate privilege code or unique constraint violations gracefully
      if (error.response?.status === 409 || (resData && JSON.stringify(resData).toLowerCase().includes("already exist"))) {
        setError(`Privilege code '${privilegeCode}' already exists. Please use a unique name or modify the field/domain.`);
      } else if (handledError.allErrors && handledError.allErrors.length > 0) {
        setError(`Validation failed:\n${handledError.allErrors.join("\n")}`);
      } else if (resData) {
        const rawMsg = typeof resData === 'string'
          ? resData
          : (resData.message || resData.error || JSON.stringify(resData, null, 2));
        setError(`Backend error: ${rawMsg}`);
      } else {
        setError(handledError.message);
      }
    } finally {
      setLoading(false);
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
                  <h1 className="text-2xl font-bold text-white tracking-tight">Create Privilege</h1>
                  <p className="text-white/70 text-sm mt-1">Define a new access control privilege for the system</p>
                </div>
              </div>
            </div>
          </div>

          {error && (
            <div className="p-4 bg-rose-50 dark:bg-rose-950/50 text-rose-600 dark:text-rose-400 rounded-2xl border border-rose-100 dark:border-rose-900/50 shadow-sm">
              {error.split("\n").map((line, i) => (
                <p key={i} className={i === 0 ? "font-semibold" : "text-sm mt-1"}>{line || "\u00A0"}</p>
              ))}
            </div>
          )}

          {/* Form Card */}
          <div className="rounded-3xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none p-8 transition-all duration-300">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100 dark:border-slate-800">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-md">
                <Key size={20} />
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-900 dark:text-white">Privilege Details</h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">Configure the name and type for this privilege</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputField
                label="Privilege Name"
                name="privilegeName"
                value={form.privilegeName}
                onChange={handleChange}
                placeholder="Enter privilege name"
                error={errors.privilegeName}
              />
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Privilege Type</label>
                <select
                  name="privilegeType"
                  value={form.privilegeType}
                  onChange={(e) => handleChange(e as any)}
                  className="w-full p-3 border border-slate-300 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-white dark:bg-slate-800 text-slate-900 dark:text-white transition-all"
                >
                  <option value="">Select Type</option>
                  <option value="MENU">MENU</option>
                  <option value="FIELD">FIELD</option>
                </select>
                {errors.privilegeType && <p className="text-sm text-rose-600 dark:text-rose-400">{errors.privilegeType}</p>}
              </div>

              {/* FIELD-specific fields — shown only when FIELD type is selected */}
              {form.privilegeType === "FIELD" && (
                <>
                  <InputField
                    label="Domain"
                    name="domain"
                    value={form.domain}
                    onChange={handleChange}
                    placeholder="e.g. USER, CUSTOMER, ORDER"
                    error={errors.domain}
                  />
                  <InputField
                    label="Field Name"
                    name="fieldName"
                    value={form.fieldName}
                    onChange={handleChange}
                    placeholder="e.g. EMAIL, PHONE, ADDRESS"
                    error={errors.fieldName}
                  />
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Access Mode</label>
                    <select
                      name="accessMode"
                      value={form.accessMode}
                      onChange={(e) => handleChange(e as any)}
                      className="w-full p-3 border border-slate-300 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-white dark:bg-slate-800 text-slate-900 dark:text-white transition-all"
                    >
                      <option value="READ">READ</option>
                      <option value="WRITE">WRITE</option>
                    </select>
                    {errors.accessMode && <p className="text-sm text-rose-600 dark:text-rose-400">{errors.accessMode}</p>}
                  </div>
                  <div className="md:col-span-2 flex items-start gap-2 p-3 bg-indigo-50 dark:bg-indigo-950/40 rounded-xl border border-indigo-100 dark:border-indigo-900/50">
                    <Info size={18} className="text-indigo-500 mt-0.5 shrink-0" />
                    <p className="text-xs text-indigo-700 dark:text-indigo-300">
                      Generated privilege code format: <code className="font-mono font-semibold">FIELD_{"{DOMAIN}"}_{"{FIELD}"}_{"{READ|WRITE}"}_{"{UNIQUE_SUFFIX}"}</code>
                      <br />
                      Example: <code className="font-mono font-semibold">FIELD_USER_EMAIL_READ_123</code>
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Submit */}
          <div className="flex justify-end gap-4">
            <button
              onClick={() => router.back()}
              className="px-6 py-3 rounded-xl font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all border border-slate-200 dark:border-slate-800"
            >
              Cancel
            </button>
            <button
              onClick={createPrivilege}
              disabled={loading}
              className="flex items-center gap-2 bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-700 text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg hover:shadow-indigo-500/25 transition-all disabled:opacity-50 active:scale-[0.99]"
            >
              <Save size={18} />
              {loading ? "Creating..." : "Create Privilege"}
            </button>
          </div>
        </main>
      </div>
    </ThemeBackground>
  );
}
