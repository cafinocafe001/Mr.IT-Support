import { useEffect, useRef, useState } from 'react';
import {
  AlertCircle,
  ArrowRight,
  CheckCircle2,
  Clipboard,
  Download,
  Globe2,
  LoaderCircle,
  Mail,
  MapPin,
  Send,
  ShieldCheck,
} from 'lucide-react';
import { services } from '../data/services';
import { siteConfig } from '../config/site';

const initialForm = {
  fullName: '',
  email: '',
  phone: '',
  service: '',
  subject: '',
  message: '',
};

function validateForm(values) {
  const errors = {};
  if (!values.fullName.trim()) errors.fullName = 'Please enter your full name.';
  else if (values.fullName.trim().length < 2) errors.fullName = 'Please enter at least 2 characters.';

  if (!values.email.trim()) errors.email = 'Please enter your email address.';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(values.email.trim())) errors.email = 'Enter a valid email address, such as name@example.com.';

  if (values.phone.trim() && !/^[+0-9()\s.-]{7,30}$/.test(values.phone.trim())) {
    errors.phone = 'Use a valid phone number with digits and common phone symbols only.';
  }

  if (!values.service) errors.service = 'Please choose a service category.';
  if (!values.subject.trim()) errors.subject = 'Please add a subject.';
  else if (values.subject.trim().length < 3) errors.subject = 'Please enter at least 3 characters.';

  if (!values.message.trim()) errors.message = 'Please describe your issue or requirement.';
  else if (values.message.trim().length < 20) errors.message = 'Please provide a little more detail (at least 20 characters).';

  return errors;
}

function createEnquiryText(values) {
  return [
    'MR.IT SUPPORT — CUSTOMER ENQUIRY',
    '',
    `Name: ${values.fullName.trim()}`,
    `Email: ${values.email.trim()}`,
    `Phone: ${values.phone.trim() || 'Not provided'}`,
    `Service: ${values.service}`,
    `Subject: ${values.subject.trim()}`,
    '',
    'Message:',
    values.message.trim(),
    '',
    'Prepared using the Mr.IT Support website. This file does not confirm delivery.',
  ].join('\n');
}

async function copyToClipboard(text) {
  if (navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(text);
    return;
  }
  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.style.position = 'fixed';
  textarea.style.opacity = '0';
  document.body.appendChild(textarea);
  textarea.select();
  const copied = document.execCommand('copy');
  textarea.remove();
  if (!copied) throw new Error('Copy command was not available');
}

