import { ChevronRight } from "lucide-react";

const ProfileBox = ({
  title,
  description,
  icon: Icon,
  onClick
}) => (
  <div
    className="group bg-white border border-red-100 rounded-xl p-4 sm:p-6 cursor-pointer transition-all duration-300 hover:border-red-300 hover:shadow-lg hover:bg-red-50/30 active:bg-red-100/50 active:scale-[0.98]"
    onClick={onClick}
    role="button"
    tabIndex={0}
    onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onClick()}
  >
    <div className="flex items-center justify-between mb-2 sm:mb-3">
      <div className="p-2.5 sm:p-3 bg-red-100 rounded-xl group-hover:bg-red-200 transition-colors">
        <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-red-900" />
      </div>
      <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 group-hover:text-red-600 transition-colors" />
    </div>
    <div className="space-y-1.5 sm:space-y-2">
      <h3 className="font-semibold text-base sm:text-lg text-gray-900 group-hover:text-red-900 transition-colors line-clamp-2">
        {title}
      </h3>
      <p className="text-xs sm:text-sm text-gray-600 leading-relaxed line-clamp-3 sm:line-clamp-none">
        {description}
      </p>
    </div>
  </div>
);

export default ProfileBox;