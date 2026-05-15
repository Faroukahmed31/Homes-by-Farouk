'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Phone, MessageCircle, CheckCircle2 } from 'lucide-react';
import { Property } from '@/types/property';
import { captureLead } from '@/app/actions/leads';

const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Invalid phone number'),
  message: z.string().optional(),
});

interface InquiryFormProps {
  property: Property;
}

export function InquiryForm({ property }: InquiryFormProps) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const getPlaceholder = () => {
    switch (property.status) {
      case 'Ready':
        return `I'm interested in ${property.title} ${property.bedrooms} bedroom.`;
      case 'Off-Plan':
        return `I'm interested in knowing about the payment plans available for ${property.title}.`;
      case 'Rental':
        return `I'm interested in renting ${property.title}.`;
      default:
        return `I'm interested in ${property.title}.`;
    }
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      message: getPlaceholder(),
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true);
    
    const formData = new FormData();
    formData.append('name', values.name);
    formData.append('email', values.email);
    formData.append('phone', values.phone);
    formData.append('message', values.message || '');
    formData.append('guideType', `inquiry-${property.slug}`);
    
    try {
      await captureLead(formData);
      setSuccess(true);
    } catch (error) {
      console.error('Submission error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleWhatsApp = () => {
    const message = encodeURIComponent(`Hi Farouk, I am interested in ${property.title} in ${property.location}...`);
    window.open(`https://wa.me/254721599075?text=${message}`, '_blank');
  };

  return (
    <Card className="bg-[#1A1A1A] border-primary/20 sticky top-32">
      <CardHeader>
        <CardTitle className="text-primary text-2xl font-heading">Inquire About This Unit</CardTitle>
        <CardDescription className="text-foreground/60 font-sans flex flex-col gap-2">
          <span>Register your interest to receive the full brochure and floor plans.</span>
          <span className="text-primary/80 font-bold text-xs uppercase tracking-widest">
            Starting From KES {property.startingPrice.toLocaleString()}
          </span>
        </CardDescription>
      </CardHeader>
      <CardContent>
        {success ? (
          <div className="py-12 text-center animate-in fade-in zoom-in duration-500">
            <div className="size-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="size-10 text-primary" />
            </div>
            <h3 className="text-xl font-heading text-white mb-2">Inquiry Sent!</h3>
            <p className="text-sm text-muted-foreground mb-8">
              Farouk will be in touch shortly with the details for {property.title}.
            </p>
            <Button 
              onClick={() => setSuccess(false)}
              variant="outline" 
              className="border-primary text-primary hover:bg-primary/10 rounded-none uppercase text-xs tracking-widest font-bold"
            >
              Send Another Inquiry
            </Button>
          </div>
        ) : (
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-foreground/60 font-sans text-xs uppercase tracking-widest">Full Name</Label>
              <Input 
                id="name" 
                {...form.register('name')} 
                className="bg-transparent border-0 border-b border-primary rounded-none px-0 focus-visible:ring-0 focus-visible:border-primary/80 text-foreground transition-all"
                placeholder="John Doe"
              />
              {form.formState.errors.name && <p className="text-secondary text-xs">{form.formState.errors.name.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-foreground/60 font-sans text-xs uppercase tracking-widest">Email Address</Label>
              <Input 
                id="email" 
                type="email"
                {...form.register('email')} 
                className="bg-transparent border-0 border-b border-primary rounded-none px-0 focus-visible:ring-0 focus-visible:border-primary/80 text-foreground transition-all"
                placeholder="john@example.com"
              />
              {form.formState.errors.email && <p className="text-secondary text-xs">{form.formState.errors.email.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="text-foreground/60 font-sans text-xs uppercase tracking-widest">Phone Number</Label>
              <Input 
                id="phone" 
                type="tel"
                {...form.register('phone')} 
                className="bg-transparent border-0 border-b border-primary rounded-none px-0 focus-visible:ring-0 focus-visible:border-primary/80 text-foreground transition-all"
                placeholder="+254..."
              />
              {form.formState.errors.phone && <p className="text-secondary text-xs">{form.formState.errors.phone.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="message" className="text-foreground/60 font-sans text-xs uppercase tracking-widest">Message</Label>
              <Textarea 
                id="message"
                {...form.register('message')}
                className="bg-transparent border border-primary/20 rounded-none focus-visible:ring-0 focus-visible:border-primary/80 text-foreground min-h-[100px] transition-all"
              />
            </div>

            <Button type="submit" disabled={loading} className="red-button w-full py-6 text-sm">
              {loading ? 'Sending...' : 'Send Inquiry'}
            </Button>

            <div className="flex gap-4 mt-2">
              <Button 
                type="button" 
                variant="outline" 
                className="flex-1 border-primary text-primary hover:bg-primary/10 rounded-none uppercase text-xs tracking-widest font-bold h-12"
                onClick={() => window.location.href = 'tel:+254721599075'}
              >
                <Phone className="size-4 mr-2" /> Call
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                className="flex-1 border-primary text-primary hover:bg-primary/10 rounded-none uppercase text-xs tracking-widest font-bold h-12"
                onClick={handleWhatsApp}
              >
                <MessageCircle className="size-4 mr-2" /> WhatsApp
              </Button>
            </div>
          </form>
        )}
      </CardContent>
    </Card>
  );
}