export default function ContactForm({ selectedService, selectionRequestId }) {
  const [values, setValues] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle');
  const [feedback, setFeedback] = useState('');
  const [preparedText, setPreparedText] = useState('');
  const [actionFeedback, setActionFeedback] = useState('');
  const formRef = useRef(null);
  const hasEndpoint = Boolean(siteConfig.contact.formEndpoint);

  useEffect(() => {
    if (!selectedService) return;
    setValues((current) => ({ ...current, service: selectedService }));
    setErrors((current) => ({ ...current, service: undefined }));
    setStatus('idle');
    setFeedback('');
    setPreparedText('');
    setActionFeedback('');
  }, [selectedService, selectionRequestId]);

  const updateField = (event) => {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: undefined }));
    setActionFeedback('');
    if (['prepared', 'error', 'sent'].includes(status)) {
      setStatus('idle');
      setFeedback('');
      setPreparedText('');
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validationErrors = validateForm(values);
    setActionFeedback('');

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setStatus('error');
      setFeedback('Please correct the highlighted fields and try again.');
      const firstInvalidField = Object.keys(initialForm).find((field) => validationErrors[field]);
      formRef.current?.elements.namedItem(firstInvalidField)?.focus();
      return;
    }

    setErrors({});
    const enquiryText = createEnquiryText(values);

    if (!hasEndpoint) {
      setPreparedText(enquiryText);
      setStatus('prepared');
      setFeedback('Your enquiry is ready. Nothing has been sent—copy or download it using the options below.');
      return;
    }

    setStatus('submitting');
    setFeedback('Sending your enquiry securely…');

    try {
      const response = await fetch(siteConfig.contact.formEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ ...values, source: 'Mr.IT Support website' }),
      });
      if (!response.ok) throw new Error(`Form endpoint returned ${response.status}`);
      setStatus('sent');
      setFeedback('Thank you. Your enquiry has been sent successfully.');
      setPreparedText('');
      setValues(initialForm);
    } catch {
      setStatus('error');
      setFeedback('The enquiry could not be sent. Your details are still here; please try again or use the copy/download options below.');
      setPreparedText(enquiryText);
    }
  };

  const handleCopy = async () => {
    try {
      await copyToClipboard(preparedText);
      setActionFeedback('Enquiry copied to your clipboard.');
    } catch {
      setActionFeedback('Copying was unavailable. Please use the download option instead.');
    }
  };

  const handleDownload = () => {
    const blob = new Blob([preparedText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'mr-it-support-enquiry.txt';
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
    setActionFeedback('Enquiry downloaded as a text file.');
  };

  const emailHref = siteConfig.contact.email && preparedText
    ? `mailto:${siteConfig.contact.email}?subject=${encodeURIComponent(values.subject)}&body=${encodeURIComponent(preparedText)}`
    : '';

  return (
    <section className="section contact-section" id="contact" aria-labelledby="contact-title">
      <div className="contact-decoration" aria-hidden="true" />
      <div className="container contact-layout">
        <div className="contact-copy" data-reveal>
          <p className="eyebrow eyebrow--light"><span aria-hidden="true" />Start a conversation</p>
          <h2 id="contact-title">Let’s Find the Right Technology Solution for You.</h2>
          <p className="contact-copy__lead">Have a technical issue or a project in mind? Tell us what you need, and let’s discuss a practical solution.</p>

          <div className="contact-points">
            <div><MapPin size={21} aria-hidden="true" /><p><strong>Local service area</strong>Jaffna & Northern Sri Lanka</p></div>
            <div><Globe2 size={21} aria-hidden="true" /><p><strong>Remote availability</strong>Suitable services for international customers</p></div>
            <div><ShieldCheck size={21} aria-hidden="true" /><p><strong>Clear before delivery</strong>Scope and applicable charges discussed first</p></div>
          </div>

          <div className="contact-direct">
            <p>Verified contact channels</p>
            {siteConfig.contact.email && <a href={`mailto:${siteConfig.contact.email}`}><Mail size={17} aria-hidden="true" />{siteConfig.contact.email}</a>}
            {siteConfig.contact.phone && <a href={`tel:${siteConfig.contact.phone}`}>{siteConfig.contact.phone}</a>}
            {!siteConfig.contact.email && !siteConfig.contact.phone && (
              <span>No public email address or phone number has been supplied yet. Use the enquiry preparation form and share it once your preferred verified contact channel is available.</span>
            )}
          </div>
        </div>

        <div className="enquiry-card" data-reveal>
          <div className="enquiry-card__header">
            <div><p>Customer enquiry</p><h3>Tell us how we can help.</h3></div>
            <span>All fields marked * are required</span>
          </div>
          <form ref={formRef} onSubmit={handleSubmit} noValidate>
            <div className="form-grid">
              <FormField label="Full Name" name="fullName" error={errors.fullName} required>
                <input id="fullName" name="fullName" type="text" autoComplete="name" value={values.fullName} onChange={updateField} required aria-invalid={Boolean(errors.fullName)} aria-describedby={errors.fullName ? 'fullName-error' : undefined} placeholder="Your full name" />
              </FormField>
              <FormField label="Email Address" name="email" error={errors.email} required>
                <input id="email" name="email" type="email" autoComplete="email" value={values.email} onChange={updateField} required aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? 'email-error' : undefined} placeholder="name@example.com" />
              </FormField>
              <FormField label="Phone Number" name="phone" error={errors.phone} optional>
                <input id="phone" name="phone" type="tel" autoComplete="tel" value={values.phone} onChange={updateField} aria-invalid={Boolean(errors.phone)} aria-describedby={errors.phone ? 'phone-error' : undefined} placeholder="Optional" />
              </FormField>
              <FormField label="Service Category" name="service" error={errors.service} required>
                <select id="service" name="service" value={values.service} onChange={updateField} required aria-invalid={Boolean(errors.service)} aria-describedby={errors.service ? 'service-error' : undefined}>
                  <option value="">Select a service</option>
                  {services.map((service) => <option key={service.id} value={service.title}>{service.title}</option>)}
                </select>
              </FormField>
              <FormField label="Subject" name="subject" error={errors.subject} required fullWidth>
                <input id="subject" name="subject" type="text" value={values.subject} onChange={updateField} required aria-invalid={Boolean(errors.subject)} aria-describedby={errors.subject ? 'subject-error' : undefined} placeholder="A short summary of your requirement" />
              </FormField>
              <FormField label="Message" name="message" error={errors.message} required fullWidth>
                <textarea id="message" name="message" rows="5" value={values.message} onChange={updateField} required aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? 'message-error' : 'message-hint'} placeholder="Describe the issue, device, project or business requirement…" />
                {!errors.message && <span className="field-hint" id="message-hint">Include useful details so the requirement can be understood clearly.</span>}
              </FormField>
            </div>

            {feedback && (
              <div className={`form-feedback form-feedback--${status}`} role={status === 'error' ? 'alert' : 'status'}>
                {status === 'error' ? <AlertCircle size={19} aria-hidden="true" /> : status === 'submitting' ? <LoaderCircle className="spin" size={19} aria-hidden="true" /> : <CheckCircle2 size={19} aria-hidden="true" />}
                <p>{feedback}</p>
              </div>
            )}

            {preparedText && (
              <div className="prepared-actions">
                <p>Your prepared enquiry</p>
                <div>
                  <button type="button" className="button button--small button--dark" onClick={handleCopy}><Clipboard size={16} aria-hidden="true" />Copy enquiry</button>
                  <button type="button" className="button button--small button--outline-dark" onClick={handleDownload}><Download size={16} aria-hidden="true" />Download .txt</button>
                  {emailHref && <a className="button button--small button--outline-dark" href={emailHref}><Mail size={16} aria-hidden="true" />Open email app</a>}
                </div>
                {actionFeedback && <span role="status">{actionFeedback}</span>}
              </div>
            )}

            <div className="form-submit-row">
              <button className="button button--primary button--large" type="submit" disabled={status === 'submitting'}>
                {status === 'submitting' ? <><LoaderCircle className="spin" size={18} aria-hidden="true" />Sending…</> : hasEndpoint ? <><Send size={18} aria-hidden="true" />Send Enquiry</> : <>Prepare Enquiry<ArrowRight size={18} aria-hidden="true" /></>}
              </button>
              <p>{hasEndpoint ? 'Your details are submitted only to the configured secure service.' : 'Preparation mode: this form does not transmit or store your details.'}</p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

function FormField({ label, name, error, required, optional, fullWidth, children }) {
  return (
    <div className={`form-field ${fullWidth ? 'form-field--full' : ''} ${error ? 'form-field--error' : ''}`}>
      <label htmlFor={name}>{label}{required && <span aria-hidden="true"> *</span>}{optional && <span className="label-optional">(optional)</span>}</label>
      {children}
      {error && <span className="field-error" id={`${name}-error`}><AlertCircle size={14} aria-hidden="true" />{error}</span>}
    </div>
  );
}
