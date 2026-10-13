# Contact Form Setup Guide

This guide explains how the contact form is set up to send emails directly to career@employementexpress.net using FormSubmit.

## How It Works

The contact form uses [FormSubmit](https://formsubmit.co/), a free service that allows you to receive form submissions directly to your email without any backend code or registration.

## Current Configuration

1. **Form Setup**:
   - The form is configured to send submissions to career@employementexpress.net
   - The form uses the POST method to submit data
   - Hidden fields are used to customize the email format

2. **Hidden Fields**:
   - `_subject`: Sets the email subject line to "New Contact Form Submission from InternPortal"
   - `_template`: Uses a table layout for better readability
   - `_captcha`: Disabled for better user experience (set to "false")

3. **Form Validation**:
   - Client-side validation checks for required fields and valid email format
   - If validation fails, the form shows an error message
   - If validation passes, the form submits to FormSubmit

## First-Time Setup

When the form is submitted for the first time:

1. FormSubmit will send an activation email to career@employementexpress.net
2. You must click the activation link in that email to confirm ownership
3. After confirmation, all future form submissions will be delivered directly to your inbox

## Testing the Contact Form

1. Open your website and navigate to the contact page
2. Fill out the contact form with test information
3. Submit the form
4. Check career@employementexpress.net for the activation email (first time only)
5. After activation, all form submissions will be delivered to your inbox

## Customization Options

If you want to customize the form further:

1. **Change the recipient email**:
   - Update the form action attribute in contact.html:
   ```html
   <form id="contactForm" class="contact-form" action="https://formsubmit.co/your-new-email@example.com" method="POST">
   ```

2. **Add a thank-you page redirect**:
   - Add this hidden field to redirect users after submission:
   ```html
   <input type="hidden" name="_next" value="https://your-website.com/thank-you.html">
   ```

3. **Enable CAPTCHA**:
   - Change the _captcha value to "true" to enable CAPTCHA protection:
   ```html
   <input type="hidden" name="_captcha" value="true">
   ```

## Troubleshooting

If emails are not being received:

1. Check if you've clicked the activation link in the initial email from FormSubmit
2. Verify that career@employementexpress.net is not filtering the emails as spam
3. Try adding FormSubmit's domain to your email's safe senders list
4. Test with a different email address to see if the issue is specific to your email provider
