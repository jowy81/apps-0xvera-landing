/**
 * Visual guide steps for /testers/guide.
 * Images live in public/testers/guide/ (101–104 reserved / unused for now).
 */

export type GuideShot = {
  src: string;
  altKey: string;
};

export type GuideStep = {
  id: string;
  titleKey: string;
  bodyKey: string;
  shots: GuideShot[];
};

export const testersGuideSteps: GuideStep[] = [
  {
    id: 'apps',
    titleKey: 'guide.step1.title',
    bodyKey: 'guide.step1.body',
    shots: [{ src: '/testers/guide/01-apps-catalog.png', altKey: 'guide.step1.alt' }],
  },
  {
    id: 'join-group',
    titleKey: 'guide.step2.title',
    bodyKey: 'guide.step2.body',
    shots: [{ src: '/testers/guide/02-join-google-group.png', altKey: 'guide.step2.alt' }],
  },
  {
    id: 'wait-approval',
    titleKey: 'guide.step3.title',
    bodyKey: 'guide.step3.body',
    shots: [],
  },
  {
    id: 'app-conversation',
    titleKey: 'guide.step4.title',
    bodyKey: 'guide.step4.body',
    shots: [
      { src: '/testers/guide/04-select-app-conversation.png', altKey: 'guide.step4.altA' },
      { src: '/testers/guide/04b-select-app-conversation.png', altKey: 'guide.step4.altB' },
    ],
  },
  {
    id: 'play-opt-in',
    titleKey: 'guide.step5.title',
    bodyKey: 'guide.step5.body',
    shots: [
      { src: '/testers/guide/05-play-opt-in.png', altKey: 'guide.step5.altA' },
      { src: '/testers/guide/05b-play-opt-in.png', altKey: 'guide.step5.altB' },
    ],
  },
  {
    id: 'install',
    titleKey: 'guide.step6.title',
    bodyKey: 'guide.step6.body',
    shots: [{ src: '/testers/guide/06-install-app.png', altKey: 'guide.step6.alt' }],
  },
  {
    id: 'feedback',
    titleKey: 'guide.step7.title',
    bodyKey: 'guide.step7.body',
    shots: [
      { src: '/testers/guide/07-send-feedback.png', altKey: 'guide.step7.altA' },
      { src: '/testers/guide/07b-send-feedback.png', altKey: 'guide.step7.altB' },
    ],
  },
];
