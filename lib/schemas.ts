import { z } from "zod";

export const jobFormSchema = z
  .object({
    jobTitle: z.string().min(1, "Job title is required."),
    jobDescription: z
      .string()
      .min(10, "Job description must be at least 10 characters."),
    role: z.enum(
      [
        "Design",
        "Engineering",
        "Marketing",
        "Operations",
        "Support",
        "Sales",
        "Other",
      ],
      {
        required_error: "Please select a role",
      }
    ),
    partTime: z.boolean().default(false).optional(),
    fullTime: z.boolean().default(false).optional(),
    freelance: z.boolean().default(false).optional(),
    internship: z.boolean().default(false).optional(),
    jobLocation: z.enum(["remote", "onsite", "hybrid"], {
      required_error: "Please select a job location",
    }),
    locationDetails: z.string().optional(),
    remoteOption: z.enum(["global", "geographic", "timezone"]).optional(),
    geographicRestrictions: z.string().optional(),
    timezoneRestrictions: z.string().optional(),
    keywords: z.string().min(1, "Keywords are required."),
    salaryCurrency: z.enum(["USD", "EUR", "GBP"], {
      required_error: "Please select a salary currency",
    }),
    minSalary: z
      .string({
        required_error: "Please provide a minimum salary",
      })
      .regex(/^\d+$/, { message: "This number must be a positive number" }),
    maxSalary: z
      .string({
        required_error: "Please provide a maximum salary",
      })
      .regex(/^\d+$/, { message: "This number must be a positive number" }),
    minEquity: z
      .string({
        required_error: "Please provide a minimum equity",
      })
      .regex(
        /^\d+(\.\d{1,2})?$/,
        "Minimum equity must be a percentage (e.g., 0.5)."
      ),
    maxEquity: z
      .string({
        required_error: "Please provide a maximum equity",
      })
      .regex(
        /^\d+(\.\d{1,2})?$/,
        "Maximum equity must be a percentage (e.g., 2.5)."
      ),
    paymentMethod: z.enum(["Cash", "Cryptocurrency", "Cash/Crypto"], {
      required_error: "Please select a payment type",
    }),
    applyMethod: z.enum(["website", "email"]),
    applyWebsite: z
      .string()
      .optional()
      .refine((val) => val === "" || z.string().url().safeParse(val).success, {
        message: "Please enter a valid url",
      }),
    applyEmail: z
      .string()
      .optional()
      .refine(
        (val) => val === "" || z.string().email().safeParse(val).success,
        {
          message: "Please enter a valid email address",
        }
      ),
  })
  .refine(
    (data) => {
      if (data.jobLocation === "onsite") {
        return !!data.locationDetails;
      }
      return true;
    },
    {
      message: "Location details are required for onsite or hybrid jobs.",
      path: ["locationDetails"],
    }
  )
  .refine(
    (data) => {
      if (data.jobLocation === "remote") {
        return !!data.remoteOption;
      }
      return true;
    },
    {
      message: "Please select remote options",
      path: ["remoteOption"],
    }
  )
  .refine(
    (data) => {
      if (data.jobLocation === "hybrid") {
        return !!data.locationDetails && !!data.remoteOption;
      }
      return true;
    },
    {
      message: "Please define location details",
      path: ["locationDetails"],
    }
  )
  .refine(
    (data) => {
      if (data.remoteOption === "geographic") {
        return !!data.geographicRestrictions;
      }
      return true;
    },
    {
      message: "Please define geographic restrictions",
      path: ["geographicRestrictions"],
    }
  )
  .refine(
    (data) => {
      if (data.remoteOption === "timezone") {
        return !!data.timezoneRestrictions;
      }
      return true;
    },
    {
      message: "Please define timezone restrictions",
      path: ["timezoneRestrictions"],
    }
  )
  .refine((data) => Number(data.maxSalary) > Number(data.minSalary), {
    message: "Maximum salary should be more than minimum salary",
    path: ["maxSalary"],
  })
  .refine((data) => Number(data.maxEquity) > Number(data.minEquity), {
    message: "Maximum equity should be more than minimum equity",
    path: ["maxEquity"],
  })
  .refine(
    (data) =>
      data.partTime || data.fullTime || data.freelance || data.internship,
    {
      message: "Please select at least one type of position",
      path: ["fullTime"],
    }
  )
  .refine(
    (data) => {
      if (data.applyMethod === "website") {
        return !!data.applyWebsite;
      }
      return true;
    },
    {
      message: "Please define application website",
      path: ["applyWebsite"],
    }
  )
  .refine(
    (data) => {
      if (data.applyMethod === "email") {
        return !!data.applyEmail;
      }
      return true;
    },
    {
      message: "Please define application email address",
      path: ["applyEmail"],
    }
  );

export const companyFormSchema = z.object({
  companyName: z.string().min(1, "Company name is required."),
  companyDescription: z.string().min(10, "Company description is required."),
  companyLogo: z
    .instanceof(File)
    .nullable()
    .refine(
      (file) =>
        !file ||
        ["image/jpeg", "image/jpg", "image/png", "image/webp"].includes(
          file.type
        ),
      {
        message:
          "Your company logo needs to be in jpg, jpeg, png, or webp format",
      }
    ),
  companyWebsite: z
    .string()
    .optional()
    .refine((val) => val === "" || z.string().url().safeParse(val).success, {
      message: "Please enter a valid website url",
    }),
  companyTwitter: z
    .string()
    .optional()
    .refine((val) => val === "" || z.string().url().safeParse(val).success, {
      message: "Please enter a valid X url",
    }),
  companyDiscord: z
    .string()
    .optional()
    .refine((val) => val === "" || z.string().url().safeParse(val).success, {
      message: "Please enter a valid discord url",
    }),
  companyEmail: z
    .string()
    .optional()
    .refine((val) => val === "" || z.string().email().safeParse(val).success, {
      message: "Please enter a valid email address",
    }),
});

export const paymentFormSchema = z.object({
  jobPkg: z.enum(["pkg-1", "pkg-2"], {
    required_error: "You must select a job package",
  }),
  paymentCurrency: z.enum(["usd", "eur", "gbp"], {
    required_error: "You must select a payment currency",
  }),
});
