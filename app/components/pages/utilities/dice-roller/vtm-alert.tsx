import { InfoIcon, XIcon } from 'lucide-react';
import { useState } from 'react';
import { Alert, AlertAction, AlertDescription, AlertTitle } from '~/components/ui/alert';
import { Button } from '~/components/ui/button';

export default function VtmAlert() {
    const [isOpen, setIsOpen] = useState(true);

    return (
        isOpen && (
            <Alert className="bg-muted/50">
                <InfoIcon aria-hidden />
                <AlertTitle>Important!</AlertTitle>
                <AlertDescription>
                    Regular dice are summed with hunger dice to determine the total dice rolled. Hunger dice are a
                    special type of die that can result in critical successes or failures, so read the rules carefully!
                </AlertDescription>
                <AlertAction>
                    <Button size="icon-xs" variant="ghost" aria-label="Close alert" onClick={() => setIsOpen(false)}>
                        <XIcon aria-hidden />
                    </Button>
                </AlertAction>
            </Alert>
        )
    );
}
