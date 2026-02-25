import { cn } from "@/lib/utils";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/modules/(gulbhahar)/common/ui/avatar";
import { Button } from "@/modules/(gulbhahar)/common/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/modules/(gulbhahar)/common/ui/collapsible";
import {
  ChevronDown,
  ChevronUp,
  Crown,
  Gem,
  Heart,
  LogOut,
  Package,
  Plus,
  Settings,
  Sparkles,
  Star,
  User,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

interface GulbhaharSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  userData?: any;
  isAuthenticated?: boolean;
  onLogout?: () => void;
}

const collections = [
  {
    name: "Juttis",
    href: "/juttis",
    icon: Heart,
    count: 14,
    color: "text-rose-500",
  },
  {
    name: "Sarees",
    href: "/saree",
    icon: Sparkles,
    count: 0,
    color: "text-amber-500",
  },
  {
    name: "Suits",
    href: "/suit",
    icon: Gem,
    count: 0,
    color: "text-purple-500",
  },
  {
    name: "Lehenga",
    href: "/lehenga",
    icon: Crown,
    count: 0,
    color: "text-primary",
  },
  {
    name: "Jewellery",
    href: "/jewellery",
    icon: Crown,
    count: 0,
    color: "text-primary",
  },
  {
    name: "Bags",
    href: "/bags",
    icon: Crown,
    count: 0,
    color: "text-primary",
  },
];

