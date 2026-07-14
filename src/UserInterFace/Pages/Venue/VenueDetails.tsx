import { useNavigate, useParams } from "react-router-dom";
import { useGetVenue } from "../../../BackEndIntegration/Hooks/Queries/useVenueQueries";
import asGUID from "../../../BackEndIntegration/Types/shared/Guid";
import Error from "../../Components/Common/Error";
import type { VenueDto } from "../../../BackEndIntegration/Types/Venues/Response";
import sportsCafe from "../../Images/premium_synthetic_turf_cozy_cafe_interior_mo.jpg";
import billiardLounge from "../../Images/billiard_table_in_a_modern_lounge_clo.jpg";
import type { VenueType } from "../../../BackEndIntegration/Types/Enums/AppEnums";
import { Star, MapPin, Grid, ChevronLeft } from "lucide-react";
import { useLanguage } from "../../Hooks/Shared/useLanguage";

const VenueHero = ({ mainImage, name, rating, type }: { mainImage: string, name: string, rating: number, type: VenueType }) => {
  const navigate = useNavigate();  
  const hasValidApiImage = mainImage && mainImage !== "N/A" && mainImage.trim() !== "";
  
  let fallbackImage = billiardLounge; 
  if (type) {
    if (type==="Cafe") fallbackImage = sportsCafe;
    else if (type==="Billiard") fallbackImage = billiardLounge;
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
        className="absolute top-4 start-4 bg-white/20 backdrop-blur-md p-2.5 rounded-full text-white hover:bg-white/40 transition-colors cursor-pointer flex items-center justify-center"
      >
        <ChevronLeft className="w-6 h-6 rtl:rotate-180" />
      </button>
      
      <div className="absolute bottom-4 start-4 bg-white/90 backdrop-blur-sm px-3.5 py-1.8 rounded-xl shadow-lg flex items-center gap-1.5 border border-shamelco-border">
        <span className="text-sm font-black text-shamelco-darker">{rating}</span>
        <Star className="w-4 h-4 text-shamelco-gold fill-current" />
      </div>
    </div>
  );
};

const VenueMainInfo = ({ name, type, address, activeTablesNumber }: { name: string, type: VenueType, address: string, activeTablesNumber: number }) => {
  const { t } = useLanguage();

  return (
    <div className="bg-shamelco-surface rounded-3xl shadow-sm border border-shamelco-border p-5 md:p-8 mb-4">
      <div className="flex justify-between items-start mb-2.5">
        <span className="inline-block px-3 py-1 bg-status-success/15 text-status-success text-xs font-bold rounded-lg border border-status-success/20">
          {type}
        </span>
        <span className="inline-flex items-center gap-1 px-3 py-1 bg-shamelco-bg text-shamelco-dark text-xs font-bold rounded-lg border border-shamelco-border">
          <Grid className="w-3.5 h-3.5 text-shamelco-accent" />
          <span>{activeTablesNumber} {t('messages.TABLES')}</span>
        </span>
      </div>
      
      <h1 className="text-2xl font-black text-shamelco-darker leading-tight mb-3">
        {name}
      </h1>
      
      <div className="flex items-center gap-2 text-shamelco-dark/70 text-sm mt-3">
        <MapPin className="w-5 h-5 text-status-success shrink-0" />
        <span className="font-semibold">{address}</span>
      </div>
    </div>
  );
};

const VenueStatusCard = ({ isOpen, isActive, openIn, closeIn }: { isOpen: boolean, isActive: boolean, openIn: string, closeIn: string }) => {
  const { t } = useLanguage();

  return (
    <div className="bg-shamelco-surface rounded-3xl shadow-sm border border-shamelco-border p-5 md:p-8">
      <h3 className="text-lg font-black text-shamelco-darker mb-4">{t('messages.VENUE_STATUS_HOURS')} 🕒</h3>
      
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className={`flex flex-col items-center justify-center p-4 rounded-2xl border ${isOpen ? 'bg-status-success/10 border-status-success/20 text-status-success' : 'bg-status-danger/10 border-status-danger/20 text-status-danger'}`}>
          <span className="text-xs font-bold mb-1 opacity-70">{t('messages.STATUS_NOW')}</span>
          <span className="text-base font-black">{isOpen ? t('messages.OPEN_NOW') : t('messages.CLOSED_NOW')}</span>
        </div>
   
        <div className={`flex flex-col items-center justify-center p-4 rounded-2xl border ${isActive ? 'bg-shamelco-accent/10 border-shamelco-accent/20 text-shamelco-accent' : 'bg-shamelco-bg border-shamelco-border text-shamelco-dark/60'}`}>
          <span className="text-xs font-bold mb-1 opacity-70">{t('messages.APP_BOOKING')}</span>
          <span className="text-base font-black">{isActive ? `${t('messages.AVAILABLE')} ✅` : `${t('messages.DISABLED')} ❌`}</span>
        </div>
      </div>

      <div className="bg-shamelco-bg rounded-2xl p-4 flex items-center justify-between border border-shamelco-border">
        <div className="text-center w-1/2">
          <span className="block text-xs text-shamelco-dark/60 mb-1 font-bold">{t('messages.OPENS_AT')}</span>
          <span className="font-black text-shamelco-darker dir-ltr inline-block">{openIn}</span>
        </div>
        <div className="w-px h-8 bg-shamelco-border"></div>
        <div className="text-center w-1/2">
          <span className="block text-xs text-shamelco-dark/60 mb-1 font-bold">{t('messages.CLOSES_AT')}</span>
          <span className="font-black text-shamelco-darker dir-ltr inline-block">{closeIn}</span>
        </div>
      </div>
    </div>
  );
};

