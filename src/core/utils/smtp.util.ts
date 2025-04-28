import * as nodemailer from 'nodemailer';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SMTPUtil {
  private transporter: nodemailer.Transporter;

  constructor(private readonly configService: ConfigService) {}
  host = this.configService.get<string>('SMTP_HOST');
  port = this.configService.get<string>('SMTP_PORT');
  user = this.configService.get<string>('SMTP_LOGIN');
  pass = this.configService.get<string>('SMTP_PASS');
  CreateTransport() {
    this.transporter = nodemailer.createTransport({
      host: this.host,
      port: this.port,
      secure: false, // with local environment
      // auth: {
      //   user: this.user,
      //   pass: this.pass,
      // },
      tls: {
        rejectUnauthorized: true,
      },
    });
    return this.transporter;
  }
  CreateMail(to: string, subject: string, html: string) {
    const from = this.configService.get<string>('SMTP_FROM');
    return {
      from,
      to,
      subject,
      html,
    };
  }
}
