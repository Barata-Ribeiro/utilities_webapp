import type { KonvaEventObject, Node } from 'konva/lib/Node';
import type { TextConfig } from 'konva/lib/shapes/Text';
import { Text } from 'react-konva';

interface CanvasTextProps {
    props: Node<TextConfig>;
    onSelect: () => void;
}

export default function CanvasText({ props, onSelect }: Readonly<CanvasTextProps>) {
    const attrs = props.getAttrs();
    const text = typeof attrs.text === 'string' ? attrs.text : '';
    const fontSize = typeof attrs.fontSize === 'number' ? attrs.fontSize : 0;

    function handleOnDragEnd(evt: KonvaEventObject<DragEvent, Node<TextConfig>>): void {
        const { x, y } = evt.target.attrs;
        props.setAttrs({ x, y });
    }

    return (
        <Text
            draggable
            {...attrs}
            onClick={onSelect}
            offsetX={text.length * fontSize * 0.3}
            onDragEnd={handleOnDragEnd}
        />
    );
}
