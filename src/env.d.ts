/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly PUBLIC_GA_MEASUREMENT_ID?: string;
  readonly PUBLIC_SITE_URL?: string;
  readonly PUBLIC_SUPPORT_EMAIL?: string;
  readonly PUBLIC_CONTACT_EMAIL?: string;
  readonly PUBLIC_FEEDBACK_FORM_EN_URL?: string;
  readonly PUBLIC_FEEDBACK_FORM_ES_URL?: string;
  readonly PUBLIC_ANDROID_TESTERS_GROUP_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
