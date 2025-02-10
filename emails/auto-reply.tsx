import {
  Body,
  Button,
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

interface AutoReplyEmailProps {
  fullName: string;
}

export const AutoReplyEmail = ({ fullName }: AutoReplyEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>Thank you for contacting Ernyg</Preview>
      <Tailwind>
        <Body className="bg-white my-auto mx-auto font-sans px-2">
          <Container className="border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] max-w-[465px]">
            <Section className="mt-[32px]">
              <Link href="https://www.ernyg.com">
                <Img
                  src="https://www.ernyg.com/logo.svg"
                  width="95"
                  height="31"
                  alt="ErnyG"
                  className="my-0 mx-auto bg-black p-2 rounded"
                />
              </Link>
            </Section>
            <Heading className="text-black text-[24px] font-normal text-center p-0 my-[30px] mx-0">
              Thank You for Reaching Out
            </Heading>
            <Section className="bg-[#f6f9fc] p-6 rounded-lg">
              <Text className="text-[#333] text-[14px] leading-[24px]">
                Dear {fullName},
              </Text>
              <Text className="text-[#333] text-[14px] leading-[24px]">
                Thank you for contacting Ernyg. We have received your message
                and will get back to you shortly.
              </Text>
              <Text className="text-[#333] text-[14px] leading-[24px]">
                In the meantime, feel free to check out our portfolio and
                services on our website.
              </Text>
            </Section>
            <Section className="text-center mt-[32px] mb-[32px]">
              <Button
                className="bg-[#000000] rounded text-white text-[12px] font-semibold no-underline text-center px-5 py-3"
                href="https://www.ernyg.com"
              >
                Visit Our Website
              </Button>
            </Section>
            <Hr className="border border-solid border-[#eaeaea] my-[26px] mx-0 w-full" />
            <Text className="text-[#666666] text-[12px] leading-[24px] text-center">
              Best regards,
              <br />
              The Ernyg Team
              <br />
              <Link
                href="https://www.ernyg.com"
                className="text-blue-600 no-underline"
              >
                www.ernyg.com
              </Link>
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default AutoReplyEmail;
