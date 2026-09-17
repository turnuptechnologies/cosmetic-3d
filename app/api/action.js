'use server'
import nodemailer from "nodemailer";

// Form values are user input: escape before putting them into the email HTML
const escapeHtml = (value) =>
    String(value ?? "").replace(/[&<>"']/g, (c) => ({
        "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
    })[c]);

export async function sendEmail(prevState, formData) {
    const fullName = formData.get("fullName");
    const email = formData.get("email");
    const company = formData.get("companyName");
    const message = formData.get("message");
    const phone = formData.get("phoneNumber");
    const projectType = formData.get("projectType"); // From hidden input
    const budget = formData.get("budgetRange");     // From hidden input
    const details = formData.get("projectDetails");
    const safe = Object.fromEntries(
        Object.entries({ fullName, email, company, phone, projectType, budget, details })
            .map(([key, value]) => [key, escapeHtml(value)])
    );

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    try {
        await transporter.sendMail({
            from: `"Cosmetic Chemist Website" <${process.env.EMAIL_USER}>`,
            replyTo: email || undefined,
            to: 'sales@cosmeticchemist.com', // Where you want to receive the contact form info
            subject: `New Contact Form Submission from ${String(fullName ?? "").replace(/[\r\n]/g, " ")}`,
            text: message || details || "",
            html: `
        <h3>New Contact Form Submission</h3>
        <p><strong>Name:</strong> ${safe.fullName}</p>
        <p><strong>Email:</strong> ${safe.email}</p>
        <p><strong>Company:</strong> ${safe.company}</p>
        <p><strong>Phone:</strong> ${safe.phone}</p>
        <p><strong>Project:</strong> ${safe.projectType}</p>
        <p><strong>Budget:</strong> ${safe.budget}</p>
        <p><strong>Details:</strong> ${safe.details}</p>
      `,
        })
        return { success: true, message: "Message sent! We'll be in touch." };

    } catch (error) {
        console.error("Nodemailer error:", error);
        return { success: false, message: "Failed to send email." };
    }
}
