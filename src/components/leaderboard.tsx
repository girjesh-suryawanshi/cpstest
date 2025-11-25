'use client';

import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Trophy } from 'lucide-react';
import { Skeleton } from './ui/skeleton';
import { useFirebase } from '@/components/firebase-provider';
import { collection, query, orderBy, limit, onSnapshot, where } from 'firebase/firestore';

interface Score {
    id: string;
    name: string;
    score: number;
    game: string;
}

interface LeaderboardProps {
    game: string;
    title: string;
}

export function Leaderboard({ game, title }: LeaderboardProps) {
    const { firestore } = useFirebase();
    const [scores, setScores] = useState<Score[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!firestore) {
            // Keep loading if firestore is not yet available
            setLoading(true);
            return;
        }

        setLoading(true);
        const scoresCollection = collection(firestore, 'leaderboard');
        const scoresQuery = query(scoresCollection, orderBy('score', 'desc'), limit(50));

        const unsubscribe = onSnapshot(scoresQuery, (querySnapshot) => {
            const allScores: Score[] = [];
            querySnapshot.forEach((doc) => {
                allScores.push({ id: doc.id, ...doc.data() } as Score);
            });
            
            // Filter by game on the client
            const gameScores = allScores.filter(score => score.game === game).slice(0, 10);

            setScores(gameScores);
            setLoading(false);
        }, (error) => {
            console.error("Error fetching leaderboard scores:", error);
            setScores([]);
            setLoading(false);
        });

        return () => unsubscribe();
    }, [firestore, game]);

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
                    <div className="space-y-3 pt-2">
                        {[...Array(5)].map((_, i) => (
                           <div key={i} className="flex items-center gap-4">
                             <Skeleton className="h-8 w-8 rounded-full" />
                             <Skeleton className="h-4 w-3/4" />
                             <Skeleton className="h-4 w-1/4" />
                           </div>
                        ))}
                    </div>
                ) : scores.length === 0 ? (
                    <div className="text-center text-muted-foreground pt-10">
                        <p>No scores yet.</p>
                        <p>Be the first to get on the leaderboard!</p>
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
