# Contact Form Implementation Guide

## Overview
The contact form in `ContactPage.tsx` has been updated to save submissions to the Wix CMS database. This guide explains the current implementation and the steps needed to enable email and WhatsApp notifications.

---

## Current Implementation Status

### ✅ COMPLETED: Database Storage
- **Location**: `src/components/pages/ContactPage.tsx`
- **Collection**: `customers` (CMS collection)
- **Functionality**: Form submissions are automatically saved with:
  - Visitor name → `contactPerson`
  - Email → `email`
  - Phone/WhatsApp → `phoneNumber`
  - Message → `notes`
  - Submission timestamp → `_createdDate`
  - Source: "Contact Form"
  - Customer Type: "Lead"
  - Sales Stage: "New Inquiry"

**Data Flow**:
```
User fills form → Click "Enviar mensaje" → Data saved to 'customers' collection → Success message displayed
```

---

## TODO: Email Notifications

### Option 1: Wix Automations (RECOMMENDED - No Code Required)

**Setup Steps**:
1. Go to **Wix Dashboard** → **Automations**
2. Click **Create Automation**
3. Configure trigger:
   - **When**: "Item is added to a collection"
   - **Collection**: Select "Customers"
4. Configure action:
   - **Action**: "Send an email"
   - **To**: `richard200810@gmail.com`
   - **Subject**: "New Contact Form Submission"
   - **Email Body Template**:
     ```
     New Contact Form Submission

     Name: {contactPerson}
     Email: {email}
     Phone/WhatsApp: {phoneNumber}
     Message: {notes}
     Submitted: {_createdDate}
     ```
5. Save and activate the automation

**Advantages**:
- No code required
- No API keys needed
- Managed entirely in Wix Dashboard
- Can be modified without code changes

---

### Option 2: Wix Backend Events (Advanced)

If you need more control, create a backend function:

**File**: `src/pages/api/contact-notification.ts` (Astro API route)

```typescript
import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.json();
    
    // Send email using Wix Mail API
    // Note: Requires wix-mail package and API key configuration
    // This is a placeholder - actual implementation requires Wix backend setup
    
    return new Response(
      JSON.stringify({ success: true, message: 'Email sent' }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, error: String(error) }),
      { status: 500 }
    );
  }
};
```

**Limitations**:
- Requires Wix backend configuration
- Needs API keys (not hardcoded in frontend)
- More complex setup

---

## TODO: WhatsApp Notifications

### Current Status: ⚠️ REQUIRES EXTERNAL SETUP

WhatsApp notifications require integration with **WhatsApp Business API**, which is NOT a built-in Wix service. Here are your options:

### Option 1: Wix Automations + Third-Party Integration (RECOMMENDED)

**Setup Steps**:
1. Set up a WhatsApp Business Account at https://www.whatsapp.com/business/
2. Get your Business Account ID and API credentials
3. In **Wix Automations**, add a second action:
   - **Action**: "Send a webhook" or "Call an external API"
   - **URL**: Your WhatsApp API endpoint (e.g., from Twilio, MessageBird, or WhatsApp Cloud API)
   - **Method**: POST
   - **Body**:
     ```json
     {
       "to": "+52 55 3955 5886",
       "message": "New Contact Form Submission\n\nName: {contactPerson}\nEmail: {email}\nPhone: {phoneNumber}\nMessage: {notes}\nTime: {_createdDate}"
     }
     ```

### Option 2: Third-Party Services

Popular services that integrate with WhatsApp:
- **Twilio**: https://www.twilio.com/whatsapp
- **MessageBird**: https://www.messagebird.com/en/whatsapp
- **Gupshup**: https://www.gupshup.io/
- **WhatsApp Cloud API**: https://developers.facebook.com/docs/whatsapp/cloud-api

**Setup**:
1. Create account with chosen service
2. Get API credentials
3. Configure webhook in Wix Automations
4. Test with sample message

### Option 3: Manual WhatsApp Link (Fallback)

If you want a quick solution without automation:
- Add a WhatsApp link button on the contact page
- Users can click to open WhatsApp with pre-filled message
- Not automatic, but requires no external API

```html
<a href="https://wa.me/5255395886?text=New%20inquiry%20from%20contact%20form">
  Send via WhatsApp
</a>
```

---

## Implementation Checklist

### Phase 1: Database (✅ DONE)
- [x] Save form submissions to `customers` collection
- [x] Include all required fields (name, email, phone, message, timestamp)
- [x] Add error handling and user feedback

### Phase 2: Email Notifications (⏳ TODO)
- [ ] Set up Wix Automation for email to `richard200810@gmail.com`
- [ ] Test with sample submission
- [ ] Verify email template includes all fields

### Phase 3: WhatsApp Notifications (⏳ TODO)
- [ ] Choose WhatsApp integration method (Twilio, MessageBird, etc.)
- [ ] Set up business account and API credentials
- [ ] Configure webhook in Wix Automations
- [ ] Test with sample message to `+52 55 3955 5886`

---

## Testing

### Test Database Storage
1. Go to contact page
2. Fill form with test data
3. Click "Enviar mensaje"
4. Check **Wix Dashboard** → **Database** → **Customers** collection
5. Verify new entry appears with correct data

### Test Email Notification
1. Submit form
2. Check `richard200810@gmail.com` inbox (may take 1-2 minutes)
3. Verify email contains all form fields

### Test WhatsApp Notification
1. Submit form
2. Check WhatsApp on `+52 55 3955 5886`
3. Verify message contains all form fields

---

## Code Reference

### Frontend (ContactPage.tsx)
```typescript
// Save to database
const customerData: Customers = {
  _id: crypto.randomUUID(),
  companyName: 'Contact Form Submission',
  contactPerson: formData.name,
  email: formData.email,
  phoneNumber: formData.phone,
  notes: formData.message,
  source: 'Contact Form',
  customerType: 'Lead',
  salesStage: 'New Inquiry',
  createdBy: 'Contact Form',
  _createdDate: submissionTime,
};

await BaseCrudService.create<Customers>('customers', customerData);
```

### Database Collection
- **Collection ID**: `customers`
- **Fields Used**:
  - `contactPerson` (Name)
  - `email` (Email)
  - `phoneNumber` (Phone/WhatsApp)
  - `notes` (Message)
  - `_createdDate` (Timestamp)

---

## Security Notes

✅ **What's Secure**:
- No API keys hardcoded in frontend
- Data validated before saving
- Error messages don't expose sensitive info
- Uses Wix's built-in CMS service

⚠️ **What Needs Attention**:
- Email/WhatsApp credentials stored in Wix Dashboard (not in code)
- Validate email format on backend if needed
- Consider rate limiting for form submissions
- Add CAPTCHA if spam becomes an issue

---

## Next Steps

1. **Save this file as draft** (already done)
2. **Set up Email Automation** in Wix Dashboard
3. **Choose WhatsApp integration** method
4. **Test all three components** (database, email, WhatsApp)
5. **Publish when ready**

---

## Support

For questions about:
- **Wix Automations**: https://support.wix.com/en/article/about-automations
- **WhatsApp Business API**: https://developers.facebook.com/docs/whatsapp
- **Database Collections**: https://support.wix.com/en/article/about-collections
