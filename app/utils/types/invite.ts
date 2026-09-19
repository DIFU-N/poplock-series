export type Invite = {
  id: string;
  tokenHash: string;
  used: boolean;
  expiresAt: Date;
  createdBy: string;
  recipientName: string;
};

export type CreateInviteRequest = {
  token: string;
  name: string;
};
