"use client"

import { useCallback, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaArrowLeft } from 'react-icons/fa6';
import { IoIosArrowBack } from 'react-icons/io';
import { FiLock, FiEye, FiEyeOff, FiMail, FiShield, FiCheck } from 'react-icons/fi';
import { useMutation } from '@tanstack/react-query';
import forgotPasswordAPI from '../../api/forgot-password/forgotPassword';
import { toast } from 'sonner';

// ── Images & bg colors (same as Login) ───────────────────────────────────────
const images = [
  "https://d21ojmskh8ksuv.cloudfront.net/static/home/available-collections/bags.webp",
  "https://d21ojmskh8ksuv.cloudfront.net/static/home/available-collections/lehenga.webp",
  "https://d21ojmskh8ksuv.cloudfront.net/static/home/available-collections/suits.webp",
];
const bgColors = ["#665937", "#785025", "#e4c3a6"];

// ─────────────────────────────────────────────────────────────────────────────
//  DESKTOP — image slider (unchanged from Login)
// ─────────────────────────────────────────────────────────────────────────────
function MotionImageSlider({ onColorChange }) {
  const [index, setIndex] = useState(0);
  useEffect(() => { onColorChange(bgColors[index]); }, [index, onColorChange]);
  useEffect(() => {
    const t = setInterval(() => setIndex(p => (p + 1) % images.length), 3500);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="relative w-full h-full overflow-hidden md:rounded-l-2xl">
      <AnimatePresence>
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="absolute inset-0"
          style={{ backgroundImage: `url(${images[index]})`, backgroundSize: 'cover', backgroundPosition: 'top center' }}
        />
      </AnimatePresence>
      <div className="absolute bottom-8 left-8 flex gap-2 z-10">
        {images.map((_, i) => (
          <span key={i} className={`h-2 rounded-full transition-all duration-300 ${i === index ? "w-5 bg-white" : "w-2 bg-white/40"}`} />
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
//  MOBILE — hero image slider with centered overlay text
// ─────────────────────────────────────────────────────────────────────────────
function MobileHeroSlider() {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIndex(p => (p + 1) % images.length), 4000);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="relative w-full h-full overflow-hidden">
      <AnimatePresence>
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 1.06 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="absolute inset-0"
          style={{ backgroundImage: `url(${images[index]})`, backgroundSize: 'cover', backgroundPosition: 'top center' }}
        />
      </AnimatePresence>
      {/* Rich layered gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-black/75" />
      {/* Centered brand + title */}
      <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center z-10">
        <p className="text-white/60 text-[9px] font-semibold tracking-[0.3em] uppercase mb-2">Gulbhahar</p>
        <h1 className="text-white text-[26px] font-serif font-light leading-tight">
          Account<br /><span className="italic">Recovery</span>
        </h1>
        <div className="w-8 h-px bg-white/40 mt-3" />
      </div>
      {/* Slide dots */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-1.5 z-10">
        {images.map((_, i) => (
          <span key={i} className={`h-1 rounded-full transition-all duration-400 ${i === index ? "w-5 bg-white" : "w-1.5 bg-white/35"}`} />
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
//  MOBILE — luxury floating label input
// ─────────────────────────────────────────────────────────────────────────────
function MobileFloatingInput({ id, type = "text", label, value, onChange, onBlur, error, rightElement }) {
  const [focused, setFocused] = useState(false);
  const isFloated = focused || (value && value.length > 0);

  return (
    <div>
      <div className={`relative rounded-2xl border-2 transition-all duration-300 ${
        error
          ? 'border-red-300 bg-red-50/30'
          : focused
          ? 'border-rose-300 bg-white/90 shadow-lg shadow-rose-100/70'
          : 'border-rose-100/80 bg-white/70'
      } backdrop-blur-sm`}>
        <input
          id={id}
          type={type}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={(e) => { setFocused(false); if (onBlur) onBlur(e); }}
          placeholder=""
          className="w-full pt-[22px] pb-[10px] px-4 bg-transparent text-[#3d1010] text-[15px] tracking-wide focus:outline-none"
          style={{ paddingRight: rightElement ? '48px' : '16px' }}
        />
        <label
          htmlFor={id}
          className={`absolute left-4 pointer-events-none transition-all duration-200 ${
            isFloated
              ? 'top-[7px] text-[10px] font-semibold text-rose-500 tracking-widest uppercase'
              : 'top-1/2 -translate-y-1/2 text-[14px] text-gray-400 font-normal'
          }`}
        >
          {label}
        </label>
        {rightElement && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2">{rightElement}</div>
        )}
      </div>
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-1.5 text-[11px] text-red-500 flex items-center gap-1 pl-1"
        >
          <span className="w-1 h-1 rounded-full bg-red-400 inline-block flex-shrink-0" />
          {error}
        </motion.p>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
//  MOBILE — luxury gradient button
// ─────────────────────────────────────────────────────────────────────────────
function MobileLuxuryButton({ onClick, disabled, isLoading, loadingText, children }) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      disabled={disabled}
      whileTap={{ scale: disabled ? 1 : 0.97 }}
      whileHover={{ y: disabled ? 0 : -2 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      className="w-full py-[15px] rounded-2xl bg-gradient-to-r from-[#911b1b] via-[#b91c1c] to-[#dc2626] text-white text-[15px] font-semibold tracking-wide shadow-lg shadow-rose-300/40 hover:shadow-xl hover:shadow-rose-400/50 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-shadow duration-300"
    >
      {isLoading ? (
        <>
          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          <span>{loadingText}</span>
        </>
      ) : children}
    </motion.button>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
//  MOBILE — clean minimal progress bar indicator
// ─────────────────────────────────────────────────────────────────────────────
function MobileStepIndicator({ currentStep }) {
  const steps = ["Email", "Verify", "Password"];
  const fillPercent = ((currentStep - 1) / (steps.length - 1)) * 100;

  return (
    <div className="mb-6 px-1">
      {/* Thin progress bar with step dots */}
      <div className="relative h-[3px] rounded-full mb-3" style={{ background: 'rgba(253,164,175,0.2)' }}>
        <motion.div
          className="absolute top-0 left-0 h-full rounded-full"
          style={{ background: 'linear-gradient(90deg, #911b1b, #b91c1c)' }}
          initial={{ width: '0%' }}
          animate={{ width: `${fillPercent}%` }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        />
        {steps.map((_, i) => {
          const pct = (i / (steps.length - 1)) * 100;
          const done = currentStep > i + 1;
          const active = currentStep === i + 1;
          return (
            <div
              key={i}
              className="absolute w-[10px] h-[10px] rounded-full -top-[3.5px] transition-all duration-400 border-2"
              style={{
                left: `calc(${pct}% - 5px)`,
                background: done ? 'linear-gradient(135deg,#911b1b,#b91c1c)' : active ? '#fff' : '#fff',
                borderColor: done ? 'transparent' : active ? '#b91c1c' : 'rgba(253,164,175,0.5)',
                boxShadow: active ? '0 0 0 3px rgba(253,164,175,0.25)' : 'none',
              }}
            />
          );
        })}
      </div>
      {/* Step labels */}
      <div className="flex justify-between">
        {steps.map((label, i) => (
          <span
            key={i}
            className="text-[9px] font-semibold tracking-widest uppercase transition-colors duration-300"
            style={{ color: currentStep >= i + 1 ? '#911b1b' : 'rgba(253,164,175,0.6)' }}
          >
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
//  DESKTOP — step indicator (unchanged)
// ─────────────────────────────────────────────────────────────────────────────
const StepIndicator = ({ currentStep }) => {
  const steps = [
    { id: 1, label: "Email",    icon: FiMail },
    { id: 2, label: "Verify",   icon: FiShield },
    { id: 3, label: "Password", icon: FiLock },
  ];
  return (
    <div className="flex items-center justify-center mb-6 sm:mb-7">
      {steps.map((step, index) => (
        <div key={step.id} className="flex items-center">
          <div className="flex flex-col items-center">
            <div className={`flex items-center justify-center w-9 h-9 rounded-full border-2 transition-all duration-300 ${
              currentStep > step.id  ? 'bg-[#911b1b] border-[#911b1b] text-white shadow-md shadow-[#911b1b]/20'
              : currentStep === step.id ? 'border-[#911b1b] text-[#911b1b] bg-red-50 shadow-sm'
              : 'border-gray-200 text-gray-400 bg-white'
            }`}>
              {currentStep > step.id ? <FiCheck className="w-4 h-4" /> : <step.icon className="w-4 h-4" />}
            </div>
            <span className={`text-[10px] font-semibold mt-1.5 transition-colors tracking-wide ${
              currentStep >= step.id ? 'text-[#911b1b]' : 'text-gray-400'
            }`}>{step.label}</span>
          </div>
          {index < steps.length - 1 && (
            <div className={`w-12 sm:w-16 h-px mx-2 sm:mx-3 mb-5 transition-all duration-500 ${
              currentStep > step.id ? 'bg-[#911b1b]' : 'bg-gray-200'
            }`} />
          )}
        </div>
      ))}
    </div>
  );
};

// ═════════════════════════════════════════════════════════════════════════════
//  STEP 1 — Email Confirmation
//  variant="mobile" → luxury UI  |  variant="desktop" → original UI
// ═════════════════════════════════════════════════════════════════════════════
const EmailConfirmationStep = ({ email, setEmail, goToNextStep, variant = 'desktop' }) => {
  const [emailError, setEmailError] = useState('');
  const [touched, setTouched] = useState(false);

  const forgotPasswordMutation = useMutation({
    mutationFn: forgotPasswordAPI.forgotPassword,
    onSuccess: () => { toast.success('Verification email sent successfully!'); goToNextStep(); },
    onError: (error) => {
      console.error('Error sending email:', error);
      const msg = error.response?.data?.message || 'Failed to send verification email. Please try again.';
      setEmailError(msg);
      toast.error(msg);
    },
  });

  const validateEmail = (v) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!v) { setEmailError('Email is required'); return false; }
    if (!re.test(v)) { setEmailError('Invalid email format'); return false; }
    setEmailError(''); return true;
  };
  const handleEmailChange = (e) => { setEmail(e.target.value); if (touched) validateEmail(e.target.value); };
  const handleBlur = () => { setTouched(true); validateEmail(email); };
  const handleSubmit = (e) => {
    e.preventDefault(); setTouched(true);
    if (validateEmail(email)) forgotPasswordMutation.mutate(email);
  };

  // ── MOBILE UI ─────────────────────────────────────────────────────────────
  if (variant === 'mobile') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.35, ease: 'easeOut' }}
      >
        <p className="text-[9px] font-semibold tracking-[0.3em] text-rose-400/70 uppercase mb-3 text-center">
          Step 1 of 3
        </p>
        <h2 className="text-[27px] text-[#3d1010] font-light text-center leading-snug mb-2"
          style={{ fontFamily: "'Old Standard TT', serif" }}>
          Forgot Your <em>Password?</em>
        </h2>
        <p className="text-gray-400 text-[13px] text-center mb-7 leading-relaxed">
          Enter your email and we&apos;ll send you a recovery code.
        </p>
        <div className="space-y-4">
          <MobileFloatingInput
            id="m-email" type="email" label="Email address"
            value={email} onChange={handleEmailChange} onBlur={handleBlur}
            error={touched && emailError}
          />
          <MobileLuxuryButton
            onClick={handleSubmit}
            disabled={forgotPasswordMutation.isPending}
            isLoading={forgotPasswordMutation.isPending}
            loadingText="Sending..."
          >
            <FiMail className="w-4 h-4" /> Send Recovery Code
          </MobileLuxuryButton>
        </div>
      </motion.div>
    );
  }

  // ── DESKTOP UI (unchanged) ────────────────────────────────────────────────
  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.35, ease: 'easeOut' }}
    >
      <h2 className="text-2xl sm:text-[28px] text-center font-bold bg-gradient-to-r from-[#911b1b] to-red-700 bg-clip-text text-transparent mb-1.5">
        Forgot Password?
      </h2>
      <p className="text-gray-500 text-sm text-center mb-7 leading-relaxed">
        Enter your email and we'll send you a recovery code.
      </p>
      <div className="space-y-4">
        <div>
          <input
            type="email" value={email} onChange={handleEmailChange} onBlur={handleBlur}
            placeholder="Email Address"
            className={`w-full bg-white shadow-sm p-4 rounded-xl outline-none text-base border transition-all duration-300 ${
              touched && emailError ? 'border-red-400 focus:ring-2 focus:ring-red-200'
              : 'border-gray-200 focus:border-[#911b1b] focus:ring-2 focus:ring-[#911b1b]/20'
            }`}
          />
          {touched && emailError && (
            <p className="mt-2 text-xs text-red-500 flex items-center gap-1.5 pl-1">
              <span className="w-1 h-1 rounded-full bg-red-500 inline-block flex-shrink-0" />{emailError}
            </p>
          )}
        </div>
        <button type="button" onClick={handleSubmit} disabled={forgotPasswordMutation.isPending}
          className="w-full bg-gradient-to-r from-[#911b1b] to-[#7a1515] text-white py-4 rounded-xl shadow-lg disabled:opacity-50 cursor-pointer hover:shadow-xl active:scale-[0.98] transition-all duration-300 text-base font-semibold mt-1">
          {forgotPasswordMutation.isPending
            ? <span className="flex items-center justify-center"><div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />Sending...</span>
            : 'Send Recovery Code'}
        </button>
      </div>
    </motion.div>
  );
};

// ═════════════════════════════════════════════════════════════════════════════
//  STEP 2 — Verification Code
// ═════════════════════════════════════════════════════════════════════════════
const VerificationCodeStep = ({ email, goToNextStep, goToPrevStep, setVerificationCode: setParentCode, variant = 'desktop' }) => {
  const [verificationCode, setVerificationCode] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const verifyEmailMutation = useMutation({
    mutationFn: ({ email, verificationCode }) => forgotPasswordAPI.verifyEmail(email, verificationCode),
    onSuccess: () => {
      setError(''); setSuccessMessage('Email verified successfully!');
      toast.success('Email verified successfully!');
      const code = verificationCode.join('');
      setParentCode(code);
      setTimeout(() => goToNextStep(), 1000);
    },
    onError: (error) => {
      console.error('Error verifying email:', error);
      const msg = error.response?.data?.message || 'Invalid verification code. Please try again.';
      setError(msg); setSuccessMessage(''); toast.error(msg);
    },
  });

  const resendEmailMutation = useMutation({
    mutationFn: forgotPasswordAPI.forgotPassword,
    onSuccess: () => {
      setError(''); setSuccessMessage('Verification code resent successfully!');
      toast.success('Verification code resent successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);
    },
    onError: (error) => {
      console.error('Error resending email:', error);
      const msg = error.response?.data?.message || 'Failed to resend verification email.';
      setError(msg); setSuccessMessage(''); toast.error(msg);
    },
  });

  const handleCodeChange = (index, value) => {
    if (value.length > 1) return;
    const nc = [...verificationCode]; nc[index] = value; setVerificationCode(nc);
    if (value !== '' && index < 5) { const n = document.getElementById(`code-${index + 1}`); if (n) n.focus(); }
  };
  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && verificationCode[index] === '' && index > 0) {
      const p = document.getElementById(`code-${index - 1}`); if (p) p.focus();
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (verificationCode.some(c => c === '')) { setError('Please enter the complete verification code'); return; }
    verifyEmailMutation.mutate({ email, verificationCode: verificationCode.join('') });
  };
  const handleResendCode = () => resendEmailMutation.mutate(email);

  // ── MOBILE UI ─────────────────────────────────────────────────────────────
  if (variant === 'mobile') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.35, ease: 'easeOut' }}
        className="text-center"
      >
        <p className="text-[9px] font-semibold tracking-[0.3em] text-rose-400/70 uppercase mb-3">Step 2 of 3</p>
        <h2 className="text-[27px] text-[#3d1010] font-light leading-snug mb-2"
          style={{ fontFamily: "'Old Standard TT', serif" }}>
          Check Your <em>Email</em>
        </h2>
        <p className="text-gray-400 text-[13px] mb-1 leading-relaxed">We sent a 6-digit code to</p>
        <p className="font-semibold text-[13px] mb-6 truncate px-2" style={{ color: '#911b1b' }}>{email}</p>

        <div className="space-y-5">
          {/* OTP boxes — luxury style */}
          <div className="flex justify-center gap-2.5">
            {verificationCode.map((code, index) => (
              <input
                key={index} id={`code-${index}`} type="text" maxLength={1} value={code}
                onChange={(e) => handleCodeChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="w-11 text-center rounded-2xl border-2 border-rose-100/80 bg-white/70 backdrop-blur-sm text-xl font-bold text-[#3d1010] focus:border-rose-300 focus:shadow-lg focus:shadow-rose-100/70 focus:outline-none transition-all duration-200"
                style={{ height: '52px' }}
              />
            ))}
          </div>

          {error && (
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="text-[11px] text-red-500 flex items-center justify-center gap-1.5">
              <span className="w-1 h-1 rounded-full bg-red-400 inline-block" />{error}
            </motion.p>
          )}
          {successMessage && (
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="text-[11px] text-emerald-600 flex items-center justify-center gap-1.5">
              <FiCheck className="w-3.5 h-3.5" />{successMessage}
            </motion.p>
          )}

          <MobileLuxuryButton
            onClick={handleSubmit}
            disabled={verifyEmailMutation.isPending}
            isLoading={verifyEmailMutation.isPending}
            loadingText="Verifying..."
          >
            <FiShield className="w-4 h-4" /> Verify Code
          </MobileLuxuryButton>

          <div className="flex items-center justify-between pt-1">
            <button type="button" onClick={goToPrevStep}
              className="flex items-center gap-1 text-[13px] font-medium transition-colors group" style={{ color: '#911b1b' }}>
              <IoIosArrowBack className="group-hover:-translate-x-0.5 transition-transform" />
              Change Email
            </button>
            <button type="button" onClick={handleResendCode} disabled={resendEmailMutation.isPending}
              className="text-[13px] font-semibold underline underline-offset-2 transition-colors disabled:opacity-50" style={{ color: '#911b1b' }}>
              {resendEmailMutation.isPending ? 'Resending...' : 'Resend code'}
            </button>
          </div>
        </div>
      </motion.div>
    );
  }

  // ── DESKTOP UI (unchanged) ────────────────────────────────────────────────
  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.35, ease: 'easeOut' }}
      className="text-center"
    >
      <h2 className="text-2xl sm:text-[28px] font-bold bg-gradient-to-r from-[#911b1b] to-red-700 bg-clip-text text-transparent mb-1.5">
        Check Your Email
      </h2>
      <p className="text-gray-500 text-sm mb-0.5">We sent a 6-digit code to</p>
      <p className="text-[#911b1b] font-semibold text-sm mb-7 truncate px-4">{email}</p>
      <div className="space-y-4">
        <div className="flex justify-center gap-2 sm:gap-3">
          {verificationCode.map((code, index) => (
            <input key={index} id={`code-${index}`} type="text" maxLength={1} value={code}
              onChange={(e) => handleCodeChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className="w-11 text-center border border-gray-200 rounded-xl text-xl font-bold text-[#911b1b] focus:border-[#911b1b] focus:ring-2 focus:ring-[#911b1b]/20 focus:outline-none transition-all duration-200 bg-white shadow-sm"
              style={{ height: '52px' }} />
          ))}
        </div>
        {error && <p className="text-xs text-red-500 flex items-center justify-center gap-1.5"><span className="w-1 h-1 rounded-full bg-red-500 inline-block" />{error}</p>}
        {successMessage && <p className="text-xs text-green-600 flex items-center justify-center gap-1.5"><FiCheck className="w-3.5 h-3.5" />{successMessage}</p>}
        <button type="button" onClick={handleSubmit} disabled={verifyEmailMutation.isPending}
          className="w-full bg-gradient-to-r from-[#911b1b] to-[#7a1515] text-white py-4 rounded-xl shadow-lg disabled:opacity-50 cursor-pointer hover:shadow-xl active:scale-[0.98] transition-all duration-300 text-base font-semibold">
          {verifyEmailMutation.isPending
            ? <span className="flex items-center justify-center"><div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />Verifying...</span>
            : 'Verify Code'}
        </button>
        <div className="flex items-center justify-between text-sm pt-1">
          <button type="button" onClick={goToPrevStep} className="text-[#911b1b] hover:text-[#7a1515] font-medium transition-colors flex items-center gap-1 group">
            <IoIosArrowBack className="group-hover:-translate-x-0.5 transition-transform" />Change Email
          </button>
          <button type="button" onClick={handleResendCode} disabled={resendEmailMutation.isPending}
            className="text-[#911b1b] hover:text-[#7a1515] font-medium underline underline-offset-2 transition-colors disabled:opacity-50">
            {resendEmailMutation.isPending ? 'Resending...' : 'Resend code'}
          </button>
        </div>
      </div>
    </motion.div>
  );
};

// ═════════════════════════════════════════════════════════════════════════════
//  STEP 3 — Create New Password
// ═════════════════════════════════════════════════════════════════════════════
const CreatePasswordStep = ({ email, verificationCode, goToHomePage, variant = 'desktop' }) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmError, setConfirmError] = useState('');
  const [touched, setTouched] = useState({ password: false, confirm: false });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const resetPasswordMutation = useMutation({
    mutationFn: forgotPasswordAPI.resetPassword,
    onSuccess: () => { alert('Password reset successfully! Redirecting to login...'); setTimeout(() => goToHomePage(), 2000); },
    onError: (error) => {
      console.error('Error resetting password:', error);
      setPasswordError(error.response?.data?.message || 'Failed to reset password. Please try again.');
    },
  });

  const validatePassword = (v) => {
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!v) { setPasswordError('Password is required'); return false; }
    if (!re.test(v)) { setPasswordError('Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character'); return false; }
    setPasswordError(''); return true;
  };
  const validateConfirmPassword = (c) => {
    if (!c) { setConfirmError('Please confirm your password'); return false; }
    if (c !== password) { setConfirmError('Passwords do not match'); return false; }
    setConfirmError(''); return true;
  };
  const handlePasswordChange = (e) => { setPassword(e.target.value); if (touched.password) validatePassword(e.target.value); };
  const handleConfirmChange = (e) => { setConfirmPassword(e.target.value); if (touched.confirm) validateConfirmPassword(e.target.value); };
  const handleBlur = (field) => {
    setTouched({ ...touched, [field]: true });
    if (field === 'password') validatePassword(password); else validateConfirmPassword(confirmPassword);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const pv = validatePassword(password), cv = validateConfirmPassword(confirmPassword);
    setTouched({ password: true, confirm: true });
    if (pv && cv) resetPasswordMutation.mutate({ email, verificationCode, newPassword: password });
  };

  // ── MOBILE UI ─────────────────────────────────────────────────────────────
  if (variant === 'mobile') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.35, ease: 'easeOut' }}
      >
        <p className="text-[9px] font-semibold tracking-[0.3em] text-rose-400/70 uppercase mb-3 text-center">Final Step</p>
        <h2 className="text-[27px] text-[#3d1010] font-light text-center leading-snug mb-2"
          style={{ fontFamily: "'Old Standard TT', serif" }}>
          Create New <em>Password</em>
        </h2>
        <p className="text-gray-400 text-[13px] text-center mb-7 leading-relaxed">
          Set a strong new password for your account.
        </p>
        <div className="space-y-4">
          <MobileFloatingInput
            id="m-password"
            type={showPassword ? 'text' : 'password'}
            label="New password"
            value={password} onChange={handlePasswordChange} onBlur={() => handleBlur('password')}
            error={touched.password && passwordError}
            rightElement={
              <button type="button" onClick={() => setShowPassword(!showPassword)}
                className="text-rose-300 hover:text-rose-500 transition-colors cursor-pointer">
                {showPassword ? <FiEyeOff size={17} /> : <FiEye size={17} />}
              </button>
            }
          />
          <MobileFloatingInput
            id="m-confirm"
            type={showConfirmPassword ? 'text' : 'password'}
            label="Confirm password"
            value={confirmPassword} onChange={handleConfirmChange} onBlur={() => handleBlur('confirm')}
            error={touched.confirm && confirmError}
            rightElement={
              <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="text-rose-300 hover:text-rose-500 transition-colors cursor-pointer">
                {showConfirmPassword ? <FiEyeOff size={17} /> : <FiEye size={17} />}
              </button>
            }
          />
          <MobileLuxuryButton
            onClick={handleSubmit}
            disabled={resetPasswordMutation.isPending}
            isLoading={resetPasswordMutation.isPending}
            loadingText="Updating..."
          >
            <FiCheck className="w-4 h-4" /> Update Password
          </MobileLuxuryButton>
        </div>
      </motion.div>
    );
  }

  // ── DESKTOP UI (unchanged) ────────────────────────────────────────────────
  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.35, ease: 'easeOut' }}
    >
      <h2 className="text-2xl sm:text-[28px] text-center font-bold bg-gradient-to-r from-[#911b1b] to-red-700 bg-clip-text text-transparent mb-1.5">
        New Password
      </h2>
      <p className="text-gray-500 text-sm text-center mb-7 leading-relaxed">Create a strong new password for your account.</p>
      <div className="space-y-4">
        <div>
          <div className="relative">
            <input type={showPassword ? 'text' : 'password'} value={password} onChange={handlePasswordChange} onBlur={() => handleBlur('password')} placeholder="New Password"
              className={`w-full bg-white shadow-sm p-4 pr-12 rounded-xl outline-none text-base border transition-all duration-300 ${touched.password && passwordError ? 'border-red-400 focus:ring-2 focus:ring-red-200' : 'border-gray-200 focus:border-[#911b1b] focus:ring-2 focus:ring-[#911b1b]/20'}`} />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-400 hover:text-[#911b1b] transition-colors cursor-pointer">
              {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
            </button>
          </div>
          {touched.password && passwordError && <p className="mt-2 text-xs text-red-500 flex items-start gap-1.5 pl-1"><span className="w-1 h-1 rounded-full bg-red-500 inline-block mt-1.5 flex-shrink-0" />{passwordError}</p>}
        </div>
        <div>
          <div className="relative">
            <input type={showConfirmPassword ? 'text' : 'password'} value={confirmPassword} onChange={handleConfirmChange} onBlur={() => handleBlur('confirm')} placeholder="Confirm Password"
              className={`w-full bg-white shadow-sm p-4 pr-12 rounded-xl outline-none text-base border transition-all duration-300 ${touched.confirm && confirmError ? 'border-red-400 focus:ring-2 focus:ring-red-200' : 'border-gray-200 focus:border-[#911b1b] focus:ring-2 focus:ring-[#911b1b]/20'}`} />
            <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-400 hover:text-[#911b1b] transition-colors cursor-pointer">
              {showConfirmPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
            </button>
          </div>
          {touched.confirm && confirmError && <p className="mt-2 text-xs text-red-500 flex items-center gap-1.5 pl-1"><span className="w-1 h-1 rounded-full bg-red-500 inline-block flex-shrink-0" />{confirmError}</p>}
        </div>
        <button type="button" onClick={handleSubmit} disabled={resetPasswordMutation.isPending}
          className="w-full bg-gradient-to-r from-[#911b1b] to-[#7a1515] text-white py-4 rounded-xl shadow-lg disabled:opacity-50 cursor-pointer hover:shadow-xl active:scale-[0.98] transition-all duration-300 text-base font-semibold mt-1">
          {resetPasswordMutation.isPending
            ? <span className="flex items-center justify-center"><div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />Updating...</span>
            : 'Update Password'}
        </button>
      </div>
    </motion.div>
  );
};

// ═════════════════════════════════════════════════════════════════════════════
//  MAIN PAGE
// ═════════════════════════════════════════════════════════════════════════════
const RecoverAccountPage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [bgColor, setBgColor] = useState(bgColors[0]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => { setIsMounted(true); }, []);

  const goToNextStep = () => setCurrentStep(p => Math.min(p + 1, 3));
  const goToPrevStep = () => setCurrentStep(p => Math.max(p - 1, 1));
  const goToHomePage = () => { window.location.href = '/'; };
  const handleColorChange = useCallback((color) => setBgColor(color), []);

  const renderStep = (variant = 'desktop') => {
    switch (currentStep) {
      case 1: return <EmailConfirmationStep email={email} setEmail={setEmail} goToNextStep={goToNextStep} variant={variant} />;
      case 2: return <VerificationCodeStep email={email} goToNextStep={goToNextStep} goToPrevStep={goToPrevStep} setVerificationCode={setVerificationCode} variant={variant} />;
      case 3: return <CreatePasswordStep email={email} verificationCode={verificationCode} goToHomePage={goToHomePage} variant={variant} />;
      default: return <EmailConfirmationStep email={email} setEmail={setEmail} goToNextStep={goToNextStep} variant={variant} />;
    }
  };

  return (
    <motion.div
      className="w-full h-auto md:min-h-screen bg-gradient-to-br from-white to-red-50 flex items-start md:items-center justify-center p-0 md:p-6 md:pt-4"
      animate={{
        backgroundColor: isMounted && typeof window !== 'undefined' && window.innerWidth >= 1024 ? bgColor : '#ffffff',
      }}
      transition={{ duration: 1, ease: "easeInOut" }}
    >

      {/* ══════════════════════════════════════════════════════════════════════
          MOBILE LAYOUT  (<md)
          Luxury 2026: blush gradient bg · hero image 35vh · glassmorphism sheet
      ══════════════════════════════════════════════════════════════════════ */}
      <div className="md:hidden w-full overflow-y-auto"
        style={{ height: 'calc(100vh - 52px)', marginTop: '52px', background: 'linear-gradient(160deg, #fdf0ec 0%, #fef6f0 40%, #fff8f2 70%, #fffaf5 100%)' }}>

        {/* ── Hero image — sticky within scroll container ── */}
        <div className="sticky top-0 z-0 flex-shrink-0" style={{ height: '35vh', minHeight: '220px', maxHeight: '300px' }}>
          <MobileHeroSlider />

          {/* Glassmorphism back button */}
          <button
            onClick={() => { window.location.href = '/login'; }}
            className="absolute top-4 left-4 z-20 flex items-center gap-1.5 text-white bg-white/15 hover:bg-white/25 backdrop-blur-md border border-white/25 transition-all duration-200 px-3 py-1.5 rounded-full text-[12px] font-medium"
          >
            <FaArrowLeft size={11} /> Back
          </button>
        </div>

        {/* ── Floating bottom-sheet card ── */}
       <div
  className="relative z-10 -mt-6 flex flex-col"
  style={{
    minHeight: 'calc(100vh - 52px)',
    borderRadius: '28px 28px 0 0',
    borderTop: '3px solid transparent',
    backgroundImage: `
      linear-gradient(rgba(255,255,255,0.96), rgba(255,255,255,0.96)),
      linear-gradient(90deg, #911b1b, #b91c1c, #fb7185, #fda4af)
    `,
    backgroundOrigin: 'border-box',
    backgroundClip: 'padding-box, border-box',
    WebkitBackgroundClip: 'padding-box, border-box',
    backdropFilter: 'blur(28px)',
    WebkitBackdropFilter: 'blur(28px)',
    boxShadow: '0 -10px 52px rgba(180,60,60,0.09), 0 -2px 16px rgba(180,60,60,0.05)',
  }}
>

          {/* Gradient top accent bar */}
          {/* <div className="absolute top-0 left-0 right-0 h-[3px] rounded-t-[28px]"
            style={{ background: 'linear-gradient(90deg, #911b1b 0%, #b91c1c 40%, #fb7185 70%, #fda4af 100%)' }} /> */}

          <div className="flex flex-col flex-1 px-6 pt-6 pb-10">

            {/* Drag handle */}
            <div className="w-10 h-[3px] rounded-full mx-auto mb-5"
              style={{ background: 'linear-gradient(90deg, #fda4af 0%, #f43f5e 50%, #fda4af 100%)' }} />

            {/* Luxury step indicator */}
            <MobileStepIndicator currentStep={currentStep} />

            {/* Step content — luxury mobile variant */}
            <AnimatePresence mode="wait">
              <div key={currentStep}>
                {renderStep('mobile')}
              </div>
            </AnimatePresence>

            {/* Footer */}
            <p className="text-gray-400 text-[12px] text-center mt-8">
              Remember your password?{' '}
              <button type="button" onClick={() => { window.location.href = '/login'; }}
                className="font-semibold transition-colors underline underline-offset-2" style={{ color: '#911b1b' }}>
                Sign in
              </button>
            </p>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════════
          DESKTOP LAYOUT  (≥md) — same white box as Login (unchanged)
      ══════════════════════════════════════════════════════════════════════ */}
      <div className="hidden md:flex w-full max-w-[1200px] rounded-2xl bg-white md:h-[85vh] max-h-[700px] overflow-hidden shadow-xl">

        {/* Left — image slider */}
        <div className="md:w-1/2">
          <MotionImageSlider onColorChange={handleColorChange} />
        </div>

        {/* Right — form */}
        <div className="md:w-1/2 flex flex-col overflow-y-auto">
          <div className="flex-1 flex flex-col justify-center p-8 lg:p-12">

            <div className="flex items-center justify-center relative mb-6">
              <button onClick={() => { window.location.href = '/login'; }}
                className="absolute left-0 text-[#911b1b] hover:text-[#7a1515] transition-all duration-300 cursor-pointer p-2 rounded-full hover:bg-red-50">
                <FaArrowLeft size={18} />
              </button>
              <span className="text-sm font-medium text-gray-500 tracking-wide">Account Recovery</span>
            </div>

            <StepIndicator currentStep={currentStep} />

            <AnimatePresence mode="wait">
              <div key={currentStep}>{renderStep('desktop')}</div>
            </AnimatePresence>

            <p className="text-gray-500 text-sm text-center mt-7">
              Remember your password?{' '}
              <button type="button" onClick={() => { window.location.href = '/login'; }}
                className="text-[#911b1b] hover:text-[#7a1515] font-semibold cursor-pointer transition-all duration-300 hover:underline underline-offset-2">
                Sign in
              </button>
            </p>
          </div>
        </div>
      </div>

    </motion.div>
  );
};

export default RecoverAccountPage;
