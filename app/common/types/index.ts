export interface SelectionOption {
  label: string;
  value: string | number;
  disabled?: boolean;
}

export enum CompetitionState {
  UPCOMING = "UPCOMING",
  IN_PROGRESS = "IN_PROGRESS",
  FINISHED = "FINISHED",
}

export interface ChallengeOrderDataItem extends SelectionOption {
  isDiscount?: boolean;
  isTotal?: boolean;
}

export interface ChallengeOrderData {
  size: ChallengeOrderDataItem;
  platform: ChallengeOrderDataItem;
  broker: ChallengeOrderDataItem;
  subtotal: ChallengeOrderDataItem;
  discount: ChallengeOrderDataItem;
  total: ChallengeOrderDataItem;
}

export interface Counter {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export interface BillingInformation {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  addressLine: string;
  city: string;
  zip: string;
  country: string;
  state: string;
  additionalNotes: string;
  termsConditions: boolean;
  refundPolicy: boolean;
}

export interface RemoteBillingInformation {
  country?: string[];
  state?: string[];
  city?: string[];
  _action: string;
}

export const enum VerifyState {
  INIT = "INIT",
  AWAITING = "AWAITING",
  SUCCESS = "SUCCESS",
  FAIL = "FAIL",
}

export interface Verified {
  discount: VerifyState;
  affiliate: VerifyState;
}

export const enum ChallengeType {
  STANDARD = "STANDARD",
  RAPID = "RAPID",
  ROYAL = "ROYAL",
  KNIGHT = "KNIGHT",
}

export interface ChallengeFieldDiscount {
  code: string;
  percent: number;
}

export interface ChallengeFields {
  challenge: string;
  size: string;
  platform: string;
  broker: string;
  account: string;
  addons: string[];
  affiliate?: ChallengeFieldDiscount;
  discount?: ChallengeFieldDiscount;
  billingInformation: BillingInformation;
}

export enum DiscountStatus {
  Success,
  Faild,
}

export interface Discount {
  input: string;
  status?: DiscountStatus;
  value?: number;
}

export type PlainFields = Omit<ChallengeFields, "billingInformation">;

export type BillingField =
  `billingInformation.${keyof ChallengeFields["billingInformation"]}`;

export type ChallengeOption = SelectionOption & { price?: number };
