import { AlertTriangleIcon } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '~/components/ui/alert';

export default function ContentError({ message }: Readonly<{ message: string }>) {
    return (
        <Alert className="max-w-md border-amber-200 bg-amber-50 text-amber-900 dark:border-amber-900 dark:bg-amber-950 dark:text-amber-50">
            <AlertTriangleIcon />
            <AlertTitle>Something went wrong</AlertTitle>
            <AlertDescription>{message}</AlertDescription>
        </Alert>
    );
}
