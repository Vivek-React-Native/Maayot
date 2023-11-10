export const SUNDAY = 'Sun'
export enum endPoint {
  URL= 'https://story.maayot.com',
  API_URL = 'https://story.maayot.com/api/v2',
  API_URL_V1 = 'https://story.maayot.com/api/v1' //'https://dev.maayot.com/api/v1' //
}

export const IAPProductConst = {
  FREE: 'free',
  STANDARD: 'standard',
  PREMIUM: 'premium',
  SCHOOL: 'school',
}

export const FreePlanFeatures = [
  {
    label: 'Weekly Story in Mandarin on Sundays',
    checked: true,
  },
  { label: 'Daily Engaging Story' },
  { label: 'Daily Quiz' },
  { label: 'Daily Recording' },
  { label: 'Daily Writing Prompt' },
]
export const StandardPlanFeatures = [
  {
    label: 'Daily story in Mandarin',
    checked: true,
  },
  {
    label: 'Daily native recording',
    checked: true,
  },
  {
    label: 'Daily story quiz',
    checked: true,
  },
  {
    label: 'Daily new characters',
    checked: true,
  },
  {
    label: 'Daily writing prompt',
    checked: true,
  },
  {
    label: 'One-click definitions',
    checked: true,
  },
]
export const MemberStepInStory = {
  INTRODUCTION: 'introduction',
  STORY_AND_LISTENING: 'story and listening',
  QUIZ: 'quiz',
  QUESTION: 'question',
  FINISH: 'finish',
}

export const PremiumPlanFeatures = [
  {
    label: 'All Standard Plan Features',
    checked: true,
  },
  {
    label: 'Weekly 1-on-1 tutoring',
    checked: true,
  },
  {
    label: 'Daily corrections',
    checked: true,
  },
]

export const FeatureList = [
  {
    label: 'Daily story in Mandarin',
  },
  {
    label: 'Daily native recording',
  },
  {
    label: 'Daily story quiz',
  },
  {
    label: 'Daily new characters',
  },
  {
    label: 'Daily writing prompt',
  },
  {
    label: 'One-click definitions',
  },
]


export const memberTypeConst = {
  FREE: 'maayot Free',
  STANDARD: 'maayot Standard',
  PRO: 'maayot Pro',
  PREMIUM: 'maayot Premium',
  SCHOOL: 'School',
}

export const memberTypeIDConst = {
  FREE: '5ef93844eed2c40004936aeb',
}

export const levelConst = {
  BEGINNER: 'beginner',
  INTERMEDIATE: 'intermediate',
  ADVANCED: 'advanced',
}

export const countdownTimeFormat = ['H','M','S'];
export const countdownDateFormat = ['D','H','M','S'];

export enum navigationRoutes {
  ON_BOARDING_PATH = 'ON_BOARDING_PATH',
  NAVIGATION_MAIN_PATH = 'NAVIGATION_MAIN_PATH',
  NAVIGATION_STORY_PATH = 'NAVIGATION_STORY_PATH',
  NAVIGATION_LOGIN_PATH = 'NAVIGATION_LOGIN_PATH',
  NAVIGATION_REGISTER_PATH = 'NAVIGATION_REGISTER_PATH',
  NAVIGATION_SELECT_PATH = 'NAVIGATION_SELECT_PATH',
  NAVIGATION_LANGUAGE_PATH = 'NAVIGATION_LANGUAGE_PATH',

  NAVIGATION_INTRODUCTION_PATH = 'NAVIGATION_INTRODUCTION_PATH',
  NAVIGATION_STORY_AND_LISTENING_PATH = 'NAVIGATION_STORY_AND_LISTENING_PATH',
  NAVIGATION_QUIZ_PATH = 'NAVIGATION_QUIZ_PATH',

  NAVIGATION_QUIZ_QUESTION_PATH = 'NAVIGATION_QUIZ_QUESTION_PATH',
  NAVIGATION_QUIZ_RESULT_PATH = 'NAVIGATION_QUIZ_RESULT_PATH',
  NAVIGATION_QUIZ_ANSWER_PATH = 'NAVIGATION_QUIZ_ANSWER_PATH',

  NAVIGATION_QUESTION_PATH = 'NAVIGATION_QUESTION_PATH',
  NAVIGATION_QUESTION_QUESTION_PATH = 'NAVIGATION_QUESTION_QUESTION_PATH',
  NAVIGATION_FINISH_PATH = 'NAVIGATION_FINISH_PATH',
  NAVIGATION_STORY_STREAKS_FINISH_PATH = 'NAVIGATION_STORY_STREAKS_FINISH_PATH',

  NAVIGATION_SETTING_PATH = 'NAVIGATION_SETTING_PATH',
  NAVIGATION_SETTING_ACCOUNT_PATH = 'NAVIGATION_SETTING_ACCOUNT_PATH',
  NAVIGATION_PASSWORD_SETTING_PATH = 'NAVIGATION_PASSWORD_SETTING_PATH',
  NAVIGATION_SETTING_PLAN_PATH = 'NAVIGATION_SETTING_PLAN_PATH',
  NAVIGATION_SETTING_COMPARE_PLAN_PATH = 'NAVIGATION_SETTING_COMPARE_PLAN_PATH',
  NAVIGATION_SETTING_LEVEL_PATH = 'NAVIGATION_SETTING_LEVEL_PATH',
  NAVIGATION_SETTING_LANGUAGE_PATH = 'NAVIGATION_SETTING_LANGUAGE_PATH',
}

export const countDownCheckTimeConst = {
  RED: 30,
  ORANGE: 150
}

export const screenConst = {
  HOME: 'Homepage',
  STREAK: 'Streaks Tracking',
  SETTING: 'Settings',
  READ_STORY: 'Read Story',
  UPGRADE_PACKAGE: 'Upgrade package',
  HIGHEST_STREAK: 'Highest Streak',
  ACCOUNT_SETTING: 'Account settings',
  MY_PLAN: 'My Plan',
  MY_LEVEL: 'My Level',
  MY_LANGUAGE: 'Character Preference',
}

export const secInDay = 60 * 60 * 24 * 1000
export const secInWeek = 7 * secInDay
export const serverDateFormat = 'YYYY-MM-DD'
export const unauthorizedCodeConst = 401;

export const privacyLinkConst = 'https://www.maayot.com/privacy-policy';
export const termsOfServiceLinkConst = 'https://www.maayot.com/terms-of-use';
export const mapPeriodConst: any = {
  MONTH:'monthly'
}
export const charactersPreference = {
  SIMPLIFIED: 'Simplified',
  TRADITIONAL: 'Traditional',
}