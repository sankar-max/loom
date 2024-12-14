export interface NavLinkProps {
  text: string
  href: string
}

export interface SocialLinkProps {
  icon: string
  name: string
  href: string
}

export interface FeatureCardProps {
  icon: string
  title: string
  description: string
  ctaText: string
}

export interface TestimonialProps {
  rating: number
  quote: string
  author: string
  role: string
  company: string
  companyLogo?: string
}

export interface FooterLinkProps {
  text: string
  href: string
}

export interface FooterSectionProps {
  title: string
  links: FooterLinkProps[]
}
