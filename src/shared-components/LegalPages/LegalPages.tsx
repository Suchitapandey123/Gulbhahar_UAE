// @ts-nocheck

import {
  AlertCircle, BarChart3, CheckCircle, ChevronDown, ChevronRight,
  Clock, Cookie, Eye, FileText, Info, Lock, Mail, MapPin,
  Package, Phone, RefreshCw, Settings, Shield, ShieldCheck,
  Target, Truck, XCircle,
} from "lucide-react";

// ─── Botanical SVG watermark ──────────────────────────────────────────────────
const FloralMark = ({ size = 340 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 380 380" fill="none"
    style={{ color: "#991b1b" }}>
    <circle cx="190" cy="190" r="175" stroke="currentColor" strokeWidth="0.8"/>
    <circle cx="190" cy="190" r="108" stroke="currentColor" strokeWidth="0.5"/>
    <circle cx="190" cy="190" r="30"  stroke="currentColor" strokeWidth="0.8"/>
    {[0,45,90,135,180,225,270,315].map(a => (
      <ellipse key={a} cx="190" cy="108" rx="14" ry="65"
        stroke="currentColor" strokeWidth="0.6" fill="none"
        transform={`rotate(${a} 190 190)`} />
    ))}
    {[22.5,67.5,112.5,157.5,202.5,247.5,292.5,337.5].map(a => (
      <ellipse key={a} cx="190" cy="128" rx="8" ry="50"
        stroke="currentColor" strokeWidth="0.4" fill="none"
        transform={`rotate(${a} 190 190)`} />
    ))}
  </svg>
);

// ─── Tabs ─────────────────────────────────────────────────────────────────────
const TABS = [
  { id: "terms",         title: "Terms of Service",     icon: FileText,  desc: "Usage rules & conditions" },
  { id: "privacy",       title: "Privacy Policy",        icon: Lock,      desc: "How we protect your data" },
  { id: "cookie-policy", title: "Cookie Policy",         icon: Cookie,    desc: "How we use cookies" },
  { id: "delivery",      title: "Delivery & Shipping",   icon: Truck,     desc: "Shipping & delivery info" },
  { id: "refund",        title: "Refund & Cancellation", icon: RefreshCw, desc: "Returns & cancellations" },
];

// ─── Micro-components ─────────────────────────────────────────────────────────
const CheckItem = ({ text }) => (
  <li className="flex items-start gap-3">
    <CheckCircle className="h-4 w-4 text-red-700 flex-shrink-0 mt-0.5" />
    <span className="text-sm text-gray-700 leading-relaxed">{text}</span>
  </li>
);

const BulletItem = ({ text }) => (
  <li className="flex items-start gap-3">
    <span className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0 bg-red-800 opacity-50" />
    <span className="text-sm text-gray-700 leading-relaxed">{text}</span>
  </li>
);

const InfoBanner = ({ icon: Icon = Info, warn = false, children }) => (
  <div className={`flex items-start gap-3 rounded-xl p-4 border ${
    warn ? "bg-amber-50 border-amber-200" : "bg-red-50/70 border-red-100"
  }`}>
    <Icon className={`h-4 w-4 mt-0.5 flex-shrink-0 ${warn ? "text-amber-500" : "text-red-700"}`} />
    <p className="text-sm leading-relaxed text-gray-700">{children}</p>
  </div>
);

// ─── Accordion ────────────────────────────────────────────────────────────────
const AccordionSection = ({ index, icon: Icon, title, children }) => (
  <div className="rounded-2xl overflow-hidden border border-red-200 shadow-[0_4px_20px_rgba(153,27,27,0.09)]">
    <div className="w-full flex items-center gap-4 px-5 py-4 bg-red-50/60">
      <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 bg-red-100 text-red-900">
        <Icon className="h-4 w-4" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[11px] font-semibold uppercase tracking-widest mb-0.5 text-red-400">
          {String(index).padStart(2, "0")}
        </p>
        <p className="text-base font-semibold leading-snug text-red-900">{title}</p>
      </div>
    </div>
    <div className="px-5 pb-6 pt-4 bg-white border-t border-red-50">
      {children}
    </div>
  </div>
);

// ─── Cookie cards ─────────────────────────────────────────────────────────────
const CookieCard = ({ icon: Icon, title, badge, variant, points }) => {
  const s = {
    required:  { tile: "bg-red-100 text-red-800",     badge: "bg-red-50 text-red-800 border border-red-200" },
    analytics: { tile: "bg-sky-100 text-sky-700",     badge: "bg-sky-50 text-sky-700 border border-sky-200" },
    marketing: { tile: "bg-emerald-100 text-emerald-700", badge: "bg-emerald-50 text-emerald-700 border border-emerald-200" },
  }[variant];
  return (
    <div className="group bg-white border border-gray-200 rounded-2xl p-5 hover:border-red-200 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 transition-transform duration-300 group-hover:scale-105 ${s.tile}`}>
        <Icon className="h-5 w-5" />
      </div>
      <div className="flex items-center gap-2 mb-3 flex-wrap">
        <h4 className="text-sm font-bold text-gray-900">{title}</h4>
        <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${s.badge}`}>{badge}</span>
      </div>
      <ul className="space-y-1.5">
        {points.map((p, i) => (
          <li key={i} className="flex items-start gap-2">
            <span className="w-1 h-1 rounded-full mt-2 flex-shrink-0 bg-gray-400" />
            <span className="text-xs text-gray-600 leading-relaxed">{p}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

const CookieTypesGrid = () => (
  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-2">
    <CookieCard icon={Shield}    title="Essential Cookies"  badge="Required" variant="required"  points={["Required for basic website functionality","Cannot be disabled","Shopping cart data, login sessions"]} />
    <CookieCard icon={BarChart3} title="Analytics Cookies"  badge="Optional" variant="analytics" points={["Track website usage patterns","Help improve site performance","Can be disabled in browser settings"]} />
    <CookieCard icon={Target}    title="Marketing Cookies"  badge="Optional" variant="marketing" points={["Track shopping preferences","Enable personalised recommendations","Optional and can be disabled"]} />
  </div>
);

// ─── Tab content ──────────────────────────────────────────────────────────────
const TAB_DATA = {
  "cookie-policy": {
    title: "Cookie Policy",
    subtitle: "How Gulbhahar uses cookies to enhance your shopping experience",
    icon: Cookie,
    sections: [
      {
        id: "what-cookies", icon: Info, title: "What are Cookies?",
        body: (
          <div className="bg-red-50/60 border border-red-100 rounded-xl p-5">
            <p className="text-sm text-gray-700 leading-relaxed">Cookies are small text files stored on your device when visiting our website. They help us provide essential features, analyse site usage, and enhance your shopping experience with personalised recommendations.</p>
          </div>
        ),
      },
      {
        id: "managing", icon: Settings, title: "Managing Cookies",
        body: (
          <ul className="space-y-3">
            {["Change cookie preferences in your browser settings","Disable specific cookie types through our cookie banner","Contact us with any questions about our cookie usage"].map((t, i) => <CheckItem key={i} text={t} />)}
          </ul>
        ),
      },
      {
        id: "types", icon: Cookie, title: "Types of Cookies",
        body: <CookieTypesGrid />,
      },
      {
        id: "manage-prefs", icon: Settings, title: "Manage Cookie Preferences",
        body: (
          <div className="text-center py-2">
            <Cookie className="h-10 w-10 text-red-800 mx-auto mb-3 opacity-70" />
            <p className="text-sm font-semibold text-gray-800 mb-1">Manage Your Cookie Preferences</p>
            <p className="text-sm text-gray-600 mb-5">You have control over your cookie settings. Update your preferences anytime.</p>
            <button className="bg-red-900 text-white px-7 py-2.5 rounded-full text-sm font-bold hover:bg-red-800 transition-colors shadow-[0_4px_12px_rgba(153,27,27,0.25)]">
              Cookie Settings
            </button>
          </div>
        ),
      },
    ],
  },

  terms: {
    title: "Terms of Service",
    subtitle: "The legal terms governing your use of Gulbhahar's website and services",
    icon: FileText,
    sections: [
      {
        id: "returns", icon: RefreshCw, title: "Returns & Exchanges",
        body: (
          <div className="space-y-4">
            <p className="text-sm text-gray-700 leading-relaxed">We use standard EURO sizes to help you pick the perfect size. However, if you want to RETURN, then you may return the pair to us at</p>
            <div className="flex items-start gap-3 bg-amber-50 border border-amber-100 rounded-xl p-4">
              <MapPin className="h-4 w-4 text-amber-500 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-gray-700"><strong>Gulbhahar Exchange Hub, P.O. Box 123456,</strong> Dubai, UAE within 7 Days in its original box packing and the invoice. Please mention your desired exchange piece along with the size on the invoice as well.</p>
            </div>
            <p className="text-sm text-gray-700">You may also mail us at <a href="mailto:support@gulbhahar.com" className="font-semibold text-red-800 underline underline-offset-2">support@gulbhahar.com</a> for the same. We do not entertain cancellation requests.</p>
          </div>
        ),
      },
      {
        id: "exchange", icon: AlertCircle, title: "Exchange Policy",
        body: (
          <div className="space-y-3">
            <p className="text-sm text-gray-700">No Exchange of any products.</p>
            <InfoBanner icon={AlertCircle} warn>Pairs bought on SALE price will not be exchanged or returned.</InfoBanner>
          </div>
        ),
      },
      {
        id: "shipping", icon: Truck, title: "Shipping Policy",
        body: (
          <div className="space-y-4">
            <p className="text-sm text-gray-700 leading-relaxed">We provide <strong className="text-gray-900">FREE shipping</strong> across the UAE on prepaid orders above <strong className="text-gray-900">AED 219</strong>. Once you place an order, your pairs will be shipped within the stipulated time period mentioned beside each style. We partner with trusted international couriers to deliver across all Emirates, including Dubai, Abu Dhabi &amp; Sharjah.</p>
            <InfoBanner><strong>Please Note —</strong> During festive seasons, pandemics, adverse weather conditions, or conditions beyond our control your shipment could get delayed. We assure you that we will try our best to have your parcel delivered to you in good time.</InfoBanner>
          </div>
        ),
      },
    ],
  },

  privacy: {
    title: "Privacy Policy",
    subtitle: "Our commitment to protecting and respecting your personal information",
    icon: Lock,
    sections: [
      {
        id: "commitment", icon: Shield, title: "Our Commitment to Privacy",
        body: (
          <div className="bg-red-50/60 border border-red-100 rounded-xl p-5">
            <p className="text-sm text-gray-700 leading-relaxed">Gulbhahar is committed to protecting the privacy of visitors to this site (the "Site"). At Gulbhahar, we want you to have an enjoyable shopping experience. While we must collect certain personal information, we respect and protect your right to privacy as outlined in this Privacy Policy.</p>
          </div>
        ),
      },
      {
        id: "collection", icon: Info, title: "Information We Collect",
        body: (
          <div className="space-y-3 text-sm text-gray-700 leading-relaxed">
            <p>The nature of the information collected (if any) is simply to allow us to contact you should you choose to or for us to contact you based on a business relation you establish by purchasing or making an order online. This is solely to follow up on any order you may initiate on this site.</p>
            <p>The information stored does <strong className="text-gray-900">NOT</strong> include any financial details, other than details related to the purchase or interest of products by you, and is purely restricted to order, contact, and preferences. We strictly do <strong className="text-gray-900">NOT</strong> capture or store any account or card numbers.</p>
          </div>
        ),
      },
      {
        id: "usage", icon: Eye, title: "How We Use Your Data",
        body: (
          <div className="space-y-3 text-sm text-gray-700 leading-relaxed">
            <p>We may collect your session, contact, and order information on our server and your browser in the form of session storage or cookies. We will NOT share it with any third party, other than those necessary to make the delivery of the product to you, marketing material to you, and improvement purposes.</p>
            <p>We may send marketing material in the form of emails or common digital mediums, to your contact information also. We may also study your spending patterns to improve our service offering. Gulbhahar reserves the right to make alterations to this policy in the future without notice.</p>
          </div>
        ),
      },
      {
        id: "agreement", icon: FileText, title: "Policy Agreement",
        body: <InfoBanner>This Privacy Policy applies to the Site. You agree that your use of the Site signifies your consent to this Privacy Policy. If you do not agree with this Privacy Policy, please do not use the Site.</InfoBanner>,
      },
    ],
  },

  delivery: {
    title: "Delivery & Shipping",
    subtitle: "Everything you need to know about how we deliver your orders",
    icon: Truck,
    sections: [
      {
        id: "shipping", icon: Truck, title: "Gulbhahar Shipping Policy",
        body: (
          <div className="space-y-4">
            <p className="text-sm text-gray-700 leading-relaxed">At Gulbhahar, we offer <strong className="text-gray-900">FREE shipping</strong> across the UAE on prepaid orders above <strong className="text-gray-900">AED 219</strong>. Your order will be processed and shipped within the timeframe specified for each product. We deliver to all Emirates — including Dubai, Abu Dhabi, Sharjah &amp; Ajman — via trusted international couriers.</p>
            <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-5">
              <p className="text-sm font-bold text-emerald-800 mb-3">UAE Delivery Details</p>
              <ul className="space-y-2">{["Standard delivery: 3–5 business days","Express delivery available across the Emirates","Order tracking for all shipments","Cash on delivery available in select Emirates (additional charges may apply)"].map((t, i) => <CheckItem key={i} text={t} />)}</ul>
            </div>
            <div className="bg-amber-50 border border-amber-100 rounded-xl p-5">
              <p className="text-sm font-bold text-amber-800 mb-3">Important Notes</p>
              <ul className="space-y-2">{[
                "Delivery times may extend during festivals, holidays, or unforeseen circumstances",
                "Please ensure accurate shipping address to avoid delivery delays",
                "Contact us immediately if your package arrives damaged",
                "Signature may be required for delivery of high-value orders",
              ].map((t, i) => <CheckItem key={i} text={t} />)}</ul>
            </div>
          </div>
        ),
      },
      {
        id: "timeline", icon: Clock, title: "Order Processing Timeline",
        body: (
          <div className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { n: "01", title: "Order Confirmed", desc: "Immediate email confirmation after purchase" },
                { n: "02", title: "Processing",      desc: "1–2 business days for order verification" },
                { n: "03", title: "Dispatched",      desc: "Next business day after processing" },
              ].map(s => (
                <div key={s.n} className="border border-gray-100 rounded-xl p-5 text-center bg-red-50/40">
                  <p className="text-sm font-bold text-red-900 tracking-widest mb-2">{s.n}</p>
                  <p className="text-sm font-semibold text-gray-800 mb-1">{s.title}</p>
                  <p className="text-xs text-gray-500 leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
            <p className="text-sm text-gray-700 leading-relaxed">You will receive shipping confirmation with tracking information once your order is dispatched. For any delivery-related queries, please contact our customer support at <a href="mailto:support@gulbhahar.com" className="font-semibold text-red-800 underline underline-offset-2">support@gulbhahar.com</a>.</p>
          </div>
        ),
      },
    ],
  },

  refund: {
    title: "Refund & Cancellation",
    subtitle: "Our clear and fair policies for returns, refunds, and cancellations",
    icon: RefreshCw,
    sections: [
      {
        id: "refund", icon: RefreshCw, title: "Refund Policy",
        body: (
          <div className="space-y-4">
            <p className="text-sm text-gray-700 leading-relaxed">We strive for complete customer satisfaction. However, please note our refund policy:</p>
            <ul className="space-y-3 bg-red-50/40 border border-red-100 rounded-xl p-5">
              {["All sales are final unless the product is defective or damaged","Defective items must be reported within 48 hours of delivery"].map((t, i) => <BulletItem key={i} text={t} />)}
            </ul>
          </div>
        ),
      },
      {
        id: "returns", icon: RefreshCw, title: "Returns",
        body: (
          <div className="space-y-4">
            <p className="text-sm text-gray-700 leading-relaxed">Returns take place within <strong className="text-gray-900">7 days</strong>, and an issue has to be raised within <strong className="text-gray-900">24 hours</strong> of delivery.</p>
            <ul className="space-y-3 bg-red-50/40 border border-red-100 rounded-xl p-5">
              {[
                "We do not offer direct exchanges. If you wish to receive a different size, you must initiate a return request for the original item in accordance with our return policy.",
                "Once your return is approved and processed, you may place a new order for your desired size as a separate transaction.",
                "Please note that availability of sizes is not guaranteed and is subject to current stock levels.",
              ].map((t, i) => <BulletItem key={i} text={t} />)}
            </ul>
            <div className="bg-amber-50 border border-amber-100 rounded-xl p-5 space-y-2">
              <p className="text-sm font-bold text-amber-800">Return Pickup Service</p>
              <p className="text-sm text-gray-700 leading-relaxed">For approved return requests, we will arrange a reverse pickup through our designated courier partner at the address provided during the original order. Customers will be notified of the scheduled pickup date and must ensure the item is securely packed in its original packaging, with tags intact. In case the pickup is missed, one additional attempt will be made. If the pickup fails after two attempts, the customer will be responsible for shipping the item back at their own cost.</p>
            </div>
          </div>
        ),
      },
      {
        id: "return", icon: Package, title: "Return Process",
        body: (
          <div className="space-y-5">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {["Contact us within 7 days","Pack item securely","Ship to our address","Receive exchanged item"].map((step, i) => (
                <div key={i} className="flex flex-col items-center gap-2 bg-red-50/40 border border-red-100 rounded-xl p-4 text-center">
                  <span className="text-xs font-bold text-red-900 tracking-widest">0{i + 1}</span>
                  <p className="text-xs text-gray-700 leading-snug">{step}</p>
                </div>
              ))}
            </div>
            <div className="bg-amber-50 border border-amber-100 rounded-xl p-5">
              <p className="text-sm font-bold text-amber-800 mb-3 flex items-center gap-2"><MapPin className="h-4 w-4" /> Return Address</p>
              <div className="text-sm text-gray-700 space-y-1">
                <p className="font-bold">GULBHAHAR</p>
                <p className="text-gray-600">Gulbhahar Exchange Hub, P.O. Box 123456, Dubai, UAE</p>
                <a href="tel:+971505907461" className="flex items-center gap-2 mt-2 text-gray-600 hover:text-red-900 transition-colors"><Phone className="h-3.5 w-3.5" /> +971 50 590 7461</a>
              </div>
              <p className="text-sm text-gray-600 mt-3">For return authorization, please email us at <a href="mailto:support@gulbhahar.com" className="font-semibold text-red-800 underline underline-offset-2">support@gulbhahar.com</a> with your order details.</p>
            </div>
          </div>
        ),
      },
      {
        id: "cancel", icon: XCircle, title: "Order Cancellation",
        body: (
          <div className="space-y-4">
            <p className="text-sm text-gray-700 leading-relaxed">Orders can be cancelled within <strong className="text-gray-900">24 hours</strong> of placement if they haven't entered the processing stage. To request cancellation:</p>
            <ol className="space-y-3">
              {[
                <>Email <a href="mailto:support@gulbhahar.com" className="font-semibold text-red-800 underline underline-offset-2">support@gulbhahar.com</a> with your order number</>,
                <>Include <strong className="text-gray-900">"CANCELLATION REQUEST"</strong> in the subject line</>,
                "We'll confirm if cancellation is possible",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="text-xs font-bold text-red-900 tracking-widest pt-0.5 flex-shrink-0 w-6">0{i + 1}</span>
                  <span className="text-sm text-gray-700">{item}</span>
                </li>
              ))}
            </ol>
            <InfoBanner icon={AlertCircle} warn><strong>Note:</strong> Once the order has been processed and shipped, it cannot be cancelled.</InfoBanner>
          </div>
        ),
      },
    ],
  },
};

// ─── Trust items ──────────────────────────────────────────────────────────────
const TRUST = [
  { icon: Lock,       title: "Data Security",   desc: "All personal data is encrypted and protected using industry-standard security protocols. Your information stays safe with us." },
  { icon: Eye,        title: "Transparency",     desc: "We clearly explain what data we collect, how it's used, and why. No hidden clauses or ambiguous language." },
  { icon: ShieldCheck,title: "Customer Trust",   desc: "Your personal information is never sold or shared with third parties beyond what is required to fulfil your order." },
];

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function LegalPages({ defaultTab = "terms", standalone = false }: { defaultTab?: string; standalone?: boolean }) {
  const data        = TAB_DATA[defaultTab];
  const CurrentIcon = data.icon;

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50/30 to-white font-raleway">

      {/* ════════════════════════════════════════════════════════════
          HERO
      ════════════════════════════════════════════════════════════ */}
      <div className="relative overflow-hidden border-b border-red-100 pt-16 sm:pt-[72px]"
        style={{ background: "linear-gradient(135deg, #FFF5F5 0%, #FAF0F0 55%, #F5E8E8 100%)" }}>

        {/* Dot texture */}
        <div className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(153,27,27,0.07) 1px, transparent 1px)",
            backgroundSize: "26px 26px",
          }} />

        {/* Top red accent line */}
        <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-red-800 to-transparent opacity-40" />

        <div className="relative max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-14 py-10 sm:py-12 text-center">

          {/* Breadcrumb */}
          <nav className="flex items-center justify-center gap-1.5 mb-5">
            {["Home", "Legal", data.title].map((crumb, i, arr) => (
              <span key={i} className="flex items-center gap-1.5">
                {i > 0 && <ChevronRight className="h-3 w-3 text-red-300" />}
                <span className={`text-xs ${
                  i === arr.length - 1 ? "text-red-900 font-semibold" : "text-gray-400"
                }`}>{crumb}</span>
              </span>
            ))}
          </nav>

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-red-200 bg-white/60 mb-4">
            <CurrentIcon className="h-3.5 w-3.5 text-red-800" />
            <span className="text-[11px] font-bold uppercase tracking-widest text-red-800">Legal Document</span>
          </div>

          {/* Title */}
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight tracking-tight mb-3">
            {data.title}
          </h1>

          {/* Subtitle */}
          <p className="text-base text-gray-500 leading-relaxed mb-5 max-w-xl mx-auto">
            {data.subtitle}
          </p>

          {/* Last Updated chip */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/70 border border-red-100 backdrop-blur-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-red-700 flex-shrink-0" />
            <span className="text-xs text-gray-600 font-medium">Last updated · June 2025</span>
          </div>

        </div>
      </div>

      {/* ════════════════════════════════════════════════════════════
          BODY
      ════════════════════════════════════════════════════════════ */}
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-14 py-8 sm:py-10">


        <div className="space-y-3">
          {data.sections.map((s, i) => (
            <AccordionSection
              key={s.id} index={i + 1} icon={s.icon} title={s.title}>
              {s.body}
            </AccordionSection>
          ))}
        </div>

        {/* Support CTA */}
        <div className="mt-10 relative overflow-hidden rounded-3xl px-8 sm:px-14 py-12 text-center border-2 border-red-100"
          style={{ background: "linear-gradient(135deg, #FFF5F5 0%, #FAF0F0 60%, #F5E8E8 100%)" }}>
          <div className="absolute right-0 bottom-0 pointer-events-none select-none opacity-[0.04] translate-x-1/3 translate-y-1/3">
            <FloralMark size={280} />
          </div>
          <div className="absolute top-0 left-1/4 right-1/4 h-[2px] bg-gradient-to-r from-transparent via-red-800 to-transparent opacity-30" />
          <div className="relative">
            <div className="inline-flex items-center gap-3 mb-4">
              <div className="h-px w-8 bg-gradient-to-r from-transparent to-red-300" />
              <span className="text-xs font-bold uppercase tracking-widest text-red-800">Support</span>
              <div className="h-px w-8 bg-gradient-to-l from-transparent to-red-300" />
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">Still Have Questions?</h3>
            <p className="text-base text-gray-500 mb-8 max-w-sm mx-auto leading-relaxed">
              Our team is always here to help you with any queries or concerns.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a href="tel:+971505907461"
                className="flex items-center justify-center gap-2.5 bg-red-900 text-white px-8 py-3.5 rounded-full text-sm font-bold hover:bg-red-800 hover:-translate-y-0.5 transition-all duration-200 shadow-[0_4px_14px_rgba(153,27,27,0.3)]">
                <Phone className="h-4 w-4" /> +971 50 590 7461
              </a>
              <a href="mailto:support@gulbhahar.com"
                className="flex items-center justify-center gap-2.5 bg-white border-2 border-red-200 text-red-900 px-8 py-3.5 rounded-full text-sm font-bold hover:border-red-300 hover:bg-red-50 transition-all duration-200 hover:-translate-y-0.5">
                <Mail className="h-4 w-4" /> Contact Support
              </a>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