const GulbhaharSidebar = ({
  isOpen,
  onClose,
  userData,
  isAuthenticated,
  onLogout,
}: GulbhaharSidebarProps) => {
  const [collectionsOpen, setCollectionsOpen] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const isActive = (path: string) => pathname === path;

  const navItems = [
    {
      path: "/account/account-centre/profile",
      label: "My Profile",
      icon: User,
      badge: null,
    },
    {
      path: "/account/account-centre/my-order",
      label: "My Orders",
      icon: Package,
      badge: null,
    },
    {
      path: "/account/account-centre/settings",
      label: "Settings",
      icon: Settings,
      badge: null,
    },
  ];

  return (
    <>
      {/* Overlay with blur */}
      <div
        className={cn(
          "fixed inset-0 z-[10000] transition-all duration-500",
          isOpen
            ? "bg-black/60 backdrop-blur-sm opacity-100"
            : "opacity-0 pointer-events-none backdrop-blur-none",
        )}
        onClick={onClose}
      />

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 h-full w-full sm:max-w-[450px] bg-sidebar z-[10001]",
          "transform transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
          "flex flex-col floral-pattern sidebar-glow",
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        {/* Decorative top accent */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-accent to-primary" />

        {/* Header */}
        <div className="relative flex items-center justify-between p-6 pb-4">
          <Link
            href="/"
            onClick={onClose}
            className="flex items-center gap-3 group"
          >
            <div className="relative">
              <Image
                src={"/logo.png"}
                alt="Gulbhahar"
                fill
                className="w-12 h-12 object-contain transition-all duration-500 group-hover:scale-110 group-hover:rotate-6"
              />
              <div className="absolute inset-0 bg-primary/10 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
            <div className="flex flex-col">
              <span
                className={`
              text-xl sm:text-2xl  font-normal sm:tracking-[0.2em]
              transition-all duration-700 ease-out transform relative  opacity-100 translate-y-0 text-[#800000]
            `}
                style={{ fontFamily: "Old Standard TT, serif" }}
              >
                GULBHAHAR
              </span>
            </div>
          </Link>
          <button
            onClick={onClose}
            className="p-2.5 rounded-xl bg-muted/50 hover:bg-muted hover:rotate-90 transition-all duration-300"
          >
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>

        {/* User Profile Card */}
        <div
          className={cn(
            "mx-4 mb-4 p-4 premium-card",
            isOpen && "animate-scale-in",
          )}
        >
          <div className="flex items-center gap-4">
            <div className="relative">
              <Avatar className="w-14 h-14 ring-2 ring-primary/30 ring-offset-2 ring-offset-sidebar transition-all duration-300 hover:ring-primary/60">
                <AvatarImage src={userData?.imageUrl || ""} />
                <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-primary-foreground font-display text-lg">
                  {userData?.firstName?.[0] || userData?.name?.[0] || "U"}
                </AvatarFallback>
              </Avatar>
              {isAuthenticated && (
                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-full border-2 border-sidebar flex items-center justify-center">
                  <Star className="w-2.5 h-2.5 text-white fill-white" />
                </div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="font-display text-lg font-semibold text-foreground truncate">
                  {userData?.name || (isAuthenticated ? "User" : "Guest")}
                </h3>
              </div>
              <p className="text-xs text-muted-foreground truncate mt-0.5">
                {userData?.email || "Login to see your account"}
              </p>
            </div>
          </div>
        </div>

        {/* Main Navigation */}
        <nav className="flex-1 overflow-y-auto px-3 py-2">
          {/* <p className="sidebar-section-title mb-2">Account</p>
          <div className="space-y-1">
            {navItems.map((item, index) => (
              <Link
                key={item.path}
                href={item.path}
                onClick={onClose}
                className={cn(
                  "sidebar-nav-link group",
                  isActive(item.path) && "sidebar-nav-link-active",
                  isOpen && `animate-slide-in animate-stagger-${index + 1}`,
                )}
              >
                <div className="relative z-10 flex items-center gap-3 w-full">
                  <div className="p-2 rounded-lg bg-muted/50 group-hover:bg-primary/10 transition-colors duration-300">
                    <item.icon className="w-4 h-4 icon-hover" />
                  </div>
                  <span className="flex-1">{item.label}</span>
                  {item.badge && (
                    <span className="min-w-[22px] h-[22px] px-1.5 bg-gradient-to-r from-primary to-accent text-primary-foreground text-[10px] font-bold flex items-center justify-center rounded-full shadow-sm">
                      {item.badge}
                    </span>
                  )}
                </div>
              </Link>
            ))}
          </div> */}

          {/* Decorative Divider */}
          <div className=" px-2">
            <div className=" mb-2 decorative-line relative">
              <div className="absolute left-1/2 -translate-x-1/2 -top-2 bg-sidebar px-3">
                <Sparkles className="w-4 h-4 text-primary/30" />
              </div>
            </div>
          </div>

          {/* Collections */}
          <Collapsible open={collectionsOpen} onOpenChange={setCollectionsOpen}>
            <CollapsibleTrigger className="w-full flex items-center justify-between px-4 py-3 text-sm rounded-xl hover:bg-muted/50 transition-colors duration-200 group">
              <div className="flex items-center gap-2">
                <p className="sidebar-section-title !p-0">Collections</p>
                <span className="text-[10px] text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
                  {collections.length}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <ChevronUp
                  className={cn(
                    "w-4 h-4 text-muted-foreground transition-transform duration-300",
                    collectionsOpen && "rotate-180",
                  )}
                />
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent className="overflow-hidden data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up">
              <div className="mt-2 space-y-1 pl-2">
                {collections.map((collection, index) => (
                  <Link
                    key={collection.name}
                    href={collection.href}
                    onClick={onClose}
                    className={cn(
                      "flex items-center justify-between px-4 py-3 text-sm rounded-xl",
                      "text-muted-foreground hover:text-foreground hover:bg-muted/50",
                      "transition-all duration-300 group",
                      isOpen && `animate-slide-in animate-stagger-${index + 1}`,
                    )}
                  >
                    <div className="flex items-center gap-3">
                      {/* <div
                        className={cn(
                          "p-2 rounded-lg bg-muted/50 group-hover:scale-110 transition-transform duration-300",
                          collection.color,
                        )}
                      >
                        <collection.icon className="w-4 h-4" />
                      </div> */}
                      <span className="group-hover:translate-x-1 transition-transform duration-300">
                        {collection.name}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </CollapsibleContent>
          </Collapsible>

          {/* View All Collections Button */}
          <div className="mt-4 px-2">
            <Button
              className="w-full btn-burgundy font-medium tracking-wider py-4 rounded-xl text-sm"
              asChild
            >
              <Link
                href="/collections"
                onClick={onClose}
                className="flex items-center justify-center gap-2"
              >
                <Gem className="w-4 h-4" />
                VIEW ALL COLLECTIONS
              </Link>
            </Button>
          </div>

          {/* Decorative Divider */}
          <div className="my-5 px-2">
            <div className="decorative-line" />
          </div>

          {/* Secondary Navigation */}
          {/* <div className="space-y-1">
            <Link
              href="/about"
              className={cn(
                "sidebar-nav-link group",
                isActive("/about-us") && "sidebar-nav-link-active",
              )}
            >
              <div className="relative z-10 flex items-center gap-3">
                <div className="p-2 rounded-lg bg-muted/50 group-hover:bg-primary/10 transition-colors duration-300">
                  <Info className="w-4 h-4 icon-hover" />
                </div>
                <span>About</span>
              </div>
            </Link>
            <Link
              href="/cart"
              className={cn(
                "sidebar-nav-link group",
                isActive("/cart") && "sidebar-nav-link-active",
              )}
            >
              <div className="relative z-10 flex items-center gap-3 w-full">
                <div className="relative p-2 rounded-lg bg-muted/50 group-hover:bg-primary/10 transition-colors duration-300">
                  <ShoppingCart className="w-4 h-4 icon-hover" />
                  <span className="floating-badge">3</span>
                </div>
                <span className="flex-1">Shopping Cart</span>
                <span className="text-xs text-muted-foreground">₹87,997</span>
              </div>
            </Link>
          </div> */}
        </nav>

        {/* Footer */}
        <div className="p-2 border-t border-sidebar-border/50">
          {/* Account Section */}
          <div className="mb-4 p-3 bg-muted/30 rounded-xl">
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-3 px-1">
              Account
            </p>
            <div className="flex items-center gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  onClick={onClose}
                  className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-xs font-medium text-foreground bg-muted/50 hover:bg-primary/10 rounded-lg transition-all duration-300"
                >
                  <item.icon className="w-3.5 h-3.5" />
                  <span >{item.label}</span>
                </Link>
              ))}
            </div>
          </div>

          {isAuthenticated ? (
            <button
              onClick={onLogout}
              className="flex items-center justify-center gap-3 w-full px-4 py-3 text-sm font-medium text-accent hover:text-destructive hover:bg-destructive/5 rounded-xl transition-all duration-300 group"
            >
              <LogOut className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" />
              <span>Sign Out</span>
            </button>
          ) : (
            <Link
              href="/login"
              onClick={onClose}
              className="flex items-center justify-center gap-3 w-full px-4 py-3 text-sm font-medium text-primary hover:bg-primary/5 rounded-xl transition-all duration-300 group"
            >
              <User className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
              <span>Sign In</span>
            </Link>
          )}
        </div>

        {/* Decorative bottom accent */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-accent to-primary opacity-50" />
      </aside>
    </>
  );
};

export default GulbhaharSidebar;
