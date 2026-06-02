<script lang="ts">
    import { controller } from "$lib/types/store.svelte";
</script>

{#each controller.viewers as v}
<p>{`usuário ${v.name} é um ${v.role} (id: ${v.id})`}</p>
{/each}