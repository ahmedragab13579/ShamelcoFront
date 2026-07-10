import { Outlet } from "react-router-dom";
import Header from "../Components/Auth/Shared/Header";
import Footer from "../Components/Auth/Shared/Footer";

export default function AuthLayOut() {
  return (
    <div className="flex h-screen w-full bg-shamelco-bg font-sans" dir="rtl">
      
      {/* الجانب الأيسر (لأجهزة الديسك توب): ستايل غامق وفخم */}
      <div className="hidden lg:flex lg:w-1/2 bg-shamelco-darker text-shamelco-bg flex-col justify-between p-12 relative overflow-hidden">
        {/* إضافة لمسة جمالية خفيفة في الخلفية */}
        <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-shamelco-accent/20 via-transparent to-transparent"></div>
        
        <Header />
        
        <div className="z-10">
          <h1 className="text-4xl font-black mb-4">أهلاً بك في شاميلكو</h1>
          <p className="text-shamelco-dark/60">حيث تبدأ رحلة إدارة منشأتك الرياضية والترفيهية بكل سهولة واحترافية.</p>
        </div>
        
        <Footer />
      </div>
      
      {/* الجانب الأيمن (الفورم): مساحة بيضاء نظيفة للتركيز */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-6 sm:p-12 relative bg-shamelco-bg">
        <main className="w-full max-w-md space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
          <Outlet />
        </main>
      </div>
      
    </div>
  );
}