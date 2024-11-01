"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Button } from "@/components/ui/button";
import {
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Twitter,
  Facebook,
  PhoneCall,
} from "lucide-react";

export default function ContactInfo() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant={"outline"} className="w-10 p-3 h-10 rounded-full">
          <PhoneCall />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[45dvw] max-w-[550px] ">
        {" "}
        <Card className="w-full max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="text-3xl font-bold">Contact Us</CardTitle>
            <CardDescription>
              Get in touch with our team for any inquiries or support.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ContactMethod
                icon={<Mail className="h-5 w-5" />}
                title="Email"
                content={
                  <a
                    href="mailto:info@example.com"
                    className="text-blue-600 hover:underline"
                  >
                    info@example.com
                  </a>
                }
              />
              <ContactMethod
                icon={<Phone className="h-5 w-5" />}
                title="Phone"
                content={
                  <a
                    href="tel:+1234567890"
                    className="text-blue-600 hover:underline"
                  >
                    +1 (234) 567-890
                  </a>
                }
              />
              <ContactMethod
                icon={<MapPin className="h-5 w-5" />}
                title="Address"
                content="123 Business Street, Suite 100, City, State 12345"
              />
              <ContactMethod
                icon={<Mail className="h-5 w-5" />}
                title="Support"
                content={
                  <a
                    href="mailto:support@example.com"
                    className="text-blue-600 hover:underline"
                  >
                    support@example.com
                  </a>
                }
              />
            </div>

            <div className="pt-6 border-t">
              <h3 className="text-lg font-semibold mb-4">Connect with us</h3>
              <div className="flex space-x-4">
                <SocialButton
                  icon={<Linkedin className="h-5 w-5" />}
                  href="https://www.linkedin.com/company/example"
                />
                <SocialButton
                  icon={<Twitter className="h-5 w-5" />}
                  href="https://twitter.com/example"
                />
                <SocialButton
                  icon={<Facebook className="h-5 w-5" />}
                  href="https://www.facebook.com/example"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </PopoverContent>
    </Popover>
  );
}

function ContactMethod({
  icon,
  title,
  content,
}: {
  icon: React.ReactNode;
  title: string;
  content: React.ReactNode;
}) {
  return (
    <div className="flex items-start space-x-3">
      <div className="mt-1">{icon}</div>
      <div>
        <h3 className="font-semibold">{title}</h3>
        <p className="text-sm text-muted-foreground">{content}</p>
      </div>
    </div>
  );
}

function SocialButton({ icon, href }: { icon: React.ReactNode; href: string }) {
  return (
    <Button variant="outline" size="icon" asChild>
      <a href={href} target="_blank" rel="noopener noreferrer">
        {icon}
        <span className="sr-only">Social media link</span>
      </a>
    </Button>
  );
}
