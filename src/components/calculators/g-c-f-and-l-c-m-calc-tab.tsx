import Gcf from '@/components/calculators/gcf-and-lcm/gcf';
import Lcm from '@/components/calculators/gcf-and-lcm/lcm';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function GCFAndLCMCalcTab() {
    return (
        <Tabs defaultValue="gcf-calc" className="mx-auto w-full max-w-5xl">
            <TabsList className="flex h-auto! flex-wrap items-center justify-start gap-1">
                <TabsTrigger value="gcf-calc">GCF Calculator</TabsTrigger>
                <TabsTrigger value="lcm-calc">LCM Calculator</TabsTrigger>
            </TabsList>

            <TabsContent value="gcf-calc">
                <Gcf />
            </TabsContent>

            <TabsContent value="lcm-calc">
                <Lcm />
            </TabsContent>
        </Tabs>
    );
}
