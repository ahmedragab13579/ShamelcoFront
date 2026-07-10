import { useNavigate, useParams } from "react-router-dom";
import { useGetVenue } from "../../../BackEndIntegration/Hooks/Queries/useVenueQueries";
import asGUID from "../../../BackEndIntegration/Types/shared/Guid";
import Loading from "../../Components/Common/Loading";
import Error from "../../Components/Common/Error";
import type { VenueDto } from "../../../BackEndIntegration/Types/Venues/Response";
import Cafe from "../../Images/Cafe.jpg";
import Billiard from "../../Images/Billiard.jpg";
import type { VenueType } from "../../../BackEndIntegration/Types/Enums/AppEnums";

const VenueHero = ({ mainImage, name, rating, type }: { mainImage: string, name: string, rating: number, type: VenueType }) => {
  const navigate = useNavigate();
  
  const hasValidApiImage = mainImage && mainImage !== "N/A" && mainImage.trim() !== "";
  
  let fallbackImage = Billiard; 
  if (type) {
    if (type==="Cafe") fallbackImage = Cafe;
    else if (type==="Billiard") fallbackImage = Billiard;
  }

  const imageSrc = hasValidApiImage ? mainImage : fallbackImage;

  return (
    <div className="relative w-full h-64 md:h-80 bg-shamelco-darker">
      <img 
        src={imageSrc} 
        alt={name} 
        className="w-full h-full object-cover opacity-90"
        onError={(e) => {
          e.currentTarget.src = fallbackImage;
        }}
      />
      
      <button 
        onClick={() => navigate(-1)} 
        className="absolute top-4 right-4 bg-white/20 backdrop-blur-md p-2 rounded-full text-white hover:bg-white/40 transition-colors"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
      
      <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-xl shadow-lg flex items-center gap-1.5">
        <span className="text-sm font-black text-shamelco-darker">{rating}</span>
        <svg className="w-4 h-4 text-shamelco-gold" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      </div>
    </div>
  );
};

const VenueMainInfo = ({ name, type, address, activeTablesNumber }: { name: string, type: VenueType, address: string, activeTablesNumber: number }) => (
  <div className="bg-white rounded-2xl shadow-sm border border-shamelco-dark/5 p-5 md:p-6 mb-4">
    <div className="flex justify-between items-start mb-2">
      <span className="inline-block px-3 py-1 bg-status-success/10 text-status-success text-xs font-bold rounded-lg">
        {type}
      </span>
      <span className="inline-flex items-center gap-1 px-3 py-1 bg-shamelco-bg text-shamelco-dark text-xs font-bold rounded-lg border border-shamelco-dark/5">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
        {activeTablesNumber} طاولات
      </span>
    </div>
    
    <h1 className="text-2xl font-black text-shamelco-darker leading-tight mb-3">
      {name}
    </h1>
    
    <div className="flex items-center gap-2 text-shamelco-dark/60 text-sm">
      <svg className="w-5 h-5 text-status-success shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
      <span>{address}</span>
    </div>
  </div>
);

const VenueStatusCard = ({ isOpen, isActive, openIn, closeIn }: { isOpen: boolean, isActive: boolean, openIn: string, closeIn: string }) => (
  <div className="bg-white rounded-2xl shadow-sm border border-shamelco-dark/5 p-5 md:p-6">
    <h3 className="text-lg font-bold text-shamelco-darker mb-4">حالة ومواعيد العمل 🕒</h3>
    
    <div className="grid grid-cols-2 gap-4 mb-4">
      <div className={`flex flex-col items-center justify-center p-3 rounded-xl border ${isOpen ? 'bg-status-success/10 border-status-success/25 text-status-success' : 'bg-status-danger/10 border-status-danger/25 text-status-danger'}`}>
        <span className="text-xs font-bold mb-1">الحالة الآن</span>
        <span className="text-lg font-black">{isOpen ? 'مفتوح 🟢' : 'مغلق 🔴'}</span>
      </div>
 
      <div className={`flex flex-col items-center justify-center p-3 rounded-xl border ${isActive ? 'bg-shamelco-accent/10 border-shamelco-accent/25 text-shamelco-accent' : 'bg-shamelco-bg border-shamelco-dark/15 text-shamelco-dark/60'}`}>
        <span className="text-xs font-bold mb-1">الحجز عبر التطبيق</span>
        <span className="text-lg font-black">{isActive ? 'متاح ✅' : 'متوقف ❌'}</span>
      </div>
    </div>

    <div className="bg-shamelco-bg rounded-xl p-4 flex items-center justify-between border border-shamelco-dark/5">
      <div className="text-center">
        <span className="block text-xs text-shamelco-dark/60 mb-1">يفتح الساعة</span>
        <span className="font-bold text-shamelco-darker dir-ltr inline-block">{openIn}</span>
      </div>
      <div className="w-px h-8 bg-shamelco-dark/10"></div>
      <div className="text-center">
        <span className="block text-xs text-shamelco-dark/60 mb-1">يغلق الساعة</span>
        <span className="font-bold text-shamelco-darker dir-ltr inline-block">{closeIn}</span>
      </div>
    </div>
  </div>
);

export default function VenueDetails() {
  const { id } = useParams();
  const nav = useNavigate();
  
  const result = useGetVenue(asGUID(id||"00000000-0000-0000-0000-000000000000"));

  if (result.isLoading) {
      return <Loading text="جارى جلب البيانات" />;
    }
  
    if (result.isError || !result.data) {
      return <Error text="حدث خطأ فى جلب البيانات" />;
    }
  
  const venue: VenueDto = result.data.data;

  return (
    <div className="w-full bg-shamelco-bg min-h-screen pb-24 md:pb-8">
      
      <VenueHero 
        mainImage={venue.mainImage} 
        name={venue.name} 
        rating={venue.rating} 
        type={venue.type}
      />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
        
        <VenueMainInfo 
          name={venue.name} 
          type={venue.type} 
          address={venue.address} 
          activeTablesNumber={venue.activeTablesNumber} 
        />

        <VenueStatusCard 
          isOpen={venue.isOpen} 
          isActive={venue.isActive} 
          openIn={venue.openIn} 
          closeIn={venue.closeIn} 
        />

      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-shamelco-dark/10 p-4 shadow-[0_-10px_20px_-10px_rgba(0,0,0,0.1)] z-50 md:sticky md:bottom-0 md:mt-8 md:max-w-3xl md:mx-auto md:rounded-t-2xl md:border-l md:border-r">
        <div className="flex items-center justify-between max-w-3xl mx-auto">
          <div className="flex flex-col">
            <span className="text-xs font-bold text-shamelco-dark/60 mb-0.5">احجز جلستك الآن</span>
            {venue.isOpen ? (
              <span className="text-sm font-black text-status-success flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-status-success animate-pulse"></span>
                متاح للحجز
              </span>
            ) : (
              <span className="text-sm font-black text-status-danger">مغلق حالياً</span>
            )}
          </div>
          
          <button 
            onClick={() => nav(`floor`)}
            disabled={!venue.isOpen || !venue.isActive}
            className="bg-status-success hover:bg-status-success/90 disabled:bg-shamelco-dark/20 disabled:cursor-not-allowed text-white font-bold text-lg px-8 py-3 rounded-xl shadow-md transition-all active:scale-95"
          >
            {venue.isActive ? "بدء الحجز" : "الحجز متوقف"}
          </button>
        </div>
      </div>

    </div>
  );
}