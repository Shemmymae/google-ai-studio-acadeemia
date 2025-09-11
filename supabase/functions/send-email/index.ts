// Reference the official Supabase Edge Runtime type definitions for Deno.
declare const Deno: any;

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { Resend } from 'https://esm.sh/resend@3.2.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

console.log("send-email function initialized.");

serve(async (req) => {
  console.log(`[${new Date().toISOString()}] Received request: ${req.method} ${req.url}`);
  
  // This is needed if you're deploying functions from a browser.
  if (req.method === 'OPTIONS') {
    console.log('Handling OPTIONS preflight request.');
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY');
    const RESEND_FROM_EMAIL = Deno.env.get('RESEND_FROM_EMAIL');

    if (!RESEND_API_KEY) {
      console.error('RESEND_API_KEY secret is not set.');
      throw new Error("Server configuration error: Resend API key is missing.");
    }
     if (!RESEND_FROM_EMAIL) {
      console.error('RESEND_FROM_EMAIL secret is not set.');
      throw new Error("Server configuration error: Resend 'from' email is missing. Please add it to your project's secrets.");
    }
    console.log('Found RESEND_API_KEY and RESEND_FROM_EMAIL secrets.');
    
    const resend = new Resend(RESEND_API_KEY);
    const { to, subject, html } = await req.json();

    if (!to || !subject || !html) {
        return new Response(JSON.stringify({ error: 'Missing required fields: to, subject, html' }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 400,
        });
    }
    console.log(`Attempting to send email to: ${to}`);

    const { data, error } = await resend.emails.send({
      from: RESEND_FROM_EMAIL, 
      to: [to],
      subject: subject,
      html: html,
    });

    if (error) {
      console.error('Resend API Error:', JSON.stringify(error));
      if (error.name === 'validation_error') {
        throw new Error(`Resend validation error: ${error.message}. This can be caused by an unverified 'from' email address.`);
      }
      throw new Error(`Resend API failed: ${error.message}`);
    }
    console.log('Email sent successfully via Resend. ID:', data?.id);

    return new Response(JSON.stringify({ message: "Email sent successfully!", id: data?.id }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });
  } catch (err) {
    console.error('Edge Function Error:', err.message);
    return new Response(JSON.stringify({ error: err.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    });
  }
})