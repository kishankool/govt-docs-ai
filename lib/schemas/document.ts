import { z } from "zod";

/**
 * Common fields shared across documents
 */
const baseDocumentSchema = {
  fullName: z.string().min(3, "Full name is required"),
  address: z.string().min(10, "Address is required"),
  email: z.string().email({ message: "Invalid email address" }).optional(),
  phone: z.string().length(10, { message: "Phone number must be 10 digits" }).optional(),
  departmentName: z.string().min(3, "Department name is required"),
};

/**
 * 1. Complaint Document
 */
export const complaintSchema = z.object({
  ...baseDocumentSchema,

  issueCategory: z.enum([
    "Service Delay",
    "Incorrect Information",
    "Harassment",
    "Financial Issue",
    "Other",
  ]),

  incidentDescription: z
    .string()
    .min(50, "Please describe the issue clearly"),

  incidentDate: z.string().min(4, "Incident date is required"),

  desiredResolution: z
    .string()
    .min(20, "Desired resolution is required"),

  wordLimit: z.number().min(100).max(500).default(300),
});

/**
 * 2. Representation / Application
 */
export const representationSchema = z.object({
  ...baseDocumentSchema,

  subject: z.string().min(10, "Subject is required"),

  applicationPurpose: z
    .string()
    .min(30, "Purpose must be clearly stated"),

  supportingDetails: z.string().optional(),

  wordLimit: z.number().min(150).max(600).default(350),
});

/**
 * 3. Explanation / Clarification
 */
export const explanationSchema = z.object({
  ...baseDocumentSchema,

  referenceNumber: z.string().optional(),

  explanationContext: z
    .string()
    .min(30, "Context of explanation is required"),

  explanationDetails: z
    .string()
    .min(50, "Explanation must be detailed"),

  assuranceStatement: z
    .string()
    .min(10, "Assurance statement is required"),

  wordLimit: z.number().min(150).max(500).default(300),
});

/**
 * Union for dynamic document handling
 */
export const documentSchemas = {
  complaint: complaintSchema,
  representation: representationSchema,
  explanation: explanationSchema,
};

/**
 * Types (auto-derived)
 */
export type ComplaintInput = z.infer<typeof complaintSchema>;
export type RepresentationInput = z.infer<typeof representationSchema>;
export type ExplanationInput = z.infer<typeof explanationSchema>;
