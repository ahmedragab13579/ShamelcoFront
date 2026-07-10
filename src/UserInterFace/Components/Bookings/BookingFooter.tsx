import { CreditCard, Clock, Wallet, Banknote, Loader2 } from "lucide-react";
import type { PaymentMethod } from "../../../BackEndIntegration/Types/Enums/AppEnums";
import { SharedInput } from "../Common/SharedInput";

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
}: BookingFooterProps) => (
  <div className="fixed bottom-0 left-0 right-0 bg-shamelco-bg border-t border-shamelco-dark/10 shadow-[0_-10px_20px_-10px_rgba(0,0,0,0.1)] z-50 md:sticky md:bottom-0 md:mt-8 md:max-w-2xl md:mx-auto md:rounded-t-2xl md:border-l md:border-r">
    <div className="p-4 flex flex-col gap-4">
      
      {/* أزرار اختيار طريقة الدفع */}
      <div className="flex gap-2">
        <button 
          onClick={() => setPaymentMethod('Card')}
          className={`flex-1 py-2 px-3 flex items-center justify-center gap-2 rounded-xl border text-sm font-bold transition-all ${
            paymentMethod === 'Card' 
              ? 'bg-shamelco-darker text-shamelco-gold border-shamelco-darker' 
              : 'bg-white border-shamelco-dark/10 text-shamelco-dark hover:border-shamelco-accent'
          }`}
        >
          <CreditCard className="w-4 h-4" />
          بطاقة
        </button>
        <button 
          onClick={() => setPaymentMethod('MobileWallet')}
          className={`flex-1 py-2 px-3 flex items-center justify-center gap-2 rounded-xl border text-sm font-bold transition-all ${
            paymentMethod === 'MobileWallet' 
              ? 'bg-shamelco-darker text-shamelco-gold border-shamelco-darker' 
              : 'bg-white border-shamelco-dark/10 text-shamelco-dark hover:border-shamelco-accent'
          }`}
        >
          <Wallet className="w-4 h-4" />
          محفظة
        </button>
        <button 
          onClick={() => setPaymentMethod('Cash')}
          className={`flex-1 py-2 px-3 flex items-center justify-center gap-2 rounded-xl border text-sm font-bold transition-all ${
            paymentMethod === 'Cash' 
              ? 'bg-shamelco-darker text-shamelco-gold border-shamelco-darker' 
              : 'bg-white border-shamelco-dark/10 text-shamelco-dark hover:border-shamelco-accent'
          }`}
        >
          <Banknote className="w-4 h-4" />
          كاش
        </button>
      </div>

      {/* حقل إدخال رقم المحفظة يظهر فقط عند اختيار MobileWallet */}
      {paymentMethod === 'MobileWallet' && (
        <div className="animate-in fade-in slide-in-from-top-2 duration-300">
          <SharedInput
            label="رقم المحفظة (فودافون كاش، اتصالات، إلخ...)"
            type="tel"
            placeholder="أدخل رقم الموبايل (مثال: 010...)"
            value={walletNumber}
            onChange={(e) => setWalletNumber(e.target.value)}
          />
        </div>
      )}

      {/* الإجمالي وزر التأكيد */}
      <div className="flex items-center justify-between mt-2">
        <div>
          <div className="text-xs text-shamelco-dark/70 mb-0.5">الإجمالي النهائي</div>
          <div className="font-black text-shamelco-darker text-xl">
            {finalTotal} <span className="text-sm font-normal text-shamelco-dark/70">ج.م</span>
          </div>
        </div>
        
        <button 
          disabled={isSubmitDisabled || isLoading}
          onClick={onSubmit}
          className={`flex items-center gap-2 font-bold text-lg px-8 py-3 rounded-xl shadow-md transition-all active:scale-95 disabled:cursor-not-allowed ${
            isSubmitDisabled || isLoading
              ? "bg-shamelco-dark/10 text-shamelco-dark/40 shadow-none" 
              : "bg-shamelco-gold hover:bg-shamelco-gold/90 text-shamelco-darker"
          }`}
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              جاري التنفيذ...
            </>
          ) : isSubmitDisabled ? (
            <>
              <Clock className="w-5 h-5" />
              أكمل البيانات
            </>
          ) : (
            <>
              <CreditCard className="w-5 h-5" />
              تأكيد الدفع
            </>
          )}
        </button>
      </div>
    </div>
  </div>
);