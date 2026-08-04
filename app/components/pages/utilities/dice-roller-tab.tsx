import { DicesIcon } from 'lucide-react';
import AnkhIcon from '~/components/AnkhIcon';
import VtmDiceRoller from '~/components/pages/utilities/dice-roller/vtm-dice-roller';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '~/components/ui/tabs';

export default function DiceRollerTab() {
    // TODO: Change defaultValue to 'regular' once implemented
    return (
        <Tabs defaultValue="vtm" className="mx-auto w-full max-w-lg">
            <TabsList className="flex h-auto! flex-wrap items-center justify-start gap-1">
                <TabsTrigger value="regular">
                    <DicesIcon aria-hidden size={16} /> Regular Dice
                </TabsTrigger>
                <TabsTrigger value="vtm">
                    <AnkhIcon aria-hidden className="h-4" /> Vampire: The Masquerade
                </TabsTrigger>
            </TabsList>

            <TabsContent value="regular">{/* Regular Dice content goes here */}</TabsContent>
            <TabsContent value="vtm">
                <VtmDiceRoller />
            </TabsContent>
        </Tabs>
    );
}
