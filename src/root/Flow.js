import { useEffect, useState, useCallback } from 'react'

import ReactFlow, {
	Controls,
	Background,
    MiniMap,
	applyEdgeChanges,
	applyNodeChanges,
	addEdge,
} from 'reactflow';
import 'reactflow/dist/style.css';



const initialNodes = [
	{
		id: '1',
        height: 40,
		data: { label: 'Node 1' },
		position: { x: 100, y: 100 },
        width: 100,
	},
]

const initialEdges = []

const Flow = () => {
	const [nodes, setNodes] = useState(initialNodes)
	const [edges, setEdges] = useState(initialEdges)
    const [id, setId] = useState(2)

	const onNodesChange = useCallback(
		(changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
		[]
	)

	const onEdgesChange = useCallback(
		(changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
		[]
	)

	const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [])

    const AddNewNode = () => {
        const newNode = {
            id: String(id),
            data: {
                label: `Node ${id}`,
            },
            height: 38,
            position: { x: Math.random() * 600, y: Math.random() * 500 % 600 },
            width: 150,
        }
        setNodes([...nodes, newNode])
        setId(id + 1)
    }
	
    useEffect(() => {
        console.log(nodes)
    }, [id])

	return (
		<div style={{ height: '90vh', width: '100vx', paddingTop: 20, }}>
            <a id='buttonContainer' onClick={AddNewNode} style={{backgroundColor: '#ACDF87', padding: 10, borderRadius: 15, marginLeft: 15, }}>
                <span id='buttonText' style={{fontSize: 20, fontWeight: 'bold', color: 'green'}}>+ Add New Node</span>
            </a>
			<ReactFlow
				nodes={nodes}
				onNodesChange={onNodesChange}
				edges={edges}
				onEdgesChange={onEdgesChange}
				onConnect={onConnect}
			>
				<Background />
				<Controls />
                <MiniMap />
			</ReactFlow>
		</div>
	);
}

export default Flow