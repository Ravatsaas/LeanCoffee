<template>
    <div id="component">
        <button id="btn-dec" v-on:click="decrement" :disabled="value <= interval">-</button>
        <div id="clock-container"><ClockDisplay id="clock" :timeInSeconds="value"></ClockDisplay></div>
        <button id="btn-inc" v-on:click="increment">+</button>
    </div>
</template>

<script lang="ts">
import {Component, Prop, Vue, Model} from 'vue-property-decorator';
import ClockDisplay from './ClockDisplay.vue';

@Component({
    components: {
        ClockDisplay
    }
})
export default class TimeInput extends Vue {
    
    @Model()
    value!: number;

    @Prop({ default: 30 })
    interval!: number;

    increment() {
        this.$emit('value', this.value + this.interval);
    }

    decrement() {
        this.$emit('value', this.value - this.interval);
    }
}
</script>

<style scoped>
#component {
    display: inline-flex;
    flex-direction: row;
    margin: 5px;
}
#clock-container {
    display: inline-block;
    background-color: #eee;
    margin: 0 2px;
    padding: 10px;
}

#btn-dec {
    color: #744;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
}

#btn-dec:hover:not(:disabled) {
    background-color: #dcc;
}

#btn-inc {
    color: #474;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
}

#btn-inc:hover:not(disabled) {
    background-color: #cdd;
}

button {
    display:inline-block;
    width: 40px;
    padding: 0;
    margin: 0;
}
</style>