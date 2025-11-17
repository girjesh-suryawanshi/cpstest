'use client';

import { useState, useEffect } from 'react';
import { getLeaderboard, Score } from '@/lib/leaderboard';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Trophy } from 'lucide-react';
import { Skeleton } from './ui/skeleton';

interface LeaderboardProps {
    game: string;
    title: string;
}

export function Leaderboard({ game, title }: LeaderboardProps) {
    const [scores, setScores] = useState<Score[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchScores = async () => {
            setLoading(true);
            const fetchedScores = await getLeaderboard(game, 10);
            setScores(fetchedScores);
            setLoading(false);
        };

        fetchScores();
    }, [game]);

    const getRankIcon = (index: number) => {
        if (index === 0) return <Trophy className="w-5 h-5 text-yellow-400" />;
        if (index === 1) return <Trophy className="w-5 h-5 text-gray-400" />;
        if (index === 2) return <Trophy className="w-5 h-5 text-yellow-600" />;
        return <span className="text-muted-foreground font-medium">{index + 1}</span>;
    }

    return (
        <Card className="h-full flex flex-col bg-secondary/30 border-primary/20 p-6 shadow-[0_0_20px_hsl(var(--primary)/0.1)]">
            <CardHeader className="p-0 mb-4">
                <CardTitle>{title}</CardTitle>
                <CardDescription>Top 10 players</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 p-0">
                {loading ? (
                    <div className="space-y-3">
                        {[...Array(5)].map((_, i) => (
                           <div key={i} className="flex items-center gap-4">
                             <Skeleton className="h-8 w-8 rounded-full" />
                             <Skeleton className="h-4 w-3/4" />
                             <Skeleton className="h-4 w-1/4" />
                           </div>
                        ))}
                    </div>
                ) : (
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[50px]">Rank</TableHead>
                                <TableHead>Player</TableHead>
                                <TableHead className="text-right">Score</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {scores.map((score, index) => (
                                <TableRow key={score.id}>
                                    <TableCell className="font-bold text-lg">{getRankIcon(index)}</TableCell>
                                    <TableCell>{score.name}</TableCell>
                                    <TableCell className="text-right font-mono text-primary">{score.score.toFixed(2)}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                )}
            </CardContent>
        </Card>
    );
}
