<script lang="ts">
    import SwitchButton from "$lib/components/buttons/switchButton.svelte";
</script>

<div id="user_role_selection" class="border">
    <h1>cineminha</h1>
    <div id="lobby_buttons">
        <div class="lobby_button_container"><SwitchButton displayText="host" group="user_role" value="host" /></div>
        <div class="lobby_button_container"><SwitchButton displayText="guest" group="user_role" value="guest" /></div>
    </div>
</div>

<style>
    #user_role_selection {
        width: 100%;
        max-width: 256px;

        display: flex;
        flex-direction: column;
        align-items: center;
        gap: var(--space-md);

        padding: var(--space-md);

        border-radius: var(--space-sm);

        & h1 { font-size: 1.2rem; }

        & #lobby_buttons {
            width: 100%;

            display: flex;
            justify-content: center;
            gap: var(--space-md);

            & .lobby_button_container {
                flex: 1;
                display: flex;

                &:first-child { 
                flex-direction: row-reverse; }
            }
        }
    }
</style>