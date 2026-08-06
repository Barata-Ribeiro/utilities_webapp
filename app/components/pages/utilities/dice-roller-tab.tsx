import { DicesIcon } from 'lucide-react';
import AnkhIcon from '~/components/icons/ankh.icon';
import GenericDiceRoller from '~/components/pages/utilities/dice-roller/generic-dice-roller';
import VtmDiceRoller from '~/components/pages/utilities/dice-roller/vtm-dice-roller';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '~/components/ui/tabs';

export default function DiceRollerTab() {
    return (
        <Tabs defaultValue="generic" className="mx-auto w-full max-w-lg">
            <TabsList className="flex h-auto! flex-wrap items-center justify-start gap-1">
                <TabsTrigger value="generic">
                    <DicesIcon aria-hidden size={16} /> Dice Roller
                </TabsTrigger>
                <TabsTrigger value="vtm">
                    <AnkhIcon aria-hidden className="h-4" /> Vampire: The Masquerade
                </TabsTrigger>
            </TabsList>

            <TabsContent value="generic">
                <GenericDiceRoller />
            </TabsContent>
            <TabsContent value="vtm">
                <VtmDiceRoller />
            </TabsContent>
        </Tabs>
    );
}
