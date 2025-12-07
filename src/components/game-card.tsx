
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface GameCardProps {
  title: string;
  description: string;
  href: string;
  icon: React.ReactNode;
  badge?: 'New' | 'Trending';
}

export function GameCard({ title, description, href, icon, badge }: GameCardProps) {
  return (
    <Link href={href} className="group block">
      <Card className="h-full bg-card border border-border/20 rounded-2xl shadow-lg transition-all duration-300 hover:border-primary/50 hover:-translate-y-1">
        {badge && (
            <div className="relative">
                <Badge variant={badge === 'New' ? 'default' : 'secondary'} className={cn(
                    "absolute top-4 right-4",
                    badge === 'New' && "bg-blue-500",
                    badge === 'Trending' && "bg-orange-500"
                )}>
                    {badge}
                </Badge>
            </div>
        )}
        <CardHeader className="pt-8">
          <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-secondary text-primary">
            {icon}
          </div>
          <CardTitle className="text-xl group-hover:text-primary transition-colors">
            {title}
          </CardTitle>
          <CardDescription>
            {description}
          </CardDescription>
        </CardHeader>
      </Card>
    </Link>
  );
}
