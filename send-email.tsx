"use server"

import { Resend } from "resend"
import { validateEmail } from "@/lib/validation"

function validateEmailBasic(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// To send to suporte@satusgestao.com.br, verify your domain at resend.com/domains
export async function sendContactEmail(formData: { name: string; email: string; message: string }) {
  try {
    if (!process.env.RESEND_API_KEY) {
      return {
        success: false,
        message: "Configuração de e-mail pendente. Por favor, entre em contato pelo WhatsApp.",
      }
    }

    if (!formData.name || !formData.email || !formData.message) {
      return { success: false, message: "Por favor, preencha todos os campos." }
    }

    const emailValidation = validateEmail(formData.email)
    if (!emailValidation.valid) {
      return { success: false, message: emailValidation.error || "Por favor, insira um e-mail válido." }
    }

    const resend = new Resend(process.env.RESEND_API_KEY)

    // Once you verify your domain at resend.com/domains, change this to suporte@satusgestao.com.br
    const { data, error } = await resend.emails.send({
      from: "Satus Gestão <onboarding@resend.dev>",
      to: ["ricotomasi2004@gmail.com"], // Verified email for testing mode
      replyTo: formData.email,
      subject: `Nova mensagem de contato - ${formData.name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #05D4BB; border-bottom: 2px solid #05D4BB; padding-bottom: 10px;">
            Nova mensagem de contato do site Satus Gestão
          </h2>
          <div style="margin: 20px 0;">
            <p style="margin: 10px 0;"><strong>Nome:</strong> ${formData.name}</p>
            <p style="margin: 10px 0;"><strong>E-mail:</strong> ${formData.email}</p>
            <p style="margin: 10px 0;"><strong>Mensagem:</strong></p>
            <div style="background: #f5f5f5; padding: 15px; border-radius: 5px; margin-top: 10px;">
              ${formData.message.replace(/\n/g, "<br>")}
            </div>
          </div>
          <p style="color: #666; font-size: 12px; margin-top: 30px; border-top: 1px solid #ddd; padding-top: 10px;">
            Esta mensagem foi enviada através do formulário de contato do site Satus Gestão Contábil.
          </p>
        </div>
      `,
    })

    if (error) {
      console.error("[v0] Resend error:", error)
      return {
        success: false,
        message: "Erro ao enviar e-mail. Por favor, tente novamente mais tarde.",
      }
    }

    return { success: true, message: "Mensagem enviada com sucesso! Entraremos em contato em breve." }
  } catch (error) {
    console.error("[v0] Erro ao enviar e-mail:", error)
    return {
      success: false,
      message: "Erro ao enviar e-mail. Por favor, tente novamente.",
    }
  }
}
