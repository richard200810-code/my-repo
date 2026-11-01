import type { APIRoute } from 'astro';
import { BaseCrudService } from '@/integrations';

export const POST: APIRoute = async ({ request }) => {
  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const body = await request.json();
    const { name, email, phone, message, businessType, helpOptions } = body;

    // Validate required fields
    if (!name || !email || !message || !businessType) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Save submission to ContactSubmissions collection
    // This will trigger the Wix automation to send email to richard200810@gmail.com
    const submissionId = crypto.randomUUID();
    await BaseCrudService.create('contactsubmissions', {
      _id: submissionId,
      fullName: name,
      email: email,
      phoneNumber: phone || '',
      businessType: businessType,
      helpOptions: Array.isArray(helpOptions) ? helpOptions.join(', ') : helpOptions || '',
      message: message,
      submissionDate: new Date().toISOString(),
    });

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Formulario enviado correctamente',
        submissionId: submissionId 
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Contact form error:', error);
    return new Response(
      JSON.stringify({ 
        error: 'Error al procesar el formulario. Por favor, intenta de nuevo.' 
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
