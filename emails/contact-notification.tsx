import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

interface ContactEmailProps {
  fullName: string;
  email: string;
  phone: string;
  message: string;
}

export const ContactEmail = ({
  fullName,
  email,
  phone,
  message,
}: ContactEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>New Contact Form Submission from {fullName}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>New Contact Form Submission</Heading>
          <Section style={section}>
            <Text style={text}>
              <strong>Name:</strong> {fullName}
            </Text>
            <Text style={text}>
              <strong>Email:</strong> {email}
            </Text>
            <Text style={text}>
              <strong>Phone:</strong> {phone}
            </Text>
          </Section>
          <Hr style={hr} />
          <Section style={section}>
            <Text style={text}>
              <strong>Message:</strong>
            </Text>
            <Text style={messageText}>{message}</Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

export default ContactEmail;

// Styles
const main = {
  backgroundColor: "#ffffff",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: "0 auto",
  padding: "20px 0 48px",
  maxWidth: "580px",
};

const section = {
  padding: "24px",
  backgroundColor: "#f6f9fc",
  borderRadius: "4px",
};

const h1 = {
  color: "#333",
  fontSize: "24px",
  fontWeight: "bold",
  margin: "40px 0",
  padding: "0",
};

const text = {
  color: "#333",
  fontSize: "16px",
  margin: "12px 0",
};

const messageText = {
  color: "#333",
  fontSize: "16px",
  margin: "12px 0",
  whiteSpace: "pre-wrap",
};

const hr = {
  borderColor: "#e6ebf1",
  margin: "20px 0",
};
