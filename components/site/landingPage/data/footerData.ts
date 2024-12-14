import { FooterSectionProps, SocialLinkProps } from '../types'

export const footerSections: FooterSectionProps[] = [
  {
    title: 'Quick Links',
    links: [
      { text: 'Home Page', href: '/' },
      { text: 'About Us', href: '/about' },
      { text: 'Contact Us', href: '/contact' },
      { text: 'Blog Posts', href: '/blog' },
      { text: 'Help Center', href: '/help' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { text: 'FAQs', href: '/faqs' },
      { text: 'User Guide', href: '/guide' },
      { text: 'Case Studies', href: '/cases' },
      { text: 'Webinars', href: '/webinars' },
      { text: 'Feedback', href: '/feedback' },
    ],
  },
]

export const socialLinks: SocialLinkProps[] = [
  {
    icon: 'https://cdn.builder.io/api/v1/image/assets/TEMP/a6292688879f6bbcd8a8f9a127576d8d8c7e9a8b0b1cdd773de03d48f8675c19?placeholderIfAbsent=true&apiKey=a0402da45aec46558069faa10175380e',
    name: 'Facebook',
    href: '/facebook',
  },
  {
    icon: 'https://cdn.builder.io/api/v1/image/assets/TEMP/8db9dc52fb00140124a167a21fd331b6e0a966e34c24014a712e277b1104a781?placeholderIfAbsent=true&apiKey=a0402da45aec46558069faa10175380e',
    name: 'Instagram',
    href: '/instagram',
  },
  {
    icon: 'https://cdn.builder.io/api/v1/image/assets/TEMP/61416f735c4a9b5c987c48b67a14aa5587a1cd084ca738d83a6beca37c70e514?placeholderIfAbsent=true&apiKey=a0402da45aec46558069faa10175380e',
    name: 'X',
    href: '/x',
  },
  {
    icon: 'https://cdn.builder.io/api/v1/image/assets/TEMP/8368c263c41cf37a7798f8152c8b2934926f6188ebc078dead3f9162f2af78ab?placeholderIfAbsent=true&apiKey=a0402da45aec46558069faa10175380e',
    name: 'LinkedIn',
    href: '/linkedin',
  },
  {
    icon: 'https://cdn.builder.io/api/v1/image/assets/TEMP/7d7643fd027254aaa334a513d9819dcbb084718b42e3bfa470598cef31f209b8?placeholderIfAbsent=true&apiKey=a0402da45aec46558069faa10175380e',
    name: 'YouTube',
    href: '/youtube',
  },
]
