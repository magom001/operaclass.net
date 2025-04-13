import { EnvelopeIcon, LinkIcon, PhoneIcon } from "@heroicons/react/24/solid";
import vkIcon from "./images/vk.svg";
import telegramIcon from "./images/telegram.svg";
import whatsappIcon from "./images/whatsapp.svg";
import instagramIcon from "./images/instagram.svg";
import linkedinIcon from "./images/linkedin.svg";
import facebookIcon from "./images/facebook.svg";
import { ContactInfoType } from "@/services/types";
import Image from "next/image";

export function ContactInfo({ contacts }: { contacts: ContactInfoType[] }) {
  return (
    <div className="relative overflow-x-auto max-w-full flex flex-row justify-center lg:justify-start px-2 lg:px-0 pb-2">
      <ul className="flex flex-row flex-nowrap items-center justify-start">
        {contacts.map((contact, i) => (
          <li key={i} className="shrink-0 px-2 lg:px-0 lg:pr-4">
            <ContactInfoEntry data={contact.data} type={contact.type} />
          </li>
        ))}
      </ul>
    </div>
  );
}

function getLink(contact: ContactInfoType) {
  switch (contact.type) {
    case "telegram":
      return `https://t.me/${contact.data}`;
    case "email":
      return `mailto:${contact.data}`;
    case "phone":
      return `tel:${contact.data}`;
    case "whatsapp":
      return `https://wa.me/${contact.data}`;
    case "vk":
    case "facebook":
    case "linkedin":
    case "instagram":
    case "url":
    default:
      return contact.data;
  }
}

function getIcon(contact: ContactInfoType) {
  if (contact.type === "email") {
    return <EnvelopeIcon className="w-[36px] h-[36px]" />;
  }

  if (contact.type === "phone") {
    return <PhoneIcon className="w-[36px] h-[36px] text-current" />;
  }

  if (contact.type === "url") {
    return <LinkIcon className="w-[36px] h-[36px]" />;
  }

  let src;
  switch (contact.type) {
    case "telegram":
      src = telegramIcon;
      break;
    case "whatsapp":
      src = whatsappIcon;
      break;
    case "instagram":
      src = instagramIcon;
      break;
    case "linkedin":
      src = linkedinIcon;
      break;
    case "vk":
      src = vkIcon;
      break;
    case "facebook":
      src = facebookIcon;
      break;
  }

  return <Image className="w-[36px] h-[36px]" src={src} alt="icon" />;
}

function ContactInfoEntry(contact: ContactInfoType) {
  const link = getLink(contact);
  const icon = getIcon(contact);

  return (
    <a
      href={link}
      target="_blank"
      title={contact.type}
      rel="noopener noreferrer"
    >
      {icon}
    </a>
  );
}
