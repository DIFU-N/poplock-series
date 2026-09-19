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

export interface CreateInviteValues {
  name: string;
  token: string | null;
}


export interface AdminCreateInviteValues {
  name: string;
}
