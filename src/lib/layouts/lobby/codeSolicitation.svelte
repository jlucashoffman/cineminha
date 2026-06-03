<script lang="ts">
    import { goto } from "$app/navigation";
    import { controller } from "$lib/types/store.svelte";

    let code:string = $state("");

    const handleSubmit = (e: Event) => {
        e.preventDefault();

        if (code != "") {
            const parseCode = code.toUpperCase();
            controller.roomCode = parseCode;

            goto(`/room/${code}`);
        }
    }
</script>

<div class="border user_role_config">
    <form id="code_solicitation" onsubmit={handleSubmit}>
        <input type="text" placeholder="insert code" name="code" bind:value={code}>
        <div id="code_submit">
            <button type="submit">send</button>
        </div>
    </form>
</div>