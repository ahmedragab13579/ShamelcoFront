import TopRating from "../../Components/App/TopRatings";
import { HeroSection } from "./Home/HeroSection";
import { CategoriesSection } from "./Home/CategoriesSection";
import { FeaturesSection } from "./Home/FeaturesSection";

export default function Home() {
  return (
    <div className="w-full min-h-screen bg-shamelco-bg space-y-10 pt-4 pb-24 font-sans">
      {/* قسم الترحيب والهيرو */}
      <HeroSection />

      {/* قسم التصنيفات السريعة */}
      <CategoriesSection />

      {/* الأعلى تقييماً مع هيكل skeleton مدمج */}
      <TopRating withPagination={false} showViewAll={true} useSkeleton={true} />

      {/* ميزات شاميلكو */}
      <FeaturesSection />
    </div>
  );
}