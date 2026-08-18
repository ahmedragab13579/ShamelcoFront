import { useSearchParams, useNavigate, useLocation } from "react-router-dom";
import { CheckCircle2, XCircle, AlertTriangle, RefreshCw, Home } from "lucide-react";
import { useLanguage } from "../../Hooks/Shared/useLanguage";

export type PaymentStatusType = 
  | "PAYMENT_SUCCESS"
  | "PAYMENT_ERROR"
  | "PAYMENT_REFUSED"
  | "REFUND_SUCCESS"
  | "REFUND_FAILED";

interface PaymentResultState {
  status?: PaymentStatusType;
  title?: string;
  message?: string;
  orderId?: string;
  amountCents?: number | string;
  currency?: string;
  transactionId?: string;
}

export default function PaymentResultPage() {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useLanguage();

  const state = (location.state as PaymentResultState) || {};

  // Extract query parameters typically sent by Paymob / Gateway callbacks
  const rawSuccess = searchParams.get("success");
  const rawError = searchParams.get("error_occured");
  const rawIsRefund = searchParams.get("is_refund") || searchParams.get("is_refunded");
  const rawTxnResponseCode = searchParams.get("txn_response_code");
  const rawPending = searchParams.get("pending");

  const orderId = state.orderId || searchParams.get("merchant_order_id") || searchParams.get("order");
  const transactionId = state.transactionId || searchParams.get("id");
  const amountCents = state.amountCents || searchParams.get("amount_cents");
  const currency = state.currency || searchParams.get("currency") || "EGP";

  // Determine status type
  let computedStatus: PaymentStatusType = state.status || "PAYMENT_ERROR";

  if (!state.status) {
    const isSuccess = rawSuccess === "true";
    const isError = rawError === "true";
    const isRefund = rawIsRefund === "true";
    const isPending = rawPending === "true";

    if (isRefund) {
      if (isSuccess && !isError) {
        computedStatus = "REFUND_SUCCESS";
      } else {
        computedStatus = "REFUND_FAILED";
      }
    } else {
      if (isError) {
        computedStatus = "PAYMENT_ERROR";
      } else if (isSuccess && !isPending) {
        computedStatus = "PAYMENT_SUCCESS";
      } else if (!isSuccess && !isPending) {
        if (rawTxnResponseCode || rawSuccess === "false") {
          computedStatus = "PAYMENT_REFUSED";
        } else {
          computedStatus = "PAYMENT_ERROR";
        }
      } else if (isPending) {
        computedStatus = "PAYMENT_ERROR";
      }
    }
  }

  // Define details for each case
  const getStatusConfig = (status: PaymentStatusType) => {
    switch (status) {
      case "PAYMENT_SUCCESS":
        return {
          icon: <CheckCircle2 className="w-20 h-20 text-emerald-500 animate-bounce" />,
          bgColor: "bg-emerald-50 text-emerald-900 border-emerald-200",
          badgeColor: "bg-emerald-100 text-emerald-800",
          title: state.title || t("messages.PAYMENT_SUCCESS_TITLE") || "Payment Successful! 🎉",
          message: state.message || t("messages.PAYMENT_SUCCESS_MSG") || "Your payment was processed successfully. Thank you for your booking!",
          primaryActionText: t("messages.GO_TO_BOOKINGS") || "Go to My Bookings",
          primaryActionUrl: "/profile",
        };
      case "PAYMENT_REFUSED":
        return {
          icon: <AlertTriangle className="w-20 h-20 text-amber-500 animate-pulse" />,
          bgColor: "bg-amber-50 text-amber-900 border-amber-200",
          badgeColor: "bg-amber-100 text-amber-800",
          title: state.title || t("messages.PAYMENT_REFUSED_TITLE") || "Payment Refused ⚠️",
          message: state.message || t("messages.PAYMENT_REFUSED_MSG") || "Your card or payment method was declined by the issuer. Please try another card or check your balance.",
          primaryActionText: t("messages.TRY_AGAIN") || "Try Again",
          primaryActionUrl: -1,
        };
      case "REFUND_SUCCESS":
        return {
          icon: <RefreshCw className="w-20 h-20 text-blue-500" />,
          bgColor: "bg-blue-50 text-blue-900 border-blue-200",
          badgeColor: "bg-blue-100 text-blue-800",
          title: state.title || t("messages.REFUND_SUCCESS_TITLE") || "Refund Processed Successfully 💸",
          message: state.message || t("messages.REFUND_SUCCESS_MSG") || "The refund has been successfully initiated and will reflect in your account according to your bank's policy.",
          primaryActionText: t("messages.BACK_TO_HOME") || "Back to Home",
          primaryActionUrl: "/home",
        };
      case "REFUND_FAILED":
        return {
          icon: <XCircle className="w-20 h-20 text-rose-500 animate-pulse" />,
          bgColor: "bg-rose-50 text-rose-900 border-rose-200",
          badgeColor: "bg-rose-100 text-rose-800",
          title: state.title || t("messages.REFUND_FAILED_TITLE") || "Refund Request Failed ❌",
          message: state.message || t("messages.REFUND_FAILED_MSG") || "We couldn't complete the refund process at this moment. Please contact support.",
          primaryActionText: t("messages.CONTACT_SUPPORT") || "Contact Support",
          primaryActionUrl: "/profile",
        };
      case "PAYMENT_ERROR":
      default:
        return {
          icon: <XCircle className="w-20 h-20 text-red-500" />,
          bgColor: "bg-red-50 text-red-900 border-red-200",
          badgeColor: "bg-red-100 text-red-800",
          title: state.title || t("messages.PAYMENT_ERROR_TITLE") || "Payment Failed ❌",
          message: state.message || t("messages.PAYMENT_ERROR_MSG") || "An unexpected error occurred during the transaction. Please check your connection and try again.",
          primaryActionText: t("messages.TRY_AGAIN") || "Try Again",
          primaryActionUrl: -1,
        };
    }
  };

  const config = getStatusConfig(computedStatus);

  const formattedAmount = amountCents 
    ? (Number(amountCents) / 100).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
    : null;

  const handlePrimaryAction = () => {
    if (typeof config.primaryActionUrl === "number") {
      navigate(config.primaryActionUrl);
    } else {
      navigate(config.primaryActionUrl, { replace: true });
    }
  };

  return (
    <div className="min-h-screen bg-shamelco-bg flex items-center justify-center p-4 antialiased">
      <div className="bg-white p-8 md:p-12 rounded-3xl shadow-2xl shadow-shamelco-dark/10 max-w-lg w-full text-center border border-shamelco-dark/5 flex flex-col items-center">
        {/* Status Icon */}
        <div className="relative mb-6 flex items-center justify-center">
          {config.icon}
        </div>

        {/* Title */}
        <h1 className="text-2xl md:text-3xl font-extrabold text-shamelco-darker mb-3 tracking-tight">
          {config.title}
        </h1>

        {/* Description Message */}
        <p className="text-base text-shamelco-accent/80 mb-6 leading-relaxed font-medium">
          {config.message}
        </p>

        {/* Optional Details Card */}
        {(orderId || transactionId || formattedAmount) && (
          <div className="w-full bg-slate-50 border border-slate-200/80 rounded-2xl p-4 mb-8 text-sm flex flex-col gap-2">
            {orderId && (
              <div className="flex justify-between items-center text-slate-600">
                <span>{t("messages.ORDER_ID") || "Order Ref:"}</span>
                <span className="font-semibold text-slate-900">{orderId}</span>
              </div>
            )}
            {transactionId && (
              <div className="flex justify-between items-center text-slate-600">
                <span>{t("messages.TRANSACTION_ID") || "Transaction ID:"}</span>
                <span className="font-semibold text-slate-900">{transactionId}</span>
              </div>
            )}
            {formattedAmount && (
              <div className="flex justify-between items-center text-slate-600 pt-2 border-t border-slate-200">
                <span>{t("messages.AMOUNT") || "Amount:"}</span>
                <span className="font-bold text-emerald-600 text-base">
                  {formattedAmount} {currency}
                </span>
              </div>
            )}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 w-full">
          <button
            onClick={handlePrimaryAction}
            className="flex-1 bg-shamelco-gold text-shamelco-darker font-bold text-base px-6 py-3.5 rounded-xl shadow-md hover:bg-shamelco-gold/90 transition-all duration-200 flex items-center justify-center gap-2"
          >
            {config.primaryActionText}
          </button>
          
          <button
            onClick={() => navigate("/home", { replace: true })}
            className="bg-slate-100 text-slate-700 font-semibold text-base px-5 py-3.5 rounded-xl hover:bg-slate-200 transition-all duration-200 flex items-center justify-center gap-2"
          >
            <Home className="w-4 h-4" />
            {t("messages.HOME") || "Home"}
          </button>
        </div>
      </div>
    </div>
  );
}
