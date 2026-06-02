<script lang="ts">
    import { controller } from "$lib/types/store.svelte";

    let hosts = $derived(controller.viewers.filter((v) => v.role === "host").sort((a, b) => a.name.localeCompare(b.name)));
    let guests = $derived(controller.viewers.filter((v) => v.role === "guest").sort((a, b) => a.name.localeCompare(b.name)));
</script>

<section id="viewers_list" class="border">
    <h6>Hosts</h6>
    <ul id="hosts_list">
        {#each hosts as h}
        <p>{h.name}</p>
        {/each}
    </ul>
    <hr class="border">
    <h6>Guests</h6>
    <ul id="guests_list">
        {#each guests as g}
        <p>{g.name}</p>
        {/each}
    </ul>
</section>

<style>
    section {
        display: flex;
        flex-direction: column;
        gap: var(--space-md);

        width: 192px;

        box-sizing: border-box;
        padding: var(--space-md) var(--space-sm);
        border-radius: var(--space-sm);

        & h6 {
            font-weight: bold;
        }

        & ul {
            display: flex;
            flex-direction: column;
            gap: var(--space-sm);
        }

        & hr {
            width: 100%;
        }

        & :is(p, h6) {
            display: inline-block;

            box-sizing: border-box;
            padding: 0 var(--space-sm);
        }
    }
</style>