export default function VenueDetails() {
  const { id } = useParams();
  const nav = useNavigate();
  const { t } = useLanguage();
  
  const result = useGetVenue(asGUID(id||"00000000-0000-0000-0000-000000000000"));

  if (result.isLoading) {
    return <VenueDetailsSkeleton />;
  }
  
  if (result.isError || !result.data) {
    return <Error text={t('messages.ERROR_FETCHING_DATA')} />;
  }
  
  const venue: VenueDto = result.data.data;

  return (
    <div className="w-full bg-shamelco-bg min-h-screen pb-24 md:pb-8 font-sans animate-fade-in">
      
      <VenueHero 
        mainImage={venue.mainImage} 
        name={venue.name} 
        rating={venue.rating} 
        type={venue.type}
      />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10 space-y-4">
        
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

      <div className="fixed bottom-0 start-0 end-0 bg-shamelco-surface border-t border-shamelco-border p-4 shadow-[0_-8px_20px_-10px_rgba(0,0,0,0.08)] z-50 md:sticky md:bottom-4 md:mt-8 md:max-w-3xl md:mx-auto md:rounded-3xl md:border md:mb-6">
        <div className="flex items-center justify-between max-w-3xl mx-auto px-2">
          <div className="flex flex-col">
            <span className="text-xs font-bold text-shamelco-muted mb-0.5">{t('messages.BOOK_YOUR_SESSION_NOW')}</span>
            {venue.isOpen ? (
              <span className="text-sm font-black text-status-success flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-status-success animate-pulse"></span>
                {t('messages.AVAILABLE_FOR_BOOKING')}
              </span>
            ) : (
              <span className="text-sm font-black text-status-danger">{t('messages.CLOSED_NOW')}</span>
            )}
          </div>
          
          <button 
            onClick={() => nav(`floor`)}
            disabled={!venue.isOpen || !venue.isActive}
            className="bg-shamelco-gold hover:bg-shamelco-gold-hover disabled:bg-shamelco-bg disabled:text-shamelco-muted/50 disabled:cursor-not-allowed text-shamelco-darker font-black text-base px-8 py-3.5 rounded-xl shadow-xs transition-all active:scale-[0.98] cursor-pointer"
          >
            {venue.isActive ? t('messages.START_BOOKING') : t('messages.BOOKING_STOPPED')}
          </button>
        </div>
      </div>

    </div>
  );
}

function VenueDetailsSkeleton() {
  return (
    <div className="w-full bg-shamelco-bg min-h-screen pb-24 md:pb-8 font-sans animate-pulse">
      {/* هيرو الغلاف */}
      <div className="w-full h-64 md:h-80 bg-shamelco-sand relative" />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10 space-y-4">
        {/* تفاصيل الهيكل */}
        <div className="bg-shamelco-surface rounded-3xl border border-shamelco-border p-6 sm:p-8 space-y-4 shadow-2xs">
          <div className="flex justify-between items-start">
            <div className="space-y-2">
              <div className="flex gap-2">
                <div className="h-5 w-16 bg-shamelco-border/50 rounded-md" />
                <div className="h-5 w-20 bg-shamelco-border/40 rounded-md" />
              </div>
              <div className="h-7 w-48 bg-shamelco-border rounded-md" />
            </div>
          </div>
          <div className="h-4 w-60 bg-shamelco-border/60 rounded-md" />
        </div>

        {/* حالة ومواعيد الهيكل */}
        <div className="bg-shamelco-surface rounded-3xl border border-shamelco-border p-6 sm:p-8 space-y-4 shadow-2xs">
          <div className="h-5 w-32 bg-shamelco-border rounded-md" />
          <div className="grid grid-cols-2 gap-4">
            <div className="h-16 bg-shamelco-sand rounded-2xl" />
            <div className="h-16 bg-shamelco-sand rounded-2xl" />
          </div>
          <div className="h-16 bg-shamelco-sand rounded-2xl w-full" />
        </div>
      </div>
    </div>
  );
}