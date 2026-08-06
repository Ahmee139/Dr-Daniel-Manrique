'use client';

import { useState, type ChangeEvent, type FormEvent } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { siteInfo } from '@/data/site';

type ContactFormState = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

export default function ContactForm() {
  const { t } = useLanguage();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState<ContactFormState>({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="contact-success" role="status">
        <p>{t.contactSuccess}</p>
        <a href={`mailto:${siteInfo.email}`} className="btn btn-gold">
          {siteInfo.email}
        </a>
      </div>
    );
  }

  return (
    <form className="contact-form contact-form-premium" onSubmit={onSubmit} noValidate>
      <label className="contact-field">
        <span>
          {t.contactName} <em>({t.contactRequired})</em>
        </span>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={onChange}
          required
          autoComplete="name"
        />
      </label>
      <label className="contact-field">
        <span>
          {t.contactEmail} <em>({t.contactRequired})</em>
        </span>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={onChange}
          required
          autoComplete="email"
        />
      </label>
      <label className="contact-field">
        <span>
          {t.contactPhone} <em>({t.contactRequired})</em>
        </span>
        <input
          type="tel"
          name="phone"
          value={form.phone}
          onChange={onChange}
          required
          autoComplete="tel"
        />
      </label>
      <label className="contact-field">
        <span>{t.contactMessage}</span>
        <textarea
          name="message"
          rows={5}
          value={form.message}
          onChange={onChange}
        />
      </label>
      <button type="submit" className="btn btn-gold btn-large">
        {t.contactSubmit}
      </button>
    </form>
  );
}
