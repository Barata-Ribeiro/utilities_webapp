import { ArrowUpDownIcon, PercentIcon } from 'lucide-react';
import IsPercentOfWhatCalc from '~/components/pages/calculators/percentage/is-percent-of-what-calc';
import IsWhatPercentOfCalc from '~/components/pages/calculators/percentage/is-what-percent-of-calc';
import PercentIncreaseDecreaseCalc from '~/components/pages/calculators/percentage/percent-increase-decrease-calc';
import PercentOfCalc from '~/components/pages/calculators/percentage/percent-of-calc';
import ValueIncreaseDecreasePercent from '~/components/pages/calculators/percentage/value-increase-decrease-percent';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '~/components/ui/tabs';

export default function PercentageTab() {
    return (
        <Tabs defaultValue="percentage-calculators" className="w-full">
            <TabsList className="flex h-auto! flex-wrap items-center justify-start gap-1">
                <TabsTrigger value="percentage-calculators">
                    <PercentIcon aria-hidden size={16} />
                    Percentage Calculators
                </TabsTrigger>
                <TabsTrigger value="percentage-increase-decrease">
                    <ArrowUpDownIcon aria-hidden size={16} />
                    Percentage Increase/Decrease
                </TabsTrigger>
            </TabsList>

            <TabsContent
                value="percentage-calculators"
                className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            >
                <PercentOfCalc />
                <IsWhatPercentOfCalc />
                <IsPercentOfWhatCalc />
                <ValueIncreaseDecreasePercent />
            </TabsContent>

            <TabsContent value="percentage-increase-decrease">
                <PercentIncreaseDecreaseCalc />
            </TabsContent>
        </Tabs>
    );
}
