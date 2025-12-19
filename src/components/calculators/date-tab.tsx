import DateAddSubtract from '@/components/calculators/date/date-add-subtract';
import { DateDifference } from '@/components/calculators/date/date-difference';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CalendarRangeIcon, CalendarSyncIcon } from 'lucide-react';

export default function DateTab() {
    return (
        <Tabs defaultValue="date-difference" className="mx-auto w-full max-w-lg">
            <TabsList className="flex h-auto! flex-wrap items-center justify-start gap-1">
                <TabsTrigger value="date-difference">
                    <CalendarRangeIcon aria-hidden size={16} />
                    Date Difference
                </TabsTrigger>
                <TabsTrigger value="date-add-subtract">
                    <CalendarSyncIcon aria-hidden size={16} />
                    Date Add/Subtract
                </TabsTrigger>
            </TabsList>

            <TabsContent value="date-difference">
                <DateDifference />
            </TabsContent>

            <TabsContent value="date-add-subtract">
                <DateAddSubtract />
            </TabsContent>
        </Tabs>
    );
}
