<template>
    <div id="clock">{{ minutes }}:{{ seconds | zeroPadded(2) }}</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({
    filters: {
        zeroPadded: function(value: number, length: number): string {
            let paddingLength = length - value.toString().length;
            if (paddingLength <= 0) {
                return value.toString();
            }
            return '0'.repeat(paddingLength) + value;
        }
    }
})
export default class ClockDisplay extends Vue {

    @Prop({default: 0})
    timeInSeconds!: number;

    get minutes() : number {
        return Math.floor(this.timeInSeconds / 60);
    }

    get seconds() : number {
        return this.timeInSeconds % 60;
    }
}

</script>

<style scoped>
#clock {
    display: inline-block;
    font-family: Roboto, Helvetica, sans-serif;
}
</style>