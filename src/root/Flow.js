import { useEffect, useState, useCallback } from 'react'

import ReactFlow, {
	Controls,
	Background,
    MiniMap,
	applyEdgeChanges,
	applyNodeChanges,
	addEdge,
} from 'reactflow'

import 'reactflow/dist/style.css'
import styles from './Flow.module.css'

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
		<div className={styles.container}>
            <a className={styles.button} onClick={AddNewNode}>
                <span className={styles.buttonText}>+ Add New Node</span>
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
	)
}

export default Flow