"use server"

import { Resend } from "resend"
import { Buffer } from "buffer"
import { validateEmail as validateEmailLib, validatePhone as validatePhoneLib } from "@/lib/validation"

export async function submitLogoRequest(formData: FormData) {
  try {
    if (!process.env.RESEND_API_KEY) {
      return {
        success: false,
        error: "Configuração de e-mail pendente. Por favor, entre em contato pelo WhatsApp.",
      }
    }

    const companyName = formData.get("companyName") as string
    const email = formData.get("email") as string
    const phone = formData.get("phone") as string
    const message = formData.get("message") as string
    const logoFile = formData.get("logo") as File

    if (!companyName || !email) {
      return { success: false, error: "Por favor, preencha todos os campos obrigatórios." }
    }

    const emailValidation = validateEmailLib(email)
    if (!emailValidation.valid) {
      return { success: false, error: emailValidation.error }
    }

    if (phone) {
      const phoneValidation = validatePhoneLib(phone)
      if (!phoneValidation.valid) {
        return { success: false, error: phoneValidation.error }
      }
    }

    if (!logoFile || logoFile.size === 0) {
      return { success: false, error: "Por favor, anexe o arquivo da logomarca." }
    }

    if (logoFile.size > 5 * 1024 * 1024) {
      return { success: false, error: "O arquivo deve ter no máximo 5MB." }
    }

    const bytes = await logoFile.arrayBuffer()
    const buffer = Buffer.from(bytes)
    const base64 = buffer.toString("base64")

    const resend = new Resend(process.env.RESEND_API_KEY)

    const result = await resend.emails.send({
      from: "Satus Gestão <onboarding@resend.dev>",
      to: "suporte@satusgestao.com.br",
      subject: `Nova Solicitação de Logo - ${companyName}`,
      html: `
        <h2>Nova Solicitação de Logomarca</h2>
        <p><strong>Empresa:</strong> ${companyName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Telefone:</strong> ${phone || "Não informado"}</p>
        <p><strong>Mensagem:</strong> ${message || "Nenhuma mensagem adicional"}</p>
        <p><strong>Arquivo:</strong> ${logoFile.name}</p>
        <hr />
        <p style="color: #666; font-size: 12px;">
          Esta solicitação foi enviada através do formulário de logomarcas do site Satus Gestão Contábil.
        </p>
      `,
      attachments: [
        {
          filename: logoFile.name,
          content: base64,
        },
      ],
    })

    if (result.error) {
      console.error("[v0] Resend error:", result.error)
      return { success: false, error: "Erro ao enviar solicitação. Tente novamente." }
    }

    return { success: true, id: result.data?.id }
  } catch (error) {
    console.error("[v0] Error submitting logo request:", error)
    return { success: false, error: "Erro ao enviar solicitação. Tente novamente." }
  }
}
