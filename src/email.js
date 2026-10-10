import nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
  host: "mail.gmx.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.GMX_USER,
    pass: process.env.GMX_PASS
  }
});

export async function sendCensusEmail(to, filePath) {
  return transporter.sendMail({
    from: `"Fieldberry Census" <${process.env.GMX_USER}>`,
    to,
    subject: "E-Paper Census Report - By Law",
    text: "Census e-paper attached - DNSSEC + secure cookie compliant",
    attachments: [{ path: filePath }]
  });
}
