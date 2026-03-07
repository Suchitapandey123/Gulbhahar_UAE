// @ts-nocheck
const ToggleSwitch = ({ 
  id, 
  checked, 
  onChange, 
  disabled = false 
}) => (
  <div className="relative inline-block w-12 h-6">
    <input
      type="checkbox"
      id={id}
      className="sr-only"
      checked={checked}
      onChange={onChange}
      disabled={disabled}
    />
    <label
      htmlFor={id}
      className={`block overflow-hidden h-6 rounded-full cursor-pointer transition-all duration-300 ${
        checked ? 'bg-red-900' : 'bg-gray-300'
      } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      <span
        className={`block w-5 h-5 rounded-full bg-white shadow-md transform transition-all duration-300 ${
          checked ? 'translate-x-6' : 'translate-x-0.5'
        } mt-0.5`}
      />
    </label>
  </div>
);

export default ToggleSwitch;