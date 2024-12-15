import { CardContent, CardHeader, CardTitle, CardDescription, Card } from './ui/card'

type CardProps = {
  title: string | React.ReactNode
  description?: string | React.ReactNode
  children: React.ReactNode
}

export default function LoomCard({ title, description, children }: CardProps) {
  return (
    <Card className="w-full bg-neutral-900 border">
      <CardHeader>
        <CardTitle className=''>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  )
}
