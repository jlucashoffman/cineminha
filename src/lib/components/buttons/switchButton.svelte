<script lang="ts">
    import { controller, type userRole } from "$lib/types/store.svelte";

    let {displayText, group, value}:{displayText:string, group:string, value?:userRole} = $props();
</script>

<button 
type="button"
onclick={() => {controller.lobbyUserRole = value}} 
class={`radio_button_${group}`}
class:select={(value && value == controller.lobbyUserRole)}>
{displayText}
</button>

<style>
    button.select {
        color: red;
    }
</style>