import AuthProtected from "@/shared-components/AuthProtected";
import Breadcrumb from "./components/Breadcrumb";
import Sidebar from "./components/Sidebar";


export default function AccountLayout({ children }) {
  return (
    <AuthProtected>
      <div className=" mt-16 mx-auto max-w-[1600px] px-0 xs:px-3 sm:px-4 py-3 xs:py-4 sm:py-6 md:py-8 min-h-screen flex flex-col xs:mt-10 sm:mt-12 md:mt-14">
        {/* Breadcrumb Navigation */}
        <Breadcrumb />

        {/* Main Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 xs:gap-4 sm:gap-6 md:gap-8 mt-3 xs:mt-4 sm:mt-6 md:mt-8">
          {/* Sidebar */}
          <aside className="lg:col-span-3 bg-white p-2 xs:p-3 sm:p-4 border-r-0 lg:border-r min-h-[200px] xs:min-h-[300px] sm:min-h-[400px] lg:min-h-[450px]">
            <Sidebar />
          </aside>

          {/* Main Content Area (Dynamic Page) */}
          <main className="lg:col-span-9 px-0 py-1 sm:px-2 sm:py-3">
            {children}
          </main>
        </div>
      </div>
    </AuthProtected>
  );
}