import { type CSSProperties, useRef, useState } from 'react';
import { type ItemContent, Virtuoso } from 'react-virtuoso';
import './App.css';

const items = Array.from({ length: 100 }).map((_, i) => ({
	id: i + 1,
	title: `Item ${i + 1}`,
}));

const itemRenderer: ItemContent<typeof items[number], never> = (_, item) => (
	<div key={item.id} style={{ border: '2px solid #669', padding: '1rem' }}>
		{item.title}
	</div>
);

const App = () => {
	const scrollContainerRef = useRef<HTMLDivElement>(null);
	const [, setCount] = useState(0);
	const forceUpdate = () => setCount(curr => curr + 1);

	return(
		<div style={outerContainerStyle}>
			<div ref={scrollContainerRef} style={scrollContainerStyle}>
				<div style={stickyBoxStyle}>
					<span>This is a position sticky box</span>
					<button onClick={() => forceUpdate()}>
						Click to force update
					</button>
				</div>
				<Virtuoso
					style={{ height: '100%' }}
					customScrollParent={scrollContainerRef.current!}
					data={items}
					itemContent={itemRenderer}
				/>
			</div>
		</div>
	);
}

const outerContainerStyle: CSSProperties = {
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	width: '100%',
	height: '100%'
};

const scrollContainerStyle: CSSProperties = {
	height: '100%',
	display: 'flex',
	flexDirection: 'column',
	border: '1px solid #999',
	overflow: 'auto'
};

const stickyBoxStyle: CSSProperties = {
	position: 'sticky',
	top: 0, zIndex: 1,
	display: 'flex',
	flexDirection: 'column',
	gap: '1rem',
	border: '4px solid #966',
	padding: '1rem',
	backgroundColor: '#333',
	color: 'white'
};

export default App
