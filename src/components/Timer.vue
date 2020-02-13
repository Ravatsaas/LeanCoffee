<template>
    <div>
        <Cup v-bind:progress="progress"></Cup>
        <div id="clock-container">
            <ClockDisplay id="clock" :timeInSeconds="timeRemaining"></ClockDisplay>
        </div>
        <div id="topic" v-if="currentTopic != ''">
            &laquo;{{ currentTopic }}&raquo;
        </div>
        <div v-if="!expired">
            <button v-on:click="cancelTimer" :disabled="timeRemaining <= 0" class="btn-secondary">Cancel</button>
        </div>
        <div v-if="expired">
            <!--TimeInput v-model="extensionTime"></TimeInput-->
            <button v-on:click="startExtension" :disabled="!expired" class="btn-primary">Add {{getExtensionTime(extensionCount + 1) | minutesAndSeconds}}</button>
        </div>
        <div class="card">
            <input type="text" size="30" v-model="nextTopic" placeholder="Next topic (optional)"/>
            <TimeInput v-model="topicTime"></TimeInput>
            <button v-on:click="startTopic" :disabled="timeRemaining > 0" class="btn-primary">Start</button>
        </div>
    </div>

</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Cup from './Cup.vue';
import ClockDisplay from './ClockDisplay.vue';
import TimeInput from './TimeInput.vue';

@Component({
    components : {
        Cup,
        ClockDisplay,
        TimeInput
    },
    filters: {
        minutesAndSeconds: function(value: number) {
            let minutes = Math.floor(value / 60);
            let seconds = value % 60;

            return `${minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
        }        
    }
})
export default class Timer extends Vue {

    private timerId: number = -1;
    private ding: HTMLAudioElement = new Audio(require("../assets/service-bell.mp3"));
    public topicTime: number = 480;
    public extensionTime: number = 0;
    public startTime: number = 0;
    public timeRemaining: number = 0;
    public extensionCount = 0;
    public currentTopic: string = "";
    public nextTopic: string = "";
    public expired: boolean = false;
    
    get progress() : number {
        return this.timeRemaining / this.startTime;
    }

    onSecond() {
        if (this.timeRemaining <= 0) {
            this.expired = true;
            this.ding.play();
            clearInterval(this.timerId);
        } else {
            this.timeRemaining --;
        }
    }

    startTimer(time: number) {
        if(this.timerId != -1) {
            clearInterval(this.timerId);
        }
        this.expired = false;
        this.startTime = time
        this.timeRemaining = time;
        this.timerId = setInterval(this.onSecond, 1000);      
    }

    startTopic() {
        this.currentTopic = this.nextTopic;
        this.nextTopic = "";
        this.extensionCount = 0;

        this.startTimer(this.topicTime)
    }

    startExtension() {
        this.extensionCount ++;
        this.startTimer(this.getExtensionTime(this.extensionCount)); 
    }

    getExtensionTime(extensionNum: number) : number {
        switch(extensionNum) {
            case 0: return this.topicTime;
            case 1: return Math.round(this.topicTime / 2);
            default: return Math.round(this.topicTime / 4);
        }
    }

    cancelTimer() {
        clearInterval(this.timerId);
        this.timeRemaining = 0;
    }
}
</script>

<style scoped>
#clock-container {
    display: block;
    font-size: 1.5em;
}

#topic {
    font-family: Roboto, Helvetica, sans-serif;
}

.card {
    background-color: #444;
    margin: 10px auto;
    padding: 10px;
    width: 20em;
    border-radius: 10px;
}

input[type="text"] {
    font-family: Roboto, Helvetica, sans-serif;
    border: 1px solid #aaa;
    padding: 10px;
    margin: 5px;
    border-radius: 10px;
}

div {
    margin: 10px;
}
</style>