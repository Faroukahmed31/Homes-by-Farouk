'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import { submitInquiry } from '@/app/actions/contact';
import { CheckCircle2, AlertCircle, Loader2, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { countries } from '@/data/countries';

const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  phone: z.string().min(10, { message: 'Please enter a valid phone number.' }),
  inquiryType: z.string().min(1, { message: 'Please select an inquiry type.' }),
  message: z.string().min(10, { message: 'Message must be at least 10 characters.' }),
});

type FormValues = z.infer<typeof formSchema>;

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [countryCode, setCountryCode] = useState('+254'); // Kenya

  const sortedCountries = [...countries].sort((a, b) => a.name.localeCompare(b.name));

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      inquiryType: '',
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    setError(null);
    
    // Combine country code with phone number
    const finalData = {
      ...data,
      phone: `${countryCode} ${data.phone}`,
    };
    
    try {
      const result = await submitInquiry(finalData);
      if (result.success) {
        setIsSuccess(true);
        reset();
      } else {
        setError(result.message || 'Something went wrong. Please try again.');
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center py-12 text-center"
      >
        <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-6">
          <CheckCircle2 className="w-10 h-10 text-primary" />
        </div>
        <h3 className="text-2xl font-heading text-primary mb-4">Inquiry Received</h3>
        <p className="text-foreground/70 max-w-sm mb-8">
          Thank you for reaching out. Farouk or one of our advisors will contact you shortly to discuss your requirements.
        </p>
        <button 
          onClick={() => setIsSuccess(false)}
          className="text-primary border-b border-primary hover:opacity-80 transition-all font-bold uppercase tracking-widest text-xs"
        >
          Send Another Message
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-12" id="inquiry-form">
      <div className="flex flex-col gap-3 mb-4">
        <h2 className="text-3xl font-heading text-foreground tracking-tight">Inquiry Detail</h2>
        <p className="text-base text-foreground/50 font-sans font-light">Provide your details to initiate a discrete consultation.</p>
      </div>

      <div className="flex flex-col gap-12">
        {/* Full Name */}
        <div className="relative group">
          <input
            {...register('name')}
            id="name"
            type="text"
            placeholder=" "
            className={cn(
              "w-full bg-transparent border-0 border-b border-white/10 px-0 py-4 text-lg text-foreground focus:ring-0 focus:border-primary transition-all duration-300 peer",
              errors.name && "border-red-500/50"
            )}
          />
          <label 
            htmlFor="name"
            className="absolute left-0 top-4 text-foreground/40 text-lg transition-all duration-300 peer-placeholder-shown:top-4 peer-placeholder-shown:text-lg peer-focus:-top-4 peer-focus:text-xs peer-focus:text-primary uppercase tracking-[0.2em] font-bold"
          >
            Full Name
          </label>
          <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-500 group-focus-within:w-full"></div>
          {errors.name && (
            <span className="text-[10px] text-red-500 mt-2 block uppercase tracking-wider">{errors.name.message}</span>
          )}
        </div>

        {/* Email Address */}
        <div className="relative group">
          <input
            {...register('email')}
            id="email"
            type="email"
            placeholder=" "
            className={cn(
              "w-full bg-transparent border-0 border-b border-white/10 px-0 py-4 text-lg text-foreground focus:ring-0 focus:border-primary transition-all duration-300 peer",
              errors.email && "border-red-500/50"
            )}
          />
          <label 
            htmlFor="email"
            className="absolute left-0 top-4 text-foreground/40 text-lg transition-all duration-300 peer-placeholder-shown:top-4 peer-placeholder-shown:text-lg peer-focus:-top-4 peer-focus:text-xs peer-focus:text-primary uppercase tracking-[0.2em] font-bold"
          >
            Email Address
          </label>
          <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-500 group-focus-within:w-full"></div>
          {errors.email && (
            <span className="text-[10px] text-red-500 mt-2 block uppercase tracking-wider">{errors.email.message}</span>
          )}
        </div>

        {/* Phone Number with Country Code */}
        <div className="relative group">
          <div className="flex gap-4">
            <div className="relative shrink-0 w-[100px]">
              <select
                value={countryCode}
                onChange={(e) => setCountryCode(e.target.value)}
                className="w-full bg-transparent border-0 border-b border-white/10 px-0 py-4 text-lg text-foreground focus:ring-0 focus:border-primary appearance-none cursor-pointer pr-6 font-sans"
              >
                {sortedCountries.map((c) => (
                  <option key={`${c.code}-${c.name}`} value={c.code} className="bg-brand-dark text-foreground">
                    {c.flag} {c.code} — {c.name}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 text-primary pointer-events-none" />
            </div>
            
            <div className="relative grow">
              <input
                {...register('phone')}
                id="phone"
                type="tel"
                placeholder=" "
                className={cn(
                  "w-full bg-transparent border-0 border-b border-white/10 px-0 py-4 text-lg text-foreground focus:ring-0 focus:border-primary transition-all duration-300 peer",
                  errors.phone && "border-red-500/50"
                )}
              />
              <label 
                htmlFor="phone"
                className="absolute left-0 top-4 text-foreground/40 text-lg transition-all duration-300 peer-placeholder-shown:top-4 peer-placeholder-shown:text-lg peer-focus:-top-4 peer-focus:text-xs peer-focus:text-primary uppercase tracking-[0.2em] font-bold"
              >
                Phone Number
              </label>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 w-full h-0.5 bg-white/10"></div>
          <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-500 group-focus-within:w-full"></div>
          {errors.phone && (
            <span className="text-[10px] text-red-500 mt-2 block uppercase tracking-wider">{errors.phone.message}</span>
          )}
        </div>

        {/* Inquiry Type */}
        <div className="relative group">
          <select
            {...register('inquiryType')}
            id="inquiryType"
            className={cn(
              "w-full bg-transparent border-0 border-b border-white/10 px-0 py-4 text-lg text-foreground focus:ring-0 focus:border-primary transition-all duration-300 appearance-none cursor-pointer",
              errors.inquiryType && "border-red-500/50"
            )}
          >
            <option value="" disabled className="bg-brand-dark text-foreground/40">Select Inquiry Type</option>
            <option value="off-plan" className="bg-brand-dark">Off-Plan Investment</option>
            <option value="buy-home" className="bg-brand-dark">Buy a Home</option>
            <option value="short-term" className="bg-brand-dark">Short-Term Rentals</option>
            <option value="advisory" className="bg-brand-dark">General Advisory</option>
          </select>
          <label 
            htmlFor="inquiryType"
            className="absolute left-0 -top-4 text-primary text-[10px] uppercase tracking-[0.2em] font-bold"
          >
            Inquiry Type
          </label>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-primary">
            <ChevronDown className="w-5 h-5" />
          </div>
          <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-500 group-focus-within:w-full"></div>
          {errors.inquiryType && (
            <span className="text-[10px] text-red-500 mt-2 block uppercase tracking-wider">{errors.inquiryType.message}</span>
          )}
        </div>

        {/* Message */}
        <div className="relative group mt-6">
          <textarea
            {...register('message')}
            id="message"
            placeholder=" "
            rows={4}
            className={cn(
              "w-full bg-transparent border-0 border-b border-white/10 px-0 py-4 text-lg text-foreground focus:ring-0 focus:border-primary transition-all duration-300 peer resize-none",
              errors.message && "border-red-500/50"
            )}
          />
          <label 
            htmlFor="message"
            className="absolute left-0 top-4 text-foreground/40 text-lg transition-all duration-300 peer-placeholder-shown:top-4 peer-placeholder-shown:text-lg peer-focus:-top-4 peer-focus:text-xs peer-focus:text-primary uppercase tracking-[0.2em] font-bold"
          >
            Tell us about your investment goals
          </label>
          <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-500 group-focus-within:w-full"></div>
          {errors.message && (
            <span className="text-[10px] text-red-500 mt-2 block uppercase tracking-wider">{errors.message.message}</span>
          )}
        </div>
      </div>

      {error && (
        <div className="flex items-center gap-2 p-4 bg-red-500/10 border border-red-500/20 rounded text-red-500 text-sm">
          <AlertCircle className="w-4 h-4" />
          <span>{error}</span>
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full red-button py-5 mt-4 flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed group transition-all duration-300"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>Processing...</span>
          </>
        ) : (
          <span>Send Message</span>
        )}
      </button>
    </form>
  );
}
