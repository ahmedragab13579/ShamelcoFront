import { z } from "zod";

export const setupPitchSchema = z.object({
  Name: z
    .string()
    .min(3, { message: "الاسم يجب أن يكون 3 أحرف على الأقل" })
    .max(50, { message: "الاسم يجب ألا يتجاوز 50 حرفاً" }),
  Type: z
    .string()
    .min(1, { message: "الرجاء اختيار نوع الملعب" }),
  HourlyRate: z
    .number({ error: "يجب إدخال رقم صحيح" })
    .min(10, { message: "سعر الساعة يجب أن يكون أكبر من 10" }),
  Capacity: z
    .number({ error: "يجب إدخال رقم صحيح" })
    .min(5, { message: "السعة يجب أن تكون أكبر من 5" }),
});

export const setupVenueSchema = z.object({
  Name: z
    .string()
    .min(3, { message: "الاسم يجب أن يكون 3 أحرف على الأقل" })
    .max(50, { message: "الاسم يجب ألا يتجاوز 50 حرفاً" }),
  hourRate: z
    .number()
    .min(1, { message: "السعر يجب أن يكون اكبر من 0" }),
  Type: z
    .string()
    .min(1, { message: "الرجاء اختيار نوع الصالة/الكافيه" }),
});

export type SetupPitchInput = z.infer<typeof setupPitchSchema>;
export type SetupVenueInput = z.infer<typeof setupVenueSchema>;