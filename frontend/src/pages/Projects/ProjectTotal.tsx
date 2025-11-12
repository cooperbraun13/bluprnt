import {useState, useEffect} from "react";

export default function ProjectTotal() {
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
    return (
    <div className="projects" style={{ padding: "20px" }}>
      <h2 className="color: #1B263B;">Project Cost Tracker</h2>

      <div className="add-item" style={{ marginBottom: "15px" }}>
        <input
          placeholder="Item Name"
          value={newItem.name}
          onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
        />
        <input
          placeholder="Vendor"
          value={newItem.vendor}
          onChange={(e) => setNewItem({ ...newItem, vendor: e.target.value })}
        />
        <input
          type="number"
          placeholder="Cost ($)"
          value={newItem.cost}
          onChange={(e) => setNewItem({ ...newItem, cost: e.target.value })}
        />
        <input
          type="date"
          value={newItem.delivery}
          onChange={(e) => setNewItem({ ...newItem, delivery: e.target.value })}
        />
        <button onClick={addItem}>Add</button>
      </div>

      <table border={1} cellPadding={6} style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>Item</th>
            <th>Vendor</th>
            <th>Cost ($)</th>
            <th>Delivery</th>
          </tr>
        </thead>
        <tbody>
          {items
            .sort((a, b) => b.cost - a.cost)
            .map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.vendor}</td>
                <td>{item.cost.toLocaleString()}</td>
                <td>{item.delivery}</td>
              </tr>
            ))}
        </tbody>
      </table>

      <p style={{ marginTop: "15px" }}>
        <strong>Total Cost:</strong> ${totalCost.toLocaleString()}
      </p>
    </div>
  );
}