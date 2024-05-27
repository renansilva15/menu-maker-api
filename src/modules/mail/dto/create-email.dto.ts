class Address {
  name: string;
  address: string;
}
export class CreateEmailDto {
  to: string | Address | Array<string | Address>;

  subject: string;

  text?: string;

  html?: string;

  sender?: string;
}
