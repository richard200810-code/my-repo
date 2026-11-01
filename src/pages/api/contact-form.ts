import type { APIRoute } from 'astro';
import { sendEmail } from '@/lib/email-service';

export const POST: APIRoute = async ({ request }) => {
  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const body = await request.json();
    const { name, email, phone, message, businessType, helpOptions, submittedAt, recipientEmail } = body;

    // Validate required fields
    if (!name || !email || !message || !businessType) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Send email to owner using Wix email service
    const emailContent = `
      <h2>Nuevo mensaje de contacto</h2>
      <p><strong>Nombre:</strong> ${escapeHtml(name)}</p>
      <p><strong>Correo:</strong> ${escapeHtml(email)}</p>
      <p><strong>Teléfono/WhatsApp:</strong> ${escapeHtml(phone || 'No proporcionado')}</p>
      <p><strong>Tipo de negocio:</strong> ${escapeHtml(businessType)}</p>
      <p><strong>¿Cómo podemos ayudarte?:</strong> ${escapeHtml(helpOptions || 'No especificado')}</p>
      <p><strong>Mensaje:</strong></p>
      <p>${escapeHtml(message).replace(/\n/g, '<br>')}</p>
      <p><small>Enviado el: ${new Date(submittedAt).toLocaleString('es-MX')}</small></p>
    `;

    // Send email using Wix's native email service
    await sendEmail({
      to: recipientEmail || 'richard200810@gmail.com',
      subject: `Nuevo mensaje de contacto de ${name}`,
      html: emailContent,
      replyTo: email,
    });

    // Also send confirmation email to the user
    const confirmationEmail = `
      <h2>Hemos recibido tu mensaje</h2>
      <p>Hola ${escapeHtml(name)},</p>
      <p>Gracias por ponerte en contacto con nosotros. Hemos recibido tu mensaje y nos pondremos en contacto pronto.</p>
      <p>Detalles de tu consulta:</p>
      <ul>
        <li><strong>Tipo de negocio:</strong> ${escapeHtml(businessType)}</li>
        <li><strong>Cómo podemos ayudarte:</strong> ${escapeHtml(helpOptions || 'No especificado')}</li>
      </ul>
      <p>Saludos cordiales,<br>El equipo de Hair Extensions</p>
    `;

    await sendEmail({
      to: email,
      subject: 'Hemos recibido tu mensaje',
      html: confirmationEmail,
    });

    return new Response(
      JSON.stringify({ success: true, message: 'Formulario enviado correctamente' }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Contact form error:', error);
    return new Response(
      JSON.stringify({ error: 'Error al procesar el formulario' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};

function escapeHtml(text: string): string {
  const map: { [key: string]: string } = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
}
