import { z } from "zod";

export const registerSchema = z.object({
  Name: z
    .string()
    .min(3, { message: "الاسم يجب أن يكون 3 أحرف على الأقل" })
    .max(50, { message: "الاسم يجب ألا يتجاوز 50 حرفاً" }),

  Email: z
    .string()
    .min(1, { message: "البريد الإلكتروني مطلوب" })
    .email({ message: "صيغة البريد الإلكتروني غير صحيحة" }),

  Password: z
    .string()
    .min(8, { message: "كلمة المرور يجب أن تكون 8 أحرف على الأقل" })
    .regex(/[a-z]/, { message: "يجب أن تحتوي على حرف صغير واحد على الأقل" })
    .regex(/[A-Z]/, { message: "يجب أن تحتوي على حرف كبير واحد على الأقل" })
    .regex(/[0-9]/, { message: "يجب أن تحتوي على رقم واحد على الأقل" }),

  UserType: z.string(),
});
export const loginSchema = z.object({
  Email: z
    .string()
    .min(1, { message: "البريد الإلكتروني مطلوب" })
    .email({ message: "صيغة البريد الإلكتروني غير صحيحة" }),

  Password: z
    .string()
    .min(8, { message: "كلمة المرور يجب أن تكون 8 أحرف على الأقل" })
    .regex(/[a-z]/, { message: "يجب أن تحتوي على حرف صغير واحد على الأقل" })
    .regex(/[A-Z]/, { message: "يجب أن تحتوي على حرف كبير واحد على الأقل" })
    .regex(/[0-9]/, { message: "يجب أن تحتوي على رقم واحد على الأقل" }),
});
export const forgetPasswordSchema = z.object({
  Email: z
    .string()
    .min(1, { message: "البريد الإلكتروني مطلوب" })
    .email({ message: "صيغة البريد الإلكتروني غير صحيحة" }),
});
export const resetPasswordSchema = z
  .object({
    Email: z
      .string()
      .min(1, { message: "البريد الإلكتروني مطلوب" })
      .email({ message: "صيغة البريد الإلكتروني غير صحيحة" }),

    Password: z
      .string()
      .min(8, { message: "كلمة المرور يجب أن تكون 8 أحرف على الأقل" })
      .regex(/[a-z]/, { message: "يجب أن تحتوي على حرف صغير واحد على الأقل" })
      .regex(/[A-Z]/, { message: "يجب أن تحتوي على حرف كبير واحد على الأقل" })
      .regex(/[0-9]/, { message: "يجب أن تحتوي على رقم واحد على الأقل" }),

    confirmPassword: z
      .string()
      .min(8, { message: "كلمة المرور يجب أن تكون 8 أحرف على الأقل" })
      .regex(/[a-z]/, { message: "يجب أن تحتوي على حرف صغير واحد على الأقل" })
      .regex(/[A-Z]/, { message: "يجب أن تحتوي على حرف كبير واحد على الأقل" })
      .regex(/[0-9]/, { message: "يجب أن تحتوي على رقم واحد على الأقل" }),
  })
  .refine((data) => data.Password === data.confirmPassword, {
    message: "كلمات المرور غير متطابقة",
    path: ["confirmPassword"],
  });

export const changePasswordSchema = z
  .object({
    CurrentPassword: z
      .string()
      .min(8, { message: "كلمة المرور يجب أن تكون 8 أحرف على الأقل" })
      .regex(/[a-z]/, { message: "يجب أن تحتوي على حرف صغير واحد على الأقل" })
      .regex(/[A-Z]/, { message: "يجب أن تحتوي على حرف كبير واحد على الأقل" })
      .regex(/[0-9]/, { message: "يجب أن تحتوي على رقم واحد على الأقل" }),

    NewPassword: z
      .string()
      .min(8, { message: "كلمة المرور يجب أن تكون 8 أحرف على الأقل" })
      .regex(/[a-z]/, { message: "يجب أن تحتوي على حرف صغير واحد على الأقل" })
      .regex(/[A-Z]/, { message: "يجب أن تحتوي على حرف كبير واحد على الأقل" })
      .regex(/[0-9]/, { message: "يجب أن تحتوي على رقم واحد على الأقل" }),

    ConfirmPassword: z
      .string()
      .min(8, { message: "كلمة المرور يجب أن تكون 8 أحرف على الأقل" })
      .regex(/[a-z]/, { message: "يجب أن تحتوي على حرف صغير واحد على الأقل" })
      .regex(/[A-Z]/, { message: "يجب أن تحتوي على حرف كبير واحد على الأقل" })
      .regex(/[0-9]/, { message: "يجب أن تحتوي على رقم واحد على الأقل" }),
  })
  .refine((data) => data.NewPassword === data.ConfirmPassword, {
    message: "كلمات المرور غير متطابقة",
    path: ["confirmPassword"],
  });

export type AuthFormInput = z.infer<typeof registerSchema>;
export type loginFormInput = z.infer<typeof loginSchema>;
export type forgetPasswordFormInput = z.infer<typeof forgetPasswordSchema>;
export type resetPasswordFormInput = z.infer<typeof resetPasswordSchema>;
export type changePasswordFormInput = z.infer<typeof changePasswordSchema>;
