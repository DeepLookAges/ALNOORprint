/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Printer, 
  Package, 
  Layout, 
  Box, 
  Layers, 
  CheckCircle2, 
  Phone, 
  MapPin, 
  MessageCircle, 
  ChevronRight, 
  Menu, 
  X,
  Facebook,
  Twitter,
  Youtube,
  Music,
  Linkedin,
  Briefcase,
  FileText
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- Types ---
interface Service {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
}

// --- Constants ---
const HERO_IMAGES = [
  "https://d.top4top.io/p_3715nbt6t1.png",
  "https://h.top4top.io/p_3715cohkn1.png",
  "https://i.top4top.io/p_3715f9b1w1.png",
  "https://l.top4top.io/p_3715onmpn1.png",
  "https://c.top4top.io/p_3715h3ww41.png"
];

const SERVICES: Service[] = [
  {
    id: 1,
    title: "الطباعة الأوفست (Offset Printing)",
    description: "طباعة عالية الجودة للكميات الكبيرة باستخدام أحدث ماكينات الأوفست رباعية الألوان.",
    icon: <Printer className="w-8 h-8" />,
  },
  {
    id: 2,
    title: "التغليف والعلب (Packaging)",
    description: "تصميم وتصنيع علب الكرتون بمختلف الأنواع: بريستول، كوتيد، ميتالايز، وعلب التعبئة الفاخرة.",
    icon: <Box className="w-8 h-8" />,
  },
  {
    id: 3,
    title: "طباعة النشرات الدوائية",
    description: "طباعة النشرات الداخلية للأدوية بدقة عالية وورق مخصص للصناعات الدوائية.",
    icon: <FileText className="w-8 h-8" />,
  },
  {
    id: 4,
    title: "تغليف المنتجات الغذائية والطبية",
    description: "حلول تغليف مبتكرة للمطاعم وشركات الأدوية تضمن أعلى معايير الجودة والسلامة.",
    icon: <Package className="w-8 h-8" />,
  },
];

const WHY_US = [
  { title: "جودة استثنائية", desc: "نستخدم أفضل الخامات وأحدث التقنيات لضمان دقة الألوان." },
  { title: "سرعة التنفيذ", desc: "نلتزم بمواعيد التسليم المحددة مهما كان حجم الطلب." },
  { title: "أسعار تنافسية", desc: "نقدم أفضل قيمة مقابل السعر في السوق المحلي." },
  { title: "ماكينات حديثة", desc: "نمتلك أحدث ماكينات الطباعة رباعية الألوان لضمان الكفاءة." },
];

const GALLERY = [
  { url: "https://i.top4top.io/p_3712g27kk1.png", title: "مشروع أجندات 2026 البنك العربي" },
  { url: "https://l.top4top.io/p_3712bm7uo1.png", title: "مشروع علب مطعم ABO ALI" },
  { url: "https://g.top4top.io/p_3712dfk6y1.png", title: "مشروع شنط لبراند RODY Secrets" },
  { url: "https://c.top4top.io/p_3712am4y21.png", title: "مشروع كتالوجات لشركة BAYTAK" },
  { url: "https://a.top4top.io/p_371508ihu1.png", title: "مشروع علب كرتون لتمور المدينة" },
  { url: "https://f.top4top.io/p_3715a6tv91.png", title: "مشروع باكينج دلع كرشك" },
];

