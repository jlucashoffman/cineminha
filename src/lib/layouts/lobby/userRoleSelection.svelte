<script lang="ts">
    import SwitchButton from "$lib/components/buttons/switchButton.svelte";
</script>

<div id="user_role_selection">
    <h1>cineminha</h1>
    <div id="lobby_buttons">
        <div class="lobby_button_container"><SwitchButton displayText="host" group="user_role" value="host" /></div>
        <div class="lobby_button_container"><SwitchButton displayText="guest" group="user_role" value="guest" /></div>
    </div>
</div>