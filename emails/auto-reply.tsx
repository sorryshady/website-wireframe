import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

interface AutoReplyEmailProps {
  fullName: string;
}

export const AutoReplyEmail = ({ fullName }: AutoReplyEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>Thank you for contacting Ernyg</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>Thank You for Reaching Out</Heading>
          <Section style={section}>
            <Text style={text}>Dear {fullName},</Text>
            <Text style={text}>
              Thank you for contacting Ernyg. We have received your message and
              will get back to you shortly.
            </Text>
            <Text style={text}>
              In the meantime, feel free to check out our portfolio and services
              on our website.
            </Text>
            <Text style={text}>Best regards,</Text>
            <Text style={text}>The Ernyg Team</Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

export default AutoReplyEmail;

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
  lineHeight: "24px",
  margin: "16px 0",
};
