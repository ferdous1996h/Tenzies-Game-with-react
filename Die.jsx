export default function Die(props) {
  return (
    <>
      <button
        onClick={() => props.punch(props.id)}
        style={props.hold ? { background: '#59E391' } : null}
        aria-pressed={props.hold}
        aria-label={`Die with value ${props.value}, ${props.hold? 'Hold' : 'Not Hold'} `}
      >
        {props.value}
      </button>
    </>
  );
}
