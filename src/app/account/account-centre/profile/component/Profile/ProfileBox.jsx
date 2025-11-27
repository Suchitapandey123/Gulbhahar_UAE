import { ChevronRight } from "lucide-react";

const ProfileBox = ({
  title,
  description,
  icon: Icon,
  onClick
}) => (
  <div
    className="group bg-white border border-red-100 rounded-xl p-6 cursor-pointer transition-all duration-300 hover:border-red-300 hover:shadow-lg hover:bg-red-50/30"
    onClick={onClick}
  >
    <div className="flex items-center justify-between mb-3">
      <div className="p-3 bg-red-100 rounded-xl group-hover:bg-red-200 transition-colors">
        <Icon className="w-6 h-6 text-red-900" />
      </div>
      <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-red-600 transition-colors" />
    </div>
    <div className="space-y-2">
      <h3 className="font-semibold text-lg text-gray-900 group-hover:text-red-900 transition-colors">
        {title}
      </h3>
      <p className="text-sm text-gray-600 leading-relaxed">
        {description}
      </p>
    </div>
  </div>
);

export default ProfileBox;