export default function VerticalLine({ lineHeight, lineWidth, lineColor }) {
    return (
        <div style={{
            borderLeft: `${lineWidth}px solid ${lineColor}`,
            height: lineHeight,
            top: 0
        }}></div>
    );
}