export type Invite = {
  id: string;
  tokenHash: string;
  used: boolean;
  expiresAt: string;
  createdBy: string;
  recipientName: string;
};
