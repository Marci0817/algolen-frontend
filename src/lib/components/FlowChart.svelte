<script lang="ts">
    import { Svelvet, Node, Anchor, Edge } from "svelvet";
    import type { Connections } from "svelvet";
    import ConnectButton from "./ConnectButton.svelte";

    const initialNodes = [
        {
            id: 1,
            position: { x: 333, y: 50 },
            label: "Lender lists nft",
            width: 200,
            height: 50,
            bgColor: "white",
            connections: [1, "test"],
        },
        {
            id: 2,
            position: { x: 666, y: 150 },
            label: "user selects length for borrowing",
            width: 200,
            height: 50,
            bgColor: "white",
        },
        {
            id: 3,
            position: { x: 500, y: 250 },
            label: "user pays deposit daily rent",
            width: 200,
            height: 50,
            bgColor: "white",
        },
    ];
</script>

<Svelvet width={1000} height={500} theme="dark">
    <Node
        useDefaults
        id={1}
        position={{ x: 333, y: 50 }}
        height={50}
        width={200}
        outputs={1}
        bgColor="gray"
    >
        <Anchor key={"lender"} connections={[1, 2]} dynamic />
        <p class="text-center mx-2">lender lists nft</p>
    </Node>
    <Node
        useDefaults
        id={2}
        position={{ x: 666, y: 150 }}
        height={50}
        width={200}
        bgColor="gray"
    >
        <Anchor connections={[2, 3]} dynamic />
        <p class="text-center mx-2">user selects length for borrowing</p>
    </Node>
    <Node
        useDefaults
        id={3}
        position={{ x: 500, y: 250 }}
        height={50}
        width={200}
        outputs={2}
        bgColor="gray"
    >
        <Anchor connections={[[3, 4]]} dynamic />
        <p class="text-center mx-2">user pays deposit daily rent</p>
    </Node>

    <Node
        useDefaults
        id={4}
        position={{ x: 250, y: 450 }}
        height={50}
        width={200}
        bgColor="gray"
    >
        <Anchor connections={[3, 4]} dynamic>
            <Edge
                color="red"
                label="Borrower returns the nft in time"
                slot="edge"
                animate
            />
        </Anchor>

        <p class="text-center mx-2">Gets back the deposit fee</p>
    </Node>
    <Node
        useDefaults
        id={5}
        position={{ x: 800, y: 450 }}
        height={50}
        width={200}
        bgColor="gray"
    >
        <Anchor connections={[5, 3]} dynamic>
            <Edge color="red" label="Borrower runs out of time" slot="edge" />
        </Anchor>
        <p class="text-center mx-2">lender takes the deposit fee</p>
    </Node>
</Svelvet>
