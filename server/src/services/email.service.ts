import nodemailer from 'nodemailer';
import { ENV } from '../config/env.js';

// Create Nodemailer Transporter
export const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: ENV.EMAIL_USER,
    pass: ENV.EMAIL_PASS,
  },
});

// Verify email service on boot
export const verifyEmailService = async (): Promise<boolean> => {
  try {
    await transporter.verify();
    console.log('╔════════════════════════════════════════════════════════════╗');
    console.log('║  📧 EMAIL SERVICE CONNECTED SUCCESSFULLY!                  ║');
    console.log('╠════════════════════════════════════════════════════════════╣');
    console.log(`║  📮 Sender   : ${ENV.EMAIL_USER}`.padEnd(61) + '║');
    console.log(`║  📬 Admin To : ${ENV.ADMIN_EMAIL}`.padEnd(61) + '║');
    console.log('║  🚀 Nodemailer Gmail SMTP is LIVE for enquiries & demos!   ║');
    console.log('╚════════════════════════════════════════════════════════════╝\n');
    return true;
  } catch (error: any) {
    console.warn(`[Email Service Warning] Gmail SMTP verification issue: ${error.message}`);
    return false;
  }
};

/**
 * 1. Contact Enquiry: Notification to ZANSTA Admin
 */
export const sendContactNotificationToAdmin = async (enquiry: {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  serviceInterested?: string;
  budget?: string;
  message: string;
}) => {
  const mailOptions = {
    from: ENV.EMAIL_FROM,
    to: ENV.ADMIN_EMAIL,
    replyTo: enquiry.email,
    subject: `🔥 [New Project Enquiry] from ${enquiry.name} (${enquiry.company || 'Direct Client'})`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #0b0f19; color: #f8fafc; margin: 0; padding: 20px; }
          .container { max-width: 600px; margin: 0 auto; background: #111827; border: 1px solid #1e293b; border-radius: 12px; overflow: hidden; box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.5); }
          .header { background: linear-gradient(135deg, #2563eb, #7c3aed); padding: 25px 30px; }
          .header h1 { margin: 0; font-size: 22px; color: #ffffff; font-weight: 700; letter-spacing: 0.5px; }
          .header p { margin: 5px 0 0 0; color: #e0e7ff; font-size: 14px; }
          .content { padding: 30px; }
          .badge { display: inline-block; padding: 4px 10px; border-radius: 6px; font-size: 12px; font-weight: 600; background: rgba(59, 130, 246, 0.2); color: #60a5fa; border: 1px solid rgba(59, 130, 246, 0.3); }
          .field-group { margin-bottom: 20px; }
          .label { font-size: 12px; text-transform: uppercase; letter-spacing: 1px; color: #94a3b8; margin-bottom: 4px; font-weight: 600; }
          .value { font-size: 15px; color: #f1f5f9; font-weight: 500; }
          .message-box { background: #1e293b; padding: 18px; border-radius: 8px; border-left: 4px solid #3b82f6; color: #e2e8f0; font-size: 14px; line-height: 1.6; white-space: pre-line; }
          .footer { background: #0f172a; padding: 16px 30px; border-top: 1px solid #1e293b; text-align: center; color: #64748b; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>ZANSTA • New Project Lead</h1>
            <p>A new client enquiry has been submitted through the website.</p>
          </div>
          <div class="content">
            <div style="display: flex; justify-content: space-between; margin-bottom: 24px;">
              <span class="badge">Status: NEW INBOUND LEAD</span>
              <span style="color: #94a3b8; font-size: 13px;">${new Date().toLocaleString()}</span>
            </div>

            <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
              <tr>
                <td style="padding: 8px 0; width: 40%; vertical-align: top;"><div class="label">Client Name</div><div class="value">${enquiry.name}</div></td>
                <td style="padding: 8px 0; width: 60%; vertical-align: top;"><div class="label">Email Address</div><div class="value"><a href="mailto:${enquiry.email}" style="color: #38bdf8; text-decoration: none;">${enquiry.email}</a></div></td>
              </tr>
              <tr>
                <td style="padding: 8px 0; vertical-align: top;"><div class="label">Company / Org</div><div class="value">${enquiry.company || 'Not Specified'}</div></td>
                <td style="padding: 8px 0; vertical-align: top;"><div class="label">Phone / WhatsApp</div><div class="value">${enquiry.phone || 'Not Specified'}</div></td>
              </tr>
              <tr>
                <td style="padding: 8px 0; vertical-align: top;"><div class="label">Service Required</div><div class="value" style="color: #a78bfa;">${enquiry.serviceInterested || 'General Development'}</div></td>
                <td style="padding: 8px 0; vertical-align: top;"><div class="label">Estimated Budget</div><div class="value" style="color: #34d399;">${enquiry.budget || 'Flexible'}</div></td>
              </tr>
            </table>

            <div class="field-group">
              <div class="label">Project Scope & Message</div>
              <div class="message-box">${enquiry.message}</div>
            </div>

            <div style="margin-top: 25px; text-align: center;">
              <a href="mailto:${enquiry.email}?subject=Re:%20Your%20Project%20Enquiry%20with%20ZANSTA" style="display: inline-block; background: #2563eb; color: #ffffff; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 14px;">Reply Directly to ${enquiry.name}</a>
            </div>
          </div>
          <div class="footer">
            ZANSTA Platform CMS Notification • Bhilai / Delhi NCR • <a href="https://zansta.dev" style="color: #64748b;">zansta.dev</a>
          </div>
        </div>
      </body>
      </html>
    `,
  };

  return transporter.sendMail(mailOptions);
};

/**
 * 2. Contact Enquiry: Instant Confirmation to Client
 */
export const sendContactConfirmationToClient = async (enquiry: {
  name: string;
  email: string;
  serviceInterested?: string;
}) => {
  const mailOptions = {
    from: `"MD Zaved Akhtar | ZANSTA" <${ENV.EMAIL_USER}>`,
    to: enquiry.email,
    subject: `✨ We received your enquiry — ZANSTA Engineering Team`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #090d16; color: #f1f5f9; margin: 0; padding: 20px; }
          .container { max-width: 600px; margin: 0 auto; background: #0f172a; border: 1px solid #1e293b; border-radius: 12px; overflow: hidden; }
          .header { background: linear-gradient(135deg, #1e3a8a, #4338ca); padding: 30px; text-align: center; }
          .header h1 { margin: 0; font-size: 26px; color: #ffffff; letter-spacing: 1px; font-weight: 800; }
          .header p { margin: 8px 0 0 0; color: #93c5fd; font-size: 15px; }
          .content { padding: 32px 30px; }
          .greeting { font-size: 18px; font-weight: 600; color: #ffffff; margin-bottom: 16px; }
          .body-text { font-size: 15px; line-height: 1.7; color: #cbd5e1; margin-bottom: 20px; }
          .highlight-card { background: rgba(37, 99, 235, 0.1); border: 1px solid rgba(59, 130, 246, 0.3); border-radius: 8px; padding: 18px; margin: 24px 0; }
          .founder-card { display: flex; align-items: center; gap: 16px; background: #1e293b; padding: 16px; border-radius: 8px; margin-top: 24px; }
          .footer { background: #0b0f19; padding: 20px 30px; border-top: 1px solid #1e293b; text-align: center; color: #64748b; font-size: 13px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>ZANSTA</h1>
            <p>High-Performance Web, AI & SaaS Engineering</p>
          </div>
          <div class="content">
            <div class="greeting">Hello ${enquiry.name},</div>
            <div class="body-text">
              Thank you for reaching out to <strong>ZANSTA</strong>. We have received your project enquiry regarding <strong>${enquiry.serviceInterested || 'custom development'}</strong>.
            </div>
            
            <div class="highlight-card">
              <div style="font-size: 13px; text-transform: uppercase; color: #60a5fa; font-weight: 700; letter-spacing: 0.5px; margin-bottom: 6px;">Next Steps</div>
              <div style="font-size: 14px; color: #e2e8f0; line-height: 1.5;">
                Our core engineering lead is reviewing your requirements. We will prepare an initial technical roadmap and reach out to you within <strong>2 to 4 business hours</strong>.
              </div>
            </div>

            <div class="body-text">
              If you have urgent files, Figma design links, or supplementary technical documents, feel free to reply directly to this email.
            </div>

            <div class="founder-card">
              <div>
                <div style="font-size: 15px; font-weight: 700; color: #ffffff;">MD Zaved Akhtar</div>
                <div style="font-size: 13px; color: #94a3b8;">Founder & Principal Full Stack Engineer • ZANSTA</div>
                <div style="font-size: 12px; color: #38bdf8; margin-top: 4px;">Email: zanstacom@gmail.com | WhatsApp: +91 98765 43210</div>
              </div>
            </div>
          </div>
          <div class="footer">
            © ${new Date().getFullYear()} ZANSTA Engineering. All rights reserved.<br>
            Empowering modern businesses with elite digital architectures.
          </div>
        </div>
      </body>
      </html>
    `,
  };

  return transporter.sendMail(mailOptions);
};

/**
 * 3. Demo Request: Notification to Admin
 */
export const sendDemoRequestNotificationToAdmin = async (reqData: {
  name: string;
  email: string;
  company?: string;
  projectInterest: string;
  contactMethod: string;
  message?: string;
}) => {
  const mailOptions = {
    from: ENV.EMAIL_FROM,
    to: ENV.ADMIN_EMAIL,
    replyTo: reqData.email,
    subject: `🎯 [Demo Walkthrough Request] for ${reqData.projectInterest} from ${reqData.name}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #0b0f19; color: #f8fafc; margin: 0; padding: 20px; }
          .container { max-width: 600px; margin: 0 auto; background: #111827; border: 1px solid #1e293b; border-radius: 12px; overflow: hidden; }
          .header { background: linear-gradient(135deg, #059669, #2563eb); padding: 25px 30px; }
          .header h1 { margin: 0; font-size: 22px; color: #ffffff; font-weight: 700; }
          .content { padding: 30px; }
          .badge { display: inline-block; padding: 4px 10px; border-radius: 6px; font-size: 12px; font-weight: 600; background: rgba(16, 185, 129, 0.2); color: #34d399; border: 1px solid rgba(16, 185, 129, 0.3); }
          .label { font-size: 12px; text-transform: uppercase; letter-spacing: 1px; color: #94a3b8; margin-bottom: 4px; font-weight: 600; }
          .value { font-size: 15px; color: #f1f5f9; font-weight: 500; }
          .message-box { background: #1e293b; padding: 18px; border-radius: 8px; border-left: 4px solid #10b981; color: #e2e8f0; font-size: 14px; line-height: 1.6; }
          .footer { background: #0f172a; padding: 16px 30px; border-top: 1px solid #1e293b; text-align: center; color: #64748b; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>ZANSTA • Live Demo Walkthrough Request</h1>
            <p style="margin: 5px 0 0 0; color: #d1fae5; font-size: 14px;">A client has requested an interactive live demo session.</p>
          </div>
          <div class="content">
            <div style="margin-bottom: 20px;">
              <span class="badge">DEMO WALKTHROUGH REQUEST</span>
            </div>

            <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
              <tr>
                <td style="padding: 8px 0; width: 50%;"><div class="label">Client Name</div><div class="value">${reqData.name}</div></td>
                <td style="padding: 8px 0; width: 50%;"><div class="label">Email Address</div><div class="value"><a href="mailto:${reqData.email}" style="color: #38bdf8; text-decoration: none;">${reqData.email}</a></div></td>
              </tr>
              <tr>
                <td style="padding: 8px 0;"><div class="label">Company</div><div class="value">${reqData.company || 'Not Specified'}</div></td>
                <td style="padding: 8px 0;"><div class="label">Preferred Contact</div><div class="value" style="color: #60a5fa; text-transform: capitalize;">${reqData.contactMethod}</div></td>
              </tr>
              <tr>
                <td colspan="2" style="padding: 8px 0;"><div class="label">Target Platform Interest</div><div class="value" style="color: #34d399; font-size: 16px; font-weight: 700;">${reqData.projectInterest}</div></td>
              </tr>
            </table>

            ${
              reqData.message
                ? `
            <div style="margin-bottom: 20px;">
              <div class="label">Client Note</div>
              <div class="message-box">${reqData.message}</div>
            </div>
            `
                : ''
            }

            <div style="margin-top: 25px; text-align: center;">
              <a href="mailto:${reqData.email}?subject=ZANSTA%20Demo%20Walkthrough%20-%20${encodeURIComponent(reqData.projectInterest)}" style="display: inline-block; background: #059669; color: #ffffff; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 14px;">Schedule Demo with ${reqData.name}</a>
            </div>
          </div>
          <div class="footer">
            ZANSTA Platform CMS Notification • <a href="https://zansta.dev" style="color: #64748b;">zansta.dev</a>
          </div>
        </div>
      </body>
      </html>
    `,
  };

  return transporter.sendMail(mailOptions);
};

/**
 * 4. Demo Request: Instant Confirmation to Client
 */
export const sendDemoRequestConfirmationToClient = async (reqData: {
  name: string;
  email: string;
  projectInterest: string;
}) => {
  const mailOptions = {
    from: `"MD Zaved Akhtar | ZANSTA" <${ENV.EMAIL_USER}>`,
    to: reqData.email,
    subject: `🚀 Demo Request Confirmed: ${reqData.projectInterest} — ZANSTA`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #090d16; color: #f1f5f9; margin: 0; padding: 20px; }
          .container { max-width: 600px; margin: 0 auto; background: #0f172a; border: 1px solid #1e293b; border-radius: 12px; overflow: hidden; }
          .header { background: linear-gradient(135deg, #059669, #2563eb); padding: 30px; text-align: center; }
          .header h1 { margin: 0; font-size: 26px; color: #ffffff; letter-spacing: 1px; font-weight: 800; }
          .content { padding: 32px 30px; }
          .greeting { font-size: 18px; font-weight: 600; color: #ffffff; margin-bottom: 16px; }
          .body-text { font-size: 15px; line-height: 1.7; color: #cbd5e1; margin-bottom: 20px; }
          .highlight-card { background: rgba(5, 150, 105, 0.1); border: 1px solid rgba(16, 185, 129, 0.3); border-radius: 8px; padding: 18px; margin: 24px 0; }
          .footer { background: #0b0f19; padding: 20px 30px; border-top: 1px solid #1e293b; text-align: center; color: #64748b; font-size: 13px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>ZANSTA</h1>
            <p style="margin: 8px 0 0 0; color: #a7f3d0; font-size: 15px;">Live Architecture Staging & Demo Hub</p>
          </div>
          <div class="content">
            <div class="greeting">Hi ${reqData.name},</div>
            <div class="body-text">
              We received your request for a live interactive walkthrough of <strong>${reqData.projectInterest}</strong>.
            </div>
            
            <div class="highlight-card">
              <div style="font-size: 13px; text-transform: uppercase; color: #34d399; font-weight: 700; letter-spacing: 0.5px; margin-bottom: 6px;">Demo Access Preparation</div>
              <div style="font-size: 14px; color: #e2e8f0; line-height: 1.5;">
                We are setting up your personalized staging demo environment and will provide you with a direct access link and temporary security credentials shortly.
              </div>
            </div>

            <div class="body-text">
              Our team will coordinate the demonstration session according to your preferred contact channel.
            </div>

            <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid #1e293b;">
              <div style="font-size: 14px; font-weight: 700; color: #ffffff;">MD Zaved Akhtar</div>
              <div style="font-size: 13px; color: #94a3b8;">ZANSTA Engineering Team • zanstacom@gmail.com</div>
            </div>
          </div>
          <div class="footer">
            © ${new Date().getFullYear()} ZANSTA Engineering. All rights reserved.
          </div>
        </div>
      </body>
      </html>
    `,
  };

  return transporter.sendMail(mailOptions);
};

/**
 * 5. Send Custom Email to Client from Superadmin Portal
 */
export const sendCustomEmail = async (options: {
  to: string;
  subject: string;
  message: string;
  senderName?: string;
}) => {
  const mailOptions = {
    from: `"${options.senderName || 'MD Zaved Akhtar | ZANSTA'}" <${ENV.EMAIL_USER}>`,
    to: options.to,
    subject: options.subject,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #0b0f19; color: #f8fafc; margin: 0; padding: 20px; }
          .container { max-width: 600px; margin: 0 auto; background: #111827; border: 1px solid #1e293b; border-radius: 12px; overflow: hidden; }
          .header { background: linear-gradient(135deg, #2563eb, #7c3aed); padding: 24px 30px; }
          .header h1 { margin: 0; font-size: 22px; color: #ffffff; }
          .content { padding: 30px; font-size: 15px; line-height: 1.7; color: #e2e8f0; white-space: pre-line; }
          .footer { background: #0f172a; padding: 16px 30px; border-top: 1px solid #1e293b; text-align: center; color: #64748b; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>ZANSTA</h1>
          </div>
          <div class="content">
            ${options.message}
          </div>
          <div class="footer">
            ZANSTA Platform • <a href="https://zansta.dev" style="color: #64748b;">zansta.dev</a> • Bhilai / Delhi NCR
          </div>
        </div>
      </body>
      </html>
    `,
  };

  return transporter.sendMail(mailOptions);
};
