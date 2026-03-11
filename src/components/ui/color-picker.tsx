import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { PaletteIcon } from 'lucide-react';
import { useMemo, useState, type ComponentProps, type FocusEventHandler } from 'react';
import { HexColorPicker } from 'react-colorful';

interface ColorPickerProps {
    value: string;
    onChange: (v: string) => void;
    onBlur?: FocusEventHandler<HTMLElement>;
}

export default function ColorPicker({
    disabled,
    value,
    onChange,
    onBlur,
    name,
    className,
    size,
    ...props
}: Readonly<ColorPickerProps & Omit<ComponentProps<typeof Button>, 'variant' | 'onChange' | 'onBlur'>>) {
    const [open, setOpen] = useState(false);

    const parsedValue = useMemo(() => {
        return value ?? '#FFFFFF';
    }, [value]);

    return (
        <Popover onOpenChange={setOpen} open={open}>
            <PopoverTrigger disabled={disabled} onBlur={onBlur} asChild>
                <Button
                    {...props}
                    className={cn('block aspect-square', className)}
                    name={name}
                    onClick={() => setOpen(true)}
                    size={size}
                    style={{ backgroundColor: parsedValue }}
                    variant="outline"
                >
                    <PaletteIcon aria-hidden />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full">
                <HexColorPicker color={parsedValue} onChange={onChange} />
                <Input maxLength={7} onChange={(e) => onChange(e?.currentTarget?.value)} value={parsedValue} />
            </PopoverContent>
        </Popover>
    );
}
