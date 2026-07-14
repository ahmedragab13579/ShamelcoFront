import { CreditCard, Clock, Wallet, Banknote, Loader2 } from "lucide-react";
import type { PaymentMethod } from "../../../BackEndIntegration/Types/Enums/AppEnums";
import { SharedInput } from "../Common/SharedInput";
import { useLanguage } from "../../Hooks/Shared/useLanguage";

interface BookingFooterProps {
  finalTotal: number;
  isSubmitDisabled: boolean;
  isLoading: boolean;
  paymentMethod: PaymentMethod;
  setPaymentMethod: (method: PaymentMethod) => void;
  walletNumber?: string;
  setWalletNumber: (val: string) => void;
  onSubmit: () => void;
}

export const BookingFooter = ({ 
  finalTotal, 
  isSubmitDisabled, 
  isLoading, 
  paymentMethod, 
  setPaymentMethod,
  walletNumber,
  setWalletNumber,
  onSubmit 
}: BookingFooterProps) => {
  const { t } = useLanguage();

  const methods = [
    { id: 'Card', label: t('messages.CARD'), icon: CreditCard },
    { id: 'MobileWallet', label: t('messages.MOBILE_WALLET'), icon: Wallet },
    { id: 'Cash', label: t('messages.CASH'), icon: Banknote },
  ] as const;

  return (
    <div className="fixed bottom-0 start-0 end-0 bg-shamelco-surface border-t border-shamelco-border shadow-[0_-4px_16px_rgba(0,0,0,0.08)] z-40 transition-colors duration-200 md:sticky md:bottom-0 md:mt-8 md:rounded-t-lg md:border-s md:border-e">
      <div className="max-w-2xl mx-auto p-4 sm:p-6 flex flex-col gap-4">
        
        {/* أزرار اختيار طريقة الدفع */}
        <div className="grid grid-cols-3 gap-2">
          {methods.map((method) => (
            <button 
              key={method.id}
              onClick={() => setPaymentMethod(method.id as PaymentMethod)}
              className={`py-3 flex flex-col sm:flex-row items-center justify-center gap-2 rounded-md border text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer ${
                paymentMethod === method.id 
                  ? 'bg-shamelco-gold text-shamelco-darker border-shamelco-gold shadow-gold' 
                  : 'bg-shamelco-bg border-shamelco-border text-shamelco-muted hover:border-shamelco-gold/50'
              }`}
            >
              <method.icon className="w-4 h-4" />
              {method.label}
            </button>
          ))}
        </div>

        {/* حقل إدخال رقم المحفظة */}
        {paymentMethod === 'MobileWallet' && (
          <div className="animate-in fade-in slide-in-from-top-2 duration-300">
            <SharedInput
              label={t('messages.MOBILE_WALLET_NUMBER')}
              type="tel"
              placeholder={t('messages.MOBILE_WALLET_NUMBER_PLACEHOLDER') || "01x xxx xxxx"}
              value={walletNumber}
              onChange={(e) => setWalletNumber(e.target.value)}
            />
          </div>
        )}

        {/* الإجمالي وزر التأكيد */}
        <div className="flex items-center justify-between mt-2">
          <div className="text-start">
            <div className="text-xs font-bold text-shamelco-muted mb-0.5 uppercase tracking-wider">{t('messages.FINAL_TOTAL')}</div>
            <div className="font-black text-shamelco-darker text-xl sm:text-2xl">
              {finalTotal} <span className="text-sm font-bold text-shamelco-muted">{t('messages.CURRENCY')}</span>
            </div>
          </div>
          
          <button 
            disabled={isSubmitDisabled || isLoading}
            onClick={onSubmit}
            className={`flex items-center justify-center gap-2 font-black text-sm sm:text-base px-6 sm:px-8 py-3.5 rounded-md transition-all duration-200 active:scale-[0.98] disabled:cursor-not-allowed shadow-gold focus-visible:outline-shamelco-gold ${
              isSubmitDisabled || isLoading
                ? "bg-shamelco-border text-shamelco-muted cursor-not-allowed shadow-none" 
                : "bg-shamelco-gold hover:bg-shamelco-gold-hover text-shamelco-darker"
            }`}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin shrink-0" />
                <span>{t('messages.PROCESSING')}</span>
              </>
            ) : isSubmitDisabled ? (
              <>
                <Clock className="w-5 h-5 shrink-0" />
                <span>{t('messages.COMPLETE_DETAILS')}</span>
              </>
            ) : (
              <>
                <CreditCard className="w-5 h-5 shrink-0" />
                <span>{t('messages.CONFIRM_PAYMENT')}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};