const CLIENTS = [
  { name: "شركة غاز مصر", logo: "https://g.top4top.io/p_3720qartd1.png" },
  { name: "الشركة القابضة لكهرباء مصر", logo: "https://i.top4top.io/p_37206q87u1.png" },
  { name: "شيبسي للصناعات الغذائية", logo: "https://j.top4top.io/p_37203ohpm1.png" },
  { name: "بيبسي كولا مصر", logo: "https://k.top4top.io/p_37202jnqe1.png" },
  { name: "كوك دور", logo: "https://l.top4top.io/p_3720ey5hf1.png" },
  { name: "شركة حلو الشام", logo: "https://a.top4top.io/p_3720auffk1.png" },
  { name: "شركة المالكي", logo: "https://d.top4top.io/p_3720qrgyq1.png" },
  { name: "شركة بلبن", logo: "https://e.top4top.io/p_3720slgng1.png" },
  { name: "شركة حليبو", logo: "https://i.top4top.io/p_3720j34ur1.png" },
  { name: "اسكوادرا للحلويات", logo: "https://j.top4top.io/p_3720pf8f91.png" },
  { name: "شركة بريق", logo: "https://k.top4top.io/p_3720sw8qp1.png" },
  { name: "شركة راية أوتو", logo: "https://b.top4top.io/p_3720dyyiy1.png" },
  { name: "شركة أبو رجيلة", logo: "https://c.top4top.io/p_3720sttw81.png" },
  { name: "شركة العبور للبويات", logo: "https://e.top4top.io/p_3720hlah31.png" },
  { name: "شركة كلوركس", logo: "https://g.top4top.io/p_3720poxji1.png" },
  { name: "شركة رودس", logo: "https://j.top4top.io/p_3720m3nfx1.png" },
  { name: "مؤسسة مجدي يعقوب للقلب", logo: "https://k.top4top.io/p_3720ucmzn1.png" },
  { name: "مستشفى الجوي التخصصي", logo: "https://l.top4top.io/p_37201mia41.png" },
  { name: "مستشفى الناس", logo: "https://b.top4top.io/p_37204hd731.png" },
  { name: "جمعية دار الأورمان", logo: "https://c.top4top.io/p_3720ewd8d1.png" },
  { name: "معمل سيد ميديكال", logo: "https://e.top4top.io/p_3720wbczu1.png" },
  { name: "مستشفى أحمد شفيق", logo: "https://g.top4top.io/p_3720h4mks1.png" },
  { name: "مستشفى المعلمين", logo: "https://h.top4top.io/p_3720n0mhi1.png" },
  { name: "سمارت هاوس", logo: "https://j.top4top.io/p_3720supv51.png" },
  { name: "شركة راية", logo: "https://k.top4top.io/p_3720b4zp91.png" },
  { name: "الأفريقية للأمن والحراسة", logo: "https://a.top4top.io/p_3720pq7m31.png" },
  { name: "شركة أوراسكوم", logo: "https://c.top4top.io/p_3720n6yd01.png" },
];

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showCookieConsent, setShowCookieConsent] = useState(false);
  const [showClientsModal, setShowClientsModal] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      setShowCookieConsent(true);
    }
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch("https://formspree.io/f/xkovdvzb", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        setShowSuccessModal(true);
        e.currentTarget.reset();
      } else {
        alert("عذراً، حدث خطأ أثناء إرسال الطلب. يرجى المحاولة مرة أخرى.");
      }
    } catch (error) {
      alert("عذراً، حدث خطأ في الاتصال. يرجى التحقق من الإنترنت والمحاولة مرة أخرى.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 selection:bg-cyan-100 selection:text-cyan-900" dir="rtl">
      {/* --- Navigation --- */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-md py-3' : 'bg-white py-4 border-b border-slate-100'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => scrollTo('hero')}>
            <div className="w-12 h-12 flex items-center justify-center overflow-hidden rounded-xl bg-white shadow-sm border border-slate-100">
              <img 
                src="https://a.top4top.io/p_3715rlvlc1.png" 
                alt="Logo" 
                className="w-full h-full object-contain"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight text-slate-900 leading-none">مطبعة النور</span>
              <span className="text-[10px] font-semibold text-cyan-600 uppercase tracking-widest mt-1">ALNOOR PRINTHOUSE</span>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {['الرئيسية', 'خدماتنا', 'من نحن', 'أعمالنا', 'اتصل بنا'].map((item, idx) => (
              <button 
                key={idx}
                onClick={() => scrollTo(['hero', 'services', 'about', 'gallery', 'contact'][idx])}
                className="text-sm font-medium text-slate-600 hover:text-cyan-600 transition-colors"
              >
                {item}
              </button>
            ))}
            <button 
              onClick={() => scrollTo('contact')}
              className="bg-slate-900 text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-cyan-600 transition-all shadow-md active:scale-95"
            >
              اطلب عرض سعر
            </button>
          </div>

          {/* Mobile Toggle */}
          <button className="md:hidden p-2 text-slate-900" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-white pt-24 px-6 md:hidden"
          >
            <div className="flex flex-col gap-6 text-center">
              {['الرئيسية', 'خدماتنا', 'من نحن', 'أعمالنا', 'اتصل بنا'].map((item, idx) => (
                <button 
                  key={idx}
                  onClick={() => scrollTo(['hero', 'services', 'about', 'gallery', 'contact'][idx])}
                  className="text-2xl font-bold text-slate-800"
                >
                  {item}
                </button>
              ))}
              <button 
                onClick={() => scrollTo('contact')}
                className="mt-4 bg-cyan-600 text-white py-4 rounded-xl text-lg font-bold"
              >
                اطلب عرض سعر
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- Hero Section --- */}
      <section id="hero" className="relative min-h-[calc(100vh-80px)] mt-20 flex items-center overflow-hidden">
        {/* Background Slider */}
        <div className="absolute inset-0 z-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="absolute inset-0"
            >
              <img 
                src={HERO_IMAGES[currentSlide]} 
                alt={`Slide ${currentSlide + 1}`}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              {/* Overlay for readability */}
              <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-[2px]" />
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 w-full text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-full text-xs font-bold uppercase tracking-widest mb-8">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
              </span>
              نحن نصنع الفرق في عالم الطباعة
            </div>
            
            <h1 className="text-5xl md:text-8xl font-black text-white leading-[1.1] mb-8 tracking-tight">
              مطبعة النور <br />
              <span className="text-cyan-400">إبداع يتجاوز الحدود</span>
            </h1>
            
            <p className="text-lg md:text-2xl text-white/90 mb-12 leading-relaxed max-w-2xl mx-auto font-medium">
              نقدم حلول طباعة متكاملة تجمع بين التكنولوجيا الحديثة والخبرة العريقة. من العلب الكرتونية الفاخرة إلى اللوحات الإعلانية الضخمة، نحن شريكك في النجاح والتميز.
            </p>
            
            <div className="flex flex-wrap gap-5 justify-center mb-10">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollTo('contact')}
                className="px-10 py-5 bg-cyan-600 text-white rounded-2xl font-bold text-lg hover:bg-cyan-500 transition-all shadow-2xl shadow-cyan-900/20 flex items-center gap-3 group"
              >
                ابدأ مشروعك الآن
                <ChevronRight className="w-6 h-6 group-hover:translate-x-[-6px] transition-transform rotate-180" />
              </motion.button>
              
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollTo('services')}
                className="px-10 py-5 bg-white/10 backdrop-blur-md text-white border border-white/20 rounded-2xl font-bold text-lg hover:bg-white/20 transition-all"
              >
                استكشف خدماتنا
              </motion.button>
            </div>

            {/* Slider Indicators (Dots) - Moved here to be below buttons */}
            <div className="flex justify-center gap-3">
              {HERO_IMAGES.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${currentSlide === idx ? 'bg-cyan-500 w-8' : 'bg-white/30 hover:bg-white/50'}`}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </section>


      {/* --- Services Section --- */}
      <section id="services" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-sm font-bold text-cyan-600 uppercase tracking-[0.2em] mb-3">ماذا نقدم؟</h2>
            <h3 className="text-4xl font-black text-slate-900">خدمات طباعة احترافية</h3>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {SERVICES.map((service, idx) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-2 transition-all group"
              >
                <div className="w-16 h-16 bg-cyan-50 text-cyan-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-cyan-600 group-hover:text-white transition-colors">
                  {service.icon}
                </div>
                <h4 className="text-xl font-bold text-slate-900 mb-4">{service.title}</h4>
                <p className="text-slate-600 leading-relaxed text-sm">
                  {service.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- About Us Section --- */}
      <section id="about" className="py-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="grid grid-cols-2 gap-4">
              <img 
                src="https://a.top4top.io/p_3712dco8n1.png" 
                className="rounded-2xl shadow-lg"
                alt="About 1"
                referrerPolicy="no-referrer"
              />
              <img 
                src="https://i.top4top.io/p_3712v6w3y1.png" 
                className="rounded-2xl shadow-lg mt-8"
                alt="About 2"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-cyan-600 rounded-full flex items-center justify-center text-white font-black text-2xl shadow-2xl border-4 border-white">
              20+ عام
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-sm font-bold text-cyan-600 uppercase tracking-[0.2em] mb-3">من نحن؟</h2>
            <h3 className="text-4xl font-black text-slate-900 mb-6">مطبعة النور: ريادة في عالم المطبوعات</h3>
            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
              تعد مطبعة النور واحدة من المؤسسات الرائدة في مجال الطباعة والتغليف. نحن نفخر بامتلاكنا أحدث ماكينات طباعة الأوفست رباعية الألوان (4 Color Sheet Printing Machine) التي تضمن دقة متناهية في إعادة إنتاج الألوان.
            </p>
            <div className="space-y-4">
              {['متخصصون في علب الكرتون والبريستول', 'خبراء في الأدوية والنشرات الدوائية', 'نحن شريك نجاح لشركات الأدوية والمطاعم الكبرى', 'حلول تغليف مبتكرة للمنتجات الغذائية والطبية'].map((item, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <CheckCircle2 className="text-cyan-600 w-6 h-6 flex-shrink-0" />
                  <span className="font-semibold text-slate-800">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- Why Choose Us --- */}
      <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-600/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-600/10 blur-[120px] rounded-full" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-sm font-bold text-cyan-400 uppercase tracking-[0.2em] mb-3">لماذا نحن؟</h2>
            <h3 className="text-4xl font-black">نحن نضع معايير جديدة للجودة</h3>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {WHY_US.map((item, idx) => (
              <div key={idx} className="text-center p-6 rounded-3xl bg-white/5 backdrop-blur-sm border border-white/10">
                <div className="text-4xl font-black text-cyan-400 mb-4">0{idx + 1}</div>
                <h4 className="text-xl font-bold mb-2">{item.title}</h4>
                <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- Gallery Section --- */}
      <section id="gallery" className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div>
              <h2 className="text-sm font-bold text-cyan-600 uppercase tracking-[0.2em] mb-3">معرض الأعمال</h2>
              <h3 className="text-4xl font-black text-slate-900">شاهد جودة مخرجاتنا</h3>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {GALLERY.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group relative aspect-square rounded-2xl overflow-hidden shadow-md cursor-pointer"
              >
                <img 
                  src={item.url} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                  alt={`Work ${idx}`}
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6 text-center justify-center">
                  <span className="text-white font-bold text-sm md:text-base">{item.title}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- Contact Section --- */}
      <section id="contact" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-sm font-bold text-cyan-600 uppercase tracking-[0.2em] mb-3">تواصل معنا</h2>
              <h3 className="text-4xl font-black text-slate-900 mb-8">هل لديك مشروع؟ دعنا نساعدك</h3>
              
              <div className="space-y-8">
                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-cyan-600 flex-shrink-0">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 mb-1">العنوان</h4>
                    <p className="text-slate-600 text-sm">13 شارع مدرسة المتفوقين - مزلقان عين شمس, cairo, egypt, 11772</p>
                  </div>
                </div>

                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-cyan-600 flex-shrink-0">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 mb-1">رقم الهاتف</h4>
                    <p className="text-slate-600" dir="ltr">01070210070</p>
                  </div>
                </div>
              </div>

              <div className="mt-12 p-8 bg-cyan-600 rounded-3xl text-white shadow-xl shadow-cyan-200">
                <h4 className="text-xl font-bold mb-4">تواصل سريع عبر واتساب</h4>
                <p className="mb-6 opacity-90">احصل على تسعير فوري لمشروعك عبر محادثة مباشرة مع فريق المبيعات.</p>
                <a 
                  href="https://wa.me/201070210070" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-white text-cyan-600 px-8 py-4 rounded-xl font-bold hover:bg-slate-50 transition-all shadow-lg"
                >
                  <MessageCircle className="w-6 h-6" />
                  ابدأ المحادثة الآن
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-xl border border-slate-100"
            >
              <h4 className="text-2xl font-bold text-slate-900 mb-8">أرسل لنا رسالة</h4>
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">الاسم الكامل</label>
                    <input 
                      name="الاسم"
                      type="text" 
                      required
                      className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition-all" 
                      placeholder="أدخل اسمك" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">رقم الجوال</label>
                    <input 
                      name="الجوال"
                      type="tel" 
                      required
                      className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition-all" 
                      placeholder="05xxxxxxxx" 
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">نوع الخدمة</label>
                  <select 
                    name="الخدمة"
                    className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition-all appearance-none"
                  >
                    <option>طباعة أوفست</option>
                    <option>علب وتغليف</option>
                    <option>لوحات إعلانية</option>
                    <option>كلادينج وحروف بارزة</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">تفاصيل المشروع</label>
                  <textarea 
                    name="التفاصيل"
                    rows={4} 
                    required
                    className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition-all resize-none" 
                    placeholder="اشرح لنا ما تحتاجه باختصار..."
                  ></textarea>
                </div>
                <button 
                  disabled={isSubmitting}
                  className="w-full py-5 bg-slate-900 text-white rounded-xl font-bold text-lg hover:bg-cyan-600 transition-all shadow-lg active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      جاري الإرسال...
                    </>
                  ) : "إرسال الطلب"}
                </button>
              </form>
            </motion.div>
          </div>

          {/* Map Embed */}
          <div className="mt-24 rounded-[2.5rem] overflow-hidden shadow-2xl h-[400px] grayscale hover:grayscale-0 transition-all duration-700 border-8 border-white">
            <iframe 
              src="https://maps.google.com/maps?q=30.1337,31.3216&z=17&output=embed" 
              className="w-full h-full border-0" 
              allowFullScreen={true} 
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </section>

      {/* --- Footer --- */}
      <footer className="bg-white pt-24 pb-12 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 flex items-center justify-center overflow-hidden rounded-xl bg-white shadow-sm border border-slate-100">
                  <img 
                    src="https://a.top4top.io/p_3715rlvlc1.png" 
                    alt="Logo" 
                    className="w-full h-full object-contain"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="text-xl font-bold tracking-tight text-slate-900 leading-none">مطبعة النور</span>
                  <span className="text-[10px] font-semibold text-cyan-600 uppercase tracking-widest mt-1">ALNOOR PRINTHOUSE</span>
                </div>
              </div>
              <p className="text-slate-500 max-w-sm leading-relaxed mb-8">
                نحن ملتزمون بتقديم أعلى مستويات الجودة في عالم الطباعة والتغليف. نجمع بين الفن والتكنولوجيا لنقدم لعملائنا أفضل النتائج التي تليق بعلاماتهم التجارية.
              </p>
              <div className="flex gap-4">
                {[
                  { Icon: Facebook, url: "https://www.facebook.com/AlNoor.Print" },
                  { Icon: Twitter, url: "https://x.com/Alnoor_Prints" },
                  { Icon: Youtube, url: "https://www.youtube.com/@Alnoor_Print" },
                  { Icon: Music, url: "https://www.tiktok.com/@alnoor_prints" },
                  { Icon: Linkedin, url: "https://www.linkedin.com/in/alnoor-print/" },
                ].map((item, idx) => (
                  <a 
                    key={idx} 
                    href={item.url} 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-cyan-600 hover:text-white transition-all"
                  >
                    <item.Icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h5 className="font-bold text-slate-900 mb-6">روابط سريعة</h5>
              <ul className="space-y-4 text-slate-500 text-sm">
                {['الرئيسية', 'خدماتنا', 'من نحن', 'أعمالنا', 'سياسة الخصوصية'].map((item, idx) => (
                  <li key={idx}>
                    <button 
                      onClick={() => {
                        if (item === 'سياسة الخصوصية') {
                          setShowPrivacy(true);
                          window.scrollTo(0, 0);
                        } else {
                          scrollTo(['hero', 'services', 'about', 'gallery', 'contact'][idx] || 'hero');
                        }
                      }} 
                      className="hover:text-cyan-600 transition-colors"
                    >
                      {item}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h5 className="font-bold text-slate-900 mb-6">ساعات العمل</h5>
              <ul className="space-y-4 text-slate-500 text-sm">
                <li className="flex justify-between">
                  <span>السبت - الخميس:</span>
                  <span className="font-bold text-slate-700">9 ص - 6 م</span>
                </li>
                <li className="flex justify-between">
                  <span>الجمعة:</span>
                  <span className="font-bold text-slate-700 text-red-500">مغلق</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-12 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-slate-400">
            <div className="flex flex-col items-center md:items-start gap-2">
              <p>© {new Date().getFullYear()} مطبعة النور. جميع الحقوق محفوظة.</p>
              <p className="text-xs">
                تطوير <a href="https://hamzahub.shop" target="_blank" rel="noopener noreferrer" className="font-bold text-slate-600 hover:text-cyan-600 transition-colors">HAMZA Hilal</a>
              </p>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating Buttons Container */}
      <div className="fixed bottom-8 left-8 z-50 flex flex-row gap-4">
        {/* Past Works Button */}
        <button 
          onClick={() => setShowClientsModal(true)}
          className="w-16 h-16 bg-cyan-600 text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform active:scale-95 group relative"
        >
          <Briefcase className="w-8 h-8" />
          <span className="absolute bottom-full mb-4 left-0 bg-white text-slate-900 px-4 py-2 rounded-xl shadow-lg text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
            سابقة أعمالنا
          </span>
        </button>

        {/* WhatsApp Button */}
        <a 
          href="https://wa.me/201070210070" 
          target="_blank" 
          rel="noopener noreferrer"
          className="w-16 h-16 bg-green-500 text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform active:scale-95 group"
        >
          <MessageCircle className="w-8 h-8" />
          <span className="absolute bottom-full mb-4 left-0 bg-white text-slate-900 px-4 py-2 rounded-xl shadow-lg text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
            تحدث معنا الآن
          </span>
        </a>
      </div>

      {/* --- Privacy Policy Overlay --- */}
      <AnimatePresence>
        {showPrivacy && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-white overflow-y-auto"
          >
            <div className="max-w-4xl mx-auto px-6 py-20 relative">
              <button 
                onClick={() => setShowPrivacy(false)}
                className="fixed top-8 left-8 p-3 bg-slate-100 rounded-full hover:bg-slate-200 transition-colors z-[110]"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="prose prose-slate max-w-none">
                <h1 className="text-3xl font-black text-slate-900 mb-8 text-center">سياسة الخصوصية – مطبعة النور Al Noor Print House</h1>
                
                <p className="text-lg text-slate-600 mb-12 leading-relaxed">
                  في مطبعة النور Al Noor Print House، نحترم خصوصيتك ونلتزم بحماية بياناتك الشخصية. توضح هذه السياسة كيفية جمع المعلومات، استخدامها، وحمايتها عند استخدامك لموقعنا الإلكتروني وخدماتنا.
                </p>

                <div className="space-y-12">
                  <section>
                    <h2 className="text-xl font-bold text-slate-900 mb-4">1. المعلومات التي نجمعها</h2>
                    <p className="text-slate-600 mb-4">نقوم بجمع معلوماتك عند تفاعلك معنا، وتشمل:</p>
                    <ul className="list-disc pr-6 space-y-2 text-slate-600">
                      <li><strong>المعلومات الشخصية:</strong> الاسم، البريد الإلكتروني، رقم الهاتف، عنوان الفوترة أو التسليم عند الطلب.</li>
                      <li><strong>معلومات الاستخدام:</strong> صفحات الموقع التي تزورها، مدة التصفح، والروابط التي تنقر عليها.</li>
                      <li><strong>ملفات تعريف الارتباط (Cookies):</strong> لتحسين تجربة التصفح وتخصيص الخدمات.</li>
                    </ul>
                  </section>

                  <section>
                    <h2 className="text-xl font-bold text-slate-900 mb-4">2. كيفية استخدام المعلومات</h2>
                    <p className="text-slate-600 mb-4">نستخدم بياناتك للأغراض التالية:</p>
                    <ul className="list-disc pr-6 space-y-2 text-slate-600">
                      <li>معالجة طلبات الطباعة والخدمات المرتبطة بها.</li>
                      <li>التواصل معك بشأن الطلبات، العروض، أو التحديثات الخاصة بمطبعتنا.</li>
                      <li>تحسين الموقع والخدمات وتجربة المستخدم.</li>
                      <li>الامتثال للقوانين واللوائح المعمول بها.</li>
                    </ul>
                  </section>

                  <section>
                    <h2 className="text-xl font-bold text-slate-900 mb-4">3. حماية المعلومات</h2>
                    <p className="text-slate-600 leading-relaxed">
                      نطبق إجراءات أمان تقنية وإدارية لحماية معلوماتك من الوصول غير المصرح به أو التعديل أو الكشف أو الحذف. لا نشارك بياناتك مع أطراف ثالثة إلا إذا كان ذلك ضروريًا لتقديم الخدمة أو وفقًا للقانون.
                    </p>
                  </section>

                  <section>
                    <h2 className="text-xl font-bold text-slate-900 mb-4">4. ملفات تعريف الارتباط (Cookies)</h2>
                    <p className="text-slate-600 leading-relaxed">
                      قد نستخدم ملفات تعريف الارتباط لتحسين تجربة المستخدم وتحليل استخدام الموقع. يمكنك تعطيل ملفات تعريف الارتباط من خلال إعدادات المتصفح، لكن قد يؤثر ذلك على بعض وظائف الموقع.
                    </p>
                  </section>

                  <section>
                    <h2 className="text-xl font-bold text-slate-900 mb-4">5. الروابط لمواقع أخرى</h2>
                    <p className="text-slate-600 leading-relaxed">
                      موقعنا قد يحتوي على روابط لمواقع خارجية. نحن لسنا مسؤولين عن سياسات الخصوصية أو محتوى هذه المواقع، وننصحك بقراءة سياساتها الخاصة.
                    </p>
                  </section>

                  <section>
                    <h2 className="text-xl font-bold text-slate-900 mb-4">6. حقوقك</h2>
                    <ul className="list-disc pr-6 space-y-2 text-slate-600">
                      <li>الحق في الوصول إلى بياناتك الشخصية.</li>
                      <li>الحق في تصحيح أو تحديث معلوماتك.</li>
                      <li>الحق في طلب حذف بياناتك من سجلاتنا.</li>
                      <li>الحق في الاعتراض على معالجة البيانات لأغراض تسويقية.</li>
                    </ul>
                  </section>

                  <section>
                    <h2 className="text-xl font-bold text-slate-900 mb-4">7. التغييرات على سياسة الخصوصية</h2>
                    <p className="text-slate-600 leading-relaxed">
                      نحتفظ بالحق في تعديل سياسة الخصوصية هذه من وقت لآخر. سيتم نشر أي تغييرات على هذه الصفحة مع تحديث تاريخ السريان.
                    </p>
                  </section>

                  <section>
                    <h2 className="text-xl font-bold text-slate-900 mb-4">8. التواصل معنا</h2>
                    <p className="text-slate-600 mb-4">إذا كان لديك أي أسئلة أو استفسارات بخصوص سياسة الخصوصية، يرجى التواصل معنا عبر:</p>
                    <ul className="pr-6 space-y-2 text-slate-600">
                      <li><strong>الهاتف:</strong> 01070210070</li>
                    </ul>
                  </section>

                  <div className="pt-12 border-t border-slate-100 text-center text-slate-400 text-sm">
                    آخر تحديث: 1 مارس 2026
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- Clients Modal --- */}
      <AnimatePresence>
        {showClientsModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-6 bg-slate-900/60 backdrop-blur-sm"
            onClick={() => setShowClientsModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-white w-full max-w-5xl max-h-[90vh] rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 md:p-8 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                <div>
                  <h3 className="text-2xl md:text-3xl font-black text-slate-900">سابقة أعمالنا</h3>
                  <p className="text-slate-500 text-sm mt-1">نفخر بثقة كبرى الشركات والمؤسسات في خدماتنا</p>
                </div>
                <button 
                  onClick={() => setShowClientsModal(false)}
                  className="p-2 hover:bg-slate-200 rounded-full transition-colors"
                >
                  <X className="w-6 h-6 text-slate-500" />
                </button>
              </div>
              
              <div className="flex-1 overflow-y-auto p-6 md:p-10">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 md:gap-8">
                  {CLIENTS.map((client, idx) => (
                    <motion.div 
                      key={idx}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.03 }}
                      className="flex flex-col items-center text-center group"
                    >
                      <div className="w-full aspect-square bg-slate-50 rounded-2xl p-4 flex items-center justify-center mb-3 border border-slate-100 group-hover:border-cyan-200 group-hover:bg-white group-hover:shadow-md transition-all duration-300">
                        <img 
                          src={client.logo} 
                          alt={client.name} 
                          className="max-w-full max-h-full object-contain grayscale group-hover:grayscale-0 transition-all duration-500"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <span className="text-xs md:text-sm font-bold text-slate-700 group-hover:text-cyan-600 transition-colors leading-tight">
                        {client.name}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
              
              <div className="p-6 bg-slate-50 border-t border-slate-100 text-center">
                <button 
                  onClick={() => setShowClientsModal(false)}
                  className="px-8 py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-cyan-600 transition-all"
                >
                  إغلاق
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- Success Modal --- */}
      <AnimatePresence>
        {showSuccessModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-white rounded-[2rem] p-8 md:p-12 max-w-lg w-full text-center shadow-2xl"
            >
              <div className="w-20 h-20 bg-cyan-100 text-cyan-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-black text-slate-900 mb-4">تم الإرسال بنجاح</h3>
              <p className="text-slate-600 mb-8 leading-relaxed text-lg">
                شكراً على تواصلكم مع مطبعة النور وسيتم موافاتكم بالرد من خلال أحد ممثلي مطبعة النور قريباً
              </p>
              <button
                onClick={() => {
                  setShowSuccessModal(false);
                  scrollTo('hero');
                }}
                className="w-full py-4 bg-cyan-600 text-white rounded-xl font-bold text-lg hover:bg-cyan-700 transition-all shadow-lg shadow-cyan-200"
              >
                موافق
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- Cookie Consent Banner --- */}
      <AnimatePresence>
        {showCookieConsent && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-0 left-0 right-0 z-[150] p-4 md:p-6"
          >
            <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-[0_-10px_40px_rgba(0,0,0,0.1)] border border-slate-100 p-6 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4 text-right">
                <div className="w-12 h-12 bg-cyan-50 text-cyan-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 mb-1">نحن نستخدم ملفات تعريف الارتباط</h4>
                  <p className="text-slate-500 text-sm leading-relaxed">
                    نستخدم ملفات تعريف الارتباط (Cookies) لتحسين تجربة المستخدم وضمان عمل الموقع بشكل مثالي. باستمرارك في التصفح، فإنك توافق على استخدامنا للكوكيز.
                  </p>
                </div>
              </div>
              <div className="flex gap-3 w-full md:w-auto">
                <button
                  onClick={() => {
                    localStorage.setItem('cookie-consent', 'true');
                    setShowCookieConsent(false);
                  }}
                  className="flex-1 md:flex-none px-8 py-3 bg-cyan-600 text-white rounded-xl font-bold text-sm hover:bg-cyan-700 transition-all shadow-lg shadow-cyan-100"
                >
                  أوافق
                </button>
                <button
                  onClick={() => setShowCookieConsent(false)}
                  className="flex-1 md:flex-none px-8 py-3 bg-slate-100 text-slate-600 rounded-xl font-bold text-sm hover:bg-slate-200 transition-all"
                >
                  إغلاق
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
