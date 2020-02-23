<template>
    <div id="component" class="md-layout md-alignment-top-center">
        <div class="md-layout-item md-size-100">
            <Cup v-bind:progress="progress"></Cup>
        </div>
        <div id="clock-container" class="md-layout-item md-size-100">
            <ClockDisplay id="clock" :timeInSeconds="timeRemaining"></ClockDisplay>
        </div>
        <div id="topic" v-if="currentTopic != ''" class="md-layout-item md-size-100">
            &laquo;{{ currentTopic }}&raquo;
        </div>
        <div v-if="!expired" class="md-layout-item md-size-100">
            <md-button v-on:click="cancelTimer" :disabled="timeRemaining <= 0" class="btn-secondary">Cancel</md-button>
        </div>
        <div v-if="expired" class="md-layout-item md-size-100">
            <md-button v-on:click="startExtension" :disabled="!expired" class="md-raised md-primary">Add {{getExtensionTime(extensionCount + 1) | minutesAndSeconds}}</md-button>
        </div>
        <div id="card-container" class="md-layout-item md-layout md-alignment-top-center md-size-100">
            <md-card md-with-hover id="topic-card" class="md-layout-item md-size-50 md-small-size-100">
                <md-card-header>
                    <div class="md-title">Next topic</div>
                </md-card-header>
                <md-card-content>
                    <div class="md-layout md-gutter">
                        <div class="md-layout-item md-size-70 md-xsmall-size-100">
                            <md-field>
                                <label>Title (Optional)</label>
                                <md-input type="text" size="30" v-model="nextTopic" />
                            </md-field>
                        </div>
                       <div class="md-layout-item md-size-30 md-xsmall-size-100">
                            <md-field>
                            <label for="startTime">Time</label>
                                <md-select v-model="topicTime" name="startTime" id="startTime">
                                    <md-option v-for="n in 15" v-bind:value="n * 60" v-bind:key="n">{{n}}:00</md-option>
                                </md-select>
                            </md-field>
                        </div>
                    </div>
                </md-card-content>
                <md-card-actions>
                    <md-button v-on:click="startTopic" :disabled="timeRemaining > 0" class="md-raised md-primary">Start</md-button>
                </md-card-actions>
            </md-card>
        </div>
    </div>

</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Cup from './Cup.vue';
import ClockDisplay from './ClockDisplay.vue';
import TimeInput from './TimeInput.vue';
import BackgroundTimer from "worker-loader!./backgroundTimer.worker";

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
    private ding: HTMLAudioElement = new Audio(require("../assets/service-bell.mp3"));
    
    private backgroundTimer = new BackgroundTimer()
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

    startTimer(time: number) {
        this.backgroundTimer.postMessage("stop");
        this.expired = false;
        this.startTime = time
        this.timeRemaining = time;
        this.backgroundTimer.onmessage = this.onTimerMessage
        this.backgroundTimer.postMessage("start");
    }

    stopTimer() {
        this.backgroundTimer.postMessage("stop");
    }

    onTimerMessage(ev: MessageEvent) {
        switch(ev.data) {
            case "tick":
                this.tick();
                break;
            default:
                console.log(`Unhandled message from background timer: ${ev.data}`)
        }

        if (ev.data != "tick")
            return
    }

    tick() {
        if (this.timeRemaining <= 1) {
            this.expired = true;
            this.ding.play();
            this.stopTimer();
        }   
        this.timeRemaining --;
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
        this.stopTimer();
        this.timeRemaining = 0;
    }
}
</script>

<style scoped>
#component {
    text-align: center;
}


#clock-container {
    display: block;
    font-size: 1.5em;
    margin: 15px 0;
}

#topic {
    font-family: Roboto, Helvetica, sans-serif;
    margin: 10px 0;
}

#topic-card {
    text-align: left;
    background-color: #555;
}

#card-container {
    margin: 10px 0;
}


</style>