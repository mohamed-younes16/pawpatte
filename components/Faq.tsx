"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useState } from "react";
import { HelpCircleIcon } from 'lucide-react';
import Heading from "./Heading";


const Faq = () => {
  const [current, setCurrent] = useState("");
  const data = [
    {
      question: "What types of products do you sell for pets?",
      answer:
        "We offer a variety of pet products, including food, toys, grooming supplies, and accessories for dogs, cats, and other pets.",
    },
    {
      question: "How do I know what size pet accessories to buy?",
      answer:
        "Each product listing provides detailed sizing information. If you're unsure, you can always reach out to our support team for assistance.",
    },
    {
      question: "Do you offer delivery to my area?",
      answer:
        "We provide delivery across Algeria, with options for local and national shipping depending on your location.",
    },
    {
      question: "What should I do if I receive a damaged product?",
      answer:
        "We’re committed to quality. If you receive a damaged product, please contact us within 7 days, and we'll arrange for a replacement or refund.",
    },
    {
      question: "Can I return a product if my pet doesn't like it?",
      answer:
        "Yes, we offer a 30-day return policy on most items. Just ensure the product is unused and in its original packaging for a smooth return process.",
    },
  ];


  return (
    <div id="faq" className=" relative ">
      <div className="max-w-5xl   relative px-6 mx-auto">
        {/* <div className="absolute blur-xl  duration-5000  -bottom-1/2 rounded-[30%_70%_44%_56%_/_18%_63%_37%_82%] w-full opacity-20 left-0 h-full bg-cover bg-main/30"></div>{" "}
        <div className="absolute blur-3xl  duration-5000  -top-1/3 rounded-[30%_70%_44%_56%_/_18%_63%_37%_82%] w-1/2 opacity-20 -right-1/4 h-full bg-cover bg-blue-700/40"></div>{" "} */}
        <div className="flexcenter flex-col gap-2 my-16">
          <Heading
            title="Frequently Asked Questions"
            description="These questions might not be on everyone's FAQ list, but we've got your 
back in case you were curious."
            icon={<HelpCircleIcon className="text-black h-8 w-8 " />}

          />
        </div>{" "}
        <div>
          {data.map((e, i) => (
            <Accordion
              key={i}
              onValueChange={(e) => setCurrent(e)}
              type="single"
              value={current}
              collapsible
            >
              <AccordionItem
                className="border-b-zinc-200/25 !no-underline"
                value={`${e.question}`}
              >
                <AccordionTrigger
                  className={`text-2xl  max-md:text-lg !no-underline  flex items-center justify-between gap-6`}
                >
                  <div className={` ${current === e.question && "text-main"}`}>
                    0{i + 1}
                  </div>{" "}
                  {e.question}
                </AccordionTrigger>
                <AccordionContent className="text-neutral-800 text-lg pl-6">
                  {e.answer}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Faq;
