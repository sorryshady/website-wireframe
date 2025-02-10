import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Tailwind,
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
  const baseUrl =
    process.env.NODE_ENV === "production"
      ? "https://ernyg.vercel.app"
      : "http://localhost:3000";

  return (
    <Html>
      <Head />
      <Preview>New Contact Form Submission from {fullName}</Preview>
      <Tailwind>
        <Body className="bg-white my-auto mx-auto font-sans px-2">
          <Container className="border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] max-w-[465px]">
            <Section className="mt-[32px]">
              <Img
                src={`${baseUrl}/logo.png`}
                width="95"
                alt="ErnyG"
                className="my-0 mx-auto object-contain"
              />
            </Section>
            <Heading className="text-black text-[24px] font-normal text-center p-0 my-[30px] mx-0">
              New Contact Form Submission
            </Heading>
            <Section className="bg-[#f6f9fc] p-6 rounded-lg">
              <Text className="text-[#333] text-[14px] leading-[24px]">
                <strong>Name:</strong> {fullName}
              </Text>
              <Text className="text-[#333] text-[14px] leading-[24px]">
                <strong>Email:</strong>{" "}
                <Link
                  href={`mailto:${email}`}
                  className="text-blue-600 no-underline"
                >
                  {email}
                </Link>
              </Text>
              <Text className="text-[#333] text-[14px] leading-[24px]">
                <strong>Phone:</strong> {phone}
              </Text>
            </Section>
            <Hr className="border border-solid border-[#eaeaea] my-[26px] mx-0 w-full" />
            <Section className="bg-[#f6f9fc] p-6 rounded-lg">
              <Text className="text-[#333] text-[14px] leading-[24px]">
                <strong>Message:</strong>
              </Text>
              <Text className="text-[#333] text-[14px] leading-[24px] whitespace-pre-wrap">
                {message}
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default ContactEmail;
