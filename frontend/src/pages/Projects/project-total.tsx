import {useState, useEffect} from "react";

export default function Projects() {
    type Item = { id: number; name: string; vendor: string; cost: number; delivery: string };
    const [items, setItems] = useState<Item[]>([]);
    const [newItem, setNewItem] = useState({name:"", vendor:"", cost:"", delivery:""});
    useEffect(() => {
        const sampleData: Item[] = [
            { id: 1, name: "Steel Beams", vendor: "IronWorks Co.", cost: 12000, delivery: "2025-11-01" },
            { id: 2, name: "Concrete Mix", vendor: "BuildStrong", cost: 8500, delivery: "2025-10-28" },
            { id: 3, name: "Electrical Wiring", vendor: "VoltPro", cost: 4600, delivery: "2025-11-10" },
            { id: 4, name: "Glass Panels", vendor: "ClearView Ltd.", cost: 9200, delivery: "2025-11-15" },
        ];
        setItems(sampleData);
    }, []);
    const totalCost = items.reduce((sum, item) => sum + item.cost, 0);
    async function addItem() {
        if (!newItem.name || !newItem.vendor || !newItem.cost || !newItem.delivery) return;

        const newEntry = {
            ...newItem,
            id: Date.now(),
            cost: parseFloat(newItem.cost),
        };

        // Backend Stuff Here

        setItems((prev) => [...prev, newEntry]);
        setNewItem({name:"", vendor:"", cost:"", delivery:""});
    }
    
}